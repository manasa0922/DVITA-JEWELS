// All image URLs live here. Replace any of them with your own photos
// (for example files in src/assets/products/) without touching components.
// These are sample Unsplash photo IDs; if one fails to load, the UI shows a branded placeholder.
const u = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  hero: u('photo-1515562141207-7a88fb7ce338', 1600),
  story: u('photo-1535632066927-ab7c9ab60908', 1000),
  promo: u('photo-1611652022419-a9419f74343d', 1600),
  earrings: u('photo-1535632066927-ab7c9ab60908'),
  jhumkas: u('photo-1630019852942-f89202989a59'),
  necklaces: u('photo-1599643478518-a784e5dc4c8f'),
  bangles: u('photo-1611591437281-460bfbe1220a'),
  rings: u('photo-1605100804763-247f67b3557e'),
  sets: u('photo-1601121141461-9d6647bca1ed'),
  gallery: [
    u('photo-1515562141207-7a88fb7ce338', 700),
    u('photo-1573408301185-9146fe634ad0', 700),
    u('photo-1602173574767-37ac01994b2a', 700),
    u('photo-1617038220319-276d3cfab638', 700),
    u('photo-1588444837495-c6cfeb53f32d', 700),
    u('photo-1603561591411-07134e71a2a9', 700),
  ],
  product: {
    p1: u('photo-1535632066927-ab7c9ab60908'),
    p2: u('photo-1630019852942-f89202989a59'),
    p3: u('photo-1599643478518-a784e5dc4c8f'),
    p4: u('photo-1611591437281-460bfbe1220a'),
    p5: u('photo-1605100804763-247f67b3557e'),
    p6: u('photo-1601121141461-9d6647bca1ed'),
    p7: u('photo-1602173574767-37ac01994b2a'),
    p8: u('photo-1573408301185-9146fe634ad0'),
    p9: u('photo-1617038220319-276d3cfab638'),
    p10: u('photo-1588444837495-c6cfeb53f32d'),
    p11: u('photo-1603561591411-07134e71a2a9'),
    p12: u('photo-1611652022419-a9419f74343d'),
  },
}
