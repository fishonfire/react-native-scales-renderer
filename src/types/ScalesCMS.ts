export interface Block {
  id: number
  component_type: string
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
