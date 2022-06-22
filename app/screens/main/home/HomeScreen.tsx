import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DraxProvider, DraxView } from 'react-native-drax';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  Text, 
  ScrollView,
  ActivityIndicator, 
  StatusBar,
  Platform,
} from 'react-native';

import { 
  useRequestRoomsQuery, 
  useRequestRoomGroupsQuery,
  useRequestEditRoomMutation,
  useRequestEditRoomGroupMutation
} from '../../../redux/requests/rooms';
import { RootState } from '../../../redux';
import { Screens } from '../../../constants/Routes';
import PlusIcon from '../../../assets/images/plus.svg';
import { Room, RoomGroup } from '../../../redux/types/room';
import ArrowIcon from '../../../assets/images/left-arrow.svg';
import { toggleIsOnPause } from '../../../redux/slices/system';
import { storeAsyncStorageData } from '../../../async-storage';
import { Title, Divider, Button, Panel } from '../../../components/atoms';
import RootStackParamsList from '../../../screens/RootStackParams';
import { AtHomeSettingsModal, AddRoomModal } from '../../../modals';
import DragAndDropLinesIcon from '../../../assets/icons/dnd-lines.svg';
import { Navbar, RoomsTempsPanel } from '../../../components/organisms';
import EditListOrderIcon from '../../../assets/icons/edit-list-order.svg';
import EditListOrderPressedIcon from '../../../assets/icons/edit-list-order-pressed.svg';

import s from './HomeScreen.styles';
import { colors } from '../../../styles/variables.styles';

