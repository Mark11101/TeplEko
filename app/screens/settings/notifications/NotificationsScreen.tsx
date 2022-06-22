import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Screens } from '../../../constants/Routes';
import RootStackParamsList from '../../RootStackParams';
import { Panel, Switch, Divider } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { useRequestRoomsQuery, useRequestRoomGroupsQuery } from '../../../redux/requests/rooms';

import s from './NotificationsScreen.styles';

export const NotificationsScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.NOTIFICATIONS>>();

  const { 
    data: rooms, 
    refetch: refetchRooms,
  } = useRequestRoomsQuery();

  const { 
    data: roomGroups, 
    refetch: refetchRoomGroups,
  } = useRequestRoomGroupsQuery();

  const [isOfflineModeNotificationOn, setIsOfflineModeNotificationOn] = useState(false);
  const [isLowTempNotificationOn, setIsLowTempNotificationOn] = useState(false);

  return (
    <>
      <Navbar 
        header='Уведомления'
        withGoBackBtnIcon
        rooms={rooms}
        roomGroups={roomGroups}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        goBack={() => navigation.goBack()}
        navigate={navigation.navigate}
      />
      <View style={s.notificationScreen}>
        <Panel styles={s.panel}>
          <View style={s.panelItem}>
            <Switch 
              title='Получать уведомления, если термостат переходит в автономный режим'
              value={isOfflineModeNotificationOn}
              onValueChange={() => setIsOfflineModeNotificationOn(!isOfflineModeNotificationOn)} 
            />
          </View>
          <Divider styles={s.divider} />
          <View>
            <Switch 
              title='Получать уведомления о слишком низкой температуре'
              value={isLowTempNotificationOn}
              onValueChange={() => setIsLowTempNotificationOn(!isLowTempNotificationOn)} 
            />
          </View>
        </Panel>
      </View>
    </>
  )
};
