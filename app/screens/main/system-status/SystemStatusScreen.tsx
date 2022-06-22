import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Screens } from '../../../constants/Routes';
import RootStackParamsList from '../../RootStackParams';
import { Title } from '../../../components/atoms/title/Title';
import { Navbar } from '../../../components/organisms/navbar/Navbar';
import { useRequestRoomsQuery, useRequestRoomGroupsQuery } from '../../../redux/requests/rooms';

import s from './SystemStatusScreen.styles';

export const SystemStatusScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.SYSTEM_STATUS>>();

  const isNoEvents = true; // delete later

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
        header='Статус системы'
        withGoBackBtnIcon
        rooms={rooms}
        roomGroups={roomGroups}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        goBack={() => navigation.goBack()}
        navigate={navigation.navigate}
      />

      <View style={s.screen}>
        {
          isNoEvents
          &&
            <View style={s.noEvents}>
              <Title styles={s.title}>
                Нет событий
              </Title>

              <Text style={s.helpText}>
                Здесь появятся сообщения о работе терморегуляторов. 
                Например, если ( любой пример) 
              </Text>
          </View>
        }
      </View> 
    </>
  )
}
