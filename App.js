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


import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import Ereport from './screens/Ereport';

import M1 from './screens/menu/m1/M1';
import M2 from './screens/menu/m2/M2';
import M3 from './screens/menu/m3/M3';
import M4 from './screens/menu/m4/M4';
import M5 from './screens/menu/m5/M5';
import M6 from './screens/menu/m6/M6';

import ApprovalLimit from './screens/ApprovalLimit';
import OrderInformation from './screens/OrderInformation';
import DailyCalendar from './screens/DailyCalendar';

import SelectBase from './pages/SelectBase';
import ScanScreen from './pages/ScanScreen';

import ShowInCome from './screens/menu/m1/ShowInCome'
import CurrentStatus from './screens/menu/m1/CurrentStatus'
import ShowBank from './screens/menu/m1/ShowBank'
import ShowInComeTeam from './screens/menu/m1/ShowInComeTeam'
import ShowPayMentdeposit from './screens/menu/m1/ShowPayMentdeposit'
import ShowSellBook from './screens/menu/m1/ShowSellBook'

import ShowAR from './screens/menu/m2/ShowAR'
import AR_SellAmount from './screens/menu/m2/AR_SellAmount'
import AR_ShowArdetail from './screens/menu/m2/AR_ShowArdetail'
import AR_SellAmountByIcDept from './screens/menu/m2/AR_SellAmountByIcDept'
import AR_GoodsBooking from './screens/menu/m2/AR_GoodsBooking'
import AR_Address from './screens/menu/m2/AR_Address'

import ShowAP from './screens/menu/m3/ShowAP'
import AP_PurcAmount from './screens/menu/m3/AP_PurcAmount'
import AP_ShowArdetail from './screens/menu/m3/AP_ShowArdetail'
import AP_PurcAmountByIcDept from './screens/menu/m3/AP_PurcAmountByIcDept'
import AP_GoodsBooking from './screens/menu/m3/AP_GoodsBooking'
import AP_Address from './screens/menu/m3/AP_Address'

import ChequeIn from './screens/menu/m4/ChequeIn'
import ChequeBook from './screens/menu/m4/ChequeBook'
import SkuBalance from './screens/menu/m4/SkuBalance'
import SkuBalanceByWL from './screens/menu/m4/SkuBalanceByWL'

import ArDueDate from './screens/menu/m5/ArDueDate'
import Arcat from './screens/menu/m5/Arcat'
import ApDueDate from './screens/menu/m5/ApDueDate'
import Apcat from './screens/menu/m5/Apcat'

import ShowSlmn from './screens/menu/m6/ShowSlmn'
import ShowPos from './screens/menu/m6/ShowPos'
import SlmnByYearMonth from './screens/menu/m6/SlmnByYearMonth'
import PosByYearMonth from './screens/menu/m6/PosByYearMonth'
import IncomeBySlmn from './screens/menu/m6/IncomeBySlmn'
import IncomeByPos from './screens/menu/m6/IncomeByPos'

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

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M1"
                component={M1}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowInCome"
                component={ShowInCome}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowInComeTeam"
                component={ShowInComeTeam}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="CurrentStatus"
                component={CurrentStatus}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowBank"
                component={ShowBank}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowPayMentdeposit"
                component={ShowPayMentdeposit}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowSellBook"
                component={ShowSellBook}
              />

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M2"
                component={M2}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowAR"
                component={ShowAR}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AR_SellAmount"
                component={AR_SellAmount}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AR_ShowArdetail"
                component={AR_ShowArdetail}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AR_SellAmountByIcDept"
                component={AR_SellAmountByIcDept}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AR_GoodsBooking"
                component={AR_GoodsBooking}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AR_Address"
                component={AR_Address}
              />

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M3"
                component={M3}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowAP"
                component={ShowAP}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AP_PurcAmount"
                component={AP_PurcAmount}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AP_ShowArdetail"
                component={AP_ShowArdetail}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AP_PurcAmountByIcDept"
                component={AP_PurcAmountByIcDept}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AP_GoodsBooking"
                component={AP_GoodsBooking}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="AP_Address"
                component={AP_Address}
              />

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M4"
                component={M4}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ChequeIn"
                component={ChequeIn}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ChequeBook"
                component={ChequeBook}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="SkuBalance"
                component={SkuBalance}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="SkuBalanceByWL"
                component={SkuBalanceByWL}
              />

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M5"
                component={M5}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="Arcat"
                component={Arcat}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ArDueDate"
                component={ArDueDate}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="Apcat"
                component={Apcat}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ApDueDate"
                component={ApDueDate}
              />

              <MainStack.Screen
                options={{ headerShown: false }}
                name="M6"
                component={M6}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowSlmn"
                component={ShowSlmn}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="ShowPos"
                component={ShowPos}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="SlmnByYearMonth"
                component={SlmnByYearMonth}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="PosByYearMonth"
                component={PosByYearMonth}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="IncomeBySlmn"
                component={IncomeBySlmn}
              />
              <MainStack.Screen
                options={{ headerShown: false }}
                name="IncomeByPos"
                component={IncomeByPos}
              />

            </MainStack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
