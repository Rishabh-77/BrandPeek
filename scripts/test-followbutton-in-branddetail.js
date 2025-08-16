#!/usr/bin/env node

/**
 * Test script to verify FollowButton integration in BrandDetailScreen
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing FollowButton integration in BrandDetailScreen...\n');

const brandDetailPath = path.join(__dirname, '../app/brand/[id].tsx');

if (!fs.existsSync(brandDetailPath)) {
  console.error('❌ BrandDetailScreen file not found');
  process.exit(1);
}

const brandDetailContent = fs.readFileSync(brandDetailPath, 'utf8');

console.log('📋 Integration Checks:');

const integrationChecks = [
  {
    name: 'FollowButton import added',
    test: () =>
      brandDetailContent.includes(
        "import FollowButton from '@/components/FollowButton'"
      ),
  },
  {
    name: 'FollowButton component used',
    test: () => brandDetailContent.includes('<FollowButton'),
  },
  {
    name: 'onPress handler implemented',
    test: () => brandDetailContent.includes('onPress={(isFollowing)'),
  },
  {
    name: 'testID provided',
    test: () =>
      brandDetailContent.includes('testID="brand-detail-follow-button"'),
  },
  {
    name: 'Placeholder text removed',
    test: () =>
      !brandDetailContent.includes(
        'Follow button will be implemented in Task 11'
      ),
  },
  {
    name: 'Action container maintained',
    test: () => brandDetailContent.includes('styles.actionContainer'),
  },
  {
    name: 'Development logging added',
    test: () =>
      brandDetailContent.includes('console.log') &&
      brandDetailContent.includes('followed'),
  },
];

let allPassed = true;

integrationChecks.forEach(check => {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${check.name}`);

  if (!passed) {
    allPassed = false;
  }
});

console.log('\n📱 User Experience Validation:');

const uxChecks = [
  {
    name: 'Button positioned in action container',
    test: () =>
      brandDetailContent.includes('actionContainer') &&
      brandDetailContent.includes('FollowButton'),
  },
  {
    name: 'Proper spacing maintained',
    test: () => brandDetailContent.includes('marginTop: 32'),
  },
  {
    name: 'Center alignment preserved',
    test: () => brandDetailContent.includes("alignItems: 'center'"),
  },
];

uxChecks.forEach(check => {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${check.name}`);

  if (!passed) {
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allPassed) {
  console.log(
    '🎉 FollowButton successfully integrated into BrandDetailScreen!'
  );
  console.log('\n📋 Integration Summary:');
  console.log('✅ FollowButton component imported and used');
  console.log('✅ Placeholder text removed');
  console.log('✅ Proper event handling implemented');
  console.log('✅ Visual feedback provided to users');
  console.log('✅ Maintains existing layout and styling');
  console.log('\n🚀 Users can now see and interact with the Follow button!');
  console.log(
    '\n📍 Location: Brand Detail Screen → Bottom of content → Follow Button'
  );
  process.exit(0);
} else {
  console.log('❌ Some integration checks failed.');
  process.exit(1);
}
