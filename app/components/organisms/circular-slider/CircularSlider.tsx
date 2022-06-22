import React from 'react';
import {
  View,
  Text,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Svg, { Path, Circle, G, Image } from 'react-native-svg';

import {
  changeRoomTime,
  changeWeekdaysScheduleRoomTime,
  changeRoomGroupTime,
  changeWeekdaysScheduleRoomGroupTime,
  changeRoomTemperature,
  changeRoomWeekdaysScheduleTemperature,
  changeRoomGroupTemperature,
  changeRoomGroupWeekdaysScheduleTemperature,
  setActiveTimeForRoom,
} from '../../../redux/slices/rooms';

import { 
  useRequestAddTimeForRoomMutation,
  useRequestEditRoomMutation,
  useRequestAddTimeForRoomGroupMutation,
  useRequestEditRoomGroupMutation,
} from '../../../redux/requests/rooms';

import { 
  Room, 
  RoomGroup, 
  RoomOrRoomGroup, 
  PressedInterval, 
  ScheduleSection,
} from '../../../redux/types/room';

import { RootState } from '../../../redux/index';
import { Screens } from '../../../constants/Routes'; 
import { HeatingInterval } from '../../../redux/types/room';
import { convertHHmmToMins } from '../../../utils/timeUtils';
import cartesianToPolar from '../../../utils/cartesianToPolar';
import polarToCartesian from '../../../utils/polarToCartesian';
import { TemperaturePicker } from '../temperature-picker/TemperaturePicker';
import CircleSliderMarksSvg from '../../../assets/images/circle-slider-marks.svg';
import convertMinutesToHourMinutes from '../../../utils/convertMinutesToHourMinutes';
import CircleSliderGreyBgSvg from '../../../assets/images/circle-slider-grey-bg.svg';
import CircleSliderBlueBgSvg from '../../../assets/images/circle-slider-blue-bg.svg';
import checkIfSliderLiesOnAnotherOne from '../../../utils/checkIfSliderLiesOnAnotherOne';
import convertWeekdayTypeToCyrilicLetters from '../../../utils/convertWeekdayTypeToCyrilicLetters';

import s from './CircularSlider.styles';
import convertWeekdayTypeToIndex from '../../../utils/convertWeekdayTypeToIndex';

// btnRadius   - radius of the buttons at the ends of the sliders
// dialRadius  - radius of the circle
// dialWidth   - width of the circle
// strokeWidth - width of the marks on the watch

interface IProps {
  roomId: number;
  isSmall?: boolean;
  weekdayIndex?: number;
  isStatic?: boolean;
	btnRadius?: number;
  dialWidth?: number;
  dialRadius?: number;
  strokeWidth?: number;
  strokeDasharray?: [];
  pressedInterval: PressedInterval;
  onBlur(): void; 
  onFocus(): void;
  refetchRooms(): void;
  refetchRoomGroups(): void;
  navigate(route: string, roomId: { roomId: number }): void;
}

const CircularSlider: React.FC<IProps> = (props) => {
  const {
    roomId,
    weekdayIndex,
    pressedInterval,
    isSmall = false,
    isStatic = false,
    btnRadius = isSmall ? 5 : 50,
    dialWidth = isSmall ? 3.5 : 7,
    dialRadius = isSmall ? 60 : 120,
    onBlur,
    onFocus,
    refetchRooms,
    refetchRoomGroups,
    navigate,
  } = props;

  const dispatch = useDispatch();

  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const roomGroups = useSelector((state: RootState) => state.rooms.roomGroups);

  const findedRoom = rooms && roomGroups && [...rooms, ...roomGroups].find((room) => room.id === roomId);  

  const [
    requestAddTimeForRoom,
    {
      isSuccess: isAddTimeForRoomSuccess,
    }
  ] = useRequestAddTimeForRoomMutation();

  const [
    requestEditRoom,
    {
      isLoading: isEditRoomLoading
    }
  ] = useRequestEditRoomMutation();

  const [
    requestAddTimeForRoomGroup,
    {
      isSuccess: isAddTimeForRoomGroupSuccess,
    }
  ] = useRequestAddTimeForRoomGroupMutation();

  const [
    requestEditRoomGroup,
    {
      isSuccess: isEditRoomGroupSuccess,
      isLoading: isEditRoomGroupLoading
    }
  ] = useRequestEditRoomGroupMutation();

  React.useEffect(() => {

    if (isAddTimeForRoomSuccess) {

      refetchRooms()
    }

  }, [isAddTimeForRoomSuccess])

  React.useEffect(() => {

    if (isAddTimeForRoomGroupSuccess || isEditRoomGroupSuccess) {

      refetchRooms()
      refetchRoomGroups()
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

  const heatingIntervals = 
    findedWeekdaysSchedule
    ?
      findedWeekdaysSchedule.heatingIntervals
    :
      findedRoom && findedRoom.heatingIntervals
      
  const isRoomGroup = findedRoom && 'rooms' in findedRoom;

  ///////////// CHANGE STATE TIME /////////////

  const onChangeSlider = (
    roomId: number,
    timeId: number,
    startMinutes: number,
    endMinutes: number,
  ): void => {

    if (isRoomGroup) {

      if (findedWeekdaysSchedule?.id) {

        dispatch(
          changeWeekdaysScheduleRoomGroupTime({
            roomId: roomId,
            timeId: timeId,
            weekdayId: findedWeekdaysSchedule.id,
            start: convertMinutesToHourMinutes(startMinutes),
            end: convertMinutesToHourMinutes(endMinutes),
          }),
        )

      } else {

        dispatch(
          changeRoomGroupTime({
            roomId: roomId,
            timeId: timeId,
            start: convertMinutesToHourMinutes(startMinutes),
            end: convertMinutesToHourMinutes(endMinutes),
          }),
        )
      }

    } else {

      if (findedWeekdaysSchedule?.id) {

        dispatch(
          changeWeekdaysScheduleRoomTime({
            roomId: roomId,
            timeId: timeId,
            weekdayId: findedWeekdaysSchedule.id,
            start: convertMinutesToHourMinutes(startMinutes),
            end: convertMinutesToHourMinutes(endMinutes),
          }),
        );

      } else {

        dispatch(
          changeRoomTime({
            roomId: roomId,
            timeId: timeId,
            start: convertMinutesToHourMinutes(startMinutes),
            end: convertMinutesToHourMinutes(endMinutes),
          }),
        );
      }
    }
  };

  ///////////// ADD TIME /////////////

  const addTimeSlider = (
    locationX: number,
    locationY: number,
    dialRadius: number,
    btnRadius: number,
  ) => {
    
		let newSliderStartAngle = cartesianToPolar(locationX, locationY, dialRadius, btnRadius) - 20;
    let newSliderEndAngle = newSliderStartAngle + 30;

    // condition fixes initial position of dots
    // example for incorrect time: 23:00 - 2:00
    if (newSliderStartAngle < 0) {

      newSliderStartAngle = 0;
      newSliderEndAngle = 40;

    } else if (newSliderEndAngle > 360) {

      newSliderStartAngle = 320;
      newSliderEndAngle = 360;
    }
 
    const newSliderStartMinutes = Math.ceil((newSliderStartAngle * 4) / 15) * 15;
    const newSliderEndMinutes = Math.ceil((newSliderEndAngle * 4) / 15) * 15;

    const isSliderLiesOnAnotherOne = 
      heatingIntervals 
      ? 
        checkIfSliderLiesOnAnotherOne(
          newSliderStartMinutes,
          newSliderEndMinutes,
          heatingIntervals,
        ) 
      : 
        false;
    
    if (
      findedRoom &&
      !isSliderLiesOnAnotherOne &&
      newSliderStartMinutes < newSliderEndMinutes
    ) {

      const data = {
        start: convertMinutesToHourMinutes(newSliderStartMinutes),
        end: convertMinutesToHourMinutes(newSliderEndMinutes),
        temperature: 24,
      };

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

          requestAddTimeForRoomGroup({roomId, data: {
            ...findedRoom as RoomGroup,
            heatingIntervals: [
              ...findedRoom.heatingIntervals,
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

          requestAddTimeForRoom({roomId, data: {
            ...findedRoom as Room,
            heatingIntervals: [
              ...findedRoom.heatingIntervals,
              data,
            ],
          }});
        }
      }
    }
  }

  const onCirclePress = (event: GestureResponderEvent) => {
    
		const { nativeEvent } = event;
    const { locationX, locationY } = nativeEvent;
    
    heatingIntervals && heatingIntervals.length < 5
    &&
      addTimeSlider(locationX, locationY, dialRadius, btnRadius);
  };

  ///////////// DELETE TIME /////////////

  const handleDeleteInterval = (
    roomId: number,
    intervalId: number,
  ) => {

    if (findedRoom) {

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
          }).then(() => {

            'rooms' in findedRoom && 
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
          })
    
        } else {

          const filteredIntervals = findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== intervalId);

          requestEditRoomGroup({ 
            roomId, 
            data: {
              ...findedRoom as RoomGroup,
              heatingIntervals: filteredIntervals,
            } 
          }).then(() => {

            'rooms' in findedRoom && findedRoom.rooms.length !== 0 && findedRoom.rooms.forEach((roomInGroup: Room) => 
              requestEditRoom({ 
                roomId: roomInGroup.id, 
                data: {
                  ...roomInGroup,
                  heatingIntervals: filteredIntervals,
                } 
              })
            )
          })
        }

      } else {

        if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

          const filteredIntervals = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== intervalId)

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
          }).then(() => refetchRooms())

        } else {

          const filteredIntervals = findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== intervalId);

          requestEditRoom({ 
            roomId, 
            data: {
              ...findedRoom as Room,
              heatingIntervals: filteredIntervals,
            } 
          }).then(() => refetchRooms())
        }
      }
    }
  };

  ///////////// CHANGE TEMPERATURE /////////////

  const handleChangeTemperature = (roomId: number, timeId: number, temperature: number) => {

    if (findedRoom) {

      if (isRoomGroup) {

        if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

          const filteredTimes = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
          const findedTime = findedWeekdaysSchedule.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId) || findedWeekdaysSchedule.heatingIntervals[0];
          
          if (findedTime && (temperature === findedTime.temperature)) return
      
          const data: RoomOrRoomGroup = {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaysSchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    temperature,
                  }
                ],
              }
            ]
          };

          findedWeekdaysSchedule.id && dispatch(
            changeRoomGroupWeekdaysScheduleTemperature({ 
              roomId, 
              weekdayId: findedWeekdaysSchedule.id,
              timeId, 
              temperature 
            })
          );
      
          requestEditRoomGroup({ 
            roomId, 
            data: data as RoomGroup, 
          }).then(() => {

            data.rooms && 
            data.rooms.length !== 0 && 
            data.rooms.forEach((roomInGroup: Room) => 
              requestEditRoom({roomId: roomInGroup.id, data: {
                ...roomInGroup,
                weekdaysSchedule: data.weekdaysSchedule || [],
              }})
            )
          })

        } else {

          const filteredTimes = findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
          const findedTime = findedRoom.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
      
          if (findedTime && (temperature === findedTime.temperature)) return

          const data: RoomOrRoomGroup | undefined = filteredTimes && findedTime && {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                temperature,
              }
            ],
          };

          dispatch(
            changeRoomGroupTemperature({ 
              roomId, 
              timeId, 
              temperature 
            })
          );
      
          requestEditRoomGroup({ 
            roomId, 
            data: data as RoomGroup, 
          }).then(() => {

            data && data.rooms && data.rooms.length !== 0 && data.rooms.forEach((roomInGroup: Room) => 
              requestEditRoom({roomId: roomInGroup.id, data: {
                ...roomInGroup,
                heatingIntervals: data.heatingIntervals || [],
              }})
            )
          })
        }

      } else {

        if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

          const filteredTimes = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
          const findedTime = findedWeekdaysSchedule.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
          
          if (findedTime && (temperature === findedTime.temperature)) return

          const data = filteredTimes && findedTime && {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaysSchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    temperature,
                  }
                ],
              }

            ]
          };
  
          findedWeekdaysSchedule.id && dispatch(
            changeRoomWeekdaysScheduleTemperature({ 
              roomId, 
              weekdayId: findedWeekdaysSchedule.id,
              timeId, 
              temperature 
            })
          );
      
          requestEditRoom({ 
            roomId, 
            data: data as Room, 
          }).then(() => refetchRooms())

        } else {

          const filteredTimes = findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
          const findedTime = findedRoom.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
      
          if (findedTime && (temperature === findedTime.temperature)) return

          const data = filteredTimes && findedTime && {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                temperature,
              }
            ],
          };
  
          dispatch(
            changeRoomTemperature({ 
              roomId, 
              timeId, 
              temperature 
            }));
      
          requestEditRoom({ 
            roomId, 
            data: data as Room, 
          }).then(() => refetchRooms())
        }
      }
    }
  }

	const concatTwoSliders = (activeTimeId: number, nearbyTimeId: number, times: HeatingInterval[]) => {
		
		const activeSlider = times.find((time) => time.id === activeTimeId);
		const nearbySlider = times.find((time) => time.id === nearbyTimeId);

		if (activeSlider && nearbySlider) {

      const activeSliderStartMinutes = convertHHmmToMins(activeSlider.start);
      const nearbySliderStartMinutes = convertHHmmToMins(nearbySlider.start);

      const activeSliderEndMinutes = convertHHmmToMins(activeSlider.end);
      const nearbySliderEndMinutes = convertHHmmToMins(nearbySlider.end);

			const newStartMinutes = 
        activeSliderStartMinutes < nearbySliderStartMinutes
        ? 
          activeSliderStartMinutes 
        : 
          nearbySliderStartMinutes;
      
      const newEndMinutes = 
        activeSliderEndMinutes > nearbySliderEndMinutes
        ? 
          activeSliderEndMinutes 
        : 
          nearbySliderEndMinutes;          

      const filteredIntervals = times.filter((time) => time.id !== activeTimeId && time.id !== nearbyTimeId);

      const data = {
        start: convertMinutesToHourMinutes(newStartMinutes),
        end: convertMinutesToHourMinutes(newEndMinutes),
        temperature: activeSlider.temperature,
      };

      // activeSlider.id && await handleDeleteInterval(roomId, activeSlider.id)
      // nearbySlider.id && await handleDeleteInterval(roomId, nearbySlider.id)

      if (findedRoom) {

        if (isRoomGroup) {

          if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

            requestAddTimeForRoomGroup({
              roomId,
              data: {
                ...findedRoom as RoomGroup,
                weekdaysSchedule: [
                  ...filteredWeekdaysSchedule,
                  {
                    ...findedWeekdaysSchedule,
                    heatingIntervals: [
                      ...filteredIntervals,
                      data
                    ]
                  }
                ]
              }
            })
    
          } else {

            requestAddTimeForRoomGroup({
              roomId,
              data: {
                ...findedRoom as RoomGroup,
                heatingIntervals: [
                  ...filteredIntervals,
                  data
                ]
              }
            }).then(() => {

              'rooms' in findedRoom && findedRoom.rooms.length !== 0 && findedRoom.rooms.forEach((roomInGroup: Room) => 
                requestAddTimeForRoom({roomId: roomInGroup.id, data: {
                  ...roomInGroup,
                  heatingIntervals: [
                    ...filteredIntervals,
                    data,
                  ],
                }})
              )
            })
          }

        } else {

          if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {

            requestAddTimeForRoom({
              roomId,
              data: {
                ...findedRoom as Room,
                weekdaysSchedule: [
                  ...filteredWeekdaysSchedule,
                  {
                    ...findedWeekdaysSchedule,
                    heatingIntervals: [
                      ...filteredIntervals,
                      data
                    ]
                  }
                ]
              }
            })

          } else {
            
            requestAddTimeForRoom({
              roomId,
              data: {
                ...findedRoom as Room,
                heatingIntervals: [
                  ...filteredIntervals,
                  data
                ]
              }
            })
          }

        }
      }
		}
	}

  const width = (dialRadius + btnRadius) * 2;

  const activeTime = 
    findedRoom && 
    pressedInterval.roomId === roomId 
    &&
      (
        findedWeekdaysSchedule
        ?
          findedWeekdaysSchedule.heatingIntervals.find((interval: HeatingInterval) => interval.id === pressedInterval.intervalId)
        :
          findedRoom.heatingIntervals.find((interval: HeatingInterval) => interval.id === pressedInterval.intervalId)
      )
      
  return (
    <View style={s.circleSlider}>
      <CircleSliderBlueBgSvg width={297} height={297} style={s.background} />
      <CircleSliderGreyBgSvg width={297} height={297} style={s.background} />
      <Svg width={width} height={width} style={s.sliders}>
        <Circle
          r={148}
          cx={width / 2}
          cy={width / 2}
          fill="none"
          onPress={event => !isStatic && onCirclePress(event)}
        />
        {heatingIntervals && heatingIntervals.map((time: HeatingInterval) => (
          <TimeSlider
            key={time.id}
            roomId={roomId}
            timeId={time.id || NaN}
            btnRadius={btnRadius}
            dialRadius={dialRadius}
            dialWidth={dialWidth}
            startAngle={convertHHmmToMins(time.start) / 4}
            endAngle={convertHHmmToMins(time.end) / 4}
            times={heatingIntervals}
            isDeleteLoading={isEditRoomLoading || isEditRoomGroupLoading}
            isStatic={isStatic}
            isActive={
              pressedInterval.roomId === roomId &&
              pressedInterval.intervalId === time.id 
            }
            concatTwoSliders={(
              id, 
              nearbySliderId, 
              times
            ) => concatTwoSliders(
              id, 
              nearbySliderId, 
              times
            )}
            onChangeAngle={(
              roomId,
              timeId,
              startMinutes,
              endMinutes,
            ) => onChangeSlider(
              roomId,
              timeId,
              startMinutes,
              endMinutes,
            )}
            onPressIn={
              (roomId, intervalId) => {
                
                dispatch(
                  setActiveTimeForRoom({ roomId, intervalId })
                )

                onFocus()
              }
            }
            onPressOut={
              (roomId, timeId, startAngle, endAngle) => {



                  if ((endAngle - startAngle) <= 3) {
  
                    handleDeleteInterval(roomId, timeId)
  
                  } else {
                    
                    if (findedRoom) {
  
                      if (isRoomGroup) {
  
                        if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {
  
                          const findedInterval = findedWeekdaysSchedule.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
                          const filteredIntervals = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
  
                          const data: RoomOrRoomGroup | undefined = findedInterval && filteredIntervals && {
                            ...findedRoom,
                            weekdaysSchedule: [
                              ...filteredWeekdaysSchedule,
                              {
                                ...findedWeekdaysSchedule,
                                heatingIntervals: [
                                  ...filteredIntervals,
                                  {
                                    ...findedInterval,
                                    start: convertMinutesToHourMinutes(startAngle * 4),
                                    end: convertMinutesToHourMinutes(endAngle * 4),
                                  }
                                ]
                              }
                            ]
                          };
  
                          data && requestEditRoomGroup({
                            roomId,
                            data: data as RoomGroup
                          }).then(() => {
  
                            data &&
                            data.rooms && 
                            data.rooms.length !== 0 
                            && 
                              data.rooms.forEach((roomInGroup: Room) => 
                                requestEditRoom({roomId: roomInGroup.id, data: {
                                  ...roomInGroup,
                                  weekdaysSchedule: data.weekdaysSchedule || [],
                                }})
                            )
                          })
    
                        } else {
  
                          const findedInterval = findedRoom && findedRoom.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
                          const filteredIntervals = findedRoom && findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
  
                          const data: RoomOrRoomGroup | undefined = findedInterval && filteredIntervals && {
                            ...findedRoom,
                            heatingIntervals: [
                              ...filteredIntervals,
                              {
                                ...findedInterval,
                                start: convertMinutesToHourMinutes(startAngle * 4),
                                end: convertMinutesToHourMinutes(endAngle * 4),
                              }
                            ]
                          };
  
                          data && requestEditRoomGroup({
                            roomId,
                            data: data as RoomGroup
                          }).then(() => {
  
                            data &&
                            data.rooms && 
                            data.rooms.length !== 0 
                            && 
                              data.rooms.forEach((roomInGroup: Room) => 
                                requestEditRoom({roomId: roomInGroup.id, data: {
                                  ...roomInGroup,
                                  heatingIntervals: data.heatingIntervals || [],
                                }})
                            )
                          })
                        }
                        
                      } else {
  
                        if (findedWeekdaysSchedule && filteredWeekdaysSchedule) {
  
                          const findedInterval = findedWeekdaysSchedule.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
                          const filteredIntervals = findedWeekdaysSchedule.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
  
                          const data: RoomOrRoomGroup | undefined = 
                            findedRoom && 
                            findedInterval && 
                            findedWeekdaysSchedule && 
                            filteredWeekdaysSchedule 
                            && {
                              ...findedRoom,
                              weekdaysSchedule: [
                                ...filteredWeekdaysSchedule,
                                {
                                  ...findedWeekdaysSchedule,
                                  heatingIntervals: [
                                    ...filteredIntervals,
                                    {
                                      ...findedInterval,
                                      start: convertMinutesToHourMinutes(startAngle * 4),
                                      end: convertMinutesToHourMinutes(endAngle * 4),
                                    }
                                  ]
                                }
                              ]
                            };
  
                          data && requestEditRoom({
                            roomId,
                            data: data as Room
                          })
  
                        } else {
                          
                          const findedInterval = findedRoom && findedRoom.heatingIntervals.find((interval: HeatingInterval) => interval.id === timeId);
                          const filteredIntervals = findedRoom && findedRoom.heatingIntervals.filter((interval: HeatingInterval) => interval.id !== timeId);
  
                          const data: RoomOrRoomGroup | undefined = findedRoom && filteredIntervals && findedInterval && {
                            ...findedRoom,
                            heatingIntervals: [
                              ...filteredIntervals,
                              {
                                ...findedInterval,
                                start: convertMinutesToHourMinutes(startAngle * 4),
                                end: convertMinutesToHourMinutes(endAngle * 4),
                              }
                            ]
                          };
  
                          data && requestEditRoom({
                            roomId,
                            data: data as Room,
                          })
                        }
                      }
                    }
                  }

                onBlur()
              }
            }
          />
        ))}
      </Svg>
      <View style={s.marks}>
        <CircleSliderMarksSvg width={197} height={197} />
      </View>
      <View style={s.temperatures} >
        {
          (heatingIntervals && heatingIntervals.length === 0) || !activeTime
          ?
            <TouchableOpacity onPress={() => navigate(Screens.WEEK_SCHEDULE, { roomId: roomId })}>
              <Text style={s.day}>
                {
                  findedWeekdaysSchedule
                  &&
                    convertWeekdayTypeToCyrilicLetters(findedWeekdaysSchedule.day)
                }
              </Text>
            </TouchableOpacity>
          :
            <TemperaturePicker 
              temperature={activeTime.temperature} 
              onChange={(value) => activeTime.id && handleChangeTemperature(roomId, activeTime.id, value)}
            />
        }
      </View>
    </View>
  );
};

