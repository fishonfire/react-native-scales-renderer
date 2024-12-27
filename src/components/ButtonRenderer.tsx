import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from './IconComponent'

interface ButtonRendererProps {
  icon?: string
  text?: string
  tagline?: string
  url?: string
  page_id?: string
  payload?: string
  styles?: StyleSheet.NamedStyles<any>
  onPress?: (id?: string, url?: string, payload?: string) => void
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  icon,
  text,
  tagline,
  url,
  page_id,
  payload,
  styles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(page_id, url, payload) : null)}
    >
      <View style={[_styles.container, styles?.container]}>
        <View style={[_styles.iconContainer, styles?.iconContainer]}>
          {icon && <Icon name={icon} size={16} color="white" />}
          {tagline && (
            <Text style={[_styles.textTitle, styles?.textTitle]}>
              {tagline}
            </Text>
          )}
          <Icon
            name="arrow-right"
            size={24}
            color="white"
            style={_styles.arrow}
          />
        </View>

        {text && (
          <Text style={[_styles.textSubtitle, styles?.textSubtitle]}>
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const _styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 8,
    gap: 4,
    width: '100%',
    backgroundColor: 'black',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '8@ms',
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
  },
  textSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  arrow: {
    position: 'absolute',
    right: 0,
  },
})

export default React.memo(ButtonRenderer)
