import React, { useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import type { Theme } from '@react-navigation/native'
import Video, { VideoRef } from 'react-native-video'
import LottieView from 'lottie-react-native'
import { PlayCircleIcon } from 'react-native-heroicons/solid'
import { LottieLoaderAnimationJson } from './LottieLoaderAnimationJson'

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
  const videoRef = useRef<VideoRef>(null)
  const [isLoadError, setIsLoadError] = useState(false)

  const source = {
    uri: video_url,
    metadata: {
      title,
      subtitle,
    },
  }

  const LottieLoaderAnimation = useMemo(
    () => JSON.parse(LottieLoaderAnimationJson),
    []
  )

  if (isLoadError) {
    return (
      <View style={[_styles.reloadIcon]}>
        <Pressable
          onPress={() => {
            setIsLoadError(false)
            videoRef.current?.setSource(source)
          }}
        >
          <PlayCircleIcon color={'orange'} size={96} />
        </Pressable>
      </View>
    )
  }

  return (
    <Video
      ref={videoRef}
      source={source}
      renderLoader={() => (
        <LottieView
          source={LottieLoaderAnimation}
          style={_styles.reloadIcon}
          loop
          autoPlay
        />
      )}
      onError={() => {
        setIsLoadError(true)
      }}
      onLoadStart={() => setIsLoadError(false)}
      onLoad={() => {
        setIsLoadError(false)
      }}
      style={[_styles.backgroundVideo, styles?.backgroundVideo]}
      resizeMode={'cover'}
      controls={Boolean(controls)}
      muted={Boolean(mute)}
      repeat={Boolean(looping)}
      fullscreen={Boolean(fullscreen)}
      paused={!Boolean(autoplay)}
    />
  )
}

const _styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 256,
  },
  reloadIcon: {
    width: '100%',
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default React.memo(VideoRenderer)
