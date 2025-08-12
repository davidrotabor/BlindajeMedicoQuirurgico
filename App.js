import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AuthProvider } from './src/Context/AuthContext';
import Navigation from './Navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
          <Navigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
