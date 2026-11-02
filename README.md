# Priceless Pools

Three complete, responsive website directions in a dependency-free static site.

## Live review site

https://hellosoup.github.io/priceless-pools/

- [Architectural luxury](https://hellosoup.github.io/priceless-pools/?design=architectural)
- [Coastal boutique](https://hellosoup.github.io/priceless-pools/?design=coastal)
- [Bold specialist](https://hellosoup.github.io/priceless-pools/?design=specialist)

This is a review demo with placeholder contact details, labelled stock imagery and a local enquiry preview. It does not send enquiries.

## Deployment

The GitHub Pages workflow runs on pushes to `master` and can also be run manually. It checks the JavaScript, runs `npm run build`, and publishes only `_site/`. The build copies the HTML, CSS, JavaScript and image assets. Local previews, documentation and the development server are not included in the website artifact.

## Preview

Run `npm start` and open http://127.0.0.1:4173.

- Architectural: http://127.0.0.1:4173/?design=architectural
- Coastal: http://127.0.0.1:4173/?design=coastal
- Specialist: http://127.0.0.1:4173/?design=specialist

The comparison bar switches complete visual directions while preserving the enquiry form. Each direction has its own typography, hero layout, image, palette, gallery arrangement and contact treatment. Run `npm run check` for JavaScript syntax checks.

## Included

- Responsive navigation, services and service selection shortcuts.
- Gallery with modal viewing, previous/next controls and keyboard support.
- Photo enquiry form with required field validation, drag-and-drop, local photo previews, removal, duplicate detection, file type validation, six-photo limit and 10 MB limit per photo.
- Honest demo submission: an enquiry summary opens locally. Nothing is sent, uploaded or persisted.
- Social links, contact placeholders, skip link, focus styling, reduced-motion support and privacy information.

## Before launch

1. Replace the phone and email placeholders in `index.html` with real contact links.
2. Replace stock inspiration images with approved project photography and update captions and alt text. Current photos are stored locally from Unsplash image IDs: `photo-1564013799919-ab600027ffc6`, `photo-1576013551627-0cc20b96c2a7`, `photo-1572331165267-854da2b10ccc`, `photo-1509600110300-21b9d5fedeb7`. No stock photo is presented as completed client work.
3. Connect the form to an agreed endpoint with server-side validation, upload limits, abuse prevention and appropriate storage. Configure the recipient privately on the server. Change preview wording only when enquiries are delivered successfully.
4. Add the business privacy policy, confirmed business name and any required business details.
5. Choose one direction and remove the concept comparison bar for production.

Display fonts are loaded from Google Fonts with local fallback stacks. All photography, CSS and JavaScript are local. The Node server is a local preview server and binds only to `127.0.0.1`.
