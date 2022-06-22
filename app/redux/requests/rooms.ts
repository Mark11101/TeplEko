import { baseApi } from "./baseApi";

import { 
  Room, 
  RoomGroup,
  AddRoomRequestData, 
  AddRoomGroupRequestData,
  EditRoomRequestData,
  EditRoomGroupRequestData,
} from '../types/room';

import { 
  setRooms,
  setRoomGroups,
  setLastAddedTimeActiveForRoom 
} from '../slices/rooms';

const roomsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    requestRooms: builder.query<Room[], void>({
      query: () => ({
        url: `/rooms`,
        method: 'GET',
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {

          const { data } = await queryFulfilled;

          data && dispatch(setRooms(data))

        } catch(error) {
          console.log(error)
        }
      },
    }),

    requestRoomGroups: builder.query<RoomGroup[], void>({
      query: () => ({
        url: `/roomGroups`,
        method: 'GET',
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {

          const { data } = await queryFulfilled;

          dispatch(setRoomGroups(data))

        } catch(error) {
          console.log(error)
        }
      },
    }),

    requestAddRoom: builder.mutation<Room[], AddRoomRequestData>({
      query: (payload) => ({
        url: `/rooms`,
        method: 'POST',
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestAddRoomGroup: builder.mutation<RoomGroup[], AddRoomGroupRequestData>({
      query: (payload) => ({
        url: `/roomGroups`,
        method: 'POST',
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestDeleteRoom: builder.mutation<unknown, {id: number}>({
      query: (payload) => ({
        url: `/rooms/${payload.id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestDeleteRoomGroup: builder.mutation<unknown, {id: number}>({
      query: (payload) => ({
        url: `/roomGroups/${payload.id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestToggleRoomAtHomeFunction: builder.mutation<unknown, {id: number, data: Room}>({
      query: (payload) => ({
        url: `/rooms/${payload.id}`,
        method: 'PUT',
        data: payload.data,
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestToggleRoomGroupAtHomeFunction: builder.mutation<unknown, {id: number, data: RoomGroup}>({
      query: (payload) => ({
        url: `/roomGroups/${payload.id}`,
        method: 'PUT',
        data: payload.data,
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }),

    requestEditRoom: builder.mutation<unknown, EditRoomRequestData>({
      query: (payload) => ({
        url: `/rooms/${payload.roomId}`,
        method: 'PUT',
        data: payload.data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),

    requestEditRoomGroup: builder.mutation<unknown, EditRoomGroupRequestData>({
      query: (payload) => ({
        url: `/roomGroups/${payload.roomId}`,
        method: 'PUT',
        data: payload.data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),

    requestAddTimeForRoom: builder.mutation<unknown, {roomId: number, data: Room, isAfterAddingRoomGroup?: boolean}>({
      query: (payload) => ({
        url: `/rooms/${payload.roomId}`,
        method: 'PUT',
        data: payload.data,
        headers: {
          'Content-Type': 'application/json'
        },
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {

          const { data } = await queryFulfilled;

          !payload.isAfterAddingRoomGroup 
          && 
            dispatch(setLastAddedTimeActiveForRoom(data as Room))

        } catch(error) {
          console.log(error)
        }
      },
    }),

    requestAddTimeForRoomGroup: builder.mutation<unknown, {roomId: number, data: RoomGroup}>({
      query: (payload) => {
        
        return ({
          url: `/roomGroups/${payload.roomId}`,
          method: 'PUT',
          data: payload.data,
          headers: {
            'Content-Type': 'application/json'
          },
        })
    },

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {

          const { data } = await queryFulfilled;

          dispatch(setLastAddedTimeActiveForRoom(data as Room))

        } catch(error) {
          console.log(error)
        }
      },
    }),
  })
});

export const {
  useRequestRoomsQuery,
  useRequestRoomGroupsQuery,
  useRequestAddRoomMutation,
  useRequestAddRoomGroupMutation,
  useRequestDeleteRoomMutation,
  useRequestDeleteRoomGroupMutation,
  useRequestToggleRoomAtHomeFunctionMutation,
  useRequestToggleRoomGroupAtHomeFunctionMutation,
  useRequestAddTimeForRoomMutation,
  useRequestEditRoomMutation,
  useRequestAddTimeForRoomGroupMutation,
  useRequestEditRoomGroupMutation,
} = roomsApi;

export default roomsApi
