import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { GradientView, Input, Panel, Button } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { validateEmail } from '../../../utils/validations';
import { Screens } from '../../../constants/Routes'

import s from './EmailRecoveryScreen.styles';

export const EmailRecoveryScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.EMAIL_RECOVERY>>();
  
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const handleClickRecoverEmail = () => {
    if (validateEmail(email.trim())) {
      return;
    }
    
    setErrorEmail('Некорректный email');
  }

  return (
    <GradientView>
      <Navbar 
        header='Восстановление'
        withGoBackBtnIcon
        isLight
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />
      <View style={s.screen}> 
        <View style={s.errorWrapper}>
          {
            !!errorEmail
            &&
              <Panel styles={s.error}>
                <Text style={s.errorMessage}>
                  {errorEmail}
                </Text>
              </Panel>
          }
        </View>

        <View style={s.formWrapper}>
          <Panel styles={s.form}>
            <Text style={s.text}>
              Пожалуйста, укажите логин, который вы использовали для входа в приложение
            </Text>
            <Input
              value={email}
              placeholder='Email'
              isError={!!errorEmail}
              styles={s.emailInput}
              onChange={(text) => {
                !!errorEmail && setErrorEmail('');
                setEmail(text);
              }}
            />
            <Button 
              text='Далее'
              type='primary'
              onPress={handleClickRecoverEmail}
              isDisabled={!email || !!errorEmail}
            />
          </Panel>
        </View>
      </View>
    </GradientView>
  )
};