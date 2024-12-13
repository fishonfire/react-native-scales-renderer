import React from 'react'

interface HeaderRendererProps {
  content: string
}

const HeaderRenderer: React.FC<HeaderRendererProps> = ({ content }) => {
  return <></>
}

export default React.memo(HeaderRenderer)