export const HomeScreen: React.FC = () => {

  const dispatch = useDispatch();
  
  const system = useSelector((state: RootState) => state.system);

  const { 
    data: rooms, 
    refetch: refetchRooms,
    isLoading: isRequestRoomsLoading,
    isError: isRequestRoomsError,
  } = useRequestRoomsQuery();

  const { 
    data: roomGroups, 
    refetch: refetchRoomGroups,
    isLoading: isRequestRoomGroupsLoading,
    isError: isRequestRoomGroupsError,
  } = useRequestRoomGroupsQuery();

  const [
    requestEditRoom,
  ] = useRequestEditRoomMutation();

  const [
    requestEditRoomGroup,
  ] = useRequestEditRoomGroupMutation();

  // React.useEffect(() => {

  //   if (!system.isAtHome) {

  //     rooms?.forEach((room) => room.isAtHomeFunctionOn && dispatch(toggleIsAtHome(true)));
  //     roomGroups?.forEach((roomGroup) => roomGroup.isAtHomeFunctionOn && dispatch(toggleIsAtHome(true)));
  //   }

  // }, [rooms, roomGroups])

  React.useEffect(() => {

    if (isRequestRoomsError && isRequestRoomGroupsError) {
      
      storeAsyncStorageData('token', '')
      navigation.navigate(Screens.SIGN_IN)
    }

  }, [isRequestRoomsError, isRequestRoomGroupsError])

  // const updatedAtRooms = rooms.map((room: Room) => moment(room.updatedAt)); 
  // const lastCreatedTime = moment.max(updatedAtRooms);

  const sortedRooms = rooms && [...rooms].sort((a: Room, b: Room) => {

    const firstUpdatedAt = moment(a.updatedAt);
    const secondUpdatedAt = moment(b.updatedAt);

    return moment(secondUpdatedAt).valueOf() - moment(firstUpdatedAt).valueOf()
  });

  const sortedRoomGroups = roomGroups && [...roomGroups].sort((a: RoomGroup, b: RoomGroup) => {
    const firstUpdatedAt = moment(a.updatedAt);
    const secondUpdatedAt = moment(b.updatedAt);

    return moment(secondUpdatedAt).valueOf() - moment(firstUpdatedAt).valueOf()
  })
  
  const separatedRooms = sortedRooms && sortedRooms.filter((room: Room) => room.roomGroup === null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const [isEditListOrderUiVisible, setIsEditListOrderUiVisible] = useState(false);
  
  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = useState(false);
  const [isAtHomeSettingsModalVisible, setIsAtHomeSettingsModalVisible] = useState(false);

  const isAtHome  = system.isAtHome;
  const isOnPause = system.isOnPause;

  const [isAtHomeDescriptionVisible, setIsAtHomeDiscriptionVisible] = useState(false);
  const [isOnPauseDescriptionVisible, setIsOnPauseDiscriptionVisible] = useState(false);

  const [selectedRoomGroup, setSelectedRoomGroup] = useState<RoomGroup | undefined>();

  const handleRelocateRoom = (roomToRelocate: Room, roomGroupFromId: number, roomGroupTo: RoomGroup) => {

    const findedRoomGroup = roomGroups?.find((roomGroup) => roomGroup.id === roomGroupFromId);
    const filteredRoomsInroomGroupFrom = findedRoomGroup && findedRoomGroup.rooms.filter((room) => room.id !== roomToRelocate.id);

    filteredRoomsInroomGroupFrom && requestEditRoomGroup({
      roomId: findedRoomGroup.id,
      data: {
        ...findedRoomGroup,
        rooms: filteredRoomsInroomGroupFrom,
      }
    }).then(() => {

      requestEditRoomGroup({
        roomId: roomGroupTo.id,
        data: {
          ...roomGroupTo,
          rooms: [
            ...roomGroupTo.rooms,
            roomToRelocate,
          ],
        }
      }).then(() => {
        refetchRooms()
        refetchRoomGroups()
      })
    })
  };

  const handleRelocateSepareteRoom = (roomToRelocate: Room, roomGroupTo: RoomGroup) => {

    requestEditRoomGroup({
      roomId: roomGroupTo.id,
      data: {
        ...roomGroupTo,
        rooms: [
          ...roomGroupTo.rooms,
          roomToRelocate,
        ],
      }
    }).then(() => {
      refetchRooms()
      refetchRoomGroups()
    })
  };

  const handleRelocateRoomToSeparate = (roomToRelocate: Room) => {

    requestEditRoom({
      roomId: roomToRelocate.id,
      data: {
        ...roomToRelocate,
        roomGroup: null
      }
    }).then(() => {
      refetchRooms()
      refetchRoomGroups()
    })
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#f2f1f7"
      />
      <Navbar
        header='Главная'
        withBurgerMenu
        rooms={sortedRooms}
        roomGroups={roomGroups}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        leftSideOptionBtn={
          <View style={s.navLeftIcons}>
            <TouchableOpacity style={s.plusIcon} onPress={() => setIsAddRoomModalVisible(true)}>
              <PlusIcon
                width={32}
                height={32}
                fill={colors.primary}
              />
            </TouchableOpacity>
            {
              Platform.OS === 'ios' && roomGroups && (roomGroups.length !== 0)
              &&
                <TouchableOpacity onPress={() => setIsEditListOrderUiVisible(!isEditListOrderUiVisible)}>
                  {
                    isEditListOrderUiVisible
                    ?
                      <EditListOrderPressedIcon 
                        width={32}
                        height={32}
                        fill={colors.white}
                      />
                    :
                      <EditListOrderIcon 
                        width={32}
                        height={32}
                        fill={colors.white}
                      />
                  }
                </TouchableOpacity>
            }
          </View>
        }
        navigate={navigation.navigate}
      />
      <Divider styles={s.divider}/>
      <ScrollView style={s.homeScreen}>
        <View style={s.block}>
          <Title styles={s.title}>
            Функции
          </Title>
          <View>
            <TouchableOpacity
              style={[s.functionalBtn, s.atHomeBtn]}
              onPress={() => setIsAtHomeSettingsModalVisible(true)}
              disabled={isOnPause}
            >
              <View style={s.functionalBtnFirstLine}>
                <View style={s.functionalBtnLeftSide}>
                  {
                    isAtHome
                    ?
                      <Image
                        style={s.functionalBtnIcon}
                        source={require('../../../assets/icons/at-home.png')}
                      />
                    :
                      <Image
                        style={s.functionalBtnIcon}
                        source={require('../../../assets/icons/out-home.png')}
                      />
                  }
                  <Text style={[
                    isAtHome && s.atHomeBtnText,
                    !isAtHome && s.notAtHomeBtnText,
                  ]}>
                    Я дома
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsAtHomeDiscriptionVisible(!isAtHomeDescriptionVisible)}>
                  <ArrowIcon
                    width={8}
                    fill={colors.grey}
                    style={[
                      s.showDescriptionBtn,
                      isAtHomeDescriptionVisible && s.rotateArrowToUp
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {
                isAtHomeDescriptionVisible
                &&
                  <Text style={s.helpPanelDescription}>
                    Функция позволяет запустить ближайший этап обогрева до
                    запланированного времени для выбранных комнат
                  </Text>
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={s.functionalBtn}
              onPress={() => dispatch(toggleIsOnPause())}
            >
              <View style={s.functionalBtnFirstLine}>
                <View style={s.functionalBtnLeftSide}>
                  {
                    isOnPause
                    ?
                      <Image
                        style={s.functionalBtnIcon}
                        source={require('../../../assets/icons/on-pause-icon.png')}
                      />
                    :
                      <Image
                        style={s.functionalBtnIcon}
                        source={require('../../../assets/icons/off-pause-icon.png')}
                      />
                  }
                  <Text style={[
                    isOnPause && s.onPauseBtnText,
                    !isOnPause && s.notOnPauseBtnText,
                  ]}>
                    Пауза
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsOnPauseDiscriptionVisible(!isOnPauseDescriptionVisible)}>
                  <ArrowIcon
                    width={8}
                    fill={colors.grey}
                    style={[
                      s.showDescriptionBtn,
                      isOnPauseDescriptionVisible && s.rotateArrowToUp
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {
                isOnPauseDescriptionVisible
                &&
                  <Text style={s.helpPanelDescription}>
                    При включенной функции пауза весь обогрев отключен.
                    Для продолжения обогрева отключите функцию пауза.
                  </Text>
              }
            </TouchableOpacity>
          </View>
        </View>
        {
          (isRequestRoomsLoading || isRequestRoomGroupsLoading)
          &&
            <ActivityIndicator />
        }
        {
          isEditListOrderUiVisible
          ?
            <>
              <DraxProvider>
                {
                  sortedRoomGroups &&
                  sortedRoomGroups
                    .map((roomGroup: RoomGroup) => {
                      
                      const roomsInGroup = (sortedRooms && sortedRooms.filter((room: Room) => room.roomGroup?.id === roomGroup.id)) || [];

                      return (
                        <DraxView 
                          key={roomGroup.id} 
                          style={s.block} 
                          draggingStyle={{ opacity: 0.5 }}
                          renderContent={() => 
                            <>
                              <Title styles={s.title}>
                                {roomGroup.name}
                              </Title>
                              <Panel styles={s.draxPanel}>
                                {
                                  roomsInGroup &&
                                  roomsInGroup.map((room, index) => (
                                    <View key={room.id}>
                                      {
                                        index !== 0
                                        && 
                                          <Divider styles={{ marginVertical: 12 }}/>
                                      }
                                      <DraxView
                                        key={room.id}
                                        dragPayload={room}
                                        longPressDelay={0}
                                        draggingStyle={s.dragged}
                                        hoverStyle={s.draggedItem}
                                      >
                                        <View style={s.dragItem}>
                                          <Text style={s.roomBtnText}>
                                            {room.name}
                                          </Text>
                                          <DragAndDropLinesIcon />
                                        </View>
                                      </DraxView>
                                    </View>
                                  ))
                                }
                                {
                                  roomsInGroup.length === 0
                                  &&
                                    <Button
                                      type='addBtn'
                                      text='Добавить комнату'
                                      onPress={() => setIsAddRoomModalVisible(true)}
                                    />
                                }
                              </Panel>
                            </>
                          }
                          onReceiveDragDrop={(e) => {

                            const roomGroupFrom = e.dragged.payload.roomGroup;

                            if (roomGroupFrom) {

                              roomGroupFrom.id !== roomGroup.id
                              &&
                                handleRelocateRoom(
                                  e.dragged.payload,
                                  e.dragged.payload.roomGroup.id, 
                                  roomGroup
                                )

                            } else {

                              handleRelocateSepareteRoom(
                                e.dragged.payload,
                                roomGroup
                              )
                            }
                          }}
                        />
                      )
                    })
                }
                {
                  <DraxView 
                    style={s.block} 
                    draggingStyle={{ opacity: 0.5 }}
                    renderContent={() => 
                      <>
                        <Title styles={s.title}>
                          Отдельные комнаты
                        </Title>
                        <Panel styles={s.draxPanel}>
                          {
                            separatedRooms &&
                            separatedRooms
                              .map((room, index) => (
                                <View key={room.id}>
                                  {
                                    index !== 0
                                    && 
                                      <Divider styles={{ marginVertical: 12 }}/>
                                  }
                                  <DraxView
                                    key={room.id}
                                    dragPayload={room}
                                    longPressDelay={0}
                                    draggingStyle={s.dragged}
                                    hoverStyle={s.draggedItem}
                                  >
                                    <View style={s.dragItem}>
                                      <Text style={s.roomBtnText}>
                                        {room.name}
                                      </Text>
                                      <DragAndDropLinesIcon />
                                    </View>
                                  </DraxView>
                                </View>
                              ))
                          }
                        </Panel>
                      </>
                    }
                    onReceiveDragDrop={(e) => {
                          
                      handleRelocateRoomToSeparate(
                        e.dragged.payload
                      )
                    }}
                  />
                }
              </DraxProvider>
              <View style={{ paddingBottom: 300}} />
            </>
          :
            <>
              {
                sortedRoomGroups &&
                sortedRoomGroups
                  .map((roomGroup: RoomGroup) => {

                    const roomsInGroup = (sortedRooms && sortedRooms.filter((room: Room) => room.roomGroup?.id === roomGroup.id)) || [];

                    return (
                      <RoomsTempsPanel
                        styles={s.block}
                        key={roomGroup.id}
                        disabled={isOnPause}
                        title={roomGroup.name}
                        roomGroupId={roomGroup.id}
                        isRoomsClickable={!isOnPause}
                        rooms={
                          roomsInGroup.map((room: Room) => ({
                            id: room.id,
                            name: room.name,
                            temperature: room.temperature,
                          }))
                        }
                        openAddRoomModal={() => {
                          setSelectedRoomGroup(roomGroup)
                          setIsAddRoomModalVisible(true)
                        }}
                      />
                    )
                  })
              }
              {
                separatedRooms && separatedRooms.length !== 0
                &&
                  <RoomsTempsPanel
                    styles={[s.block, s.separatedRooms]}
                    title='Отдельные комнаты'
                    disabled={isOnPause}
                    isRoomsClickable={!isOnPause}
                    rooms={
                      separatedRooms.map((room: Room) => ({
                        id: room.id,
                        name: room.name,
                        temperature: room.temperature,
                      }))
                    }
                  />
              }
              {
                rooms &&
                roomGroups &&
                rooms.length === 0 &&
                roomGroups.length === 0
                &&
                  <Button
                    type='primary'
                    text='Добавить комнату'
                    onPress={() => setIsAddRoomModalVisible(true)}
                  />
              }
              <View style={s.bottomPadding} />
            </>
        }
      </ScrollView>
      {
        sortedRooms && roomGroups
        &&
          <>
            <AddRoomModal
              rooms={sortedRooms}
              roomGroups={roomGroups}
              isVisible={isAddRoomModalVisible}
              initialRoomGroup={selectedRoomGroup}
              refetchRooms={refetchRooms}
              refetchRoomGroups={refetchRoomGroups}
              onClose={() => setIsAddRoomModalVisible(false)}
            />
            <AtHomeSettingsModal
              rooms={sortedRooms}
              roomGroups={roomGroups}
              isVisible={isAtHomeSettingsModalVisible}
              refetchRooms={refetchRooms}
              refetchRoomGroups={refetchRoomGroups}
              onClose={() => setIsAtHomeSettingsModalVisible(false)}
            />
          </>
      }
    </>
  )
}
