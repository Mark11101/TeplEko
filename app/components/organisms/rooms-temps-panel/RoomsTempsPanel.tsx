import { 
  View, 
  TouchableOpacity, 
  Text, StyleProp, 
  ViewStyle 
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Room } from '../../../redux/types/room';
import { Title, Panel, Divider, Button } from '../../atoms';
import RootStackParamsList from '../../../screens/RootStackParams';

import s from './RoomsTempsPanel.styles';
import { Screens } from '../../../constants/Routes';

type RoomNameAndTemperature = Pick<Room, 'id' | 'name' | 'temperature'>;

interface Props {
  title: string,
  disabled?: boolean,
  roomGroupId?: number,
  isRoomsClickable?: boolean,
  rooms: RoomNameAndTemperature[],
  styles?: StyleProp<ViewStyle>,
  openAddRoomModal?: () => void,
}

export const RoomsTempsPanel: React.FC<Props> = (props) => {
  const {
    title,
    rooms,
    styles,
    disabled,
    roomGroupId,
    isRoomsClickable = true,
    openAddRoomModal,
  } = props;

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <View style={[s.roomsPanel, styles]}>
      {
        roomGroupId
        ?
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.ROOMS_SETTINGS, { roomId: roomGroupId })}
            disabled={!isRoomsClickable}
          >
            <Title styles={[s.title, disabled && s.disabledText]}>
              {title}
            </Title>
          </TouchableOpacity>
        :
          <Title styles={[s.title, disabled && s.disabledText]}>
            {title}
          </Title>
      }
      <Panel styles={s.roomsWrapper}>
        {
          rooms && 
          rooms
            .map((room: RoomNameAndTemperature, index: number) => (
              <View key={room.id}>
                {
                  index !== 0
                  && 
                    <Divider styles={{ marginVertical: 12 }}/>
                }
                <TouchableOpacity 
                  style={s.room} 
                  onPress={() => navigation.navigate(Screens.ROOMS_SETTINGS, { roomId: room.id })}
                  disabled={!isRoomsClickable}
                >
                  <Text style={[s.roomName, disabled && s.disabledText]}>
                    {room.name}
                  </Text>

                  {/* <View style={s.temp}>
                    {
                      (room.temperature ^ 0) === room.temperature
                      ?
                        <Text style={s.bigValue}>
                          {room.temperature}°
                        </Text>
                      :
                        <>
                          <Text style={s.bigValue}>
                            {Math.floor(room.temperature)}.
                          </Text>
                          <Text style={s.smallValue}>
                            {room.temperature - Math.floor(room.temperature)}°
                          </Text>
                        </>
                    }
                  </View> */}
                </TouchableOpacity>
              </View>
            ))
        }
        {
          rooms.length === 0
          &&
            <Button
              type='addBtn'
              text='Добавить комнату'
              onPress={() => openAddRoomModal && openAddRoomModal()}
            />
        }
      </Panel>
    </View>
  )
}
