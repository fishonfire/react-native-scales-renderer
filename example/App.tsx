import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { type Config, type CustomComponents, ScalesCMS, Styles } from '../src'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Callbacks } from '../src/types/ScalesCMS'
import { ThemeProvider } from '@react-navigation/native'
import { MyTheme } from './theme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const cmsConfig: Config = {
  apiBaseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  apiVersion: process.env.EXPO_PUBLIC_API_VERSION,
}

const customComponents: CustomComponents = {
  header: ({ title, subtitle }) => {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    )
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

  const callbacks: Callbacks = {
    button: (page_id, url, payload) => {
      console.debug('Button clicked:', { page_id: page_id, url, payload })
    },
    image_button: (page_id, url, payload) => {
      console.debug('Image Button clicked:', { page_id: page_id, url, payload })
    },
  }

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={MyTheme}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ScalesCMS
            config={cmsConfig}
            pageId={process.env.EXPO_PUBLIC_API_PAGE_ID}
            pageSlug={
              !process.env.EXPO_PUBLIC_API_PAGE_ID
                ? process.env.EXPO_PUBLIC_API_PAGE_SLUG
                : undefined
            }
            customComponents={customComponents}
            styles={stylesCMS}
            callbacks={callbacks}
            theme={MyTheme}
          />
        </ScrollView>
      </View>
    </ThemeProvider>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
})

const stylesMarkdown: Styles['markdown'] = StyleSheet.create({
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

const stylesButton: Styles['button'] = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 354,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: MyTheme.colors.secondary,
    marginVertical: 8,
  },
  textTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Rijksoverheid_Heading_Bold',
    fontWeight: 'bold',
    color: MyTheme.colors.background,
  },
})

const stylesCTAButton: Styles['button'] = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 354,
    padding: 16,
    borderRadius: 8,
    gap: 4,
    width: '100%',
    backgroundColor: MyTheme.colors.secondary,
    marginVertical: 8,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: MyTheme.colors.background,
  },
  textTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Rijksoverheid_Regular',
  },
  textSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Rijksoverheid_Heading_Bold',
  },
  arrow: {
    position: 'absolute',
    right: 0,
  },
})

const stylesImageButton: Styles['image_button'] = StyleSheet.create({
  container: {
    minWidth: 354,
    height: 280,
    marginVertical: 8,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  arrow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  primary: {
    backgroundColor: MyTheme.colors.secondary,
  },
  secondary: {
    backgroundColor: MyTheme.colors.text,
  },
  text: {
    color: MyTheme.colors.background,
  },
  textTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Rijksoverheid_Regular',
  },
  textSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Rijksoverheid_Heading_Bold',
  },
})

const stylesCMS: Styles = {
  markdown: stylesMarkdown,
  image: styles.image,
  button: stylesButton,
  cta_button: stylesCTAButton,
  image_button: stylesImageButton,
}
