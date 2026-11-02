import { mkdir, copyFile, cp } from 'node:fs/promises';

// Only website files belong in the published Pages artifact.
await mkdir('_site', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) {
  await copyFile(file, `_site/${file}`);
}
await cp('assets', '_site/assets', { recursive: true });
console.log('Static website prepared in _site/');
