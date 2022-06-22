import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { 
  useRequestRoomsQuery,
  useRequestEditRoomMutation,
  useRequestRoomGroupsQuery,
  useRequestEditRoomGroupMutation,
} from '../../../redux/requests/rooms';
import { RootState } from '../../../redux';
import { Screens } from '../../../constants/Routes';
import { Navbar } from '../../../components/organisms';
import RootStackParamsList from '../../RootStackParams';
import { Clock, Button } from '../../../components/atoms';
import Panel from '../../../components/atoms/panel/Panel';
import { Room, RoomGroup, ScheduleSection } from '../../../redux/types/room';
import convertWeekdayTypeToIndex from '../../../utils/convertWeekdayTypeToIndex';
import convertWeekdayTypeToCyrilicLetters from '../../../utils/convertWeekdayTypeToCyrilicLetters';

import s from './WeekScheduleScreen.styles';

export const WeekScheduleScreen: React.FC = () => {

  const { 
    refetch: refetchRooms,
  } = useRequestRoomsQuery();

  const { 
    refetch: refetchRoomGroups,
  } = useRequestRoomGroupsQuery();

  const [
    requestEditRoomMutation,
    {
      isSuccess: isEditRoomSuccess,
      isLoading: isEditRoomLoading,
    }
  ] = useRequestEditRoomMutation();

  const [
    requestEditRoomGroup,
    {
      isSuccess: isEditRoomGroupSuccess,
      isLoading: isEditRoomGroupLoading,
    }
  ] = useRequestEditRoomGroupMutation();

  if (isEditRoomSuccess || isEditRoomGroupSuccess) {
    
    showMessage({
      message: "Изменения успешно применены",
      type: "success",
    });
  }

  React.useEffect(() => {

    if (isEditRoomSuccess) {
      refetchRooms()
    }

  }, [isEditRoomSuccess])

  React.useEffect(() => {

    if (isEditRoomGroupSuccess) {
      refetchRoomGroups()
      refetchRooms()

      navigation.goBack()
    }
  }, [isEditRoomGroupSuccess])

  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const roomGroups = useSelector((state: RootState) => state.rooms.roomGroups);

  const route = useRoute<RouteProp<RootStackParamsList, Screens.WEEK_SCHEDULE>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.WEEK_SCHEDULE>>();

  const roomId = route.params.roomId;
  const copiedWeekday = route.params.copiedWeekday;

  const findedRoom = rooms && roomGroups && [...rooms, ...roomGroups].find((room) => room.id === roomId);
  
  const weekdaysSchedule = findedRoom && findedRoom.weekdaysSchedule;

  const sortedWeekdaysSchedule = weekdaysSchedule && [...weekdaysSchedule].sort((a, b) => convertWeekdayTypeToIndex(a.day) - convertWeekdayTypeToIndex(b.day));
  const sunday = sortedWeekdaysSchedule && sortedWeekdaysSchedule.shift();
  
  sortedWeekdaysSchedule && sunday && sortedWeekdaysSchedule.push(sunday)

  const isRoomGroup = findedRoom && 'rooms' in findedRoom;

  const [selectedWeekdaysIds, setSelectedWeekdaysIds] = React.useState([
    copiedWeekday && convertWeekdayTypeToIndex(copiedWeekday?.day)
  ]);

  const handlePressDeleteSchedule = () => {

    Alert.alert(
      "Вы уверены, что хотите удалить недельное расписание?",
      "",
      [
        {
          text: "Нет"
        },
        { 
          text: "Да", 
          onPress: () => handleDeleteWeekdaysSchedule()
        }
      ]
    );
  }

  const handleDeleteWeekdaysSchedule = () => {

    if (findedRoom) {

      if (isRoomGroup) {

        requestEditRoomGroup({
          roomId: findedRoom.id,
          data: {
            ...findedRoom as RoomGroup,
            weekdaysSchedule: [],
          }
        })
  
        'rooms' in findedRoom && 
        findedRoom.rooms.length !== 0 
        &&
          findedRoom.rooms.forEach((roomInGroup: Room) => 
            requestEditRoomMutation({
              roomId: roomInGroup.id,
              data: {
                ...roomInGroup,
                weekdaysSchedule: [],
              }
            })
          )

      } else {

        requestEditRoomMutation({
          roomId: findedRoom.id,
          data: {
            ...findedRoom as Room,
            weekdaysSchedule: [],
          }
        }).then(() => navigation.goBack())
      }
    }
  }
  
  const handleClickSave = () => {
    
    const editedWeekdays = findedRoom?.weekdaysSchedule.map((schedule: ScheduleSection) => (
      
      selectedWeekdaysIds.includes(schedule.id) && copiedWeekday
      ?
        {
          ...schedule,
          heatingIntervals: copiedWeekday.heatingIntervals.map((interval) => ({
            start: interval.start,
            end: interval.end,
            temperature: interval.temperature
          }))
        }
      :
        schedule
    ));
    
    if (isRoomGroup) {

      findedRoom && requestEditRoomGroup({
        roomId: findedRoom.id,
        data: {
          ...findedRoom as RoomGroup,
          weekdaysSchedule: editedWeekdays || [],
        }
      }).then(() => {

        findedRoom &&
        'rooms' in findedRoom && 
        findedRoom.rooms.length !== 0 
        &&
          findedRoom.rooms.forEach((roomInGroup: Room) => 
            requestEditRoomMutation({
              roomId: roomInGroup.id,
              data: {
                ...roomInGroup,
                weekdaysSchedule: editedWeekdays || [],
              }
            })
          )
      }).then(() => {
        refetchRoomGroups()
        refetchRooms()
      })

    } else {

      findedRoom && requestEditRoomMutation({
        roomId: findedRoom.id,
        data: {
          ...findedRoom as Room,
          weekdaysSchedule: editedWeekdays || [],
        }
      }).then(() => navigation.goBack())
    }

    // refetchRooms()
    // refetchRoomGroups()
  }
  
  return (
    <>
      <Navbar 
        withGoBackBtnIcon
        styles={s.navbar}
        numberOfLinesForHeader={2}
        header='Недельное расписание'
        goBack={() => navigation.goBack()}
        rightSideOptionBtn={
          <TouchableOpacity onPress={handlePressDeleteSchedule}>
            <Text>Удалить</Text>
          </TouchableOpacity>
        }
      />
      <View style={s.weekScheduleScreen}>
        <Panel styles={s.panel}>
          {
            sortedWeekdaysSchedule &&
            sortedWeekdaysSchedule.map((schedule, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={() => {

                  if (copiedWeekday) {

                    if (copiedWeekday.id !== schedule.id) {

                      const findedWeekdayId = selectedWeekdaysIds.find((id) => id === schedule.id);
  
                      findedWeekdayId
                      ?
                        setSelectedWeekdaysIds(
                          selectedWeekdaysIds.filter((id) => id !== schedule.id)
                        )
                      :
                        setSelectedWeekdaysIds([
                          ...selectedWeekdaysIds,
                          schedule.id,
                        ])
                    }

                  } else {
                    navigation.navigate(Screens.ROOMS_SETTINGS, { roomId: roomId, weekdayIndex: convertWeekdayTypeToIndex(schedule.day) })
                  }
                }}
              >
                <Clock 
                  day={convertWeekdayTypeToCyrilicLetters(schedule.day)} 
                  times={schedule.heatingIntervals}
                  styles={s.clock}
                  isNotActive={
                    copiedWeekday && 
                    schedule.id !== copiedWeekday.id &&
                    !selectedWeekdaysIds.includes(schedule.id)
                  }
                />
              </TouchableOpacity>
            ))
          }
        </Panel>
        {
          (isEditRoomLoading || isEditRoomGroupLoading)
          &&
            <ActivityIndicator /> 
        }
        {
          !!copiedWeekday
          &&
            <Text style={s.helpText}>
              Выберите дни для которых хотите применить расписание этой комнаты
            </Text>
        }
        {
          !!copiedWeekday
          &&
            <Button 
              type='primary'
              text='Применить'
              onPress={handleClickSave}
              isDisabled={selectedWeekdaysIds.length <= 1}
              isLoading={isEditRoomLoading || isEditRoomGroupLoading}
            />
        }
      </View>
    </>
  )
}
