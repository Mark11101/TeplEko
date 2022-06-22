import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { Button } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { Screens } from '../../../constants/Routes';
import { useRequestRoomsQuery, useRequestRoomGroupsQuery } from '../../../redux/requests/rooms';

import s from './ConfigurationScreen.styles';

export const ConfigurationScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.CONFIGURATION>>();

  const { 
    data: rooms, 
    refetch: refetchRooms,
  } = useRequestRoomsQuery();

  const { 
    data: roomGroups, 
    refetch: refetchRoomGroups,
  } = useRequestRoomGroupsQuery();

  return (
    <>
      <Navbar
        header='Изменение конфигурации'
        wrapHeader
        withGoBackBtnIcon
        rooms={rooms}
        styles={s.navbar}
        roomGroups={roomGroups}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />

      <View style={s.screen}>
        <Text style={s.text}>
          Только профессиональные монтажники могут изменять конфигурации системы в приложении и кнопкой.
        </Text>

        <Button 
          type='primary'
          text='Подтвердить'
          styles={s.button}
          onPress={() => console.log('')}
        />
      </View>
    </>
  )
}
