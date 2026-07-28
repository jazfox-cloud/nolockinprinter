import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const layout = readFileSync(new URL('../src/layouts/SiteLayout.astro', import.meta.url), 'utf8');
const scripts = [...layout.matchAll(/<script is:inline>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const analyticsScript = scripts.find((script) => script.includes('function trackContentClick'));

if (!analyticsScript) {
  throw new Error('Could not find analytics navigation script.');
}

class FakeElement {
  closest() {
    return null;
  }
}

class FakeAnchorElement extends FakeElement {
  constructor({
    href = 'https://nolockinprinter.com/guides/no-subscription-printers/#brother-mfc-j4335dw',
    target = '',
    download = '',
    attrs = {},
  } = {}) {
    super();
    this.href = href;
    this.target = target;
    this.download = download;
    this.attrs = {
      'data-analytics-content': 'printer_card',
      'data-analytics-slug': 'brother-mfc-j4335dw',
      'data-analytics-placement': 'home_shortlist',
      ...attrs,
    };
  }

  closest(selector) {
    return selector === '[data-analytics-content]' ? this : null;
  }

  getAttribute(name) {
    return this.attrs[name] ?? null;
  }
}

function createHarness({ choice = 'analytics_granted', hostname = 'nolockinprinter.com' } = {}) {
  const listeners = new Map();
  const timers = [];
  const assigned = [];
  const appendedScripts = [];
  const storage = new Map(choice ? [['nolockinprinter_analytics_consent', choice]] : []);
  const location = {
    href: `https://${hostname}/`,
    hostname,
    origin: `https://${hostname}`,
    pathname: '/',
    search: '',
    assign(url) {
      assigned.push(url);
      this.href = url;
    },
  };
  const document = {
    head: {
      appendChild(script) {
        appendedScripts.push(script.src);
      },
    },
    createElement(tag) {
      return { tagName: tag.toUpperCase(), async: false, src: '' };
    },
    querySelector(selector) {
      if (selector === '[data-analytics-consent]') return { hidden: true };
      return null;
    },
    querySelectorAll() {
      return [];
    },
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
  };
  const window = {
    dataLayer: [],
    location,
    localStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, value);
      },
    },
    setTimeout(fn, ms) {
      const timer = { fn, ms, cleared: false };
      timers.push(timer);
      return timer;
    },
    clearTimeout(timer) {
      timer.cleared = true;
    },
  };
  const context = vm.createContext({
    window,
    document,
    Element: FakeElement,
    HTMLAnchorElement: FakeAnchorElement,
    URL,
    Date,
  });

  vm.runInContext(analyticsScript, context);

  return { window, listeners, timers, assigned, appendedScripts, storage };
}

function createEvent(link, overrides = {}) {
  return {
    target: link,
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...overrides,
  };
}

function createTextTarget(parentElement) {
  return { parentElement };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function lastGtagEvent(harness) {
  return harness.window.dataLayer
    .map((entry) => Array.from(entry))
    .find((entry) => entry[0] === 'event' && entry[1] === 'select_content');
}

function runClick(harness, event) {
  const handler = harness.listeners.get('click');
  assert(typeof handler === 'function', 'Expected one delegated click handler.');
  handler(event);
}

{
  const harness = createHarness();
  const link = new FakeAnchorElement();
  const event = createEvent(link);
  runClick(harness, event);
  const command = lastGtagEvent(harness);
  assert(event.defaultPrevented, 'Plain same-origin tracked click should be prevented.');
  assert(command, 'Plain same-origin tracked click should queue select_content.');
  assert(command[2].content_type === 'printer_card', 'Expected low-cardinality content_type.');
  assert(command[2].content_slug === 'brother-mfc-j4335dw', 'Expected low-cardinality content_slug.');
  assert(command[2].placement === 'home_shortlist', 'Expected low-cardinality placement.');
  assert(command[2].send_to === 'G-SF2QJEJ57G', 'Expected select_content to target the GA4 stream explicitly.');
  assert(command[2].transport_type === 'beacon', 'Expected beacon transport.');
  assert(command[2].event_timeout === 500, 'Expected short GA event timeout.');
  assert(harness.timers.length === 1 && harness.timers[0].ms === 700, 'Expected one short fallback timer.');
  command[2].event_callback();
  assert(harness.assigned.length === 1, 'Callback should navigate once.');
  harness.timers[0].fn();
  assert(harness.assigned.length === 1, 'Callback and fallback together should still navigate once.');
}

{
  const harness = createHarness();
  const link = new FakeAnchorElement();
  const event = createEvent(link, { target: createTextTarget(link) });
  runClick(harness, event);
  assert(event.defaultPrevented, 'Clicking tracked link text should be intercepted.');
  assert(lastGtagEvent(harness), 'Clicking tracked link text should queue select_content.');
}

{
  const harness = createHarness();
  const link = new FakeAnchorElement({ href: 'https://nolockinprinter.com/guides/linux-compatible-printers/' });
  const event = createEvent(link);
  runClick(harness, event);
  const command = lastGtagEvent(harness);
  assert(command, 'Expected select_content before fallback-only navigation.');
  harness.timers[0].fn();
  assert(harness.assigned.length === 1, 'Fallback should navigate once when callback does not run.');
}

for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) {
  const harness = createHarness();
  const event = createEvent(new FakeAnchorElement(), { [modifier]: true });
  runClick(harness, event);
  assert(!event.defaultPrevented, `${modifier} click should not be intercepted.`);
  assert(!lastGtagEvent(harness), `${modifier} click should not queue select_content.`);
}

for (const link of [
  new FakeAnchorElement({ target: '_blank' }),
  new FakeAnchorElement({ download: 'guide.html' }),
  new FakeAnchorElement({ href: 'https://example.com/guide' }),
  new FakeAnchorElement({ href: 'https://nolockinprinter.com/#brother-mfc-j4335dw' }),
]) {
  const harness = createHarness();
  const event = createEvent(link);
  runClick(harness, event);
  assert(!event.defaultPrevented, 'Non-plain navigation should not be intercepted.');
  assert(!lastGtagEvent(harness), 'Non-plain navigation should not queue select_content.');
}

{
  const harness = createHarness({ choice: 'denied' });
  const event = createEvent(new FakeAnchorElement());
  runClick(harness, event);
  assert(!event.defaultPrevented, 'Reject Analytics should not delay navigation.');
  assert(!lastGtagEvent(harness), 'Reject Analytics should not queue select_content.');
}

{
  const harness = createHarness();
  const event = createEvent(new FakeAnchorElement());
  runClick(harness, event);
  runClick(harness, event);
  const count = harness.window.dataLayer
    .map((entry) => Array.from(entry))
    .filter((entry) => entry[0] === 'event' && entry[1] === 'select_content').length;
  assert(count === 1, 'Same click event should queue select_content at most once.');
}

console.log('GA4 navigation behavior tests passed.');
