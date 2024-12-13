import React from 'react'
import { Image, StyleSheet } from 'react-native'

interface ImageRendererProps {
  imageUrl: string
  imagePath: string
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  imageUrl,
  imagePath,
}) => {
  return <Image source={{ uri: imageUrl }} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
})

export default React.memo(ImageRenderer)
