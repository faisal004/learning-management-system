'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'

interface PreviewProps {
//   onChange: (value: string) => void
  value: string
}
//this prevent this component from not being rendered on server side
export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )

  return <ReactQuill theme="bubble" value={value} readOnly />
}
