const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const browser = candidates.find(c => fs.existsSync(c));

if (!browser) {
    console.error('No Chrome or Edge browser found on system.');
    process.exit(1);
}

const inputHtml = path.resolve(__dirname, '../public/resume-print.html');
const outputPdf = path.resolve(__dirname, '../public/Kowshik-Valipireddy-Resume.pdf');
const rootPdf = path.resolve(__dirname, '../../Kowshik-Valipireddy-Resume.pdf');

const inputUri = 'file:///' + inputHtml.replace(/\\/g, '/');

console.log(`Using browser: ${browser}`);
console.log(`Input URI: ${inputUri}`);
console.log(`Output PDF: ${outputPdf}`);

const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outputPdf}`,
    inputUri
];

const result = spawnSync(browser, args, { stdio: 'inherit' });

if (fs.existsSync(outputPdf)) {
    const stats = fs.statSync(outputPdf);
    console.log(`Success! Generated PDF at ${outputPdf} (${stats.size} bytes)`);
    fs.copyFileSync(outputPdf, rootPdf);
    console.log(`Copied updated PDF to root: ${rootPdf}`);
} else {
    console.error('PDF generation failed.');
    process.exit(1);
}
