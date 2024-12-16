import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScalesCMS, type Config, type CustomComponents } from '../src'

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
  image: ({ image_url }) => {
    return <Image source={{ uri: image_url }} style={styles.image} />
  },
  my_custom_image_component: ({ image_url }) => {
    return <Image source={{ uri: image_url }} style={styles.image} />
  },
  my_custom_text_component: ({ content }: Record<string, any>) => {
    return <Text>{content}</Text>
  },
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ScalesCMS
          config={cmsConfig}
          pageSlug="showcase"
          customComponents={customComponents}
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
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
})
