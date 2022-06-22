import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { Text, Image, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { Title } from '../../../components/atoms';
import { Screens } from '../../../constants/Routes';
import RootStackParamsList from '../../RootStackParams';

import s from './WelcomScreen.styles';

export const WelcomScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.WELCOM>>();

  React.useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  // const [isLogged, setIsLogged] = React.useState(false);

  // React.useEffect(() => {

  //   SplashScreen.hide();

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
  
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor="#214AC9"
      />
      <ImageBackground 
        source={require('../../../assets/images/gradient-bg.jpg')}
        style={s.screen}
      >
        <Image 
          source={require('../../../assets/images/preview.png')} 
          style={s.image}
        />
        <Title styles={s.title}>
          Добро пожаловать!
        </Title>
        <Text style={s.footnote}>
          Вы можете управлять терморгегуляторами 
          и что-то еще можете.
        </Text>
        <TouchableOpacity 
          style={s.signInBtn} 
          onPress={() => navigation.navigate(Screens.SIGN_IN)}
        >
          <Text style={s.btnText}>
            Войти
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Screens.SIGN_UP)}>
          <Text style={s.btnText}>
            Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  )
};
