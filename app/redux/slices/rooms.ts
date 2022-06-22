import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { 
  Room, 
  RoomGroup, 
  PressedInterval,
  ScheduleSection, 
  HeatingInterval, 
} from '../types/room';

interface RoomState {
  roomGroups: RoomGroup[],
  rooms: Room[],
  pressedInterval: PressedInterval,
}

const initialState: RoomState = {
  roomGroups: [],
  rooms: [],
  pressedInterval: {
    roomId: null,
    intervalId: null,
  }
};

type AddTimeActionType = {
  roomId: number,
  newTimeId: number,
  start: string,
  end: string,
  temperature: number,
};

type DeleteTimeActionType = {
  roomId: number,
  timeId: number,
};

type SetActiveTimeActionType = {
  roomId: number,
  timeId: number,
};

///////////// CHANGE TIME /////////////

type ChangeTimeActionType = {
  roomId: number,
  timeId: number,
  start: string,
  end: string,
};

type ChangeWeekdaysTimeActionType = {
  roomId: number,
  weekdayId: number,
  timeId: number,
  start: string,
  end: string,
};

///////////// CHANGE TEMPERATURE /////////////

type ChangeTemperatureActionType = {
  roomId: number,
  timeId: number,
  temperature: number,
};

type ChangeWeekdaysTemperatureActionType = {
  roomId: number,
  weekdayId: number,
  timeId: number,
  temperature: number,
}

type InitialWeeldaysScheduleActionType = {
  roomId: number,
};

// type SetWeekdayScheduleActionType = {
//   roomId: number, 
//   weekdayScheduleId: number, 
//   weekdaysSchedule: ScheduleSection[],
// };

type AddWeekdayTimeActionType = 
  AddTimeActionType & 
  { weekdayId: number};

type ChangeWeekdayTimeActionType = 
  ChangeTimeActionType & 
  { weekdayId: number};

type DeleteWeekdayTimeActionType = 
  DeleteTimeActionType & 
  { weekdayId: number};

type SetActiveWeekdayTimeActionType = 
  SetActiveTimeActionType &
  { weekdayId: number};

type ChangeWeekdayTimeTemperatureActionType = 
  ChangeTemperatureActionType &
  { weekdayId: number};

type ChangeWeekdayActionType = {
  weekdayId: number,
  roomId: number,
  heatingIntervals: HeatingInterval[] | [],
};

type SetRoomGroupIdActionType = {
  roomId: number,
}

const getFindedRoom = (id: number, rooms: Room[]) => rooms.find((room) => room.id === id);
const getFilteredRooms = (id: number, rooms: Room[]) => rooms.filter((room) => room.id !== id);

