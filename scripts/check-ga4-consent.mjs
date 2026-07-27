import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const measurementId = 'G-SF2QJEJ57G';
const productionHost = 'nolockinprinter.com';
const allowedMeasurementIds = new Set([measurementId]);
const requiredConsentKeys = [
  'analytics_storage',
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
];

function walk(dir) {
  return readdirSync(dir)
    .filter((name) => !['.git', 'node_modules', 'dist', 'reports'].includes(name))
    .flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? walk(path) : [path];
    });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const files = walk(root).filter((file) => !file.endsWith('scripts/check-ga4-consent.mjs'));
const sourceText = files.map((file) => readFileSync(file, 'utf8')).join('\n');
const layout = readFileSync(join(root, 'src/layouts/SiteLayout.astro'), 'utf8');
const privacy = readFileSync(join(root, 'src/pages/privacy.astro'), 'utf8');

const ids = [...sourceText.matchAll(/\bG-[A-Z0-9]+\b/g)].map((match) => match[0]);
assert(ids.length > 0, 'Expected a GA4 Measurement ID in source.');
assert(ids.every((id) => allowedMeasurementIds.has(id)), `Unexpected GA4 Measurement ID(s): ${ids.join(', ')}`);

assert(layout.includes(`const measurementId = '${measurementId}'`), 'Shared layout must define the approved Measurement ID.');
assert(layout.includes(`const productionHost = '${productionHost}'`), 'Shared layout must guard on the production host.');
assert(layout.includes('window.location.hostname === productionHost'), 'Analytics must only run on the canonical host.');
assert(layout.includes('window.dataLayer.push(arguments)'), 'gtag wrapper must queue dataLayer.push(arguments).');
assert(!sourceText.includes('dataLayer.push(args)'), 'dataLayer.push(args) is forbidden.');

for (const key of requiredConsentKeys) {
  assert(layout.includes(key), `Missing Consent Mode v2 key: ${key}`);
}

assert(layout.includes("analytics_storage: analyticsStorage"), 'Consent update must set analytics_storage from the accept/reject flow.');
assert(layout.includes("updateConsent('granted')"), 'Accept flow must grant analytics_storage.');
assert(layout.includes("ad_storage: 'denied'"), 'Ad storage must remain denied in analytics consent updates.');
assert(layout.includes("ad_user_data: 'denied'"), 'Ad user data must remain denied in analytics consent updates.');
assert(layout.includes("ad_personalization: 'denied'"), 'Ad personalization must remain denied in analytics consent updates.');
assert(layout.includes('googletagmanager.com/gtag/js'), 'GA4 loader is missing.');
assert(layout.includes('select_content'), 'select_content event tracking is missing.');
assert(layout.includes('content_slug'), 'select_content must use content_slug.');
assert(!layout.includes('newsletter_signup'), 'Do not emit newsletter_signup without a real successful newsletter backend.');
assert(!layout.includes('comparison_start'), 'Do not emit comparison_start for static comparison content.');

assert(privacy.includes('Google Analytics 4'), 'Privacy policy must disclose GA4.');
assert(privacy.includes('Analytics choices are separate from advertising choices'), 'Privacy policy must separate analytics and ad consent.');
assert(!/Google-certified consent management platform[^.]*is (configured|complete|active)/i.test(privacy), 'Privacy policy must not falsely claim certified CMP completion.');

console.log('GA4 consent checks passed.');
