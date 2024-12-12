import React from 'react'
import { View } from 'react-native'
import MarkdownRenderer from './MarkdownRenderer'
import ImageRenderer from './ImageRenderer'
import { Page } from '../types/ScalesCMS'
import HeaderRenderer from './HeaderRenderer'

interface RendererProps {
  page: Page
}

const PageRenderer: React.FC<RendererProps> = ({ page }) => {
  return (
    <View>
      {page.blocks.map(block => {
        switch (block.component_type) {
          case 'header':
            return <HeaderRenderer key={block.id} />
          case 'md':
            return (
              <MarkdownRenderer
                key={block.id}
                content={block.properties.content}
              />
            )
          case 'image':
            return (
              <ImageRenderer
                key={block.id}
                imageUrl={block.properties.image_url}
              />
            )
          default:
            return null
        }
      })}
    </View>
  )
}

export default PageRenderer
