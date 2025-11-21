import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import type { Theme } from '@react-navigation/native'
import Video, { VideoRef } from 'react-native-video'
import LottieView from 'lottie-react-native'
import { PlayCircleIcon } from 'react-native-heroicons/solid'
import { LottieLoaderAnimationJson } from './LottieLoaderAnimationJson'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Icon } from 'react-native-scales-renderer'

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
  theme,
}) => {
  const videoRef = useRef<VideoRef>(null)
  const [isLoadError, setIsLoadError] = useState(false)
  const [isMuted, setIsMuted] = useState(Boolean(mute))
  const [isFullscreen, setIsFullscreen] = useState(false)
  const onEnterFullscreen = () => setIsFullscreen(true)
  const onExitFullscreen = () => setIsFullscreen(false)

  const source = {
    uri: video_url,
    metadata: {
      title,
      subtitle,
    },
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isFullscreen) {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      } else {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        )
      }

      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        )
      }
    }
  }, [isFullscreen])

  const toggleMuted = useCallback(() => setIsMuted(prev => !prev), [])

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
    <View>
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
        resizeMode={isFullscreen ? 'contain' : 'cover'}
        controls={Boolean(controls)}
        volume={isMuted ? 0 : 1}
        repeat={Boolean(looping)}
        fullscreen={Boolean(fullscreen)}
        paused={!Boolean(autoplay)}
        onFullscreenPlayerWillPresent={onEnterFullscreen}
        onFullscreenPlayerWillDismiss={onExitFullscreen}
        onFullscreenPlayerDidDismiss={onExitFullscreen}
      />

      <Pressable onPress={toggleMuted} style={_styles.muteControl}>
        <Icon
          size={32}
          name={isMuted ? 'speaker-x-mark' : 'speaker-wave'}
          color={theme?.colors.primary}
        />
      </Pressable>
    </View>
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
  muteControl: {
    marginVertical: 8,
  },
})

export default React.memo(VideoRenderer)
