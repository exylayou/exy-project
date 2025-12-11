import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/theme';

export default function Card({
  children,
  imageSource,
  imageHeight = 150,
  style,
  onPress,
  padding = true
}) {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />
      )}
      <View style={[styles.content, !padding && styles.noPadding]}>
        {children}
      </View>
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.base,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  image: {
    width: '100%',
  },
  content: {
    padding: Spacing.base,
  },
  noPadding: {
    padding: 0,
  },
});
