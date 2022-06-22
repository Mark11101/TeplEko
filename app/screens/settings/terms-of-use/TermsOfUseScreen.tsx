import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { Navbar } from '../../../components/organisms';
import { Screens } from '../../../constants/Routes';
import { useRequestRoomsQuery, useRequestRoomGroupsQuery } from '../../../redux/requests/rooms';

import s from './TermsOfUseScreen.styles';

export const TermsOfUseScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.TERMS_OF_USE>>();

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
        header='Пользовательское соглашение'
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

      <ScrollView style={s.screen}>
        <View style={s.screenWrapper}>
          <Text style={s.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            In accumsan eget nisl a auctor. Vestibulum erat tortor, tincidunt a nibh at, blandit feugiat nunc. 
            Nullam ac hendrerit lacus, ut lobortis nunc. Morbi at nisi tortor. 
            Proin quis nulla in sapien commodo auctor eu vel lectus. 
            Donec imperdiet tincidunt egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
            Donec a risus nulla. 
            Aliquam sit amet elit in felis pulvinar lacinia. 
            In interdum, ipsum ac iaculis tincidunt, elit erat convallis ante, in dictum justo nisi quis neque. 
            Nullam a eros ultricies mauris congue posuere.
          </Text>

          <Text style={s.text}>
            Curabitur porta elit non orci fermentum, quis interdum metus feugiat. 
            Donec eget ex vitae ante feugiat pretium. In ac sapien eu risus feugiat consequat. 
            Etiam cursus nibh non nisl faucibus, quis tempus nunc consequat. 
            Praesent condimentum quis nisi rutrum sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aliquam bibendum purus vitae turpis pulvinar, finibus lobortis risus congue.
          </Text>

          <Text style={s.text}>
            Maecenas scelerisque fermentum felis eu mollis. 
            Fusce cursus ligula ut eros pretium, sit amet ornare libero sollicitudin. 
            Fusce eu iaculis ligula. Aliquam quis bibendum nunc, nec feugiat diam. 
            Proin lacinia, est sit amet posuere ornare, risus justo cursus sapien, a congue orci eros ullamcorper neque. 
            In id orci quam. Proin nec eleifend lorem. 
            Quisque eget orci nec purus commodo sagittis.
          </Text>

          <Text style={s.text}>
            Nulla at consequat ante. 
            Proin a diam ac enim venenatis efficitur. 
            Curabitur quis lacinia urna. Nulla tempor vulputate gravida. 
            Vivamus ultrices orci enim, ac congue diam condimentum sed. 
            Suspendisse iaculis convallis bibendum. 
            Mauris aliquam, velit vitae convallis ullamcorper, orci felis efficitur diam, eu sollicitudin enim augue a libero. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          </Text>
        </View>
      </ScrollView>
    </>
  )
}
