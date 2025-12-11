import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../constants/theme';

export default function MessageReactions({
  messageId,
  onReaction,
  initialReaction = null
}) {
  const [reaction, setReaction] = useState(initialReaction);

  const handleReaction = (reactionType) => {
    // Toggle reaction if same type clicked, otherwise set new reaction
    const newReaction = reaction === reactionType ? null : reactionType;
    setReaction(newReaction);

    // Callback to parent with feedback data
    if (onReaction) {
      onReaction({
        messageId,
        reaction: newReaction,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.reactionButton,
          reaction === 'thumbs-up' && styles.activeReaction
        ]}
        onPress={() => handleReaction('thumbs-up')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={reaction === 'thumbs-up' ? 'thumbs-up' : 'thumbs-up-outline'}
          size={16}
          color={reaction === 'thumbs-up' ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reactionButton,
          reaction === 'thumbs-down' && styles.activeReaction
        ]}
        onPress={() => handleReaction('thumbs-down')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={reaction === 'thumbs-down' ? 'thumbs-down' : 'thumbs-down-outline'}
          size={16}
          color={reaction === 'thumbs-down' ? Colors.emergency : Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  reactionButton: {
    padding: Spacing.xs,
    borderRadius: 12,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeReaction: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
});
