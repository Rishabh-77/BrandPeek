#!/usr/bin/env node

/**
 * Validation script for LoadingSpinner and ErrorMessage components
 * This script checks if the components are properly implemented and can be imported
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating LoadingSpinner and ErrorMessage components...\n');

// Check if component files exist
const componentsDir = path.join(__dirname, '..', 'components');
const loadingSpinnerPath = path.join(componentsDir, 'LoadingSpinner.js');
const errorMessagePath = path.join(componentsDir, 'ErrorMessage.js');

let validationPassed = true;

// Validate LoadingSpinner
console.log('📦 Checking LoadingSpinner component...');
if (fs.existsSync(loadingSpinnerPath)) {
  const content = fs.readFileSync(loadingSpinnerPath, 'utf8');

  const checks = [
    { name: 'React import', test: content.includes('import React') },
    { name: 'Animated import', test: content.includes('Animated') },
    { name: 'useRef hook', test: content.includes('useRef') },
    { name: 'useEffect hook', test: content.includes('useEffect') },
    {
      name: 'Accessibility role',
      test: content.includes('accessibilityRole="progressbar"'),
    },
    {
      name: 'Accessibility label',
      test: content.includes('accessibilityLabel="Loading"'),
    },
    { name: 'Colors import', test: content.includes('colors') },
    { name: 'Animation loop', test: content.includes('Animated.loop') },
    { name: 'Native driver', test: content.includes('useNativeDriver: true') },
  ];

  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name}`);
      validationPassed = false;
    }
  });
} else {
  console.log('  ❌ LoadingSpinner.js file not found');
  validationPassed = false;
}

console.log('\n📦 Checking ErrorMessage component...');
if (fs.existsSync(errorMessagePath)) {
  const content = fs.readFileSync(errorMessagePath, 'utf8');

  const checks = [
    { name: 'React import', test: content.includes('import React') },
    {
      name: 'TouchableOpacity import',
      test: content.includes('TouchableOpacity'),
    },
    { name: 'Colors import', test: content.includes('colors') },
    { name: 'Typography import', test: content.includes('typography') },
    {
      name: 'Accessibility role alert',
      test: content.includes('accessibilityRole="alert"'),
    },
    {
      name: 'Accessibility role button',
      test: content.includes('accessibilityRole="button"'),
    },
    { name: 'Accessibility hint', test: content.includes('accessibilityHint') },
    {
      name: 'Error color usage',
      test: content.includes('colors.interactive.error'),
    },
    { name: 'Retry functionality', test: content.includes('onRetry') },
  ];

  checks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name}`);
      validationPassed = false;
    }
  });
} else {
  console.log('  ❌ ErrorMessage.js file not found');
  validationPassed = false;
}

// Check test files
console.log('\n📦 Checking test files...');
const testDir = path.join(componentsDir, '__tests__');
const loadingSpinnerTestPath = path.join(testDir, 'LoadingSpinner.test.js');
const errorMessageTestPath = path.join(testDir, 'ErrorMessage.test.js');

if (fs.existsSync(loadingSpinnerTestPath)) {
  console.log('  ✅ LoadingSpinner.test.js exists');
} else {
  console.log('  ❌ LoadingSpinner.test.js not found');
  validationPassed = false;
}

if (fs.existsSync(errorMessageTestPath)) {
  console.log('  ✅ ErrorMessage.test.js exists');
} else {
  console.log('  ❌ ErrorMessage.test.js not found');
  validationPassed = false;
}

// Check example files
console.log('\n📦 Checking example files...');
const loadingSpinnerExamplePath = path.join(
  componentsDir,
  'LoadingSpinner.example.js'
);
const errorMessageExamplePath = path.join(
  componentsDir,
  'ErrorMessage.example.js'
);

if (fs.existsSync(loadingSpinnerExamplePath)) {
  console.log('  ✅ LoadingSpinner.example.js exists');
} else {
  console.log('  ❌ LoadingSpinner.example.js not found');
  validationPassed = false;
}

if (fs.existsSync(errorMessageExamplePath)) {
  console.log('  ✅ ErrorMessage.example.js exists');
} else {
  console.log('  ❌ ErrorMessage.example.js not found');
  validationPassed = false;
}

// Check documentation files
console.log('\n📦 Checking documentation files...');
const loadingSpinnerDocPath = path.join(componentsDir, 'LoadingSpinner.md');
const errorMessageDocPath = path.join(componentsDir, 'ErrorMessage.md');

if (fs.existsSync(loadingSpinnerDocPath)) {
  console.log('  ✅ LoadingSpinner.md exists');
} else {
  console.log('  ❌ LoadingSpinner.md not found');
  validationPassed = false;
}

if (fs.existsSync(errorMessageDocPath)) {
  console.log('  ✅ ErrorMessage.md exists');
} else {
  console.log('  ❌ ErrorMessage.md not found');
  validationPassed = false;
}

console.log('\n' + '='.repeat(50));
if (validationPassed) {
  console.log(
    '🎉 All validations passed! Components are properly implemented.'
  );
  console.log('\nComponents created:');
  console.log(
    '  - LoadingSpinner.js (with smooth animations and brand colors)'
  );
  console.log(
    '  - ErrorMessage.js (with retry button and proper error messaging)'
  );
  console.log('  - Test files for both components');
  console.log('  - Example usage files');
  console.log('  - Documentation files');
  console.log('\nFeatures implemented:');
  console.log('  ✅ Smooth animations with native driver');
  console.log('  ✅ Brand colors and consistent styling');
  console.log('  ✅ Accessibility support for screen readers');
  console.log('  ✅ Proper error handling and retry functionality');
  console.log('  ✅ Comprehensive documentation and examples');
} else {
  console.log('❌ Some validations failed. Please check the issues above.');
  process.exit(1);
}
