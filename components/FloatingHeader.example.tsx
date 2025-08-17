import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingHeader from './FloatingHeader';

export default function FloatingHeaderExample() {
  return (
    <View style={styles.container}>
      {/* Basic floating header */}
      <FloatingHeader
        title="Brand Details"
        showBackButton={true}
      />
      
      {/* Content that scrolls under the header */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.spacer} />
        {Array.from({ length: 20 }, (_, i) => (
          <View key={i} style={styles.item}>
            <Text>Content item {i + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Example with custom right component
export function FloatingHeaderWithActions() {
  return (
    <View style={styles.container}>
      <FloatingHeader
        title="Brand Profile"
        showBackButton={true}
        rightComponent={
          <Ionicons name="heart-outline" size={24} color="#000" />
        }
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.spacer} />
        <Text style={styles.description}>
          This example shows a floating header with a custom right component (heart icon).
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  spacer: {
    height: 100, // Space for the floating header
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});