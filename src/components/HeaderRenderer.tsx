import React from 'react'
import { StyleSheet } from 'react-native'
import type { Theme } from '@react-navigation/native'

interface HeaderRendererProps {
  content?: string
  styles?: StyleSheet.NamedStyles<any>
  theme?: Theme
}

const HeaderRenderer: React.FC<HeaderRendererProps> = ({
  content,
  styles,
  theme,
}) => {
  return <></>
}

export default React.memo(HeaderRenderer)
