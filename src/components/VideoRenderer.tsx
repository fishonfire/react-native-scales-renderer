import React from 'react'
import { StyleSheet } from 'react-native'
import type { Theme } from '@react-navigation/native'
import Video from 'react-native-video'

interface VideoRendererProps {
  video_url?: string
  autoplay?: boolean
  controls?: boolean
  fullscreen?: boolean
  looping?: boolean
  mute?: boolean
  subtitle?: string
  title?: string
  styles?: StyleSheet.NamedStyles<any>
  theme?: Theme
}

const VideoRenderer: React.FC<VideoRendererProps> = ({
  video_url,
  autoplay,
  controls,
  fullscreen,
  looping,
  mute,
  title,
  subtitle,
  styles,
}) => {
  return (
    <Video
      source={{
        uri: video_url,
        metadata: {
          title,
          subtitle,
        },
      }}
      style={[_styles.backgroundVideo, styles?.backgroundVideo]}
      resizeMode={'contain'}
      controls={Boolean(controls)}
      muted={Boolean(mute)}
      repeat={Boolean(looping)}
      fullscreen={Boolean(fullscreen)}
      paused={Boolean(autoplay)}
    />
  )
}

const _styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 256,
  },
})

export default React.memo(VideoRenderer)
