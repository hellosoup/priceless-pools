import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Only website files belong in the published Pages artifact.
await mkdir('_site', { recursive: true });
let html = await readFile('index.html', 'utf8');
for (const file of ['styles.css', 'app.js']) {
  const content = await readFile(file);
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const versionedFile = file.replace(/\.(css|js)$/, `.${hash}.$1`);
  await writeFile(`_site/${versionedFile}`, content);
  html = html.replace(`"${file}"`, `"${versionedFile}"`);
}
await writeFile('_site/index.html', html);
await cp('assets', '_site/assets', { recursive: true });
console.log('Static website prepared in _site/');
