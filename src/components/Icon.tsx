import * as HeroIcons from 'react-native-heroicons/solid'
import { capitalizeString } from '../utils/capitalizeString'
import { View } from 'react-native'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import React from 'react'

interface IconProps {
  name?: string
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const Icon: React.FC<IconProps> = ({ name, size, color, style }) => {
  if (!name) {
    return null
  }

  const heroIconName = (name
    .split('-')
    .map(s => capitalizeString(s))
    .join('') + 'Icon') as keyof typeof HeroIcons

  const IconComponent = HeroIcons[heroIconName]

  if (!IconComponent) {
    return null
  }

  return (
    <View style={style}>
      <IconComponent size={size} fill={color} />
    </View>
  )
}

export default React.memo(Icon)