const getFindedRoomGroup = (id: number, roomGroups: RoomGroup[]) => roomGroups.find((roomGroup) => roomGroup.id === id);
const getFilteredRoomGroups = (id: number, roomGroups: RoomGroup[]) => roomGroups.filter((roomGroup) => roomGroup.id !== id);

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState,

  reducers: {

    toggleAtHomeFunctionOfRoom: (state, action: PayloadAction<{ id: number }>) => {
      
      const { id } = action.payload;

      const findedRoom = getFindedRoom(id, state.rooms);
      const filteredRooms = getFilteredRooms(id, state.rooms);
      
      if (findedRoom) state.rooms = [
        ...filteredRooms,
        {
          ...findedRoom,
          isAtHomeFunctionOn: !findedRoom.isAtHomeFunctionOn,
        },
      ]
    },

    toggleAtHomeFunctionOfRoomGroup: (state, action: PayloadAction<{ id: number }>) => {
      
      const { id } = action.payload;

      const findedRoomGroup = getFindedRoomGroup(id, state.roomGroups);
      const filteredRoomGroups = getFilteredRoomGroups(id, state.roomGroups);
      
      if (findedRoomGroup) {

        state.roomGroups = [
          ...filteredRoomGroups,
          {
            ...findedRoomGroup,
            isAtHomeFunctionOn: !findedRoomGroup.isAtHomeFunctionOn,
          },
        ];

        if (findedRoomGroup.rooms !== null) {

          const filteredRooms = state.rooms.filter((room) => getFilteredRooms(room.id, state.rooms));

          state.rooms = [
            ...filteredRooms,
            ...findedRoomGroup.rooms.map((room) => ({
              ...room,
              isAtHomeFunctionOn: !findedRoomGroup.isAtHomeFunctionOn,
            }))
          ]
        }
      }
    },

    turnOffAtHomeFuncForAllRoomsAndRoomGroups: (state) => {

      state.roomGroups = state.roomGroups.map((roomGroup) => ({
        ...roomGroup,
        isAtHomeFunctionOn: false,
        rooms: roomGroup.rooms.map((room) => ({
          ...room,
          isAtHomeFunctionOn: false,
        }))
      }));

      state.rooms = state.rooms.map((room) => ({
        ...room,
        isAtHomeFunctionOn: false
      }));
    },

    // addTime: (state, action: PayloadAction<AddTimeActionType>) => {

    //   const { newTimeId, roomId, start, end, temperature } = action.payload;

    //   const findedRoom = getFindedRoom(roomId, state.rooms);
    //   const filteredRooms = getFilteredRooms(roomId, state.rooms);

    //   if (findedRoom) state.rooms = [
    //     ...filteredRooms,
    //     {
    //       ...findedRoom,
    //       heatingIntervals: [
    //         ...findedRoom.heatingIntervals,
    //         {
    //           id: newTimeId,
    //           start,
    //           end,
    //           temperature: temperature,
    //           isPressed: true,
    //         }
    //       ]
    //     }
    //   ];
    // },

    ///////////// CHANGE TIME /////////////

    changeRoomTime: (state, action: PayloadAction<ChangeTimeActionType>) => {

      const { roomId, timeId, start, end } = action.payload;

      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) {

        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedTime) state.rooms = [
          ...filteredRooms,
          {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                start,
                end,
              }
            ],
          }
        ];
      }
    },

    changeWeekdaysScheduleRoomTime: (state, action: PayloadAction<ChangeWeekdaysTimeActionType>) => {

      const { roomId, weekdayId, timeId, start, end } = action.payload;

      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) {

        const findedWeekdaySchedule = findedRoom.weekdaysSchedule.find((schedule) => schedule.id === weekdayId);
        const filteredWeekdaysSchedule = findedRoom.weekdaysSchedule.filter((schedule) => schedule.id !== weekdayId);

        const findedTime = findedWeekdaySchedule?.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedWeekdaySchedule?.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedWeekdaySchedule && findedTime && filteredTimes) state.rooms = [
          ...filteredRooms,
          {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaySchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    id: timeId,
                    start,
                    end,
                  }
                ],
              }
            ]
          }
        ]
      }
    },

    changeRoomGroupTime: (state, action: PayloadAction<ChangeTimeActionType>) => {

      const { roomId, timeId, start, end } = action.payload;

      const findedRoom = getFindedRoomGroup(roomId, state.roomGroups);
      const filteredRooms = getFilteredRoomGroups(roomId, state.roomGroups);

      if (findedRoom) {

        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedTime) state.roomGroups = [
          ...filteredRooms,
          {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                start,
                end,
              }
            ],
          }
        ];
      }
    },

    changeWeekdaysScheduleRoomGroupTime: (state, action: PayloadAction<ChangeWeekdaysTimeActionType>) => {

      const { roomId, weekdayId, timeId, start, end } = action.payload;

      const findedRoom = getFindedRoomGroup(roomId, state.roomGroups);
      const filteredRooms = getFilteredRoomGroups(roomId, state.roomGroups);

      if (findedRoom) {

        const findedWeekdaySchedule = findedRoom.weekdaysSchedule.find((schedule) => schedule.id === weekdayId);
        const filteredWeekdaysSchedule = findedRoom.weekdaysSchedule.filter((schedule) => schedule.id !== weekdayId);

        const findedTime = findedWeekdaySchedule?.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedWeekdaySchedule?.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedWeekdaySchedule && findedTime && filteredTimes) state.roomGroups = [
          ...filteredRooms,
          {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaySchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    id: timeId,
                    start,
                    end,
                  }
                ],
              }
            ]
          }
        ]
      }
    },

    ///////////// CHANGE TEMPERATURE /////////////

    changeRoomTemperature: (state, action: PayloadAction<ChangeTemperatureActionType>) => {

      const { roomId, timeId, temperature } = action.payload
    
      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) {
        
        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedTime) state.rooms = [
          ...filteredRooms,
          {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                temperature,
              }
            ],
          }
        ];
      }
    },

    changeRoomWeekdaysScheduleTemperature: (state, action: PayloadAction<ChangeWeekdaysTemperatureActionType>) => {

      const { roomId, weekdayId, timeId, temperature } = action.payload
    
      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) {

        const findedWeekdaySchedule = findedRoom.weekdaysSchedule.find((schedule) => schedule.id === weekdayId);
        const filteredWeekdaysSchedule = findedRoom.weekdaysSchedule.filter((schedule) => schedule.id !== weekdayId);
        
        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedWeekdaySchedule && findedTime && filteredTimes) state.rooms = [
          ...filteredRooms,
          {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaySchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    temperature,
                  }
                ],
              }
            ]
          }
        ];
      }
    },

    changeRoomGroupTemperature: (state, action: PayloadAction<ChangeTemperatureActionType>) => {

      const { roomId, timeId, temperature } = action.payload
    
      const findedRoom = getFindedRoomGroup(roomId, state.roomGroups);
      const filteredRooms = getFilteredRoomGroups(roomId, state.roomGroups);

      if (findedRoom) {
        
        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedTime) state.roomGroups = [
          ...filteredRooms,
          {
            ...findedRoom,
            heatingIntervals: [
              ...filteredTimes,
              {
                ...findedTime,
                temperature,
              }
            ],
          }
        ];
      }
    },

    changeRoomGroupWeekdaysScheduleTemperature: (state, action: PayloadAction<ChangeWeekdaysTemperatureActionType>) => {

      const { roomId, weekdayId, timeId, temperature } = action.payload
    
      const findedRoom = getFindedRoomGroup(roomId, state.roomGroups);
      const filteredRooms = getFilteredRoomGroups(roomId, state.roomGroups);

      if (findedRoom) {

        const findedWeekdaySchedule = findedRoom.weekdaysSchedule.find((schedule) => schedule.id === weekdayId);
        const filteredWeekdaysSchedule = findedRoom.weekdaysSchedule.filter((schedule) => schedule.id !== weekdayId);
        
        const findedTime = findedRoom.heatingIntervals.find((interval) => interval.id === timeId);
        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        if (findedWeekdaySchedule && findedTime && filteredTimes) state.roomGroups = [
          ...filteredRooms,
          {
            ...findedRoom,
            weekdaysSchedule: [
              ...filteredWeekdaysSchedule,
              {
                ...findedWeekdaySchedule,
                heatingIntervals: [
                  ...filteredTimes,
                  {
                    ...findedTime,
                    temperature,
                  }
                ],
              }
            ]
          }
        ];
      }
    },

    ///////////// DELETE TIME /////////////

    deleteRoomTime: (state, action: PayloadAction<DeleteTimeActionType>) => {

      const { roomId, timeId } = action.payload;
      
      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) {

        const filteredTimes = findedRoom.heatingIntervals.filter((interval) => interval.id !== timeId);

        state.rooms = [
          ...filteredRooms,
          {
            ...findedRoom,
            heatingIntervals: filteredTimes,
          }
        ];
      }
    },

    setActiveTimeForRoom: (state, action: PayloadAction<{ roomId: number, intervalId: number }>) => {
      
      const { roomId, intervalId } = action.payload;

      state.pressedInterval = {
        roomId,
        intervalId,
      };
    },

    setLastAddedTimeActiveForRoom: (state, action: PayloadAction<Room>) => {
      
      const room = action.payload;

      if (room.weekdaysSchedule && room.weekdaysSchedule.length !== 0) {

        const updatedAtWeekdays = room.weekdaysSchedule.map((schedule: ScheduleSection) => moment(schedule.updatedAt));
        const lastUpdatedWeekday = moment.max(updatedAtWeekdays);

        const findedWeekday = room.weekdaysSchedule.find((schedule: ScheduleSection) => moment(schedule.updatedAt).isSame(lastUpdatedWeekday));

        const createdAtTimes = findedWeekday?.heatingIntervals.map((interval: HeatingInterval) => moment(interval.createdAt)); 
        const lastCreatedTime = createdAtTimes && moment.max(createdAtTimes);
  
        const findedInterval = 
          findedWeekday &&
          findedWeekday.heatingIntervals &&
          findedWeekday.heatingIntervals.find((interval: HeatingInterval) => moment(interval.createdAt).isSame(lastCreatedTime));
  
        if (findedInterval && findedInterval.id) {

          state.pressedInterval = {
            roomId: room.id,
            intervalId: findedInterval.id,
          };
        }

      } else {

        const createdAtTimes = room.heatingIntervals.map((interval: HeatingInterval) => moment(interval.createdAt)); 
        const lastCreatedTime = moment.max(createdAtTimes);

        const findedInterval = room.heatingIntervals.find((interval: HeatingInterval) => moment(interval.createdAt).isSame(lastCreatedTime));

        if (findedInterval && findedInterval.id) {
          
          state.pressedInterval = {
            roomId: room.id,
            intervalId: findedInterval.id,
          };
        }
      }
    },

    deleteWeekSchedule: (state, action: PayloadAction<{roomId: number}>) => {

      const { roomId } = action.payload;

      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) state.rooms = [
        ...filteredRooms,
        {
          ...findedRoom,
          weekdaysSchedule: [],
        }
      ]
    },

    setRoomGroupId: (state, action: PayloadAction<SetRoomGroupIdActionType>) => {

      const { roomId } = action.payload;

      const findedRoom = getFindedRoom(roomId, state.rooms);
      const filteredRooms = getFilteredRooms(roomId, state.rooms);

      if (findedRoom) state.rooms = [
        ...filteredRooms,
        {
          ...findedRoom,
          roomGroup: {
            ...findedRoom.roomGroup,

          }
        }
      ]
    },

    setRooms: (state, action: PayloadAction<Room[]>) => {

      const rooms = action.payload;
      state.rooms = rooms;
    },

    setRoomGroups: (state, action: PayloadAction<RoomGroup[]>) => {

      const roomGroups = action.payload;
      state.roomGroups = roomGroups;
    },

    deleteRoom: (state, action: PayloadAction<{roomId: number}>) => {

      const { roomId } = action.payload;
      state.rooms = getFilteredRooms(roomId, state.rooms);
    }
  }
});

export const {
  toggleAtHomeFunctionOfRoom,
  toggleAtHomeFunctionOfRoomGroup,
  turnOffAtHomeFuncForAllRoomsAndRoomGroups,

  changeRoomTime,
  changeWeekdaysScheduleRoomTime,
  changeRoomGroupTime,
  changeWeekdaysScheduleRoomGroupTime,
  changeRoomTemperature,
  changeRoomWeekdaysScheduleTemperature,
  changeRoomGroupTemperature,
  changeRoomGroupWeekdaysScheduleTemperature,
  
  deleteRoomTime,
  setActiveTimeForRoom,
  setLastAddedTimeActiveForRoom,
  deleteWeekSchedule,
  setRoomGroupId,
  setRooms,
  setRoomGroups,
  deleteRoom,
} = RoomsSlice.actions;

export default RoomsSlice.reducer
