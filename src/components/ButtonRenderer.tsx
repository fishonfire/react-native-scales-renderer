import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from './Icon'
import type { Theme } from '@react-navigation/native'

interface ButtonRendererProps {
  bg_color_variant?: keyof Theme['colors']
  icon?: string
  text?: string
  tagline?: string
  url?: string
  page_id?: string
  payload?: string
  styles?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
  theme?: Theme
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  bg_color_variant,
  icon,
  text,
  tagline,
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
        <View style={[_styles.iconContainer, styles?.iconContainer]}>
          {icon && (
            <Icon
              name={icon}
              size={16}
              color={theme?.colors.background ?? 'white'}
            />
          )}
          {tagline && (
            <Text style={[_styles.textTitle, styles?.text, styles?.textTitle]}>
              {tagline}
            </Text>
          )}
          <Icon
            name="arrow-right"
            size={24}
            color={theme?.colors.background ?? 'white'}
            style={_styles.arrow}
          />
        </View>

        {text && (
          <Text
            style={[_styles.textSubtitle, styles?.text, styles?.textSubtitle]}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,
    gap: 4,
    width: '100%',
    backgroundColor: 'black',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: 'white',
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
  },
  textSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  arrow: {
    position: 'absolute',
    right: 0,
  },
})

export default React.memo(ButtonRenderer)
