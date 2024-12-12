import React from 'react'
import { View } from 'react-native'
import MarkdownRenderer from './MarkdownRenderer'
import ImageRenderer from './ImageRenderer'
import { Block } from '../types/ScalesCMS'

interface RendererProps {
  blocks: Block[]
}

const Renderer: React.FC<RendererProps> = ({ blocks }) => {
  return (
    <View>
      {blocks.map(block => {
        switch (block.component_type) {
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
          // Add more cases for other component types
          default:
            return null
        }
      })}
    </View>
  )
}

export default Renderer
