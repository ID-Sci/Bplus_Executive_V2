import React, { useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStateIfMounted } from 'use-state-if-mounted';

import { store, persistor } from './src/store/store';
import { Language, changeLanguage } from './translations/I18n';
import { useSelector } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Body,
  Left,
  Right,
  Title,
} from 'native-base';


import LoginScreen from './Screens/LoginScreen';
import MainScreen from './Screens/MainScreen';
import Ereport from './Screens/Ereport';
import FAQ from './Screens/FAQ';
import ApprovalLimit from './Screens/ApprovalLimit';
import OrderInformation from './Screens/OrderInformation';
import DailyCalendar from './Screens/DailyCalendar';

import SelectBase from './pages/SelectBase';
import ScanScreen from './pages/ScanScreen';


const LoginStack = createStackNavigator();
const MainStack = createStackNavigator();
const App = () => {
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const userReducer = useSelector(({ userReducer }) => userReducer);
  const [userIndex, setUserIndex] = useStateIfMounted(loginReducer.index);
  useEffect(() => {
    if (userIndex == '-1') {
      changeLanguage('th');
    } else {
      changeLanguage(userReducer.userData[userIndex].language);
    }
  }, []);
  const LoginStackScreen = () => {

    return (
      <LoginStack.Navigator>

        <LoginStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <LoginStack.Screen
          options={{ headerShown: false }}
          name="SelectScreen"
          component={SelectBase}
        />
        <LoginStack.Screen
          options={{ title: Language.t('selectBase.scanQR'), headerShown: false }}
          name="ScanScreen"
          component={ScanScreen}
        />

      </LoginStack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <MainStack.Navigator>
              <MainStack.Screen
                options={{ headerShown: false }}
                name="LoginScreen"
                component={LoginStackScreen}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="MainScreen"
                component={MainScreen}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="Ereport"
                component={Ereport}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="FAQ"
                component={FAQ}
              />
               <MainStack.Screen
                options={{ headerShown: false }}
                name="ApprovalLimit"
                component={ApprovalLimit}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="OrderInformation"
                component={OrderInformation}
              />
               <MainStack.Screen
                options={{ headerShown: false }}
                name="DailyCalendar"
                component={DailyCalendar}
              />
              
              
            </MainStack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
