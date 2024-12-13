import React from 'react'
import { StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface MarkdownRendererProps {
  content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return <Markdown style={styles.markdown}>{content}</Markdown>
}

const styles = StyleSheet.create({
  markdown: {
    // Define your styles here
  },
})

export default React.memo(MarkdownRenderer)
