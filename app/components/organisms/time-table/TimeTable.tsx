import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { 
  useRequestAddTimeForRoomMutation,
  useRequestEditRoomMutation,
  useRequestAddTimeForRoomGroupMutation,
  useRequestEditRoomGroupMutation,
} from '../../../redux/requests/rooms';
import { RootState } from '../../../redux';
import Panel from '../../atoms/panel/Panel';
import { Screens } from '../../../constants/Routes';
import { Title, Button, Divider } from '../../atoms';
import TimeTableItem from './time-table-item/TimeTableItem';
import { setActiveTimeForRoom } from '../../../redux/slices/rooms';
import { HeatingInterval, ScheduleSection } from '../../../redux/types/room';
import { convertHHmmToMins, convertMinsToHHmm } from '../../../utils/timeUtils';
import convertWeekdayTypeToCyrilicName from '../../../utils/convertWeekdayTypeToCyrilicName';
import { Room, RoomGroup, PressedInterval } from '../../../redux/types/room';

import s from './TimeTable.styles';
import convertWeekdayTypeToIndex from '../../../utils/convertWeekdayTypeToIndex';

interface Props {
  roomId: number;
  weekdayIndex?: number;
  pressedInterval: PressedInterval;
  refetchRooms: () => void;
  refetchRoomGroups: () => void;
  navigate(route: string, roomId: { roomId: number }): void;
}

