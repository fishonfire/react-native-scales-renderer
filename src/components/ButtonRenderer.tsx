import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { Theme } from '@react-navigation/native'

interface ButtonRendererProps {
  bg_color_variant?: keyof Theme['colors']
  title?: string
  url?: string
  page_id?: string
  payload?: string
  styles?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
  theme?: Theme
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  bg_color_variant,
  title,
  url,
  page_id,
  payload,
  styles,
  onPress,
  theme,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(page_id, url, payload) : null)}
    >
      <View
        style={[
          _styles.container,
          styles?.container,
          bg_color_variant && theme
            ? {
                backgroundColor: theme.colors[bg_color_variant] ?? 'black',
              }
            : undefined,
        ]}
      >
        {title && (
          <Text style={[_styles.textTitle, styles?.text, styles?.textTitle]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'black',
    marginVertical: 8,
  },
  text: {
    color: 'white',
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
})

export default React.memo(ButtonRenderer)
