import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../constants/theme';
import MessageBubble from '../components/chat/MessageBubble';
import MessageReactions from '../components/chat/MessageReactions';
import ChatInput from '../components/chat/ChatInput';

// Sample messages for demo
const INITIAL_MESSAGES = [
  {
    id: '1',
    message: "Hi! I'm your Island Concierge AI. I can help you discover amazing places, book tours, find restaurants, and answer any questions about Saint Vincent and the Grenadines. What would you like to know?",
    isAI: true,
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    message: 'What are the best beaches to visit?',
    isAI: false,
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    message: "Great question! Princess Margaret Beach on Bequia is stunning - crystal clear water and perfect for swimming. I'd also recommend checking out the Tobago Cays for incredible snorkeling.",
    isAI: true,
    timestamp: '10:32 AM',
    location: 'Princess Margaret Beach, Bequia',
  },
  {
    id: '4',
    message: 'How do I get to Bequia?',
    isAI: false,
    timestamp: '10:35 AM',
  },
  {
    id: '5',
    message: "You can take the ferry from Kingstown. The Jaden Sun ferry runs multiple times daily. Would you like me to check today's schedule?",
    isAI: true,
    timestamp: '10:35 AM',
    location: 'Kingstown Ferry Terminal',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      message: text,
      isAI: false,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      }),
    };

    setMessages([...messages, newMessage]);

    // Simulate AI response (in real app, this would call the API)
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: "I'm a demo AI. In the full version, I'll provide personalized recommendations based on your question!",
        isAI: true,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleReaction = (reactionData) => {
    // In production, this would log to analytics/database
    console.log('User reaction:', reactionData);
    // TODO: Send to API for feedback tracking
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.message}
            timestamp={msg.timestamp}
            isAI={msg.isAI}
            location={msg.location}
          >
            {msg.isAI && (
              <MessageReactions
                messageId={msg.id}
                onReaction={handleReaction}
              />
            )}
          </MessageBubble>
        ))}
      </ScrollView>

      <ChatInput onSend={handleSendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
});
