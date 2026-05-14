import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { ThemeProvider, useTheme } from '../../ThemeContext';

function TabLayoutInner() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.accent,
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/biblioteca.png')}
              style={{ width: 35, height: 28, tintColor: colors.title, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/explorar.png')}
              style={{ width: 28, height: 28, tintColor: colors.title, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/perfil.png')}
              style={{ width: 28, height: 28, tintColor: colors.title, opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabLayoutInner />
    </ThemeProvider>
  );
}
