import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import ConciergeScreen from '../screens/ConciergeScreen';
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
            case 'Concierge':
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
        tabBarActiveTintColor: '#006994',
        tabBarInactiveTintColor: '#4A90A4',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#006994',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Concierge"
        component={ConciergeScreen}
        options={{
          title: 'Concierge',
          headerTitle: 'Island Concierge',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          headerTitle: 'Explore the Island',
        }}
      />
      <Tab.Screen
        name="Tours"
        component={ToursScreen}
        options={{
          title: 'Tours',
          headerTitle: 'Island Tours',
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          title: 'Emergency',
          headerTitle: 'Emergency Info',
          tabBarActiveTintColor: '#C41E3A',
        }}
      />
    </Tab.Navigator>
  );
}
