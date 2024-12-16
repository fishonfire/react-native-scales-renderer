const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Add the library's `src` folder to the watch folders
config.watchFolders = [
  path.resolve(__dirname, '../src'), // Add the library source folder
]

// Add the library source folder to Metro's resolver
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'),
]

module.exports = config
