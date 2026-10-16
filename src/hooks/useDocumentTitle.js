import { useEffect } from 'react'
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | DVITA JEWELS` : 'DVITA JEWELS | Fashion & Imitation Jewellery'
  }, [title])
}
