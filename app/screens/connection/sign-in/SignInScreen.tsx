import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { 
  Panel, 
  Input, 
  Button, 
  Divider
} from '../../../components/atoms';
import { Screens } from '../../../constants/Routes';
import { Navbar } from '../../../components/organisms';
import RootStackParamsList from '../../RootStackParams';
import { storeAsyncStorageData } from '../../../async-storage';
import { setToken, setRefreshToken } from '../../../redux/slices/user';
import { useRequestSignInMutation } from '../../../redux/requests/auth';

import s from './SignInScreen.styles';

export const SignInScreen: React.FC = () => {
  
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.SIGN_IN>>();
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordNotVisible, setIsPasswordNotVisible] = useState(true);

  const [errorPassword, setErrorPassword] = useState('');

  const [
    requestSignIn,
    { data, isSuccess, isLoading, isError }
  ] = useRequestSignInMutation();

  React.useEffect(() => {
    isSuccess && setErrorPassword('')
  }, [isSuccess])

  React.useEffect(() => {
    isError && setErrorPassword('Неправильный логин или пароль')
  }, [isError])

  if (isSuccess && data) {

    dispatch(setToken({ token: data.token }));
    dispatch(setRefreshToken({ refreshToken: data.refreshToken }));

    storeAsyncStorageData('token', data.token)

    navigation.navigate(Screens.HOME)
  }

  const handleClickSignIn = (login: string, password: string) => {
    
    requestSignIn({
      login: login,
      password,
    })
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/gradient-bg.jpg')}
      style={s.screen}
    >
      <Navbar 
        header='Вход'
        isLight
        withGoBackBtnIcon
        goBack={() => navigation.goBack()}
      />
      <View style={s.signInFormView}>
        <View style={s.errorWrapper}>
          {
            !!errorPassword
            &&
              <Panel styles={s.error}>
                <Text style={s.errorMessage}>
                  {errorPassword}
                </Text>
              </Panel>
          }
        </View>

        <View style={s.formWrapper}>
          <Panel styles={s.form}>
            <Input
              value={login}
              placeholder='Логин'
              styles={s.upperInput}
              isError={!!errorPassword}
              onChange={(text) => setLogin(text)}
            />
            <Divider styles={(!!errorPassword) && s.errorDivider} />
            <Input 
              type='password'
              value={password}
              placeholder='Пароль'
              isError={!!errorPassword}
              isPasswordNotVisible={isPasswordNotVisible}
              styles={s.lowerInput}
              onShowPassword={() => setIsPasswordNotVisible(!isPasswordNotVisible)}
              onChange={(text) => {
                errorPassword && setErrorPassword('');
                setPassword(text);
              }}
            />
            <Button 
              text='Войти'
              type='primary'
              styles={s.signInBtn}
              onPress={() => handleClickSignIn(login, password)}
              isLoading={isLoading}
              isDisabled={
                !login || 
                !password
              }
            />
            {/* <Button 
              type='link'
              text='Восстановление пароля'
              onPress={() => navigation.navigate(Screens.EMAIL_RECOVERY)}
            /> */}
          </Panel>
        </View>
      </View>
    </ImageBackground>
  )
};
