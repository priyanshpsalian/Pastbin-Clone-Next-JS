module.exports = {
  // Run type-check on changes to TypeScript files
  'src/**/*.ts?(x)': () => 'npm run type-check',
  // Run ESLint on changes to JavaScript/TypeScript files
  'src/**/*.(ts|js)?(x)': (filenames) => `npm run lint ${filenames.join(' ')}`
};
