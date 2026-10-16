import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import NotFound from './NotFound.jsx'
import { policies } from '../data/policies.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Policies({ type }) {
  const policy = policies[type]
  useDocumentTitle(policy?.title)
  if (!policy) return <NotFound />
  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: policy.title }]} />
      <div className="page-title"><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>{policy.title}</h1></div>
      <div className="prose">
        <DemoNotice>Placeholder text only. This policy has not been legally reviewed. Replace it with your real terms before launching.</DemoNotice>
        {policy.sections.map((s) => (
          <section key={s.h}><h2>{s.h}</h2><p>{s.p}</p></section>
        ))}
      </div>
    </div>
  )
}
