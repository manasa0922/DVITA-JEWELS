import { siteConfig } from '../data/siteConfig.js'
export default function AnnouncementBar() {
  return <div className="announcement" role="note">{siteConfig.announcement}</div>
}
