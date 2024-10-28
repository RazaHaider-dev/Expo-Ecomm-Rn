const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add any additional file extensions for source code here
config.resolver.sourceExts.push('js', 'json', 'ts', 'tsx', 'cjs');

module.exports = config;