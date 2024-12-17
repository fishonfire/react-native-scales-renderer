import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScalesCMS, type Config, type CustomComponents, Styles } from '../src'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const cmsConfig: Config = {
  apiBaseURL:
    'https://api.mockfly.dev/mocks/e71d1054-9755-4fba-8c38-4d3285d41464/api',
  apiKey: 'dummy-api-key',
  apiVersion: 'v1',
}

const customComponents: CustomComponents = {
  header: ({ content }) => {
    return <Text>{content}</Text>
  },
  my_custom_image_component: ({ image_url }) => {
    return <Image source={{ uri: image_url }} style={styles.image} />
  },
  my_custom_text_component: ({ content }: Record<string, any>) => {
    return <Text>{content}</Text>
  },
}

export default function App() {
  const [loaded] = useFonts({
    Rijksoverheid_Heading_Bold: require('./assets/fonts/Rijksoverheidsans-Heading-Bold.ttf'),
    Rijksoverheid_Italic: require('./assets/fonts/Rijksoverheid-Serif-Italic.ttf'),
    Rijksoverheid_Regular: require('./assets/fonts/Rijksoverheid-Serif-Regular.ttf'),
    Rijksoverheid_Text_Regular: require('./assets/fonts/Rijksoverheidsanstext-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ScalesCMS
          config={cmsConfig}
          pageSlug="showcase"
          customComponents={customComponents}
          styles={stylesCMS}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
})

const stylesMarkdown = StyleSheet.create({
  // The main container
  body: {
    color: '#181D20',
  },
  // Headings
  heading1: {
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontSize: 32,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 36,
    color: '#181D20',
  },
  heading2: {
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 28,
    color: '#181D20',
  },
  heading3: {
    width: 354,
    height: 24,
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#E17000',
  },
  heading4: {
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#181D20',
  },
  heading5: {
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#181D20',
  },
  heading6: {},
  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },
  // Emphasis
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
  s: {
    textDecorationLine: 'line-through',
  },
  // Blockquotes
  blockquote: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
    borderLeftWidth: 4,
    marginLeft: 5,
    paddingHorizontal: 5,
  },
  // Lists
  bullet_list: {
    fontFamily: 'Rijksoverheid_Text_Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 22,
    color: '#181D20',
  },
  ordered_list: {
    fontFamily: 'Rijksoverheid_Text_Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 22,
    color: '#181D20',
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  bullet_list_content: {
    flex: 1,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  // @pseudo class, does not have a unique render rule
  ordered_list_content: {
    flex: 1,
  },
  // Tables
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },
  // Links
  link: {
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  // Images
  image: {
    flex: 1,
  },
  // Text Output
  text: {},
  textgroup: {},
  paragraph: {
    fontFamily: 'Rijksoverheid_Text_Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 22,
    color: '#181D20',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  softbreak: {},
  // Believe these are never used but retained for completeness
  pre: {},
  inline: {},
  span: {},
})

const stylesCMS: Styles = {
  markdown: stylesMarkdown,
  image: styles.image,
}
