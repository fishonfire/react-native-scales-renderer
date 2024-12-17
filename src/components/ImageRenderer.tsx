import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

interface ImageRendererProps {
  imageUrl: string
  imagePath: string
  styles?: StyleProp<ImageStyle>
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  imageUrl,
  imagePath,
  styles,
}) => {
  return <Image source={{ uri: imageUrl }} style={[_styles.image, styles]} />
}

const _styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
})

export default React.memo(ImageRenderer)
