import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { 
  useRequestRoomsQuery,
  useRequestEditRoomMutation,
  useRequestRoomGroupsQuery,
  useRequestEditRoomGroupMutation,
} from '../../../redux/requests/rooms';
import { RootState } from '../../../redux';
import s from './RoomsSettingsScreen.styles';
import { Screens } from '../../../constants/Routes';
import RootStackParamsList from '../../RootStackParams';
import { Panel, Button } from '../../../components/atoms';
import { WeekdaysTypes } from '../../../redux/types/common';
import { Room, RoomGroup, RoomOrRoomGroup, ScheduleSection } from '../../../redux/types/room';
import { Navbar, TimeTable } from '../../../components/organisms';
import { EditRoomModal } from '../../../modals/edit-room/EditRoomModal';
import CircleSlider from '../../../components/organisms/circular-slider/CircularSlider';
import convertWeekdayTypeToIndex from '../../../utils/convertWeekdayTypeToIndex';

export const RoomsSettingsScreen: React.FC = () => {

  const roomBtnRef = useRef<any>(null);

  const { 
    data: rooms, 
    refetch: refetchRooms,
  } = useRequestRoomsQuery();

  const [
    requestEditRoomMutation,
    {
      isSuccess: isEditRoomSuccess,
      isLoading: isEditRoomLoading,
    }
  ] = useRequestEditRoomMutation();

  const { 
    data: roomGroups, 
    refetch: refetchRoomGroups,
  } = useRequestRoomGroupsQuery();

  const [
    requestEditRoomGroup,
    {
      isSuccess: isEditRoomGroupSuccess
    }
  ] = useRequestEditRoomGroupMutation();

  React.useEffect(() => {

    if (isEditRoomSuccess) {
      refetchRooms()
    }

  }, [isEditRoomSuccess])

  React.useEffect(() => {

    if (isEditRoomGroupSuccess) {
      refetchRoomGroups()
    }

  }, [isEditRoomGroupSuccess])

  const stateRooms = useSelector((state: RootState) => state.rooms.rooms);
  const stateRoomGroups = useSelector((state: RootState) => state.rooms.roomGroups);

  const pressedInterval = useSelector((state: RootState) => state.rooms.pressedInterval);

  const separatedRooms: Room[] | undefined = rooms && rooms.filter((room) => room.roomGroup === null);
  
  const route = useRoute<RouteProp<RootStackParamsList, Screens.ROOMS_SETTINGS>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.ROOMS_SETTINGS>>();

  const todayIndex = new Date().getDay();
  
  const { roomId, weekdayIndex } = route.params;

  const [weekDayScheduleIndex, setWeekDayScheduleIndex] = useState(weekdayIndex);

  const [selectedRoomId, setSelectedRoomId] = useState(roomId);
  
  const findedRoom: Room | RoomGroup | undefined = [...stateRooms, ...stateRoomGroups].find((room) => room.id === selectedRoomId);

  const [selectedRoom, setSelectedRoom] = useState<Room | RoomGroup | undefined>(findedRoom);
  const [isCircleSliderFocused, setIsCircleSliderFocused] = useState(false);
  const [isEditRoomModalVisible, setIsEditRoomModalVisible] = useState(false);

  const [scrollToX, setScrollToX] = useState(0);

  const isWeekScheduleModeOn = 
    selectedRoom && 
    selectedRoom.weekdaysSchedule &&
    selectedRoom.weekdaysSchedule.length !== 0;
    
  React.useEffect(() => {
    setWeekDayScheduleIndex(weekdayIndex)
  }, [weekdayIndex])

  React.useEffect(() => {

    roomBtnRef.current?.scrollTo({
      x: scrollToX,
      animated: true,
    });
  }, [scrollToX])

  React.useEffect(() => {
    
    !weekdayIndex && 
    isWeekScheduleModeOn 
    && 
      setWeekDayScheduleIndex(todayIndex)

  }, [])

  // React.useEffect(() => {

  //   setWeekDayScheduleId(
  //     selectedRoom &&
  //     selectedRoom.weekdaysSchedule &&
  //     selectedRoom.weekdaysSchedule.find((schedule: ScheduleSection) => convertWeekdayTypeToIndex(schedule.day) === todayIndex)?.id
  //   )
  // }, [selectedRoom])

  const isRoomGroup = findedRoom && 'rooms' in findedRoom;
  
  React.useEffect(() => {

    if (findedRoom) {
      setSelectedRoom(findedRoom)
      setSelectedRoomId(findedRoom.id)
    }

  }, [findedRoom, rooms, roomGroups])
  
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

      const data: RoomOrRoomGroup | undefined = selectedRoom && filteredWeekdaysSchedule && findedWeekdaysSchedule && {
        ...selectedRoom,
        weekdaysSchedule: [
          ...filteredWeekdaysSchedule,
          {
            ...findedWeekdaysSchedule,
            heatingIntervals: selectedRoom.heatingIntervals
          }
        ],
      };

      if (selectedRoom) {

        if (isRoomGroup) {
  
          requestEditRoomGroup({
            roomId: selectedRoom.id,
            data: data as RoomGroup
          }).then(
  
            () => data && data.rooms && data.rooms.forEach((roomInRoomGroup: Room) => (
              requestEditRoomMutation({
                roomId: roomInRoomGroup.id,
                data: {
                  ...roomInRoomGroup,
                  weekdaysSchedule: data.weekdaysSchedule || [],
                }
              })
            ))
            
          ).then(
            () => navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: selectedRoom.id })
          )
        } else {
          requestEditRoomMutation({
            roomId: selectedRoom.id,
            data: data as Room
          }).then(
            () => navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: selectedRoom.id })
          )
        }
      }
    } 
  }

  return (
    <>
      <Navbar 
        header={selectedRoom && 'name' in selectedRoom && selectedRoom.name || ''}
        styles={s.navbar}
        withGoBackBtnIcon
        rightSideOptionBtn={
          <TouchableOpacity onPress={() => setIsEditRoomModalVisible(true)}>
            <Text style={s.headerRightSideText}>
              Изменить
            </Text>
          </TouchableOpacity>
        }
        goBack={() => navigation.goBack()}
      />
      {
        selectedRoom
        &&
          <>
            <ScrollView 
              horizontal={true} 
              ref={roomBtnRef} 
              showsHorizontalScrollIndicator={false} 
              style={s.scrollbar}
            >
              {roomGroups && [...roomGroups]
                .sort((a, b) => a.id - b.id)
                .map((roomGroup, index) => (
                  <>
                    <TouchableOpacity 
                      key={roomGroup.id}
                      style={[
                        s.scrollbarTextView,
                        'id' in selectedRoom && selectedRoom.id === roomGroup.id && s.selectedScrollbarTextView,
                      ]}
                      onLayout={(e) => {
                        selectedRoomId === roomGroup.id
                        &&
                          setScrollToX(e.nativeEvent.layout.x)
                      }}
                      onPress={() => {
                        if (roomGroup.id !== selectedRoomId) {
                          refetchRooms()
                          refetchRoomGroups()

                          setSelectedRoom(roomGroup)
                          setSelectedRoomId(roomGroup.id)
                        }
                      }}
                    >
                      <Text style={[
                        s.scrollbarText,
                        { fontWeight: '600' },
                        'id' in selectedRoom && selectedRoom.id === roomGroup.id && s.activeScrollbarText,
                      ]}>
                        {roomGroup.name}
                      </Text>
                    </TouchableOpacity>
                    {
                      roomGroup.rooms && roomGroup.rooms.length !== 0
                      &&
                        [...roomGroup.rooms]
                          .sort((a, b) => a.id - b.id)
                          .map((room) => (
                            <TouchableOpacity 
                              key={room.id} 
                              style={[
                                s.scrollbarTextView,
                                'id' in selectedRoom && selectedRoom.id === room.id && s.selectedScrollbarTextView,
                              ]}
                              onLayout={(e) => {
                                selectedRoomId === room.id
                                &&
                                  setScrollToX(e.nativeEvent.layout.x)
                              }}
                              onPress={() => {
                                if (room.id !== selectedRoomId) {
                                  refetchRooms()
                                  refetchRoomGroups()

                                  setSelectedRoom(room)
                                  setSelectedRoomId(room.id)


                                  // isWeekScheduleModeOn
                                  // &&
                                  //   setWeekDayScheduleId(
                                  //     selectedRoom &&
                                  //     selectedRoom.weekdaysSchedule &&
                                  //     selectedRoom.weekdaysSchedule.find((schedule: ScheduleSection) => convertWeekdayTypeToIndex(schedule.day) === todayIndex)?.id
                                  //   )
                                }
                              }}
                            >
                              <Text style={[
                                s.scrollbarText,
                                selectedRoom.id === room.id && s.activeScrollbarText,
                              ]}>
                                {room.name}
                              </Text>
                            </TouchableOpacity>
                        ))
                    }
                    {
                      (
                        roomGroups.length !== 1 && 
                        roomGroups.length !== (index + 1)
                      ) 
                      &&
                        <Text style={s.verticalDivider}>
                          {'|'}
                        </Text>
                    }
                  </>
              ))}
              {
                separatedRooms && separatedRooms.length !== 0
                &&
                  [...separatedRooms]
                    .sort((a, b) => a.id - b.id)
                    .map((room, index) => (
                      <>
                        {
                          (
                            index === 0 &&
                            roomGroups && roomGroups.length !== 0
                          ) 
                          &&
                            <Text style={s.verticalDivider}>
                              {'|'}
                            </Text>
                        }
                        <TouchableOpacity 
                          key={room.id} 
                          style={[
                            s.scrollbarTextView,
                            selectedRoom.id === room.id && s.selectedScrollbarTextView,
                          ]}
                          onLayout={(e) => {
                            selectedRoomId === room.id
                            &&
                              setScrollToX(e.nativeEvent.layout.x)
                          }}
                          onPress={() => {
                            if (room.id !== selectedRoomId) {
                              refetchRooms()
                              refetchRoomGroups()

                              setSelectedRoom(room)
                              setSelectedRoomId(room.id)
                            }
                          }}
                        >
                          <Text style={[
                            s.scrollbarText,
                            selectedRoom.id === room.id && s.activeScrollbarText,
                          ]}>
                            {room.name}
                          </Text>
                        </TouchableOpacity>
                      </>
                  ))
              }
            </ScrollView>
            {
              selectedRoom
              &&
                <>
                  <ScrollView 
                    style={s.scrollableView}
                    scrollEnabled={!isCircleSliderFocused} 
                    contentContainerStyle={s.contentContainer}
                  >
                    <View style={s.circleSlider}>
                      <CircleSlider 
                        roomId={selectedRoom.id}
                        weekdayIndex={weekDayScheduleIndex}
                        pressedInterval={pressedInterval}
                        onFocus={() => setIsCircleSliderFocused(true)}
                        onBlur={() => setIsCircleSliderFocused(false)}
                        refetchRooms={refetchRooms}
                        refetchRoomGroups={refetchRoomGroups}
                        navigate={navigation.navigate}
                      />
                    </View>
                    <TimeTable 
                      roomId={selectedRoom.id}
                      weekdayIndex={weekDayScheduleIndex}
                      pressedInterval={pressedInterval}
                      refetchRooms={refetchRooms}
                      refetchRoomGroups={refetchRoomGroups}
                      navigate={navigation.navigate}
                    />
                    <Panel styles={s.weekDaysSchedule}>
                      <Button 
                        type='link'
                        text={
                          isWeekScheduleModeOn
                          ?
                            'Недельное расписание'
                          :
                            'Создать недельное расписание'
                        }
                        onPress={() => {
                          isWeekScheduleModeOn
                          ?
                            navigation.navigate(Screens.WEEK_SCHEDULE, { roomId: selectedRoom.id })
                          :
                            handleCreateWeekdaysSchedule()
                        }}
                        isDisabled={isEditRoomLoading}
                      />
                    </Panel>
                    {
                      isWeekScheduleModeOn
                      &&
                        <Panel styles={s.weekDaysSchedule}>
                          <Button 
                            type='link'
                            text='Копировать расписание'
                            onPress={() => (
                              navigation.navigate(
                                Screens.WEEK_SCHEDULE, 
                                { 
                                  roomId: selectedRoom.id,
                                  copiedWeekday: selectedRoom.weekdaysSchedule.find((schedule: ScheduleSection) => convertWeekdayTypeToIndex(schedule.day) === weekDayScheduleIndex),
                                }
                              )
                            )}
                          />
                        </Panel>
                    }
                    {
                      'rooms' in selectedRoom &&
                      selectedRoom.rooms && 
                      selectedRoom.rooms.length !== 0
                      &&
                        <Text style={s.helpText}>
                          При изменении настроек группы комнат будут изменяться настройки всех дочерних комнат
                        </Text>
                    }
                    <View style={s.bottomPadding} />
                  </ScrollView>
                </>
            }
            {
              rooms && roomGroups
              &&
                <EditRoomModal 
                  room={selectedRoom}
                  rooms={rooms}
                  roomGroups={roomGroups}
                  navigation={navigation}
                  isVisible={isEditRoomModalVisible}
                  refetchRooms={refetchRooms}
                  refetchRoomGroups={refetchRoomGroups}
                  onClose={() => setIsEditRoomModalVisible(false)}
                />
            }
          </>
      }
    </>
  )
}
