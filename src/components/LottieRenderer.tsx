import React from 'react'
import { StyleSheet } from 'react-native'
import type { Theme } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

interface LottieRendererProps {
  lottie_url?: string
  autoplay?: boolean
  looping?: boolean
  title?: string
  subtitle?: string
  styles?: StyleSheet.NamedStyles<any>
  theme?: Theme
}

const LottieRenderer: React.FC<LottieRendererProps> = ({
  lottie_url,
  autoplay,
  looping,
  title,
  subtitle,
  styles,
}) => {
  return (
    <LottieView
      source={{
        uri: lottie_url as string,
      }}
      style={[_styles.container, styles?.container]}
      loop={Boolean(looping)}
      autoPlay={Boolean(autoplay)}
    />
  )
}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 256,
  },
})

export default React.memo(LottieRenderer)
