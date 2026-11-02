const directions = {
  architectural: { headline: 'A fresh start.<br>A priceless summer.', description: 'Fall in love with your pool again. Thoughtful restoration, a beautiful finish, and more moments worth diving into.', image: 'assets/pool-architecture.jpg', alt: 'Sunlit swimming pool beside a contemporary home, an inspiration image', color: '#12343d' },
  coastal: { headline: 'Back to your<br>happy place.', description: 'Bare feet. Blue water. Long afternoons. Bring your pool back to life, and make room for more of the good stuff.', image: 'assets/pool-hero.jpg', alt: 'Clear turquoise pool framed by lush greenery, an inspiration image', color: '#edf5f5' },
  specialist: { headline: 'Same pool.<br>Whole new<br>feeling.', description: 'Restore it. Repaint it. Refresh it. Pool restoration and surface care across South East Queensland and Northern NSW.', image: 'assets/pool-water.jpg', alt: 'Blue swimming pool with stone surrounds, an inspiration image', color: '#092c42' }
};
const themeButtons = [...document.querySelectorAll('[data-direction]')];
function setDirection(direction, updateUrl = true) {
  if (!Object.hasOwn(directions, direction)) direction = 'architectural';
  const config = directions[direction];
  document.body.dataset.theme = direction;
  document.querySelector('#hero-title').innerHTML = config.headline;
  document.querySelector('.hero-description').textContent = config.description;
  const image = document.querySelector('#hero-image');
  image.src = config.image;
  image.alt = config.alt;
  document.querySelector('meta[name="theme-color"]').content = config.color;
  themeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === direction)));
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('design', direction);
    history.replaceState(null, '', url);
  }
}
setDirection(new URLSearchParams(location.search).get('design'), false);
themeButtons.forEach(button => button.addEventListener('click', () => setDirection(button.dataset.direction)));
window.addEventListener('popstate', () => setDirection(new URLSearchParams(location.search).get('design'), false));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.querySelector('span').textContent = '+'; }
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service-select').value = link.dataset.service; }));
document.querySelector('#year').textContent = new Date().getFullYear();

const dialogs = [...document.querySelectorAll('dialog')];
dialogs.forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
});
function openDialog(dialog) { dialog.showModal(); document.body.style.overflow = 'hidden'; }
const lightbox = document.querySelector('#lightbox');
const galleryItems = [...document.querySelectorAll('.gallery-item')];
let photoIndex = 0;
function displayPhoto(index) {
  photoIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[photoIndex];
  lightbox.querySelector('img').src = item.dataset.image;
  lightbox.querySelector('img').alt = item.querySelector('img').alt;
  lightbox.querySelector('p').textContent = item.dataset.caption + ' · Pool inspiration';
  document.querySelector('#photo-position').textContent = `${photoIndex + 1} / ${galleryItems.length}`;
}
galleryItems.forEach((item, index) => item.addEventListener('click', () => { displayPhoto(index); openDialog(lightbox); }));
document.querySelector('#prev-photo').addEventListener('click', () => displayPhoto(photoIndex - 1));
document.querySelector('#next-photo').addEventListener('click', () => displayPhoto(photoIndex + 1));
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayPhoto(photoIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); displayPhoto(photoIndex + 1); }
});
document.querySelector('#privacy-button').addEventListener('click', () => openDialog(document.querySelector('#privacy-dialog')));

const fileInput = document.querySelector('#photos');
const previewContainer = document.querySelector('#photo-previews');
const uploadError = document.querySelector('#upload-error');
const dropZone = document.querySelector('#drop-zone');
let selectedPhotos = [];
function renderPreviews() {
  previewContainer.replaceChildren();
  selectedPhotos.forEach((photo, index) => {
    const wrapper = document.createElement('div'); wrapper.className = 'photo-preview';
    const image = document.createElement('img'); image.src = photo.url; image.alt = photo.file.name;
    const button = document.createElement('button'); button.type = 'button'; button.textContent = '×'; button.setAttribute('aria-label', `Remove ${photo.file.name}`);
    button.addEventListener('click', () => {
      URL.revokeObjectURL(photo.url); selectedPhotos.splice(index, 1); uploadError.textContent = ''; renderPreviews();
      const nextButton = previewContainer.querySelectorAll('button')[Math.min(index, selectedPhotos.length - 1)];
      (nextButton || fileInput).focus();
    });
    wrapper.append(image, button); previewContainer.append(wrapper);
  });
}
function addPhotos(files) {
  const errors = [];
  for (const file of files) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { errors.push(`${file.name}: choose a JPG, PNG or WebP photo.`); continue; }
    if (file.size > 10 * 1024 * 1024) { errors.push(`${file.name}: the maximum size is 10 MB.`); continue; }
    if (selectedPhotos.some(photo => photo.file.name === file.name && photo.file.size === file.size && photo.file.lastModified === file.lastModified)) continue;
    if (selectedPhotos.length >= 6) { errors.push('You can add up to 6 photos. Remove a photo to add another.'); break; }
    selectedPhotos.push({ file, url: URL.createObjectURL(file) });
  }
  uploadError.textContent = errors.join(' ');
  fileInput.value = '';
  renderPreviews();
}
fileInput.addEventListener('change', () => addPhotos([...fileInput.files]));
['dragenter', 'dragover'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.add('drag-over'); }));
['dragleave', 'drop'].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove('drag-over'); }));
dropZone.addEventListener('drop', event => addPhotos([...event.dataTransfer.files]));

const form = document.querySelector('#enquiry-form');
const enquiryDialog = document.querySelector('#enquiry-dialog');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  for (const name of ['name', 'phone', 'location']) {
    const field = form.elements.namedItem(name);
    field.setCustomValidity(field.value.trim() ? '' : 'Please fill in this field.');
    if (!field.reportValidity()) return;
  }
  if (!selectedPhotos.length) {
    uploadError.textContent = 'Add at least one photo so we can see your pool.';
    fileInput.focus(); return;
  }
  uploadError.textContent = '';
  const values = new FormData(form);
  const summary = document.querySelector('#enquiry-summary'); summary.replaceChildren();
  const entries = [['Name', values.get('name')], ['Phone', values.get('phone')], ['Email', values.get('email')], ['Location', values.get('location')], ['Service', values.get('service')], ['Photos', `${selectedPhotos.length} selected, stored only in this tab`]];
  if (values.get('message')?.trim()) entries.push(['Notes', values.get('message')]);
  for (const [label, value] of entries) { const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; summary.append(dt, dd); }
  openDialog(enquiryDialog);
});
form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });
document.querySelector('.close-preview').addEventListener('click', () => enquiryDialog.close());
