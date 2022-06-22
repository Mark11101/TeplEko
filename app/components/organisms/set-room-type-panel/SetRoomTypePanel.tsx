import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';

import { 
  Title,
  Panel,
  Divider,
  Button,
  Input,
} from '../../atoms';
import Mark from '../../../assets/images/mark.svg';
import { RoomGroup } from '../../../redux/types/room';

import s from './SetRoomTypePanel.styles';

interface Props {
  styles?: StyleProp<ViewStyle>,
  roomGroups: RoomGroup[],
  newRoomGroupName: string,
  selectedRoomGroupId: number | null,
  isErrorRoomGroupName: boolean,
  onChangeRoomGroupName: (name: string) => void;
  addRoomGroup: (name: string) => void;
  onChangeSelectedRoomGroup: (group: RoomGroup | null) => void;
}

export const SetRoomTypePanel: React.FC<Props> = (props) => {
  const {
    styles,
    roomGroups,
    newRoomGroupName,
    selectedRoomGroupId,
    isErrorRoomGroupName,
    addRoomGroup,
    onChangeRoomGroupName,
    onChangeSelectedRoomGroup,
  } = props;

  const [isAddRoomsGroupInputVisible, setIsAddRoomsGroupInputVisible] = useState(false);

  const handleAddRoomGroup = (newRoomGroupName: string) => {
      
    addRoomGroup(newRoomGroupName)
    onChangeRoomGroupName('')
    setIsAddRoomsGroupInputVisible(false)
  };

  return (
    <View style={styles}>
      <Title styles={s.title}>
        Выберите группу комнат
      </Title>
      <Panel styles={s.roomsWrapper}>
        {roomGroups && roomGroups.map((roomGroup: RoomGroup) => (
          <View key={roomGroup.id}>
            <TouchableOpacity 
              key={roomGroup.id}
              style={s.button}
              onPress={() => {
                selectedRoomGroupId === roomGroup.id
                ?
                  onChangeSelectedRoomGroup(null)
                :
                  (
                    onChangeSelectedRoomGroup(roomGroup),
                    onChangeRoomGroupName('')
                  )
              }}
            >
              <Text style={[
                s.text,
                selectedRoomGroupId === roomGroup.id && s.selectedText
              ]}>
                {roomGroup.name}
              </Text>
              {
                selectedRoomGroupId === roomGroup.id 
                &&
                 <Mark />
              }
            </TouchableOpacity>
            <Divider styles={s.divider} />
          </View>
        ))}
        {
          isAddRoomsGroupInputVisible && (selectedRoomGroupId === null)
          ?
            <>
              <Input
                styles={s.newRoomGroupInput}
                value={newRoomGroupName}
                placeholder='Напр.: Жилая зона'
                isError={isErrorRoomGroupName}
                onChange={(text: string) => onChangeRoomGroupName(text)}
              />
              <Button
                type='primary'
                text='Добавить'
                onPress={() => handleAddRoomGroup(newRoomGroupName)}
                isDisabled={!newRoomGroupName || isErrorRoomGroupName}
              />
            </>
          :
            <Button
              type='addBtn'
              text='Добавить группу комнат'
              onPress={() => {
                onChangeSelectedRoomGroup(null)
                setIsAddRoomsGroupInputVisible(true)
              }}
            />
        }
      </Panel>
    </View>
  )
}
