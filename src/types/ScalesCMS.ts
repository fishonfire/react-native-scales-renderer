import React from 'react'

export interface Config {
  apiBaseURL: string
  apiVersion: string
  apiKey: string
}

export type ComponentType = 'header' | 'md' | 'image'

export interface Block {
  id: number
  component_type: ComponentType
  properties: Record<string, any>
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

export type CustomComponentProps =
  | { content: string }
  | { image_path: string }
  | { image_url: string }
  | Record<string, any>

export interface CustomComponents {
  [key: string]: React.ComponentType<CustomComponentProps>
}
