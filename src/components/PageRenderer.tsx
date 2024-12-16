import React from 'react'
import { View } from 'react-native'
import MarkdownRenderer from './MarkdownRenderer'
import ImageRenderer from './ImageRenderer'
import HeaderRenderer from './HeaderRenderer'
import {
  CustomComponents,
  Page,
  Block,
  CustomComponentProps,
} from '../types/ScalesCMS'

interface RendererProps {
  page: Page
  customComponents?: CustomComponents
}

// Type guard functions
function isHeaderBlock(
  block: Block
): block is Block & { properties: { content: string } } {
  return block.component_type === 'header'
}

function isMarkdownBlock(
  block: Block
): block is Block & { properties: { content: string } } {
  return block.component_type === 'md'
}

function isImageBlock(
  block: Block
): block is Block & { properties: { image_url: string; image_path: string } } {
  return block.component_type === 'image'
}

const PageRenderer: React.FC<RendererProps> = ({ page, customComponents }) => {
  return (
    <View>
      {page.blocks.map(block => {
        // Handle custom components
        if (customComponents && customComponents[block.component_type]) {
          const CustomComponent = customComponents[block.component_type]
          const properties = block.properties as Record<string, any>
          // @ts-ignore
          return <CustomComponent key={block.id} {...properties} />
        }

        // Handle built-in components using type guards
        if (isHeaderBlock(block)) {
          return (
            <HeaderRenderer key={block.id} content={block.properties.content} />
          )
        }

        if (isMarkdownBlock(block)) {
          return (
            <MarkdownRenderer
              key={block.id}
              content={block.properties.content}
            />
          )
        }

        if (isImageBlock(block)) {
          return (
            <ImageRenderer
              key={block.id}
              imageUrl={block.properties.image_url}
              imagePath={block.properties.image_path}
            />
          )
        }
      })}
    </View>
  )
}

export default React.memo(PageRenderer)
