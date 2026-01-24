const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the packages folder for shared types
config.watchFolders = [workspaceRoot];

// Let Metro know about the root package.json
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'packages'),
];

// Handle symlinked packages
config.resolver.disableHierarchicalLookup = false;

// Enable package exports for libraries that use them (e.g. @google/genai)
config.resolver.unstable_enablePackageExports = true;

// Set condition names for proper exports resolution (browser-compatible version)
config.resolver.unstable_conditionNames = ['browser', 'import', 'require'];

// Force @google/genai to use the web version
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    '@google/genai': path.resolve(projectRoot, 'node_modules/@google/genai/dist/web'),
};

module.exports = withNativeWind(config, { input: './global.css' });
