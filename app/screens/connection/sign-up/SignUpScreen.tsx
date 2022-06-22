import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { 
  Panel, 
  Input, 
  Divider, 
  Checkbox, 
  Button,
} from '../../../components/atoms';
import { Screens } from '../../../constants/Routes';
import { Navbar } from '../../../components/organisms';
import RootStackParamsList from '../../RootStackParams';
import { validatePassword } from '../../../utils/validations';
import { useRequestSignUpMutation } from '../../../redux/requests/auth';

import s from './SignUpScreen.styles';

export const SignUpScreen: React.FC = () => {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.SIGN_UP>>();
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState(''); 
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(''); 

  const [isPasswordNotVisible, setIsPasswordNotVisible] = useState(true);

  const [errorLogin, setErrorLogin] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmedPassword, setErrorConfirmedPassword] = useState('');

  const [
    requestSignUp,
  ] = useRequestSignUpMutation();

  const handleClickSignUp = (login: string, password: string) => {

    requestSignUp({
      login,
      password
    })
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/gradient-bg.jpg')}
      style={s.screen}
    >
      <Navbar 
        header='Регистрация'
        withGoBackBtnIcon
        isLight
        styles={s.navbar}
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />
      <View style={s.screenView}>
        <View style={s.errorWrapper}>
          {
            (!!errorLogin || !!errorPassword || !!errorConfirmedPassword)
            &&
              <Panel styles={s.error}>
                {
                  !!errorLogin
                  &&
                    <Text style={s.errorMessage}>
                      - {errorLogin}
                    </Text>
                }
                {
                  !!errorPassword
                  &&
                    <Text style={s.errorMessage}>
                      - {errorPassword}
                    </Text>
                }
                {
                  !!errorConfirmedPassword
                  &&
                    <Text style={s.errorMessage}>
                      - {errorConfirmedPassword}
                    </Text>
                }
              </Panel>
          }
        </View>

        <View style={s.formWrapper}>
          <Panel styles={s.form}>
            <Input 
              value={login}
              placeholder='Логин'
              isError={!!errorLogin}
              onChange={(text) => {
                !!errorLogin && setErrorLogin('');
                setLogin(text)
              }}
              onBlur={(e) => {

                if (e.nativeEvent.text) {

                  e.nativeEvent.text === '' && setErrorLogin('Введите логин');
                  e.nativeEvent.text.length < 5 && setErrorLogin('Логин не должен быть меньше 5 символов');
                }
              }}
            />

            <View style={s.inputWrapper}>
              <Input 
                type='password'
                value={password}
                placeholder='Пароль'
                styles={s.upperInput}
                isError={!!errorPassword}
                isPasswordNotVisible={isPasswordNotVisible}
                onShowPassword={() => setIsPasswordNotVisible(!isPasswordNotVisible)}
                onChange={(text) => {
                  !!errorPassword && setErrorPassword('');
                  setPassword(text)
                  
                  !!text &&
                  !!confirmedPassword &&
                  text !== confirmedPassword 
                  ? 
                    setErrorConfirmedPassword('Пароли не совпадают')
                  :
                    setErrorConfirmedPassword('')

                  !!text &&
                  confirmedPassword !== '' &&
                  !validatePassword(text)
                  ? 
                    setErrorPassword('Введите пароль из 5 или более символов')
                  :
                    setErrorPassword('')
                }}
              />

              <Divider styles={(!!errorPassword || !!errorConfirmedPassword) && s.errorDivider} />

              <Input 
                type='confirm'
                styles={s.lowerInput}
                value={confirmedPassword}
                placeholder='Повторите Пароль'
                isError={!!errorConfirmedPassword}
                isPasswordNotVisible={isPasswordNotVisible}
                onChange={(text) => {
                  !!errorConfirmedPassword && setErrorConfirmedPassword('');
                  setConfirmedPassword(text)
                  
                  !!text &&
                  text !== password 
                  ? 
                    setErrorConfirmedPassword('Пароли не совпадают')
                  :
                    setErrorConfirmedPassword('')

                  !!text &&
                  confirmedPassword !== '' &&
                  !validatePassword(text)
                  ? 
                    setErrorPassword('Введите пароль из 5 или более символов')
                  :
                    setErrorPassword('')
                }}
              />
            </View>
            
            <View style={s.policy}>
              <Checkbox
                isChecked={isPolicyChecked}
                onPress={(checked: boolean) => setIsPolicyChecked(checked)}
              />

              <View>
                <Text style={s.footnote}>
                  Я прочитал и принимаю следующие
                </Text>
                
                <TouchableOpacity onPress={() => navigation.navigate(Screens.TERMS_OF_USE)}>
                  <Text style={[s.footnote, s.blueText]}>
                    условия использования
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button 
              type='primary'
              text='Регистрация'
              styles={s.signUpBtn}
              onPress={() => handleClickSignUp(login, password)}
              isDisabled={
                !login || 
                !password ||
                !confirmedPassword ||
                !isPolicyChecked ||
                !!errorLogin ||
                !!errorPassword ||
                !!errorConfirmedPassword
              }
            />
            <Button 
              type='link'
              text='Уже зарегистрированы?'
              onPress={() => navigation.push(Screens.SIGN_IN)}
            />
          </Panel>
        </View>
      </View>
    </ImageBackground>
  )
};
