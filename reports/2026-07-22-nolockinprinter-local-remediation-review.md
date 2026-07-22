# NoLockInPrinter AdSense 内容整改与本地复核

## 1. 最终状态

- 初始审计状态：`HOLD_CONTENT`
- 本地整改后生命周期状态：`READY_PENDING_HUMAN_EVIDENCE`
- 本地代码/内容 Blocker：`0`
- 说明：该状态只表示当前工作树中的站点侧内容与代码 blocker 已清除；不表示已发布、不表示生产环境已复核，也不保证 Google AdSense 批准。
- 编辑核验日：`2026-07-22`（页面按任务指定日期显示；本轮执行时间为 2026-07-21 PDT，对应亚洲时区 2026-07-22）

## 2. 是否建议发布

建议在人工检查本报告与 diff 后，另行授权发布。本轮不包含 commit、push、deploy 或生产验证。发布后仍需完成 Contact 收件/回复、非儿童导向确认与 Cloudflare WAF/Security Events 只读检查。

Google 当前政策依据：

- [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en)：不允许在无 publisher content、低价值或建设中页面投放 Google 广告；禁止误导性表述与侵犯知识产权的内容。访问/复核：2026-07-22 编辑日。
- [Replicated content](https://support.google.com/publisherpolicies/answer/11190248?hl=en)：复制或改写他人内容而没有额外评论、整理或增值，不适合投放 Google 广告。访问/复核：2026-07-22 编辑日。
- [Screens without publisher content](https://support.google.com/publisherpolicies/answer/11112688?hl=en)：建设中或低价值页面不应投放 Google 广告。访问/复核：2026-07-22 编辑日。
- [Intellectual property abuse](https://support.google.com/publisherpolicies/answer/10402772?hl=en)：版权与仿冒风险受 Publisher Policies 约束。访问/复核：2026-07-22 编辑日。

## 3. 修改文件

- `src/components/OpenPrinterStatus.astro`
- `src/data/openprinter.json`
- `src/data/printers.json`
- `src/layouts/SiteLayout.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/guides/linux-compatible-printers.astro`
- `src/pages/guides/no-subscription-printers.astro`
- `src/pages/index.astro`
- `src/pages/openprinter/alternatives.astro`
- `src/pages/openprinter/index.astro`
- `src/pages/privacy.astro`
- `src/pages/sitemap.xml.ts`
- `src/styles/global.css`

新增：

- `src/components/PrinterGuide.astro`
- `public/images/printer-workflow.svg`
- `reports/2026-07-22-nolockinprinter-image-license-audit.md`
- `reports/2026-07-22-nolockinprinter-local-remediation-review.md`

## 4. 删除文件

- `src/components/PrinterTable.astro`
- `public/images/hero-printer.png`
- `public/images/hero-printer-960.avif`
- `public/images/hero-printer-1754.avif`
- `public/images/hero-printer-960.webp`
- `public/images/hero-printer-1754.webp`
- `public/images/og-printer.jpg`

删除的位图仍可从 Git 历史恢复，但不再是当前构建输入。

## 5. 四款打印机逐项变化

### Brother MFC-J4335DW

- 从模糊的 `Low` lock-in 分数改为 10 个字段级事实与 6 项证据判断。
- 区分普通 LC406 零售耗材与 Refresh 订阅耗材。
- 明确取消 Refresh 后订阅耗材可能停用，需要换回非 Refresh 耗材。
- 增加独立优点、限制、适合/不适合人群、no-lock-in 关系和未实测边界。

官方来源：

- [Brother MFC-J4335DW 产品与规格](https://www.brother-usa.com/p/inkjet-printers/MFCJ4335DW)
- [Brother LC406 标准容量耗材](https://www.brother-usa.com/p/ink-toner/LC4064PKS)
- [Brother Refresh EZ Print](https://www.brother-usa.com/ink-toner/learn-more/refresh-ez-print-subscription)

### Epson EcoTank ET-2850

- 删除未经证实的 Linux 推荐。
- 明确标准 ET-2850 与订阅专用 ET-2850U 不是同一购买路径。
- 增加 refill tanks、USB/Wi-Fi Direct、双面、纸张容量、系统支持与购买日期相关保修文件边界。
- 不声称第三方墨水兼容、账户完全不需要或长期可靠性。

官方来源：

- [Epson ET-2850 支持页](https://epson.com/Support/Printers/All-In-Ones/ET-Series/Epson-ET-2850/s/SPT_C11CJ63202)
- [Epson ET-2850 User's Guide](https://files.support.epson.com/docid/cpd6/cpd60206.pdf)
- [Epson ET-2850 Start Here](https://files.support.epson.com/docid/cpd6/cpd60021.pdf)
- [Epson 网络接口规格](https://files.support.epson.com/docid/cpd6/cpd60206/source/specifications/references/et2850_l4260/spex_network_interface_et2850_l4260.html)
- [Epson ReadyPrint U-series 说明](https://readyprint.epson.com/)

### Canon MegaTank PIXMA G3270

- 增加 11 个字段级事实，包括 simplex、11/6 ipm、USB、双频 Wi-Fi、Wireless Direct、GI-21 和保修。
- 明确 ARS-capable 不等于已证明账户完全独立。
- 明确无自动双面、无 ADF、无官方 Linux 证据。
- 不声称第三方墨水或未来固件行为。

官方来源：

- [Canon G3270 支持与技术规格](https://www.usa.canon.com/support/p/pixma-g3270)
- [Canon Automatic Replenishment Service](https://www.usa.canon.com/ink-paper-toner/printer-ink-subscription-plans/ink-and-toner-cartridge-automatic-replenishment-service)

### Brother HL-L2460DW

- 增加 11 个字段级事实，包括 36 ppm、自动双面、Ethernet/USB/双频 Wi-Fi、IPP/IPPS、LPR/LPD、Linux、TN830/DR830 与保修。
- 将其设为 Linux 指南唯一达到“厂商明确列出 Linux”证据门槛的型号。
- 明确黑白/打印-only 限制，以及第三方 toner 和固件行为未知。

官方来源：

- [Brother HL-L2460DW 产品与规格](https://www.brother-usa.com/p/laser-printers/HLL2460DW)
- [Brother HL-L2460DW 官方 brochure](https://www.brother-usa.com/-/media/brother/product-catalog-media/documents/2023/12/14/21/53/hl-l2460dw_brochure.pdf)
- [Brother Refresh EZ Print](https://www.brother-usa.com/ink-toner/learn-more/refresh-ez-print-subscription)

## 6. 评分方法

旧 `Low/Medium` lock-in 分数已删除，因为无法从一致规则重建。当前不计算总分，也不制造小数精度。

每款产品统一检查：

1. 订阅是否可选；
2. 非订阅状态下的基本功能；
3. 耗材选择透明度；
4. 本地连接能力；
5. 长期支持资料；
6. 官方文档完整度。

每项只显示：

- `Documented`：官方资料直接支持；
- `Mixed`：有可用路径，但重要边界仍未被官方资料明确；
- `Not documented`：没有找到足够官方依据。

无证据字段不进入结论，六项不相加、不排序。

## 7. 原创价值与 5 个内容页

- 首页：删除开发路线话术与假表单，改为四款产品的独立 ownership tradeoff 入口。
- no-subscription guide：新增订阅/账户风险解释、USB/本地网络/移动 app/云打印区别、统一证据方法和可复用购买前 checklist；四款完整字段级审查只在此页发布。
- Linux guide：只保留 Brother HL-L2460DW 为厂商明确列出 Linux 的推荐，并解释另外三款为何未达到同一证据门槛。
- OpenPrinter tracker：公开 Crowd Supply 与 Open Tools 来源、精确核验日与 developer-claims 数据边界；不把未发货项目写成成熟产品。
- OpenPrinter alternatives：改为按 refillable color、duplex、dual-band Wi-Fi、office functions、Linux/local protocols 的决策框架，不再复用主购买指南表格。

OpenPrinter 项目来源：

- [Crowd Supply Open Printer](https://www.crowdsupply.com/open-tools/open-printer)
- [Open Tools / OpenPrinter](https://www.opentools.studio/)

## 8. Newsletter 处理

- 仓库没有真实提交端点或后端。
- 首页订阅 `<form>`、输入框、按钮与相关 CSS 已删除。
- Privacy 改为明确当前没有 email signup form。
- 当前 11 个 sitemap 页面表单数量为 0；不存在虚假成功提示或无处理按钮。

## 9. Contact 状态

- Contact URL：`https://nolockinprinter.com/contact/`
- 目标邮箱：`hello@nolockinprinter.com`
- 推荐测试主题：`NoLockInPrinter contact routing test — 2026-07-22`
- `CONTACT_EMAIL_RECEIVE_TEST: NOT_TESTED`
- `CONTACT_EMAIL_REPLY_TEST: NOT_TESTED`
- 页面已删除“邮箱可能尚未配置”和 Cloudflare 备用联系的内部说明，也没有声称收发测试通过。

## 10. Hero 图片处理

- 旧 Hero 源图及其衍生文件没有作者、最初来源、许可或商业使用证据，全部删除。
- 新 Hero 为项目内编写的无品牌 SVG 几何示意图：`public/images/printer-workflow.svg`。
- Hero、OG 与 Twitter metadata 已切换；无 JSON-LD 或 preload 遗留引用。
- 完整证据见 `reports/2026-07-22-nolockinprinter-image-license-audit.md`。

## 11. 测试与 build

- 项目自有单元测试：未配置；仓库没有测试文件或 test script。
- lint：未配置 lint script；未伪造 lint 通过。
- typecheck：`astro check` 通过，21 files，0 errors / 0 warnings / 0 hints。
- production build：`astro build` 通过，12 routes built。
- `git diff --check`：通过。
- sitemap：11/11 URL，本地 HTTP 200。
- canonical：11/11 与 `https://nolockinprinter.com` 对应 URL 一致。
- 内部链接：12 个唯一目标，0 broken。
- robots.txt：HTTP 200，允许抓取并指向正式 sitemap。
- 404：随机未知 URL 在 Astro preview 返回 HTTP 404；`dist/404.html` 含 `noindex, follow` 且无 canonical。Astro preview 不模拟 Cloudflare Pages 的静态 404 fallback，因此本轮不声称未知 URL 已呈现自定义 404 UI。
- `/ads.txt`：本地 HTTP 404，未创建占位。
- 1440×900：全部 11 个 sitemap 页面无断图、无页面级横向溢出、无空 CTA、无表单；Hero 文案在首屏可见。
- 390×844：全部 11 个 sitemap 页面无断图、无页面级横向溢出、无空 CTA、无表单；四个 860px 规格表均在约 295px 容器内横向滚动。
- 浏览器 console：关键页面 error/warning 0。
- PageSpeed / Lighthouse / CrUX：本轮未运行，因此没有结果。

建设中词扫描（排除依赖目录、构建产物、Git 历史和本报告）：`MVP`、`local preview`、`candidate`、`validate`、`validation pending`、`placeholder`、`coming soon`、`test data`、`sample data`、`TODO` 均为 0。`draft` 仅命中 `package-lock.json` 的依赖名 `ajv-draft-04`；`preview` 仅命中合法的 `npm run preview` 脚本；`TBD` 仅命中 lockfile integrity 哈希，均非访客内容。

站点源代码未发现 AdSense 脚本、`ca-pub-*`、`adsbygoogle`、DoubleClick、广告单元、Publisher ID 或 ads.txt 占位。

## 12. 修改前后 HEAD

- 修改前 HEAD：`2dbe517a9388a5b51dfba49b62352b1bcba8d7c4`
- 修改后 HEAD：`2dbe517a9388a5b51dfba49b62352b1bcba8d7c4`
- HEAD 未变化，因为本轮没有 commit。
- 开始时分支：`main`
- 开始时相对 `origin/main`：0 ahead / 0 behind

## 13. 工作区状态

工作区为 intentionally dirty：包含本报告列出的修改、删除和新增文件。没有 stash、reset、checkout 或回滚用户改动。开始时工作区 clean，因此当前差异均来自本轮整改。

## 14. 外部操作确认

- commit：未执行
- push：未执行
- deploy：未执行
- Cloudflare 后台或配置：未操作
- AdSense 后台或提交：未操作
- AdSense code / Publisher ID / ad unit：未添加
- ads.txt：未创建

## 15. 发布后人工步骤

1. 向 `hello@nolockinprinter.com` 发送推荐主题邮件，记录 `CONTACT_EMAIL_RECEIVE_TEST: PASS|FAIL`。
2. 从负责邮箱回复测试邮件，记录 `CONTACT_EMAIL_REPLY_TEST: PASS|FAIL`。
3. 由站点运营负责人记录 `OPERATOR_CONFIRMED_NOT_SPECIFICALLY_DIRECTED_TO_UNDER_13` 或相反事实；这是运营事实，不是自动法律结论。
4. 在 Cloudflare 只读检查 Security Events、Custom/Managed WAF、Bots、Rate Limiting 与 Access；重点检查 Googlebot、Mediapartners-Google、AdsBot-Google 的 Block/Challenge/429，并记录窗口与限制。
5. 发布后重新核对 11 个 URL、生产 custom 404、canonical、robots、sitemap、SVG/OG 资源、console、移动端 overflow 和 crawler User-Agent。

Hero 不再使用第三方图片，因此不需要为当前 Hero 补第三方权利证据；如果未来替换为第三方素材，必须重新建立来源、作者、许可证、商业使用和署名台账。
