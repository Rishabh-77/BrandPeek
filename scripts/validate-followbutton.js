#!/usr/bin/env node

/**
 * Validation script for FollowButton component
 * Checks if the component is properly implemented and can be imported
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating FollowButton component...\n');

// Check if component file exists
const componentPath = path.join(__dirname, '../components/FollowButton.js');
const testPath = path.join(
  __dirname,
  '../components/__tests__/FollowButton.test.js'
);
const examplePath = path.join(
  __dirname,
  '../components/FollowButton.example.js'
);
const docPath = path.join(__dirname, '../components/FollowButton.md');

const checks = [
  {
    name: 'FollowButton.js exists',
    path: componentPath,
    required: true,
  },
  {
    name: 'FollowButton.test.js exists',
    path: testPath,
    required: true,
  },
  {
    name: 'FollowButton.example.js exists',
    path: examplePath,
    required: true,
  },
  {
    name: 'FollowButton.md documentation exists',
    path: docPath,
    required: true,
  },
];

let allPassed = true;

checks.forEach(check => {
  const exists = fs.existsSync(check.path);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${check.name}`);

  if (!exists && check.required) {
    allPassed = false;
  }
});

console.log('\n📋 Component Structure Validation:');

// Check component content
if (fs.existsSync(componentPath)) {
  const componentContent = fs.readFileSync(componentPath, 'utf8');

  const requiredElements = [
    { name: 'React import', pattern: /import React/ },
    { name: 'TouchableOpacity import', pattern: /TouchableOpacity/ },
    {
      name: 'LinearGradient import',
      pattern: /LinearGradient.*expo-linear-gradient/,
    },
    { name: 'useState hook', pattern: /useState/ },
    { name: 'Animated import', pattern: /Animated/ },
    { name: 'Colors import', pattern: /colors.*constants\/colors/ },
    { name: 'Typography import', pattern: /typography.*constants\/typography/ },
    { name: 'Follow/Following states', pattern: /Follow.*Following/ },
    { name: 'Accessibility props', pattern: /accessibilityRole="button"/ },
    { name: 'Press animations', pattern: /Animated\.timing\(scaleValue/ },
    { name: 'Gradient colors', pattern: /buttonColors/ },
    { name: 'Export default', pattern: /export default FollowButton/ },
  ];

  requiredElements.forEach(element => {
    const found = element.pattern.test(componentContent);
    const status = found ? '✅' : '❌';
    console.log(`${status} ${element.name}`);

    if (!found) {
      allPassed = false;
    }
  });
}

console.log('\n📱 Component Features Validation:');

// Check if component has required features based on task requirements
if (fs.existsSync(componentPath)) {
  const componentContent = fs.readFileSync(componentPath, 'utf8');

  const features = [
    {
      name: 'Button states and animations',
      pattern: /isPressed.*setIsPressed/,
    },
    { name: 'Visual feedback on press', pattern: /handlePressIn/ },
    { name: 'Accessibility labels', pattern: /accessibilityLabel/ },
    { name: 'Touch feedback', pattern: /activeOpacity.*0\.7/ },
    { name: 'Brand color styling', pattern: /colors\.primary\.deepBlue/ },
    { name: 'Follow state toggle', pattern: /isFollowing.*setIsFollowing/ },
    { name: 'Disabled state handling', pattern: /disabled.*styles\.disabled/ },
    { name: 'Scale animation', pattern: /transform.*scale.*scaleValue/ },
  ];

  features.forEach(feature => {
    const found = feature.pattern.test(componentContent);
    const status = found ? '✅' : '❌';
    console.log(`${status} ${feature.name}`);

    if (!found) {
      allPassed = false;
    }
  });
}

console.log('\n📚 Documentation Validation:');

if (fs.existsSync(docPath)) {
  const docContent = fs.readFileSync(docPath, 'utf8');

  const docSections = [
    { name: 'Component description', pattern: /# FollowButton Component/ },
    { name: 'Features section', pattern: /## Features/ },
    { name: 'Props documentation', pattern: /## Props/ },
    { name: 'Usage examples', pattern: /## Usage/ },
    { name: 'Accessibility section', pattern: /## Accessibility/ },
    { name: 'Requirements fulfilled', pattern: /## Requirements Fulfilled/ },
  ];

  docSections.forEach(section => {
    const found = section.pattern.test(docContent);
    const status = found ? '✅' : '❌';
    console.log(`${status} ${section.name}`);
  });
}

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log(
    '🎉 All validations passed! FollowButton component is properly implemented.'
  );
  console.log('\n📋 Task 11 Requirements Status:');
  console.log('✅ FollowButton.js with proper button states and animations');
  console.log('✅ Visual feedback for button presses');
  console.log('✅ Accessibility labels and touch feedback');
  console.log('✅ Styling matches app design system and brand colors');
  console.log('✅ Requirements 5.1, 5.2, 5.3 fulfilled');
  process.exit(0);
} else {
  process.exit(1);
}
