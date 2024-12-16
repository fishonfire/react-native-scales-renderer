import React from 'react'

export interface Config {
  apiBaseURL: string
  apiVersion: string
  apiKey: string
}

export type ComponentType = 'header' | 'md' | 'image'

export interface CustomComponentPropsMap {
  header: { content?: string }
  md: { content?: string }
  image: { image_url?: string; image_path?: string }
  [key: string]: Record<string, any>
}

export type CustomComponentProps<T extends ComponentType> =
  CustomComponentPropsMap[T]

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
