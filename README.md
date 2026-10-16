# DVITA JEWELS Storefront

A premium, responsive, frontend-only e-commerce demo for **DVITA JEWELS**, an online fashion and imitation jewellery brand focused on traditional, contemporary and traditional-fusion pieces.

> **Demo notice:** Checkout, the contact form and newsletter signup are *frontend demonstrations*. Nothing is sent to a server, no payments are processed, and all products are sample data.

## Project overview
Built to showcase a complete, polished shopping experience (browse, filter, wishlist, bag, demo checkout) with a clean architecture that is ready for a future backend, payment gateway and admin dashboard.

## Features
- Editorial home page: hero, category cards, bestsellers, new arrivals, brand story, promo banner, newsletter, Instagram-style gallery
- Shop page with working category filter, name search, sorting (popularity, newest, price) and quick view
- Product details with gallery, quantity selector, care info, related products and breadcrumbs
- Shopping bag (drawer and full page) with quantities, remove, subtotal and shipping, saved in `localStorage`
- Wishlist saved in `localStorage`, with add-to-bag
- Demo checkout with validation and a clearly marked sample order reference
- About, Contact (validated demo form), FAQ, Search results, Collections, policy pages, custom 404
- Responsive layouts, mobile menu, reduced-motion support, keyboard focus states, skip link, image fallbacks

## Tech stack
React 18, Vite 5, React Router 6, Lucide React, plain CSS (design tokens), Google Fonts (Cormorant Garamond, Jost). No backend, no database.

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
```
Requires Node.js 18+.

## Editing content (no component changes needed)
| What | File |
|---|---|
| Brand name, contact details, Instagram/WhatsApp links, shipping rules | `src/data/siteConfig.js` |
| Products | `src/data/products.js` |
| Image URLs | `src/data/images.js` (or put your own photos in `src/assets/` and import them) |
| Categories | `src/data/categories.js` |
| FAQ and policy text | `src/data/faqs.js`, `src/data/policies.js` |

## Folder structure
```
src/
  components/   Header, Footer, ProductCard, CartDrawer, QuickView, SmartImage, ...
  pages/        Home, Shop, ProductDetails, ShoppingBag, Wishlist, Checkout, About, ...
  context/      CartContext, WishlistContext
  data/         products, categories, images, siteConfig, faqs, policies, navigation
  services/     productService.js (single access point for product data)
  hooks/        useLocalStorage, useOverlay, useDocumentTitle
  utils/        currency.js, storage.js, validation.js
  styles/       variables.css, global.css, components.css, pages.css
```

## Screenshots
Replace these placeholders after running the site (save images in `docs/screenshots/`):
- Home: `docs/screenshots/home.png`
- Shop: `docs/screenshots/shop.png`
- Product details: `docs/screenshots/product.png`
- Mobile: `docs/screenshots/mobile.png`

## Known limitations
- Sample products and prices only; there is no real inventory, payment, order processing or email.
- Product photos are loaded from Unsplash URLs listed in `src/data/images.js`. Some may not load or may not match the product; swap in your own photos. A branded placeholder appears when an image fails.
- Policy text is placeholder content and has not been legally reviewed.
- `npm audit` reports advisories in Vite's *development server* dependencies (esbuild); they do not affect the built site. Upgrading to a newer Vite major version would resolve them.
- No automated tests yet.

## Future enhancements
FastAPI backend and database for products, customers and orders; admin dashboard; secure authentication; Indian payment gateway; order confirmation and newsletter emails; WhatsApp Business integration; image storage; real inventory and order tracking. Components read product data only through `src/services/productService.js`, so swapping local data for API calls is a small change.

## Suggested commit milestones
1. `chore: scaffold Vite + React project`
2. `feat: design tokens, global styles and layout shell`
3. `feat: home page`
4. `feat: product data, shop page and filters`
5. `feat: product details and quick view`
6. `feat: bag drawer, bag page and wishlist with localStorage`
7. `feat: demo checkout with validation`
8. `feat: about, contact, FAQ, policies and 404`
9. `docs: README and screenshots`
