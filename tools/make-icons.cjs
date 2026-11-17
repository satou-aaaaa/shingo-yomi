// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、縦の信号機（上から赤・黄・青。色だけでなく形も変える）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="32" y="10" width="36" height="80" rx="10" fill="#0b1f33" stroke="#fffdf7" stroke-opacity=".4" stroke-width="2"/>
      <circle cx="50" cy="28" r="10" fill="#e5533d"/><circle cx="50" cy="50" r="10" fill="#f6d77a"/><circle cx="50" cy="72" r="10" fill="#3fb37f"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
