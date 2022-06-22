import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { Panel, Divider } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { Screens } from '../../../constants/Routes';
import { useRequestRoomsQuery, useRequestRoomGroupsQuery } from '../../../redux/requests/rooms';

import s from './AppInfoScreen.styles';

export const AppInfoScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.APP_INFO>>();

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
        header='Информация о приложении'
        withGoBackBtnIcon
        wrapHeader
        rooms={rooms}
        styles={s.navbar}
        roomGroups={roomGroups}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />
      <View style={s.screen}>
        <Panel styles={s.list}>
          <View style={s.version}>
            <Text style={s.text}>
              Версия приложения
            </Text>
            <Text style={[s.text, s.muted]}>
              1.2.6
            </Text>
          </View>

          <Divider styles={s.divider} />

          <View>
            <Text style={s.text}>
              Идентификатор
            </Text>
            <Text style={[s.text, s.muted, s.identifier]}>
              263d4x672b3764xb2376
            </Text>
          </View>
        </Panel>
      </View>
    </>
  )
}
