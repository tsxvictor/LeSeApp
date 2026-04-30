import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFAF0',
          borderTopColor: '#66CDAA',
          borderTopWidth: 1,
          height: 60,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/biblioteca.png')}
              style={{ width: 26, height: 26, tintColor: '#2F4F4F', opacity: focused ? 1 : 0.4 }}
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
              style={{ width: 26, height: 26, tintColor: '#2F4F4F', opacity: focused ? 1 : 0.4 }}
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
              style={{ width: 26, height: 26, tintColor: '#2F4F4F', opacity: focused ? 1 : 0.4 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}