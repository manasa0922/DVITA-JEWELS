import { siteConfig } from '../data/siteConfig.js'
export default function DemoNotice({ children }) {
  return <div className="demo-banner" role="note"><strong>Demo notice: </strong>{children || siteConfig.demoNotice}</div>
}
