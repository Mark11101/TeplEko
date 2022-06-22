import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

import {
  useRequestToggleRoomAtHomeFunctionMutation,
  useRequestToggleRoomGroupAtHomeFunctionMutation,
} from '../../redux/requests/rooms';
import { AddRoomModal } from '..';
import { RootState } from '../../redux';
import { Modal } from '../../components/organisms';
import { Room, RoomGroup } from '../../redux/types/room';
import PowerOnIcon from '../../assets/icons/power-on.svg';
import { toggleIsAtHome } from '../../redux/slices/system';
import PowerOffIcon from '../../assets/icons/power-off.svg';
import AtHomeIcon from '../../assets/icons/at-home-with-bg.svg';
import OutHomeIcon from '../../assets/icons/out-home-with-bg.svg';
import { Panel, Divider, Switch, Button } from '../../components/atoms';

import s from './AtHomeSettingsModal.styles';
import convertWeekdayTypeToIndex from '../../utils/convertWeekdayTypeToIndex';

interface Props {
  rooms: Room[],
  roomGroups: RoomGroup[],
  isVisible: boolean;
  refetchRooms: () => void;
  refetchRoomGroups: () => void;
  onClose: () => void;
}

export const AtHomeSettingsModal: React.FC<Props> = (props) => {
  const {
    rooms,
    roomGroups,
    isVisible,
    refetchRooms,
    refetchRoomGroups,
    onClose,
  } = props;

  const dispatch = useDispatch();

  const system = useSelector((state: RootState) => state.system);

  const [
    requestToggleRoomAtHomeFunction, 
    { 
      isSuccess: isToggleRoomAtHomeFunctionSuccess, 
    }
  ] = useRequestToggleRoomAtHomeFunctionMutation();

  const [
    requestToggleRoomGroupAtHomeFunction, 
    { 
      isSuccess: isToggleRoomGroupAtHomeFunctionSuccess, 
    }
  ] = useRequestToggleRoomGroupAtHomeFunctionMutation();

  React.useEffect(() => {

    if (isToggleRoomAtHomeFunctionSuccess) {
      refetchRooms()
      refetchRoomGroups()
    }

  }, [isToggleRoomAtHomeFunctionSuccess])

  React.useEffect(() => {

    if (isToggleRoomGroupAtHomeFunctionSuccess) {
      refetchRoomGroups()
      refetchRooms()
    }

  }, [isToggleRoomGroupAtHomeFunctionSuccess])

  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = React.useState(false);
  
  const isAtHome  = system.isAtHome;

  const separatedRooms = rooms && rooms.filter((room) => room.roomGroup === null);

  const sortRooms = (rooms: Room[]) => [...rooms].sort((a, b) => a.id - b.id);

  const sortedSeparatedRooms = separatedRooms && sortRooms(separatedRooms);

  const sortedRoomGroups = roomGroups && [...roomGroups].sort((a, b) => a.id - b.id);

  const todayIndex = new Date().getDay();

  const handleTogglePanel = () => {

    dispatch(toggleIsAtHome(!isAtHome))
    
    roomGroups.map((roomGroup) => {

      requestToggleRoomGroupAtHomeFunction({
        id: roomGroup.id,
        data: {
          ...roomGroup,
          isAtHomeFunctionOn: false,
          heatingIntervals: [],
        }
      })
    })

    rooms.map((room) => {

      requestToggleRoomAtHomeFunction({
        id: room.id,
        data: {
          ...room,
          isAtHomeFunctionOn: false,
          heatingIntervals: []
        }
      })
    })
  }

  const handleToggleRoom = (room: Room, value: boolean) => {

    // dispatch(toggleAtHomeFunctionOfRoom({ id: room.id }))
    
    if (value) {

      if (room.weekdaysSchedule.length !== 0) {
  
        const filteredWeekdays = room.weekdaysSchedule.filter((schedule) => convertWeekdayTypeToIndex(schedule.day) !== todayIndex);
        const findedWeekday = room.weekdaysSchedule.find((schedule) => convertWeekdayTypeToIndex(schedule.day) === todayIndex);
  
        filteredWeekdays && findedWeekday && requestToggleRoomAtHomeFunction({
          id: room.id,
          data: {
            ...room,
            isAtHomeFunctionOn: value,
            weekdaysSchedule: [
              ...filteredWeekdays,
              {
                ...findedWeekday,
                heatingIntervals: [
                  {
                    start: moment(new Date()).format('hh:mm'),
                    end: '24:00',
                    temperature: 24,
                  }
                ]
              }
            ]
          }
        })
      } else {
  
        requestToggleRoomAtHomeFunction({
          id: room.id,
          data: {
            ...room,
            isAtHomeFunctionOn: value,
            heatingIntervals: [
              {
                start: moment(new Date()).format('hh:mm'),
                end: '24:00',
                temperature: 24,
              }
            ]
          }
        })
      }
    } else {

      if (room.weekdaysSchedule.length !== 0) {
  
        const filteredWeekdays = room.weekdaysSchedule.filter((schedule) => convertWeekdayTypeToIndex(schedule.day) !== todayIndex);
        const findedWeekday = room.weekdaysSchedule.find((schedule) => convertWeekdayTypeToIndex(schedule.day) === todayIndex);
  
        filteredWeekdays && findedWeekday && requestToggleRoomAtHomeFunction({
          id: room.id,
          data: {
            ...room,
            isAtHomeFunctionOn: value,
            weekdaysSchedule: [
              ...filteredWeekdays,
              {
                ...findedWeekday,
                heatingIntervals: []
              }
            ]
          }
        })
      } else {
  
        requestToggleRoomAtHomeFunction({
          id: room.id,
          data: {
            ...room,
            isAtHomeFunctionOn: value,
            heatingIntervals: []
          }
        })
      }
    }
  };

  const handleToggleRoomGroup = (roomGroup: RoomGroup, value: boolean) => {
    
    // dispatch(toggleAtHomeFunctionOfRoomGroup({ id: roomGroup.id }))

    if (value) {

      if (roomGroup.weekdaysSchedule.length !== 0) {
        
        const filteredWeekdays = roomGroup.weekdaysSchedule.filter((schedule) => convertWeekdayTypeToIndex(schedule.day) !== todayIndex);
        const findedWeekday = roomGroup.weekdaysSchedule.find((schedule) => convertWeekdayTypeToIndex(schedule.day) === todayIndex);
  
        findedWeekday && requestToggleRoomGroupAtHomeFunction({
          id: roomGroup.id,
          data: {
            ...roomGroup,
            isAtHomeFunctionOn: value,
            weekdaysSchedule: [
              ...filteredWeekdays,
              {
                ...findedWeekday,
                heatingIntervals: [
                  {
                    start: moment(new Date()).format('hh:mm'),
                    end: '24:00',
                    temperature: 24,
                  }
                ]
              }
            ]
          }
        }).then(() => {

          const roomsInGroup = roomGroup.rooms;
    
          roomsInGroup !== null && roomsInGroup.forEach((roomInGroup) => (
    
            findedWeekday && requestToggleRoomAtHomeFunction({
              id: roomInGroup.id,
              data: {
                ...roomInGroup,
                isAtHomeFunctionOn: value,
                weekdaysSchedule: [
                  ...filteredWeekdays,
                  {
                    ...findedWeekday,
                    heatingIntervals: [
                      {
                        start: moment(new Date()).format('hh:mm'),
                        end: '24:00',
                        temperature: 24,
                      }
                    ]
                  }
                ]
              }
            })
          ))
        })
  
      } else {
        
        requestToggleRoomGroupAtHomeFunction({
          id: roomGroup.id,
          data: {
            ...roomGroup,
            isAtHomeFunctionOn: value,
            heatingIntervals: [
              {
                start: moment(new Date()).format('hh:mm'),
                end: '24:00',
                temperature: 24,
              }
            ],
          }
        }).then(() => {

          const roomsInGroup = roomGroup.rooms;
      
          roomsInGroup !== null && roomsInGroup.forEach((roomInGroup) => (
      
            requestToggleRoomAtHomeFunction({
              id: roomInGroup.id,
              data: {
                ...roomInGroup,
                isAtHomeFunctionOn: value,
                heatingIntervals: [
                  {
                    start: moment(new Date()).format('hh:mm'),
                    end: '24:00',
                    temperature: 24,
                  }
                ]
              }
            })
          ))
        })
  
      }
    } else {

      if (roomGroup.weekdaysSchedule.length !== 0) {

        const filteredWeekdays = roomGroup.weekdaysSchedule.filter((schedule) => convertWeekdayTypeToIndex(schedule.day) !== todayIndex);
        const findedWeekday = roomGroup.weekdaysSchedule.find((schedule) => convertWeekdayTypeToIndex(schedule.day) === todayIndex);
  
        findedWeekday && requestToggleRoomGroupAtHomeFunction({
          id: roomGroup.id,
          data: {
            ...roomGroup,
            isAtHomeFunctionOn: value,
            weekdaysSchedule: [
              ...filteredWeekdays,
              {
                ...findedWeekday,
                heatingIntervals: []
              }
            ]
          }
        }).then(() => {

          const roomsInGroup = roomGroup.rooms;
    
          roomsInGroup !== null && roomsInGroup.forEach((roomInGroup) => (
    
            findedWeekday && requestToggleRoomAtHomeFunction({
              id: roomInGroup.id,
              data: {
                ...roomInGroup,
                isAtHomeFunctionOn: value,
                weekdaysSchedule: [
                  ...filteredWeekdays,
                  {
                    ...findedWeekday,
                    heatingIntervals: []
                  }
                ]
              }
            })
          ))
        })
  
      } else {
        
        requestToggleRoomGroupAtHomeFunction({
          id: roomGroup.id,
          data: {
            ...roomGroup,
            isAtHomeFunctionOn: value,
            heatingIntervals: [],
            rooms: roomGroup.rooms.map((room) => ({
              ...room,
              heatingIntervals: [],
            })),
          }
        }).then(() => {

          const roomsInGroup = roomGroup.rooms;
      
          roomsInGroup !== null && roomsInGroup.forEach((roomInGroup) => (
      
            requestToggleRoomAtHomeFunction({
              id: roomInGroup.id,
              data: {
                ...roomInGroup,
                isAtHomeFunctionOn: value,
                heatingIntervals: []
              }
            })
          ))
        })
      }
    }
  };

  return (
    <Modal 
      styles={s.modal}
      isVisible={isVisible} 
      onClose={onClose}
    >
      <View style={s.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={s.cancelBtnText}>
            Отмена
          </Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>
          Я дома
        </Text>
      </View>
      <Panel styles={s.atHomePanel}>
        <TouchableOpacity onPress={handleTogglePanel}>
          <View style={s.atHomePanelHeader}>
            <View style={s.atHome}>
              {
                isAtHome
                ?
                  <AtHomeIcon style={s.atHomeIcon} />
                :
                  <OutHomeIcon style={s.atHomeIcon} />
              }
              <Text style={isAtHome ? s.atHomeText : s.outHomeText}>
                Я дома
              </Text>
            </View>
            {
              isAtHome
              ?
                <PowerOnIcon />
              :
                <PowerOffIcon />
            }
          </View>
            <Text style={s.helpPanelDescription}>
              Функция автоматически устанавливает время работы в 
              <Text> {rooms && rooms.length !== 0 ? 'выбранных' : 'добавленных'}</Text> 
              <Text> комнатах начиная от текущего времени до полуночи</Text>
            </Text>
        </TouchableOpacity>
      </Panel>
      {
        rooms && rooms.length === 0
        ?
          <Button 
            type='primary'
            text='Добавить комнату'
            onPress={() => setIsAddRoomModalVisible(true)}
          />
        :
          <ScrollView style={s.scrollView}>
            {
              sortedRoomGroups
              &&
                sortedRoomGroups.map((roomGroup: RoomGroup, index: number) => (
                  <Panel key={roomGroup.id} styles={s.switchesPanel}>
                    <View style={s.switchItem}>
                      <Switch 
                        boldText
                        title={roomGroup.name}
                        value={roomGroup.isAtHomeFunctionOn}
                        onValueChange={(value) => handleToggleRoomGroup(roomGroup, value)}
                        disabled={!isAtHome}
                      />
                    </View>
                    {
                      sortedRoomGroups.length - 1 !== index
                      &&
                        <Divider />
                    }
                    {
                      roomGroup.rooms.length !== 0
                      &&
                        [...roomGroup.rooms]
                        .sort((a, b) => a.id - b.id)
                        .map((room: Room, index) => (
                          <View key={room.id}>
                            <View style={s.switchItem}>
                              <Switch 
                                title={room.name}
                                value={room.isAtHomeFunctionOn}
                                onValueChange={(value) => handleToggleRoom(room, value)}
                                disabled={!isAtHome}
                              />
                            </View>
                            {
                              Number(roomGroup.rooms.length) !== (index + 1)
                              &&
                                <Divider />
                            }
                          </View>
                        ))
                    }
                  </Panel>
                ))
            }
            {
              separatedRooms
              &&
                <Panel styles={s.switchesPanel}>
                  {sortedSeparatedRooms.map((room: Room) => (
                    <View key={room.id}>
                      <View style={s.switchItem}>
                        <Switch 
                          title={room.name}
                          value={room.isAtHomeFunctionOn}
                          onValueChange={(value) => handleToggleRoom(room, value)}
                          disabled={!isAtHome}
                        />
                      </View>
                      {
                        Number(sortedSeparatedRooms.length) !== 1
                        &&
                          <Divider />
                      }
                    </View>
                  ))}
                </Panel>
            }
          </ScrollView>
      }
      <AddRoomModal 
        rooms={rooms || []}
        roomGroups={roomGroups || []}
        isVisible={isAddRoomModalVisible}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        onClose={() => setIsAddRoomModalVisible(false)}
      />
    </Modal>
  )
}
