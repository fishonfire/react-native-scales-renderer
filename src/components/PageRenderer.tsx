import React from 'react'
import { View } from 'react-native'
import MarkdownRenderer from './MarkdownRenderer'
import ImageRenderer from './ImageRenderer'
import HeaderRenderer from './HeaderRenderer'
import {
  Block,
  Callbacks,
  ComponentPropsMap,
  CustomComponents,
  Page,
  Styles,
} from '../types/ScalesCMS'
import ButtonRenderer from './ButtonRenderer'

interface RendererProps {
  page: Page
  customComponents?: CustomComponents
  styles?: Styles
  callbacks?: Callbacks
}

// Type guard functions
function isHeaderBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['header'] } {
  return block.component_type === 'header'
}

function isMarkdownBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['md'] } {
  return block.component_type === 'md'
}

function isImageBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['image'] } {
  return block.component_type === 'image'
}

function isButtonBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['button'] } {
  return block.component_type === 'button'
}

const PageRenderer: React.FC<RendererProps> = ({
  page,
  customComponents,
  styles,
  callbacks,
}) => {
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
            <HeaderRenderer
              key={block.id}
              content={block.properties.content}
              styles={styles?.header}
            />
          )
        }

        if (isMarkdownBlock(block)) {
          return (
            <MarkdownRenderer
              key={block.id}
              content={block.properties.content}
              styles={styles?.markdown}
            />
          )
        }

        if (isImageBlock(block)) {
          return (
            <ImageRenderer
              key={block.id}
              image_url={block.properties.image_url}
              image_path={block.properties.image_path}
              styles={styles?.image}
            />
          )
        }

        if (isButtonBlock(block)) {
          return (
            <ButtonRenderer
              key={block.id}
              page_id={block.properties.page_id}
              icon={block.properties.icon}
              tagline={block.properties.title}
              text={block.properties.subtitle}
              payload={block.properties.payload}
              styles={styles?.button}
              onPress={callbacks?.button}
            />
          )
        }
      })}
    </View>
  )
}

export default React.memo(PageRenderer)
