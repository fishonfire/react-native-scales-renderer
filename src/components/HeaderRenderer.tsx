import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { Theme } from '@react-navigation/native'

interface HeaderRendererProps {
  title?: string
  subtitle?: string
  styles?: StyleSheet.NamedStyles<any>
  theme?: Theme
}

const HeaderRenderer: React.FC<HeaderRendererProps> = ({
  title,
  subtitle,
  styles,
  theme,
}) => {
  return (
    <View style={[_styles.container, styles?.container]}>
      <Text style={[_styles.title, styles?.title]}>{title}</Text>
      <Text style={[_styles.subtitle, styles?.subtitle]}>{subtitle}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
})

export default React.memo(HeaderRenderer)
