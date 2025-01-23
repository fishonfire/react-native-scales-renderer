# react-native-scales-renderer

**ScalesCMS** is a flexible and customizable React Native package for rendering dynamic content provided by ScalesCMS as JSON payloads. It allows developers to define custom components and styles, enabling seamless integration into their React Native apps.

---

## Installation

react-native-scales-renderer requires the following dependencies:
- axios
- react-native-svg 
- react-native-heroicons 
- react-native-markdown-display 
- react-native-video

Install the package using `npm` or `yarn`:

```bash
npm install react-native-scales-renderer axios react-native-svg react-native-heroicons react-native-markdown-display react-native-video 
```

or

```bash
yarn add react-native-scales-renderer axios react-native-svg react-native-heroicons react-native-markdown-display react-native-video
```

---

## Configuration

ScalesCMS requires the following configuration options:

- **`apiBaseURL`**: The base URL of your CMS API.
- **`apiKey`**: API key for authentication.
- **`apiVersion`**: The version of the CMS API.

You can also define custom components to render specific content types dynamically.

---

## Example Usage

Here is a complete example of how to use `ScalesCMS` in your React Native project:

### App Code

```tsx
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScalesCMS, type Config, type CustomComponents, type Styles } from 'react-native-scales-renderer'

// ScalesCMS Configuration
const cmsConfig: Config = {
  apiBaseURL: 'https://api.mockfly.dev/mocks/e71d1054-9755-4fba-8c38-4d3285d41464/api',
  apiKey: 'dummy-api-key',
  apiVersion: 'v1',
}

// Define Custom Components
const customComponents: CustomComponents = {
  // Custom image component
  my_custom_image_component: ({ image_url }) => {
    return <Image source={{ uri: image_url }} style={styles.image} />
  },
  // Custom text component
  my_custom_text_component: ({ content }) => {
    return <Text style={styles.text}>{content}</Text>
  },
  // Overriding standard header component
  header: ({ content }) => {
    return <Text style={styles.header}>{content}</Text>
  },
}

export default function App() {
  return (
    <View>
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

// Default Styles
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 8,
  },
})

// CMS-specific Styles
const stylesCMS: Styles = {
  markdown: {
    paragraph: {
      fontSize: 14,
      color: '#333',
    },
  },
  image: styles.image,
}
```

---

## Props

### `ScalesCMS` Component

| Prop               | Type                   | Required | Description                                                                 |
|--------------------|------------------------|----------|-----------------------------------------------------------------------------|
| `config`          | `Config`               | **Yes**  | API configuration containing `apiBaseURL`, `apiKey`, and `apiVersion`.      |
| `pageSlug`        | `string`               | **Yes**  | The slug of the page to load from ScalesCMS.                                |
| `customComponents` | `CustomComponents`     | No       | A set of custom React components for rendering specific content types.      |
| `styles`           | `Styles`               | No       | Style overrides for markdown, images, and other components.                 |

---

## Custom Components

Custom components allow you to define specific render logic for CMS content or override standard components.

Example:

```tsx
const customComponents: CustomComponents = {
  header: ({ content }) => <Text style={{ fontSize: 24 }}>{content}</Text>,
  my_image: ({ image_url }) => <Image source={{ uri: image_url }} style={{ height: 200 }} />,
}
```

---

## Styles

Override specific styles using the `styles` prop. Example:

```tsx

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
})

const stylesCMS: Styles = {
  markdown: stylesMarkdown,
}
```

---

See full example in the [example](example) directory.

## License

This project is open-source under the [GPL v3 License](https://www.gnu.org/licenses/gpl-3.0.html).

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## Support

If you encounter issues or have questions, please open an issue on the [GitHub repository](https://github.com/fishonfire/react-native-scales-renderer).
