import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DraxProvider, DraxView } from 'react-native-drax';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

import { Room, RoomGroup } from '../../redux/types/room';
import { Screens } from '../../constants/Routes';
import { AddRoomModal, EditRoomModal } from '..';
import { Navbar, Modal } from '../../components/organisms';
import RootStackParamsList from '../../screens/RootStackParams';
import RightArrowIcon from '../../assets/icons/right-arrow.svg';
import DragAndDropLinesIcon from '../../assets/icons/dnd-lines.svg';
import { Title, Panel, Button, Divider } from '../../components/atoms';
// import { setRoomGroupId, deleteRoomGroupId } from '../../redux/slices/rooms';

import s from './AllRoomsModal.styles';

interface Props {
  rooms: Room[],
  roomGroups: RoomGroup[],
  isVisible: boolean;
  refetchRooms(): void;
  refetchRoomGroups(): void;
  onClose: () => void;
}

export const AllRoomsModal: React.FC<Props> = (props) => {
  const {
    rooms,
    roomGroups,
    isVisible,
    refetchRooms,
    refetchRoomGroups,
    onClose,
  } = props;
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.ROOMS_SETTINGS>>();

  const roomsInGroup = rooms.filter((room) => room.roomGroup !== null);
  const separatedRooms = rooms.filter((room) => room.roomGroup === null);

  const [isEditRoomModalVisible, setIsEditRoomModalVisible] = useState(false);

  const [isEditElementsVisible, setIsEditElementsVisible] = useState(false);
  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = useState(false);

  const [livingZone, setLivingZone] = useState(roomsInGroup);
  const [separateZone, setSeparateZone] = useState(separatedRooms);
  
  const sortedLivingZone = livingZone.sort((a: Room, b: Room) => a.id - b.id);
  const sortedSeparateZone = separateZone.sort((a: Room, b: Room) => a.id - b.id);

  // React.useEffect(() => {

  //   setSeparateZone(separatedRooms)
  // }, [separatedRooms])

  // React.useEffect(() => {

  //   setLivingZone(roomsInGroup)
  // }, [roomsInGroup])
  
  return (
    <Modal 
      isVisible={isVisible} 
      onClose={onClose}
    >
      <Navbar 
        header='Комнаты'
        styles={s.navbar}
        leftSideOptionBtn={
          <TouchableOpacity onPress={() => {
            setIsEditElementsVisible(false)
            onClose()
          }}>
            <Text style={s.navbarSideText}>
              Назад
            </Text>
          </TouchableOpacity>
        }
        // rightSideOptionBtn={
        //   <>
        //     {
        //       isEditElementsVisible
        //       ?
        //         <TouchableOpacity onPress={() => setIsEditElementsVisible(false)}>
        //           <Text style={s.navbarSideText}>
        //             Готово
        //           </Text>
        //         </TouchableOpacity>
        //       :
        //         <TouchableOpacity onPress={() => ({})}>
        //           <Text style={s.navbarSideText}>
        //             Изменить
        //           </Text>
        //         </TouchableOpacity>
        //     }
        //   </>
        // }
      />
      <ScrollView style={s.scrollView}>
        {
          isEditElementsVisible
          ?
            <>
              <DraxProvider>
                <DraxView
                  renderContent={() =>
                    <>
                      <Title styles={s.title}>
                       Комнаты в группе
                      </Title>
                      <Panel styles={s.panel}>
                        {sortedLivingZone.map((zone: Room) => (
                          <View key={zone.id}>
                            <DraxView
                              dragPayload={zone}
                              longPressDelay={0}
                              draggingStyle={s.dragged}
                            >
                              <View style={s.roomBtn}>
                                <Text style={s.roomBtnText}>
                                  {zone.name}
                                </Text>
                                <DragAndDropLinesIcon />
                              </View>
                            </DraxView>
                            <Divider />
                          </View>
                        ))}
                        <Button 
                          type='addBtn'
                          text='Добавить комнату'
                          styles={s.addBtn}
                          onPress={() => setIsAddRoomModalVisible(true)}
                        />  
                      </Panel>
                    </>
                  }
                  onReceiveDragDrop={(event) => {

                    !livingZone.find((zone: Room) => zone.id === event.dragged.payload.id)
                    &&
                      setLivingZone([
                        ...livingZone,
                        event.dragged.payload || '?',
                      ]);

                    setSeparateZone(
                      separateZone.filter((zone: Room) => zone.id !== event.dragged.payload.id)
                    );

                    // dispatch(setRoomGroupId({ 
                    //   roomId: event.dragged.payload.id,
                    //   roomGroupId: 1,
                    // }));
                  }}
                />
                <DraxView
                  renderContent={() =>
                    <>
                      <Title styles={s.title}>
                        Отдельные комнаты
                      </Title>
                      <Panel styles={s.panel}>
                        {sortedSeparateZone.map((zone: Room) => (
                          <>
                            <DraxView
                              key={zone.id}
                              dragPayload={zone}
                              longPressDelay={0}
                              draggingStyle={s.dragged}
                            >
                              <View style={s.roomBtn}>
                                <Text style={s.roomBtnText}>
                                  {zone.name}
                                </Text>
                                <DragAndDropLinesIcon />
                              </View>
                            </DraxView>
                            <Divider />
                          </>
                        ))}
                        <Button 
                          type='addBtn'
                          text='Добавить комнату'
                          styles={s.addBtn}
                          onPress={() => setIsAddRoomModalVisible(true)}
                        />  
                      </Panel>
                    </>
                  }
                  onReceiveDragDrop={(event) => {

                    !separateZone.find((zone: Room) => zone.id === event.dragged.payload.id)
                    &&
                      setSeparateZone([
                        ...separateZone,
                        event.dragged.payload || '?',
                      ]);

                    setLivingZone(
                      livingZone.filter((zone: Room) => zone.id !== event.dragged.payload.id)
                    );

                    // dispatch(deleteRoomGroupId({ roomId: event.dragged.payload.id }));
                  }}
                />
              </DraxProvider>
            </>
          :
            <>
              <Title styles={s.title}>
                Комнаты в группе
              </Title>
              <Panel styles={s.panel}>
                {sortedLivingZone.map((room: Room, index: number) => (
                  <>
                    <TouchableOpacity 
                      key={room.id} 
                      style={s.roomBtn}
                      onPress={() => {
                        navigation.navigate(Screens.ROOMS_SETTINGS, { roomId: room.id })
                        onClose()
                      }}
                    >
                      <Text style={s.roomBtnText}>
                        {room.name}
                      </Text>
                      <RightArrowIcon />
                    </TouchableOpacity>
                    {
                      roomsInGroup.length - 1 !== index
                      &&
                        <Divider />
                    }
                  </>
                ))}
              </Panel>
              <Title styles={s.title}>
                Отдельные комнаты
              </Title>
              <Panel styles={s.panel}>
                {sortedSeparateZone.map((room: Room, index: number) => (
                  <>
                    <TouchableOpacity 
                      key={room.id} 
                      style={s.roomBtn}
                      onPress={() => {
                        navigation.navigate(Screens.ROOMS_SETTINGS, { roomId: room.id })
                        onClose()
                      }}
                    >
                      <Text style={s.roomBtnText}>
                        {room.name}
                      </Text>
                      {
                        isEditElementsVisible
                        ?
                          <DragAndDropLinesIcon />
                        :
                          <RightArrowIcon />
                      }
                    </TouchableOpacity>
                    {
                      separatedRooms.length - 1 !== index
                      &&
                        <Divider />
                    }
                  </>
                ))}
              </Panel>
            </>
        }
      </ScrollView>
      <AddRoomModal 
        rooms={rooms}
        roomGroups={roomGroups}
        isVisible={isAddRoomModalVisible}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        onClose={() => setIsAddRoomModalVisible(false)}
      />
      <EditRoomModal 
        room={rooms[0]}
        rooms={rooms}
        roomGroups={roomGroups}
        isVisible={isEditRoomModalVisible}
        refetchRooms={refetchRooms}
        refetchRoomGroups={refetchRoomGroups}
        navigation={navigation}
        onClose={() => setIsEditRoomModalVisible(false)}
      />
    </Modal>
  )
}
