import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { GradientView, Button } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { Screens } from '../../../constants/Routes';
import Preview from '../../../assets/images/preview.svg';

import s from './PreviewConnectionScreen.styles';

export const PreviewConnectionScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.PREVIEW_CONNECTION>>();

  const isThermostatFinded = true;
  
  return (
    <GradientView>
      <Navbar 
        header='Добавить устройство'
        withGoBackBtnIcon
        isLight
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />
      <View style={s.screen}>
        <View style={s.content}>
          <Preview style={s.preview}/>

          <Text style={s.helpText}>
            Вы можете подключить еще терморегуляторы 
            либо завершить подключение
          </Text>
        </View>

        <View style={s.footer}>
          {
            isThermostatFinded
            ?
              <>
                <Button 
                  type='default'
                  text='Подключить еще'
                  onPress={() => navigation.navigate(Screens.ADD_CONNECTION)}
                />
                <Button 
                  type='secondary'
                  text='Завершить подключение'
                  styles={s.finishBtn}
                  onPress={() => navigation.navigate(Screens.HOME)}
                />
              </>
            :
              <Button 
                type='default'
                text='Подключить терморегулятор'
                onPress={() => navigation.navigate(Screens.ADD_CONNECTION)}
              />
          }
        </View>
      </View>
    </GradientView>
  )
};
