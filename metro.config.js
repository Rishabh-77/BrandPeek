const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable source maps to prevent anonymous file errors
config.transformer = {
  ...config.transformer,
  generateSourceMaps: false,
  sourceMapUrl: false,
};

// Configure resolver to handle anonymous files gracefully
config.resolver = {
  ...config.resolver,
  platforms: ['ios', 'android', 'native', 'web'],
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
  // Add fallback for anonymous files
  fallback: {
    '<anonymous>': require.resolve('./app/_layout.tsx'),
    'nanoid/non-secure': require.resolve('nanoid/non-secure'),
  },
  // Add aliases for problematic modules
  alias: {
    'nanoid/non-secure': 'nanoid/non-secure',
  },
  // Custom resolver to handle anonymous module requests
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === '<anonymous>' || moduleName.includes('<anonymous>')) {
      return {
        filePath: require.resolve('./app/_layout.tsx'),
        type: 'sourceFile',
      };
    }
    // Handle nanoid/non-secure module
    if (moduleName === 'nanoid/non-secure') {
      return {
        filePath: require.resolve('nanoid/non-secure'),
        type: 'sourceFile',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

// Configure server to handle anonymous file errors gracefully
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      if (req.url && req.url.includes('<anonymous>')) {
        res.status(404).json({ error: 'Source file not found' });
        return;
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
