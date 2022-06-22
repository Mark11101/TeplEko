import moment from 'moment';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';

import { 
  Title, 
  Input, 
  Panel, 
  Button, 
} from '../../components/atoms';
import { 
  useRequestAddRoomGroupMutation,
  useRequestEditRoomMutation,
  useRequestEditRoomGroupMutation,
  useRequestDeleteRoomMutation,
  useRequestDeleteRoomGroupMutation,
} from '../../redux/requests/rooms';
import { Screens } from '../../constants/Routes';
import Cross from '../../assets/images/cross.svg';
import { ExtendedRoomSettingsModal } from '../index';
import RootStackParamsList from '../../screens/RootStackParams';
import { WeekdaysTypes } from '../../redux/types/common';
import RightArrow from '../../assets/icons/right-arrow.svg';
import { Modal, SetRoomTypePanel } from '../../components/organisms';
import { Room, RoomGroup, RoomOrRoomGroup } from '../../redux/types/room';
import convertWeekdayTypeToIndex from '../../utils/convertWeekdayTypeToIndex';

import s from './EditRoomModal.styles';

interface Props {
  rooms: Room[],
  room: Room | RoomGroup,
  roomGroups: RoomGroup[],
  isVisible: boolean,
  onClose: () => void,
  refetchRooms: () => void;
  refetchRoomGroups: () => void;
  navigation: StackNavigationProp<RootStackParamsList, Screens.ROOMS_SETTINGS>
}

