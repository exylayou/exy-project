import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Layout, Typography } from '../constants/theme';

// Import screens
import ChatScreen from '../screens/ChatScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ToursScreen from '../screens/ToursScreen';
import EmergencyScreen from '../screens/EmergencyScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Chat':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Explore':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Tours':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Emergency':
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: route.name === 'Emergency' ? Colors.emergency : Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: Layout.tabBarHeight,
        },
        tabBarLabelStyle: {
          fontSize: Typography.fontSize.xs,
          fontWeight: Typography.fontWeight.medium,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: Typography.fontWeight.bold,
          fontSize: Typography.fontSize.lg,
        },
      })}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerTitle: '⭐ Island Concierge',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          headerTitle: 'Explore',
          headerShown: false, // Hero will be visible instead
        }}
      />
      <Tab.Screen
        name="Tours"
        component={ToursScreen}
        options={{
          title: 'Tours',
          headerTitle: 'Tours',
          headerShown: false, // Hero will be visible instead
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          title: 'Emergency',
          headerTitle: 'Emergency',
          headerStyle: {
            backgroundColor: Colors.emergency,
          },
        }}
      />
    </Tab.Navigator>
  );
}
