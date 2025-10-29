import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import onboardingScreen from '../screens/onboarding/onboardingScreen';
import onboardingexplainScreen from '../screens/onboarding/onboardingexplainScreen';
import onboardingstepScreen from '../screens/onboarding/onboardingstepScreen';
import onboardingstartScreen from '../screens/onboarding/onboardingstartScreen';
import mainScreen from '../screens/main/mainScreen';
import ocdchatScreen from '../screens/chat/ocdchatScreen';
import imagineScreen from '../screens/imagine/imagineScreen';
import imaginereadyScreen from '../screens/imagine/imaginereadyScreen';
import imaginalexposureScreen from '../screens/imagine/imaginalexposureScreen';
import exposureScreen from '../screens/aiarexposure/exposureScreen';
import aiexposureScreen from '../screens/aiarexposure/aiexposureScreen';
import responsepreventionScreen from '../screens/responseprevention/responsepreventionScreen';
import exitresponsepreventionScreen from '../screens/responseprevention/exitresponsepreventionScreen';
import loadingScreen from '../screens/responseprevention/loadingScreen';
import responsepreventionreportScreen from '../screens/responseprevention/responsepreventionreportScreen';
import recordcatalogScreen from '../screens/record/recordcatalogScreen';
import recordScreen from '../screens/record/recordScreen';
import cognitiveerrorScreen from '../screens/record/cognitiveerrorScreen';
import erprecordScreen from '../screens/record/erprecordScreen';
import monthlyreportScreen from '../screens/report/monthlyreportScreen';
import weeklyreportScreen from '../screens/report/weeklyreportScreen';
import dailyreportScreen from '../screens/report/dailyreportScreen';
import myanxietyScreen from '../screens/myplan/myanxietyScreen';
import myplanScreen from '../screens/myplan/myplanScreen';
import mytimelineScreen from '../screens/myplan/mytimelineScreen';

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
        <Stack.Screen
          name="onboardingstart"
          component={onboardingstartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={mainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ocdchat"
          component={ocdchatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="imagine"
          component={imagineScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="imagineready"
          component={imaginereadyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="imaginalexposure"
          component={imaginalexposureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="exposure"
          component={exposureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="aiexposure"
          component={aiexposureScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="responseprevention"
          component={responsepreventionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="exitresponseprevention"
          component={exitresponsepreventionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="loading"
          component={loadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="responsepreventionreport"
          component={responsepreventionreportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="recordcatalog"
          component={recordcatalogScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="record"
          component={recordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="erprecord"
          component={erprecordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cognitiveerror"
          component={cognitiveerrorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="monthlyreport"
          component={monthlyreportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="weeklyreport"
          component={weeklyreportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dailyreport"
          component={dailyreportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="myanxiety"
          component={myanxietyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="myplan"
          component={myplanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mytimeline"
          component={mytimelineScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
