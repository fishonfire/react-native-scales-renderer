import React from 'react'
import { StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface MarkdownRendererProps {
  content: string
  styles?: StyleSheet.NamedStyles<any>
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  styles,
}) => {
  return <Markdown style={styles}>{content}</Markdown>
}

export default React.memo(MarkdownRenderer)
