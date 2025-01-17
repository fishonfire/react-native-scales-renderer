import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import type { Theme } from '@react-navigation/native'
import { ComponentPropsMap } from '../types/ScalesCMS'
import ImageButtonRenderer from './ImageButtonRenderer'

interface ImageButtonCollectionRendererProps {
  buttons?: ComponentPropsMap['image_button'][]
  styles?: StyleSheet.NamedStyles<any>
  stylesButtons?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
  theme?: Theme
}

const ImageButtonCollectionRenderer: React.FC<
  ImageButtonCollectionRendererProps
> = ({ buttons, styles, stylesButtons, onPress, theme }) => {
  const renderItem = useCallback(
    ({ item }: { item: ComponentPropsMap['image_button'] }) => (
      <View style={[_styles.listItemContainer, styles?.listItemContainer]}>
        <ImageButtonRenderer
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
      numColumns={2}
      contentContainerStyle={[
        _styles?.listContentContainer,
        styles?.listContentContainer,
      ]}
      columnWrapperStyle={[
        _styles.listColumnWrapper,
        styles?.listColumnWrapper,
      ]}
    />
  )
}

const _styles = StyleSheet.create({
  listContentContainer: {
    gap: 8,
  },
  listColumnWrapper: {
    gap: 8,
  },
  listItemContainer: {},
})

export default React.memo(ImageButtonCollectionRenderer)
