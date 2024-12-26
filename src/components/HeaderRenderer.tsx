import React from 'react'
import { StyleSheet } from 'react-native'

interface HeaderRendererProps {
  content?: string
  styles?: StyleSheet.NamedStyles<any>
}

const HeaderRenderer: React.FC<HeaderRendererProps> = ({ content }) => {
  return <></>
}

export default React.memo(HeaderRenderer)