interface TimeSliderProps {
  roomId: number;
  timeId: number;
  btnRadius: number;
  dialRadius: number;
  dialWidth: number;
  startAngle: number;
  endAngle: number;
  xCenter?: number;
  yCenter?: number;
  times: HeatingInterval[];
  isDeleteLoading: boolean,
  isStatic?: boolean;
	isActive: boolean;
	concatTwoSliders: (id: number, nearbySliderId: number, times: HeatingInterval[]) => void;
  onChangeAngle: (
    roomId: number,
    timeId: number,
    startMinutes: number,
    endMinutes: number,
  ) => void;
  onPressIn?: (roomId: number, timeId: number) => void;
  onPressOut?: (roomId: number, timeId: number, startAngle: number, endAngle: number, times: HeatingInterval[]) => void;
}

const TimeSlider = (props: TimeSliderProps) => {
  const {
    roomId,
    timeId,
    btnRadius,
    dialRadius,
    startAngle,
    endAngle,
    xCenter = Dimensions.get('window').width / 2,
    yCenter = Dimensions.get('window').height / 2 - (Platform.OS === 'ios' ? 105 : 65),
    times,
    isStatic,
		isActive,
		concatTwoSliders,
    onChangeAngle,
    onPressIn,
    onPressOut,
  } = props;
  
  const changeStartAngle = (
    newStartAngle: number,
    endAngle: number,
    times: HeatingInterval[],
    timeId: number,
  ) => {
    
    const nearbySliderId = checkIfSliderLiesOnAnotherOne(
      newStartAngle * 4,
      endAngle * 4,
      times,
      timeId,
    );

    const fixedStartAngle = newStartAngle;

    // if (newStartAngle < 180) {
    //   fixedStartAngle = newStartAngle - 700 / newStartAngle;
    // } else if (newStartAngle > 180) {
    //   fixedStartAngle = newStartAngle * 1.04;
    // }

    if (fixedStartAngle * 4 < endAngle * 4 ) {

      nearbySliderId
      ?
        concatTwoSliders(timeId, nearbySliderId, times)
      :
        onChangeAngle(
          roomId,
          timeId,
          Math.ceil((fixedStartAngle * 4) / 15) * 15,
          Math.ceil((endAngle * 4) / 15) * 15
        )
    }
  };

  const changeEndAngle = (
    newEndAngle: number,
    startAngle: number,
    times: HeatingInterval[],
    timeId: number,
    ) => {
    
    const nearbySliderId = checkIfSliderLiesOnAnotherOne(
      startAngle * 4,
      newEndAngle * 4,
      times,
      timeId,
    );

    const fixedEndAngle = newEndAngle;

    // if (newEndAngle >= 26 && newEndAngle < 180) {
    //   fixedEndAngle = newEndAngle - 700 / newEndAngle;
    // } else if (newEndAngle > 180) {
    //   fixedEndAngle = newEndAngle * 1.04;
    // }

    if (fixedEndAngle <= 360 && startAngle * 4 < fixedEndAngle * 4 + 15) {

      nearbySliderId
      ?
        concatTwoSliders(timeId, nearbySliderId, times)
      :
        onChangeAngle(
          roomId,
          timeId,
          Math.ceil((startAngle * 4) / 15) * 15,
          Math.ceil((fixedEndAngle * 4) / 15) * 15
        );
    }
  };

  const startPanResponder = React.useMemo(() =>

		PanResponder.create({
      
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderMove: (e, gs) => {
				const xOrigin = xCenter - (dialRadius + btnRadius);
				const yOrigin = yCenter - (dialRadius + btnRadius);

				const a = cartesianToPolar(
					gs.moveX - xOrigin,
					gs.moveY - yOrigin,
					dialRadius,
					btnRadius,
				);
        
				if (a <= 0) {
					changeStartAngle(0, endAngle, times, timeId);
				} else if (a >= 360) {
					changeStartAngle(360, endAngle, times, timeId);
				} else {
					changeStartAngle(a, endAngle, times, timeId);
				}
			},
		}),
    [dialRadius, btnRadius, endAngle, times, timeId],
  );

  const endPanResponder = React.useMemo(() =>

		PanResponder.create({

			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,

			onPanResponderMove: (e, gs) => {
				const xOrigin = xCenter - (dialRadius + btnRadius);
				const yOrigin = yCenter - (dialRadius + btnRadius);

				const a = cartesianToPolar(
					gs.moveX - xOrigin,
					gs.moveY - yOrigin,
					dialRadius,
					btnRadius,
				);

				if (a <= 0) {
					changeEndAngle(0, startAngle, times, timeId);
				} else if (a >= 360) {
					changeEndAngle(360, startAngle, times, timeId);
				} else {
					changeEndAngle(a, startAngle, times, timeId);
				}
			},
		}),
    [dialRadius, btnRadius, startAngle, times, timeId],
  );

	const setColorOfCircleButton = (
		isActive: boolean, 
		startAngle: number, 
		endAngle: number
	) => {
    
		if ((endAngle - startAngle) === 0) {	
			return '#fff'
		} else {
			return isActive ? '#546fdd' : '#f0f0f0'
		}
	}

  const startCoords = polarToCartesian(startAngle, dialRadius, btnRadius);
  const endCoords = polarToCartesian(endAngle, dialRadius, btnRadius);

  const startCoordsX = (endAngle - startAngle === 360) ? startCoords.x + 0.5 : startCoords.x;
  
  return (
    <>
      <G>
        <Path
          stroke={isActive ? '#5479DD' : "#FFFFFF"}
          strokeWidth={34}
          fill="none"
          strokeLinecap={isStatic ? 'round' : 'butt'}
          d={`M${startCoordsX} ${startCoords.y} 
						A ${dialRadius} ${dialRadius} 
						0 ${(endAngle - startAngle) > 180 ? 1 : 0} 
						1 ${endCoords.x} ${endCoords.y}`}
					onPress={() => onPressIn && onPressIn(roomId, timeId)}
        />
        <G x={startCoordsX - btnRadius} y={startCoords.y - btnRadius}>
          {!isStatic && (
            <Circle
              r={17}
              cx={btnRadius}
              cy={btnRadius}
              fill={setColorOfCircleButton(isActive, startAngle, endAngle)}
              {...startPanResponder.panHandlers}
							onResponderStart={() => onPressIn && onPressIn(roomId, timeId)}
              onResponderEnd={() => onPressOut && onPressOut(roomId, timeId, startAngle, endAngle, times)}
            />
          )}
        </G>
        <G x={endCoords.x - btnRadius} y={endCoords.y - btnRadius}>
          {!isStatic && (
            <Circle
              r={17}
              cx={btnRadius}
              cy={btnRadius}
              fill={setColorOfCircleButton(isActive, startAngle, endAngle)}
              {...endPanResponder.panHandlers}
							onResponderStart={() => onPressIn && onPressIn(roomId, timeId)}
              onResponderEnd={() => onPressOut && onPressOut(roomId, timeId, startAngle, endAngle, times)}
            />
          )}
        </G>
      </G>
      {
        (endAngle - startAngle) < 3.7
        &&
          <Image 
            href={require('../../../assets/icons/busket.png')}
            x={endCoords.x - 6} 
            y={endCoords.y - 6}
          />
      }
      
    </>
  );
};

export default React.memo(CircularSlider);
