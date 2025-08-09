import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import onboardingScreen from '../screens/onboarding/onboardingScreen';
import onboardingexplainScreen from '../screens/onboarding/onboardingexplainScreen';
import onboardingstepScreen from '../screens/onboarding/onboardingstepScreen';
import mainScreen from '../screens/main/mainScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onboarding">
        <Stack.Screen
          name="onboarding"
          component={onboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboardingexplain"
          component={onboardingexplainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboardingstep"
          component={onboardingstepScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="main" component={mainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
