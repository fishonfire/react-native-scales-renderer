import React from 'react'
import { StyleSheet } from 'react-native'
import { type StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { type ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { Theme } from '@react-navigation/native'

export interface Config {
  apiBaseURL: string
  apiVersion: string
  apiKey: string
}

export type ComponentType =
  | 'header'
  | 'md'
  | 'image'
  | 'button'
  | 'image_button'

export interface ComponentPropsMap {
  header: { content?: string }
  md: { content?: string }
  image: { image_url?: string; image_path?: string }
  button: {
    bg_color_variant?: keyof Theme['colors']
    icon?: string
    page_id?: string
    payload?: string
    subtitle?: string
    title?: string
    url?: string
  }
  image_button: {
    icon?: string
    image_path?: string
    image_url?: string
    page_id?: string
    payload?: string
    subtitle?: string
    title?: string
    url?: string
  }
  [key: string]: Record<string, any>
}

export type CustomComponentProps<T extends ComponentType> = ComponentPropsMap[T]

export type CustomComponents = Partial<{
  [K in ComponentType]: React.ComponentType<CustomComponentProps<K>>
}> & {
  [key: string]: React.ComponentType<Record<string, any>> // Allow unknown custom components
}

export interface Block {
  id: number
  component_type: ComponentType
  properties: CustomComponentProps<ComponentType>
}

export interface Page {
  id: number
  blocks: Block[]
  title: string
  locale: string
  api_version: string
  slug: string
  directory_id: number | null
}

export interface Pagination {
  total_pages: number
  total_count: number
  current_page: number
}

export interface ScalesCMSResponse {
  pages: Page[]
  api_version: string
  pagination: Pagination
}

export interface Styles {
  markdown?: StyleSheet.NamedStyles<any>
  image?: StyleProp<ImageStyle>
  header?: StyleSheet.NamedStyles<any>
  button?: StyleSheet.NamedStyles<any>
  image_button?: StyleSheet.NamedStyles<any>
}

export interface Callbacks {
  button?: (page_id?: string, url?: string, payload?: string) => void
  image_button?: (page_id?: string, url?: string, payload?: string) => void
}
