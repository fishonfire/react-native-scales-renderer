import React from 'react'
import { Image, StyleSheet } from 'react-native'

interface ImageRendererProps {
  imageUrl: string
}

const ImageRenderer: React.FC<ImageRendererProps> = ({ imageUrl }) => {
  return <Image source={{ uri: imageUrl }} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
})

export default ImageRenderer
