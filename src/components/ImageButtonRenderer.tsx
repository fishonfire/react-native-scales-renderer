import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from './Icon'
import { type Theme } from '@react-navigation/native'

interface ImageButtonRendererProps {
  icon?: string
  image_path?: string
  image_url?: string
  text?: string
  tagline?: string
  url?: string
  page_id?: string
  payload?: string
  styles?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
  theme?: Theme
}

const ImageButtonRenderer: React.FC<ImageButtonRendererProps> = ({
  icon,
  image_path,
  image_url,
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
      style={[_styles.container, styles?.container]}
    >
      <ImageBackground
        source={{ uri: image_url }}
        style={[_styles?.imageBackground, styles?.imageBackground]}
      >
        <Icon
          name="arrow-right"
          color={theme?.colors.background ?? 'white'}
          style={[_styles?.arrow, styles?.arrow]}
          size={24}
        />
        <View style={[_styles?.contentContainer, styles?.contentContainer]}>
          <View style={[_styles?.iconContainer, styles?.iconContainer]}>
            {icon && (
              <Icon
                name={icon}
                color={theme?.colors.background ?? 'white'}
                size={16}
              />
            )}

            {tagline && (
              <Text
                style={[_styles.textTitle, styles?.text, styles?.textTitle]}
              >
                {tagline}
              </Text>
            )}
          </View>

          {text && (
            <Text
              style={[_styles.textSubtitle, styles?.text, styles?.textSubtitle]}
            >
              {text}
            </Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  container: {
    height: 280,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  arrow: {
    position: 'absolute',
    top: 20,
    right: 20,
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
})

export default React.memo(ImageButtonRenderer)
