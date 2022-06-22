import { WeekdaysTypes } from "./common";

export interface PressedInterval {
  roomId: number | null,
  intervalId: number | null,
}

export interface HeatingInterval {
  id?: number;
  end: string;
  start: string; // hh:mm 
  temperature: number;
  createdAt?: string;
} 

export interface ScheduleSection {
  id?: number;
  day: WeekdaysTypes,
  updatedAt?: string,
  heatingIntervals: HeatingInterval[] | [];
}

export interface RoomGroup {
  id: number;
  name: string;
  rooms: Room[];
  isOnPause: boolean;
  temperature: number;
  createdAt?: string,
  updatedAt?: string,
  isAtHomeFunctionOn: boolean;
  weekdaysSchedule: ScheduleSection[];
  heatingIntervals: HeatingInterval[];
}

export interface Room {
  id: number;
  name: string;
  isOnPause: boolean;
  temperature: number;
  roomGroup: RoomGroup | null;
  createdAt?: string,
  updatedAt?: string,
  isAtHomeFunctionOn: boolean;
  weekdaysSchedule: ScheduleSection[];
  heatingIntervals: HeatingInterval[];
}

export interface RoomOrRoomGroup {
  id?: number;
  name?: string;
  rooms?: Room[];
  roomGroup?: RoomGroup | null;
  isOnPause?: boolean;
  createdAt?: string,
  updatedAt?: string,
  temperature?: number;
  isAtHomeFunctionOn?: boolean;
  weekdaysSchedule?: ScheduleSection[];
  heatingIntervals?: HeatingInterval[];
}

export type AddRoomRequestData = 
  Partial<Omit<Room, 'id' | 'roomGroup'>> & 
  { roomGroup: number | null};

export type AddRoomGroupRequestData = Omit<RoomGroup, 'id'>;

export type EditRoomRequestData = {
  roomId: number,
  data: Room,
};

export type EditRoomGroupRequestData = {
  roomId: number,
  data: RoomGroup,
};
