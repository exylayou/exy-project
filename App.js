import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ToursScreen from './screens/ToursScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ToursScreen />
    </>
  );
}