export const EditRoomModal: React.FC<Props> = (props) => {
  const {
    room,
    rooms,
    roomGroups,
    isVisible,
    refetchRooms,
    refetchRoomGroups,
    onClose,
    navigation,
  } = props;
  
  const roomId = room && room.id;

  const todayIndex = new Date().getDay();

  const isRoom = room && 'roomGroup' in room;
  const isRoomGroup = room && 'rooms' in room;

  const [ 
    requestDeleteRoom,
    {
      isSuccess: isDeleteRoomSuccess,
      isLoading: isDeleteRoomLoading
    }
  ] = useRequestDeleteRoomMutation();

  const [ 
    requestDeleteRoomGroup,
    {
      isSuccess: isDeleteRoomGroupSuccess,
      isLoading: isDeleteRoomGroupLoading,
      isError: isDeleteRoomGroupError,
    }
  ] = useRequestDeleteRoomGroupMutation();

  const [
    requestEditRoom,
    {
      isSuccess: isEditRoomSuccess
    }
  ] = useRequestEditRoomMutation();

  const [
    requestEditRoomGroup,
    {
      isSuccess: isEditRoomGroupSuccess
    }
  ] = useRequestEditRoomGroupMutation();

  const [ 
    requestAddRoomGroup, 
    { 
      isSuccess: isAddRoomGroupSuccess,
    } 
  ] = useRequestAddRoomGroupMutation();

  const [roomName, setRoomName] = useState('');
  const [newRoomGroupName, setNewRoomGroupName] = useState('');
  const [selectedRoomGroup, setSelectedRoomGroup] = useState<RoomGroup | null>();

  const [isErrorRoomNameExist, setIsErrorRoomNameExist] = useState(false);
  const [isErrorRoomGroupNameExist, setIsErrorRoomGroupNameExist] = useState(false);

  const [isExtendedRoomSettingsModalVisible, setIsExtendedRoomSettingsModalVisible] = useState(false);

  React.useEffect(() => {

    if (isEditRoomSuccess) {
      refetchRooms()
      refetchRoomGroups()
    } 

  }, [isEditRoomSuccess])

  React.useEffect(() => {

    if (isEditRoomGroupSuccess) {
      refetchRooms()
      refetchRoomGroups()
    } 

  }, [isEditRoomGroupSuccess])

  React.useEffect(() => {

    if (room) {

      setRoomName(room.name)
  
      if ('roomGroup' in room) {
        setSelectedRoomGroup(room.roomGroup)
      }
    }
  }, [room])

  React.useEffect(() => {

    if (isAddRoomGroupSuccess) {
      refetchRoomGroups()
      refetchRooms()
    }

  }, [isAddRoomGroupSuccess])

  React.useEffect(() => {

    if (isAddRoomGroupSuccess) {

      const createdAtRoomGroups = roomGroups.map((roomGroup: RoomGroup) => moment(roomGroup.createdAt)); 
      const lastCreatedRoomGroup = moment.max(createdAtRoomGroups);

      const findedRoomGroup = roomGroups.find((roomGroup) => moment(roomGroup.createdAt).isSame(lastCreatedRoomGroup));

      setSelectedRoomGroup(findedRoomGroup)
    }

  }, [roomGroups])

  React.useEffect(() => {

    if (isDeleteRoomGroupSuccess) {
      refetchRoomGroups()
      navigation.navigate(Screens.HOME)
    }
  }, [isDeleteRoomGroupSuccess])

  React.useEffect(() => {
    isDeleteRoomSuccess && refetchRooms()
  }, [isDeleteRoomSuccess])

  const handleAddRoomGroup = (roomGroupName: string) => {
      
    requestAddRoomGroup({
      name: roomGroupName,
      temperature: 24,
      isOnPause: false,
      isAtHomeFunctionOn: false,
      rooms: [],
      weekdaysSchedule: [],
      heatingIntervals: [],
    })
  };

  const checkIfNameALreadyUsed = (
    name: string, 
    rooms: Room[], 
    roomGroups: RoomGroup[],
    callBack: (result: boolean) => void,
  ) => {

    const isNameAlreadyUsedInRooms = rooms.find((room) => room.name === name);
    const isNameAlreadyUsedInGroups = roomGroups.find((group) => group.name === name);

    (isNameAlreadyUsedInRooms || isNameAlreadyUsedInGroups)
    ?
      callBack(true)
    :
      callBack(false)
  };

  const handleChangeRoomGroupName = (name: string) => {
    
    name.length <= 30 && setNewRoomGroupName(name)

    checkIfNameALreadyUsed(
      name,
      rooms,
      roomGroups,
      (result) => setIsErrorRoomGroupNameExist(result),
    )
  };

  const handleChangeRoomName = (name: string) => {

    name.length <= 30 && setRoomName(name)

    name !== room.name && checkIfNameALreadyUsed(
      name,
      rooms,
      roomGroups,
      (result) => setIsErrorRoomNameExist(result),
    )
  }

  const handleDeleteRoom = (roomId: number) => {

    Alert.alert(
      "Вы уверены, что хотите удалить комнату?",
      "",
      [
        {
          text: "Нет"
        },
        { 
          text: "Да", 
          onPress: () => requestDeleteRoom({ id: roomId }).then(() => {
            refetchRoomGroups()
            navigation.navigate(Screens.HOME)
          })
        }
      ]
    );
  };

  const deleteAllRoomsInRoomGroup = async (roomGroup: RoomGroup) => {
    
    roomGroup.rooms.forEach((room) => {
      requestDeleteRoom({ id: room.id }) 
    })
  };

  const deleteRoomGroup = async (roomId: number) => {
    
    requestDeleteRoomGroup({ id: roomId })
  }
  
  const deleteRoomGroupAndRooms = (roomGroup: RoomGroup) => {

    deleteAllRoomsInRoomGroup(roomGroup)
      .then(() => deleteRoomGroup(roomGroup.id))
      .then(() => {

        refetchRooms()
        refetchRoomGroups()
      })
  }

  const handleDeleteRoomGroup = async (roomGroup: RoomGroup) => {

    const isRoomGroupHasRooms = roomGroup.rooms.length !== 0;

    Alert.alert(
      isRoomGroupHasRooms
      ?
        "При удалении будут также удалены все дочерние комнаты!"
      :
        'Вы уверены, что хотите удалить группу комнат?',
      
      isRoomGroupHasRooms
      ?
        "Вы уверены, что хотите удалить группу комнат?"
      :
        '',
      [
        {
          text: "Нет"
        },
        { 
          text: "Да", 
          onPress: () => deleteRoomGroupAndRooms(roomGroup)
        }
      ]
    );
  }

  const isWeekScheduleModeOn = 
    room && 
    room.weekdaysSchedule &&
    room.weekdaysSchedule.length !== 0;

  const handleCreateWeekdaysSchedule = () => {
    
    if (!isWeekScheduleModeOn) {

      const initialWeekdaysSchedule = [
        {
          heatingIntervals: [],
          day: WeekdaysTypes.MONDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.TUESDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.WEDNESDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.THURSDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.FRIDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.SATURDAY
        },
        {
          heatingIntervals: [],
          day: WeekdaysTypes.SUNDAY
        },
      ];

      const filteredWeekdaysSchedule = initialWeekdaysSchedule.filter((schedule) => convertWeekdayTypeToIndex(schedule.day) !== todayIndex);
      const findedWeekdaysSchedule = initialWeekdaysSchedule.find((schedule) => convertWeekdayTypeToIndex(schedule.day) === todayIndex);

      const data: RoomOrRoomGroup | undefined = room && filteredWeekdaysSchedule && findedWeekdaysSchedule && {
        ...room,
        weekdaysSchedule: [
          ...filteredWeekdaysSchedule,
          {
            ...findedWeekdaysSchedule,
            heatingIntervals: room.heatingIntervals
          }
        ],
      };

      if (room) {

        if (isRoomGroup) {
  
          requestEditRoomGroup({
            roomId: room.id,
            data: data as RoomGroup
          }).then(
  
            () => data && data.rooms && data.rooms.forEach((roomInRoomGroup: Room) => (
              requestEditRoom({
                roomId: roomInRoomGroup.id,
                data: {
                  ...roomInRoomGroup,
                  weekdaysSchedule: data.weekdaysSchedule || [],
                }
              })
            ))
            
          ).then(
            () => {
              handleClose()
              navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: room.id })
            }
          )
        } else {
          requestEditRoom({
            roomId,
            data: data as Room
          }).then(
            () => {
              handleClose()
              navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: room.id })
            }
          )
        }
      }
    } 
  }

  const handleClose = () => {
    
    'roomGroup' in room
    && 
      setSelectedRoomGroup(room.roomGroup)
    
    onClose()
  }
  
  const handleClickSave = () => {

    isRoom
    ?
      requestEditRoom({
        roomId,
        data: {
          ...room,
          name: roomName,
          roomGroup: selectedRoomGroup as RoomGroup,
        }
      })
    :
      requestEditRoomGroup({
        roomId,
        data: {
          ...room as RoomGroup,
          name: roomName,
        }
      })

    handleClose()
  }
  
  return (
    <Modal 
      isVisible={isVisible} 
      onClose={handleClose}
    >
      <View style={s.closeBtnView}>
        <TouchableOpacity onPress={handleClose}>
          <Cross />  
        </TouchableOpacity>
      </View>
      <ScrollView style={s.scrollView}>
        <View style={s.block}>
          <Title styles={s.title}>
            {
              isRoom
              ?
                'Название комнаты'
              :
                'Название группы комнат'
            }
          </Title>
          <Input
            value={roomName}
            placeholder={roomName}
            isError={isErrorRoomNameExist}
            onChange={(text) => handleChangeRoomName(text)}
          />
          {
            isErrorRoomNameExist
            &&
              <Text style={s.errorText}>
                Такая комната или группа уже есть
              </Text>
          }
        </View>
        {
          isRoom
          &&
            <View style={s.block}>
              <SetRoomTypePanel 
                roomGroups={roomGroups}
                newRoomGroupName={newRoomGroupName}
                selectedRoomGroupId={selectedRoomGroup?.id || null}
                isErrorRoomGroupName={isErrorRoomGroupNameExist}
                addRoomGroup={handleAddRoomGroup}
                onChangeRoomGroupName={(name) => handleChangeRoomGroupName(name)}
                onChangeSelectedRoomGroup={(group) => setSelectedRoomGroup(group)}
              />
              {
                isErrorRoomGroupNameExist
                &&
                  <Text style={[s.errorText, s.errorRoomGroupText]}>
                    Такая группа или комната уже есть
                  </Text>
              }
            </View>
        }
        <Button 
          type='primary'
          text='Сохранить'
          styles={s.saveBtn}
          onPress={handleClickSave}
          isDisabled={
            isErrorRoomNameExist || 
            isErrorRoomGroupNameExist ||
            (
              room && 'roomGroup' in room
              ?
                (
                  roomName === room.name &&
                  selectedRoomGroup === room.roomGroup
                )
              :
                room && (roomName === room.name)
            )
          }
        />
        <View style={s.block}>
          <Title styles={s.title}>
            Расписание
          </Title>
          <Panel>
            {/* {
              isWeekScheduleModeOn
              &&
                <>
                  <Switch 
                    styles={[s.panelItem, { paddingVertical: 10 }]}
                    title='Использовать расписание'
                    value={room.isAtHomeFunctionOn}
                    onValueChange={() => ({})}
                  />
                  <Divider />
                </>
            } */}
            <TouchableOpacity 
              style={s.panelItem}
              onPress={() => {
                if (isWeekScheduleModeOn) {
                  navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: room.id })
                  onClose()
                } else {
                  handleCreateWeekdaysSchedule()
                }
              }}
            >
              <Text style={s.panelItemText}>
                {
                  isWeekScheduleModeOn
                  ?
                    'Изменить расписание'
                  :
                    'Создать расписание'
                }
                
              </Text>
              <RightArrow />
            </TouchableOpacity>
          </Panel>
        </View>
        <View style={s.block}>
          <Title styles={s.title}>
            Настройки
          </Title>
          <Panel>
            <TouchableOpacity 
              style={s.panelItem}
              onPress={() => setIsExtendedRoomSettingsModalVisible(true)}
            >
              <Text style={s.panelItemText}>
                Расширенные настройки
              </Text>
              <RightArrow />
            </TouchableOpacity>
          </Panel>
        </View>
        <Button 
          type='delete'
          text={
            isRoom
            ?
              'Удалить комнату'
            :
              'Удалить группу комнат'
          }
          styles={s.deleteBtn}
          isLoading={isDeleteRoomLoading || isDeleteRoomGroupLoading}
          onPress={() => {
            isRoomGroup
            ?
              handleDeleteRoomGroup(room as RoomGroup)
            :
              handleDeleteRoom(roomId)
          }}
        />
        <Panel styles={s.errorPanel}>
          {
            isDeleteRoomGroupError
            &&
              <Text style={s.errorPanelText}>
                Произошла ошибка, попробуйте еще раз
              </Text>
          }
        </Panel>
      </ScrollView>
      <ExtendedRoomSettingsModal 
        isVisible={isExtendedRoomSettingsModalVisible}
        onClose={() => setIsExtendedRoomSettingsModalVisible(false)}
      />
    </Modal>
  )
}
