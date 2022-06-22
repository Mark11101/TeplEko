import React from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

import store from './redux';
import 'react-native-gesture-handler';
// import StorybookUI from '../storybook';
import { Screens } from './constants/Routes';
import RootStackParamsList from './screens/RootStackParams';

import { 
  WelcomScreen, 
  SignInScreen, 
  SignUpScreen, 
  EmailRecoveryScreen, 
  PreviewConnectionScreen, 
  AddConnectionScreen,

  HomeScreen,
  RoomsSettingsScreen,
  WeekScheduleScreen,
  SystemStatusScreen,

  SettingsListScreen,
  NotificationsScreen,
  ConfigurationScreen, 
  FactorySettingsResetScreen, 
  AppInfoScreen, 
  TermsOfUseScreen,
} from './screens';

import s from './App.styles';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const StoreProvider: React.FC = () => (

  <Provider store={store}>
    <App />
  </Provider>
);

const App: React.FC = () => {

  // React.useEffect(() => {

  //   const getToken = async () => {
  
  //     try {
  
  //       const value = await AsyncStorage.getItem('token');

  //       if (value) {
  //         setIsLogged(true)
  //       } else {
  //         setIsLogged(false)
  //       }
  
  //     } catch (e) {
  //       setIsLogged(false)
  //     }
  //   }
  
  //   getToken()

  // }, [])

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f2f1f7',
    },
  };
  
  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#f2f1f7"
      />
      <View style={s.loggedSafeAreaView}>
        <FlashMessage position="top" />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen
                name={Screens.SPLASHSCREEN}
                component={SplashScreen}
              /> */}
              <Stack.Screen
                name={Screens.WELCOM}
                component={WelcomScreen}
              />
              <Stack.Screen
                name={Screens.SIGN_IN}
                component={SignInScreen}
              />
              <Stack.Screen
                name={Screens.SIGN_UP}
                component={SignUpScreen}
              />
              <Stack.Screen
                name={Screens.EMAIL_RECOVERY}
                component={EmailRecoveryScreen}
              />
              <Stack.Screen
                name={Screens.PREVIEW_CONNECTION}
                component={PreviewConnectionScreen}
              />
              <Stack.Screen
                name={Screens.ADD_CONNECTION}
                component={AddConnectionScreen}
              />
              <Stack.Screen 
                name={Screens.HOME} 
                component={HomeScreen} 
              />
              <Stack.Screen
                name={Screens.ROOMS_SETTINGS}
                component={RoomsSettingsScreen}
              />
              <Stack.Screen
                name={Screens.WEEK_SCHEDULE}
                component={WeekScheduleScreen}
              />
              <Stack.Screen
                name={Screens.SYSTEM_STATUS}
                component={SystemStatusScreen}
              />
              <Stack.Screen 
                name={Screens.SETTINGS_LIST} 
                component={SettingsListScreen} 
              />
              <Stack.Screen 
                name={Screens.NOTIFICATIONS} 
                component={NotificationsScreen} 
              />
              <Stack.Screen 
                name={Screens.APP_INFO} 
                component={AppInfoScreen} 
              />
              <Stack.Screen 
                name={Screens.CONFIGURATION} 
                component={ConfigurationScreen} 
              />
              <Stack.Screen 
                name={Screens.FACTORY_SETTINGS_RESET} 
                component={FactorySettingsResetScreen} 
              />
              <Stack.Screen 
                name={Screens.TERMS_OF_USE} 
                component={TermsOfUseScreen} 
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

export default StoreProvider;