export const TimeTable: React.FC<Props> = (props) => {
  const {
    roomId,
    weekdayIndex,
    pressedInterval,
    navigate,
    refetchRooms,
    refetchRoomGroups,
  } = props;  
  
  const dispatch = useDispatch();
  
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const roomGroups = useSelector((state: RootState) => state.rooms.roomGroups);
  
  const findedRoom = rooms && roomGroups && [...rooms, ...roomGroups].find((room) => room.id === roomId);

  const isRoomGroup = findedRoom && 'rooms' in findedRoom;

  const [
    requestAddTimeForRoom,
    {
      isSuccess: isAddTimeForRoomSuccess,
      isLoading: isAddTimeForRoomLoading,
    }
  ] = useRequestAddTimeForRoomMutation();

  const [
    requestAddTimeForRoomGroup,
    {
      isSuccess: isAddTimeForRoomGroupSuccess,
      isLoading: isAddTimeForRoomGroupLoading,
    }
  ] = useRequestAddTimeForRoomGroupMutation();

  const [
    requestEditRoom,
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


  React.useEffect(() => {

    if (isAddTimeForRoomSuccess || isEditRoomSuccess) {
      refetchRooms()
    }

  }, [isAddTimeForRoomSuccess, isEditRoomSuccess])

  React.useEffect(() => {

    if (isAddTimeForRoomGroupSuccess || isEditRoomGroupSuccess) {

      refetchRoomGroups()
      refetchRooms()
    }

  }, [isAddTimeForRoomGroupSuccess, isEditRoomGroupSuccess])

  const findedWeekdaysSchedule = 
    findedRoom &&
    findedRoom.weekdaysSchedule 
    &&
      findedRoom.weekdaysSchedule.find((schedule: ScheduleSection) => convertWeekdayTypeToIndex(schedule.day) === weekdayIndex);

  const filteredWeekdaysSchedule = 
    findedRoom &&
    findedRoom.weekdaysSchedule 
    &&
      findedRoom.weekdaysSchedule.filter((schedule: ScheduleSection) => convertWeekdayTypeToIndex(schedule.day) !== weekdayIndex);

  const sortedTimes = findedWeekdaysSchedule ? [...findedWeekdaysSchedule.heatingIntervals].sort((a, b) => (
    convertHHmmToMins(a.start) - convertHHmmToMins(b.start)
  )) : findedRoom?.heatingIntervals && [...findedRoom.heatingIntervals].sort((a, b) => (
    convertHHmmToMins(a.start) - convertHHmmToMins(b.start)
  ));
  
  const handleDeleteTimeInterval = (
    intervalId: number,
  ) => {

    if (isRoomGroup) {

      if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

        const filteredIntervals = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== intervalId);

        requestEditRoomGroup({ 
          roomId, 
          data: {
            ...findedRoom as RoomGroup,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaysSchedule,
                heatingIntervals: filteredIntervals
              }
            ]
          } 
        })

        findedRoom &&
        findedRoom.rooms &&
        findedRoom.rooms.length !== 0 
        && 
          findedRoom.rooms.forEach((roomInGroup: Room) => 
            requestEditRoom({ 
              roomId: roomInGroup.id, 
              data: {
                ...roomInGroup,
                weekdaysSchedule: [
                  ...filteredWeekdaysSchedule,
                  {
                    ...findedWeekdaysSchedule,
                    heatingIntervals: filteredIntervals
                  }
                ]
              } 
            })
          )

      } else {

        const filteredIntervals = 
          findedRoom && findedRoom.heatingIntervals?.filter((interval: HeatingInterval) => interval.id !== intervalId);

        requestEditRoomGroup({ 
          roomId, 
          data: {
            ...findedRoom as RoomGroup,
            heatingIntervals: filteredIntervals || [],
          } 
        })
  
        findedRoom &&
        findedRoom.rooms && 
        findedRoom.rooms.length !== 0 
        && 
          findedRoom.rooms.forEach((roomInGroup: Room) => 
            requestEditRoom({ 
              roomId: roomInGroup.id, 
              data: {
                ...roomInGroup,
                heatingIntervals: filteredIntervals || [],
              } 
            })
          )
      }

    } else {

      if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

        const filteredIntervals = 
          findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== intervalId)

        requestEditRoom({ 
          roomId, 
          data: {
            ...findedRoom as Room,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaysSchedule,
                heatingIntervals: filteredIntervals
              }
            ]
          } 
        })

      } else {

        const filteredIntervals = 
          findedRoom && findedRoom.heatingIntervals?.filter((interval: HeatingInterval) => interval.id !== intervalId);

        requestEditRoom({ 
          roomId, 
          data: {
            ...findedRoom as Room,
            heatingIntervals: filteredIntervals || [],
          } 
        })
      }
    }
  };

  const handleAddTime = (data: Omit<HeatingInterval, 'id'>) => {
    
    if (isRoomGroup) {

      if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

        requestAddTimeForRoomGroup({roomId, data: {
          ...findedRoom as RoomGroup,
          weekdaysSchedule: [
            ...filteredWeekdaysSchedule,
            {
              ...findedWeekdaysSchedule,
              heatingIntervals: [
                ...findedWeekdaysSchedule.heatingIntervals,
                data,
              ]
            }
          ]
        }})

      } else {

        findedRoom && requestAddTimeForRoomGroup({roomId, data: {
          ...findedRoom as RoomGroup,
          heatingIntervals: [
            ...findedRoom.heatingIntervals || [],
            data,
          ],
        }}).then(() => {

          'rooms' in findedRoom && 
          findedRoom.rooms.length !== 0 
          && 
            findedRoom.rooms.forEach((roomInGroup: Room) => 
              requestAddTimeForRoom({roomId: roomInGroup.id, data: {
                ...roomInGroup,
                heatingIntervals: [
                  ...findedRoom.heatingIntervals,
                  data,
                ],
              }, isAfterAddingRoomGroup: true })
            )
        })
      }
    } else {

      if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

        requestAddTimeForRoom({roomId, data: {
          ...findedRoom as Room,
          weekdaysSchedule: [
            ...filteredWeekdaysSchedule,
            {
              ...findedWeekdaysSchedule,
              heatingIntervals: [
                ...findedWeekdaysSchedule.heatingIntervals,
                data,
              ]
            }
          ]
        }})

      } else {

        findedRoom && requestAddTimeForRoom({roomId, data: {
          ...findedRoom as Room,
          heatingIntervals: [
            ...findedRoom.heatingIntervals || [],
            data,
          ],
        }});
      }
    }
  }

  const addTimeSlider = () => {

    if (!sortedTimes || sortedTimes.length === 0) {

      const data: Omit<HeatingInterval, 'id'> = {
        start:  '06:00',
        end: '08:00',
        temperature: 24,
      }

      handleAddTime(data)

    } else {

      const lastSliderEndMinutes = convertHHmmToMins(sortedTimes[sortedTimes.length - 1].end);
      const firstSliderStartMinutes = convertHHmmToMins(sortedTimes[0].start);
  
      if (lastSliderEndMinutes <= 1230) {
  
        const data = {
          start:  convertMinsToHHmm(lastSliderEndMinutes + 90),
          end: convertMinsToHHmm(lastSliderEndMinutes + 210),
          temperature: 24,
        };
  
        handleAddTime(data)
  
      } else if (firstSliderStartMinutes >= 210) {
  
        const data = {
          start:  convertMinsToHHmm(firstSliderStartMinutes - 210),
          end: convertMinsToHHmm(firstSliderStartMinutes - 90),
          temperature: 24,
        }
  
        handleAddTime(data)
  
      } else {
  
        for (let i = 0; i <= sortedTimes.length - 2; i++) {
  
          const firstTimeEndMinutes = convertHHmmToMins(sortedTimes[i].end);
          const secondTimeStartMinutes = convertHHmmToMins(sortedTimes[i+1].start);
        
          if ((secondTimeStartMinutes - firstTimeEndMinutes) >= 300) {
            
            const data = {
              start:  convertMinsToHHmm(firstTimeEndMinutes + 90),
              end: convertMinsToHHmm(firstTimeEndMinutes + 210),
              temperature: 24,
            }
  
            handleAddTime(data)
          }
        }
      }
    }
  }
  
  return (
    <Panel styles={s.timeTable}>
      {
        sortedTimes &&
        sortedTimes.length !== 0
        &&
          <>
            <View style={s.header}>
              <Title>
                Расписание
              </Title>
              {
                findedRoom &&
                findedRoom.weekdaysSchedule &&
                findedRoom.weekdaysSchedule.length !== 0
                &&
                  <TouchableOpacity onPress={() => navigate(Screens.WEEK_SCHEDULE, { roomId: roomId })}>
                    <Text style={s.day}>
                      {
                        findedWeekdaysSchedule
                        &&
                          convertWeekdayTypeToCyrilicName(findedWeekdaysSchedule.day)
                      }
                    </Text>
                  </TouchableOpacity>
              }
            </View>
            
            <Divider />

            <View style={s.timeWrapper}>
              {sortedTimes.map((time: HeatingInterval) => (
                <TimeTableItem 
                  key={time.id} 
                  time={time} 
                  onPress={(intervalId) => {
                    dispatch(setActiveTimeForRoom({ roomId, intervalId }))
                  }}
                  onDelete={(intervalId) => handleDeleteTimeInterval(intervalId)} 
                  isLoading={isEditRoomLoading || isEditRoomGroupLoading}
                  isDisabled={
                    !(
                      pressedInterval.roomId === roomId &&
                      pressedInterval.intervalId === time.id
                    )
                  } 
                />
              ))}
            </View>

            <Divider styles={s.divider} />
          </>
      }
      <Button 
        type='addBtn'
        text='Добавить отрезок'
        onPress={addTimeSlider}
        isLoading={isAddTimeForRoomLoading || isAddTimeForRoomGroupLoading}
        isDisabled={sortedTimes && sortedTimes.length >= 5}
      />
    </Panel>
  )
}
