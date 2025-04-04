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
import ImageButtonRenderer from './ImageButtonRenderer'
import { Theme } from '@react-navigation/native'
import CTAButtonRenderer from './CTAButtonRenderer'
import ButtonCollectionRenderer from './ButtonCollectionRenderer'
import ImageButtonCollectionRenderer from './ImageButtonCollectionRenderer'
import VideoRenderer from './VideoRenderer'
import LottieRenderer from './LottieRenderer'

interface RendererProps {
  page: Page
  customComponents?: CustomComponents
  styles?: Styles
  callbacks?: Callbacks
  theme?: Theme
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

function isButtonCollectionBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['button_collection'] } {
  return block.component_type === 'button_collection'
}

function isImageButtonCollectionBlock(block: Block): block is Block & {
  properties: ComponentPropsMap['image_button_collection']
} {
  return block.component_type === 'image_button_collection'
}

function isButtonBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['button'] } {
  return block.component_type === 'button'
}

function isCTAButtonBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['cta_button'] } {
  return block.component_type === 'cta_button'
}

function isImageButtonBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['image_button'] } {
  return block.component_type === 'image_button'
}

function isVideoBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['video'] } {
  return block.component_type === 'video'
}

function isLottieBlock(
  block: Block
): block is Block & { properties: ComponentPropsMap['lottie'] } {
  return block.component_type === 'lottie'
}

const PageRenderer: React.FC<RendererProps> = ({
  page,
  customComponents,
  styles,
  callbacks,
  theme,
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
              title={block.properties.title}
              subtitle={block.properties.subtitle}
              styles={styles?.header}
              theme={theme}
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

        if (isButtonCollectionBlock(block)) {
          return (
            <ButtonCollectionRenderer
              key={block.id}
              buttons={block.properties.buttons}
              stylesButtons={styles?.button}
              styles={styles?.button_collection}
              onPress={callbacks?.button}
              theme={theme}
            />
          )
        }

        if (isImageButtonCollectionBlock(block)) {
          return (
            <ImageButtonCollectionRenderer
              key={block.id}
              buttons={block.properties.buttons}
              styles={styles?.image_button_collection}
              stylesButtons={styles?.image_button_collection_item}
              onPress={callbacks?.image_button}
              theme={theme}
            />
          )
        }

        if (isButtonBlock(block)) {
          return (
            <ButtonRenderer
              key={block.id}
              bg_color_variant={block.properties.bg_color_variant}
              page_id={block.properties.page_id}
              title={block.properties.title}
              payload={block.properties.payload}
              styles={styles?.button}
              onPress={callbacks?.button}
              theme={theme}
            />
          )
        }

        if (isCTAButtonBlock(block)) {
          return (
            <CTAButtonRenderer
              key={block.id}
              bg_color_variant={block.properties.bg_color_variant}
              page_id={block.properties.page_id}
              icon={block.properties.icon}
              tagline={block.properties.title}
              text={block.properties.subtitle}
              payload={block.properties.payload}
              styles={styles?.cta_button}
              onPress={callbacks?.button}
              theme={theme}
            />
          )
        }

        if (isImageButtonBlock(block)) {
          return (
            <ImageButtonRenderer
              key={block.id}
              page_id={block.properties.page_id}
              icon={block.properties.icon}
              image_path={block.properties.image_path}
              image_url={block.properties.image_url}
              title={block.properties.title}
              subtitle={block.properties.subtitle}
              payload={block.properties.payload}
              styles={styles?.image_button}
              onPress={callbacks?.image_button}
              theme={theme}
            />
          )
        }

        if (isVideoBlock(block)) {
          return (
            <VideoRenderer
              key={block.id}
              video_url={block.properties.video_url}
              title={block.properties.title}
              subtitle={block.properties.subtitle}
              autoplay={block.properties.autoplay}
              controls={block.properties.controls}
              fullscreen={block.properties.fullscreen}
              looping={block.properties.looping}
              mute={block.properties.mute}
              styles={styles?.video}
              theme={theme}
            />
          )
        }

        if (isLottieBlock(block)) {
          return (
            <LottieRenderer
              key={block.id}
              lottie_url={block.properties.lottie_url}
              title={block.properties.title}
              subtitle={block.properties.subtitle}
              autoplay={block.properties.autoplay}
              looping={block.properties.looping}
              styles={styles?.lottie}
              theme={theme}
            />
          )
        }
      })}
    </View>
  )
}

export default React.memo(PageRenderer)
