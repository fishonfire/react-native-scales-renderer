import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import type { Theme } from '@react-navigation/native'
import { ComponentPropsMap } from '../types/ScalesCMS'
import ButtonRenderer from './ButtonRenderer'

interface ButtonCollectionRendererProps {
  buttons?: ComponentPropsMap['button'][]
  styles?: StyleSheet.NamedStyles<any>
  stylesButtons?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
  theme?: Theme
}

const ButtonCollectionRenderer: React.FC<ButtonCollectionRendererProps> = ({
  buttons,
  styles,
  stylesButtons,
  onPress,
  theme,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: ComponentPropsMap['button'] }) => (
      <View style={[_styles.buttonContainer, styles?.buttonContainer]}>
        <ButtonRenderer
          {...item}
          styles={stylesButtons}
          onPress={onPress}
          theme={theme}
        />
      </View>
    ),
    [onPress, styles, stylesButtons, theme]
  )

  return (
    <FlatList
      data={buttons}
      renderItem={renderItem}
      scrollEnabled={false}
      contentContainerStyle={[_styles?.container, styles?.container]}
    />
  )
}

const _styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 4,
  },
})

export default React.memo(ButtonCollectionRenderer)
