import React from 'react';
import { View, Text } from 'react-native';
import Pulse from 'react-native-pulse';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { GradientView, Button, Title } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { AddRoomModal } from '../../../modals';
import { Screens } from '../../../constants/Routes';

import s from './AddConnectionScreen.styles';

export const AddConnectionScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.ADD_CONNECTION>>();

  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = React.useState(false);

  const isThermostatFinded = false;
  
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
        <View style={s.search}>
          <View style={s.pulse}>
            <Pulse 
              color='white' 
              diameter={250} 
              duration={1000} 
              speed={20} 
              numPulses={5} 
            />
          </View>
          
          <Title styles={s.title}>
            {
              isThermostatFinded
              ?
                'Что-то нашлось!'
              :
                'Поиск...'
            }
          </Title>

          <Text style={s.helpText}>
            Убедитесь, что устройство подключено к 
            сети и расположено рядом с телефоном.
          </Text>
        </View>

        <View style={s.controlBtns}>
          <Button 
            type='default'
            text='Добавить вручную'
            styles={s.addManuallyBtn}
            onPress={() => ({})}
          />
          <Button 
            type='secondary'
            text='Добавить комнату'
            onPress={() => setIsAddRoomModalVisible(true)}
          />
          {/* <Button 
            type='secondary'
            text='Повтор'
            onPress={() => ({})}
          /> */}
        </View>
      </View>
      <AddRoomModal 
        isVisible={isAddRoomModalVisible} 
        onClose={() => setIsAddRoomModalVisible(false)}
      />
    </GradientView>
  )
}
