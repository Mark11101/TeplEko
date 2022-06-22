import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import moment from 'moment';

import { 
  useRequestAddRoomMutation, 
  useRequestAddRoomGroupMutation 
} from '../../redux/requests/rooms';
import Cross from '../../assets/images/cross.svg';
import { Room, RoomGroup } from '../../redux/types/room';
import { Input, Title, Button } from '../../components/atoms';
import { Modal, SetRoomTypePanel } from '../../components/organisms';

import s from './AddRoomModal.styles';

interface Props {
  rooms: Room[],
  roomGroups: RoomGroup[],
  isVisible: boolean,
  initialRoomGroup?: RoomGroup,
  refetchRooms: () => void;
  refetchRoomGroups: () => void;
  onClose: () => void;
}

export const AddRoomModal: React.FC<Props> = (props) => {
  const {
    rooms,
    roomGroups,
    isVisible,
    initialRoomGroup,
    refetchRooms,
    refetchRoomGroups,
    onClose,
  } = props;
  
  const [roomName, setRoomName] = useState('');
  const [newRoomGroupName, setNewRoomGroupName] = useState('');
  const [selectedRoomGroup, setSelectedRoomGroup] = useState<RoomGroup | null>(initialRoomGroup || roomGroups[0]);

  React.useEffect(() => {

    initialRoomGroup
    ?
      setSelectedRoomGroup(initialRoomGroup)
    :
      setSelectedRoomGroup(roomGroups[0])
  }, [initialRoomGroup])

  const [isErrorRoomNameExist, setIsErrorRoomNameExist] = useState(false);
  const [isErrorRoomGroupNameExist, setIsErrorRoomGroupNameExist] = useState(false);
  
  const [isNewRoomGroupAdded, setIsNewRoomGroupAdded] = useState(false);

  // const [isErrorRoomNameLength, setIsErrorRoomNameLength] = useState(false);
  // const [isErrorRoomGroupNameLength, setIsErrorRoomGroupNameLength] = useState(false);

  const [ 
    requestAddRoom, 
    { 
      isSuccess: isAddRoomSuccess,
      isLoading: isAddRoomLoading,
    } 
  ] = useRequestAddRoomMutation();

  const [ 
    requestAddRoomGroup, 
    { 
      isSuccess: isAddRoomGroupSuccess,
      isLoading: isAddRoomGroupLoading,
    } 
  ] = useRequestAddRoomGroupMutation();

  const handleClose = () => {

    setRoomName('')
    setNewRoomGroupName('')

    setIsErrorRoomNameExist(false)
    setIsErrorRoomGroupNameExist(false)

    setIsNewRoomGroupAdded(false)

    onClose()
  };

  React.useEffect(() => {

    if (isAddRoomSuccess) {
      refetchRooms()
      refetchRoomGroups()

      handleClose()
    }

  }, [isAddRoomSuccess])

  React.useEffect(() => {

    if (isAddRoomGroupSuccess) {
      refetchRoomGroups()
      refetchRooms()

      setIsNewRoomGroupAdded(true)
    } else {
      setIsNewRoomGroupAdded(false)
    }

  }, [isAddRoomGroupSuccess])

  React.useEffect(() => {

    if (isAddRoomGroupSuccess) {
      
      const createdAtRoomGroups = roomGroups.map((roomGroup: RoomGroup) => moment(roomGroup.createdAt)); 
      const lastCreatedRoomGroup = moment.max(createdAtRoomGroups);

      const findedRoomGroup = roomGroups.find((roomGroup) => moment(roomGroup.createdAt).isSame(lastCreatedRoomGroup));

      findedRoomGroup && setSelectedRoomGroup(findedRoomGroup)
    }

    roomGroups.length === 0 && setSelectedRoomGroup(null)

  }, [roomGroups])

  const checkIfNameALreadyUsed = (
    name: string, 
    rooms: Room[], 
    roomGroups: RoomGroup[],
    callBack: (result: boolean) => void,
  ) => {

    const isNameAlreadyUsedInRooms = rooms.find((room) => room.name === name);
    const isNameAlreadyUsedInGroups = roomGroups.find((group) => group.name === name);

    (isNameAlreadyUsedInRooms || isNameAlreadyUsedInGroups)
    ?
      callBack(true)
    :
      callBack(false)
  };

  const handleChangeRoomName = (name: string) => {

    name.length <= 30 && setRoomName(name)

    // name.length > 15 
    // ?
    //   setIsErrorRoomNameLength(true)
    // :
    //   setIsErrorRoomNameLength(false)

    checkIfNameALreadyUsed(
      name,
      rooms,
      roomGroups,
      (result) => setIsErrorRoomNameExist(result),
    )
  }

  const handleChangeRoomGroupName = (name: string) => {
    
    name.length <= 30 && setNewRoomGroupName(name)

    // name.length > 15 
    // ?
    //   setIsErrorRoomGroupNameLength(true)
    // :
    //   setIsErrorRoomGroupNameLength(false)

    checkIfNameALreadyUsed(
      name,
      rooms,
      roomGroups,
      (result) => setIsErrorRoomGroupNameExist(result),
    )
  };

  const handleAddRoomGroup = (roomGroupName: string) => {
      
    requestAddRoomGroup({
      name: roomGroupName,
      temperature: 24,
      isOnPause: false,
      isAtHomeFunctionOn: false,
      rooms: [],
      weekdaysSchedule: [],
      heatingIntervals: [
        {
          id: 1,
          start: '06:00',
          end: '08:00',
          temperature: 24,
        },
        {
          id: 2,
          start: '16:00',
          end: '22:30',
          temperature: 24,
        },
      ],
    })
  };
  
  const handleClickSubmit = (roomName: string, selectedRoomGroup: RoomGroup | null) => {
    
    selectedRoomGroup
    ?
      requestAddRoom({
        name: roomName,
        temperature: selectedRoomGroup.temperature,
        isOnPause: selectedRoomGroup.isOnPause,
        isAtHomeFunctionOn: selectedRoomGroup.isAtHomeFunctionOn,
        roomGroup: selectedRoomGroup.id,
        weekdaysSchedule: selectedRoomGroup.weekdaysSchedule,
        heatingIntervals: 
          selectedRoomGroup.heatingIntervals.length !== 0
          ?
            selectedRoomGroup.heatingIntervals
          :
            [
              {
                id: 1,
                start: '06:00',
                end: '08:00',
                temperature: 24,
              },
              {
                id: 2,
                start: '16:00',
                end: '22:30',
                temperature: 24,
              },
            ]
      })
    :
      requestAddRoom({
        name: roomName,
        temperature: 24,
        isOnPause: false,
        isAtHomeFunctionOn: false,
        roomGroup: null,
        weekdaysSchedule: [],
        heatingIntervals: [
          {
            id: 1,
            start: '06:00',
            end: '08:00',
            temperature: 24,
          },
          {
            id: 2,
            start: '16:00',
            end: '22:30',
            temperature: 24,
          },
        ],
      })
  };

  return (
    <Modal isVisible={isVisible} onClose={handleClose}>
      <View style={s.closeBtnView}>
        <TouchableOpacity onPress={handleClose}>
          <Cross />  
        </TouchableOpacity>
      </View>
      <ScrollView style={s.scrollView}>
        <View style={s.roomNameView}>
          <Title styles={s.title}>
            Придумайте название комнаты
          </Title>
          <Input
            value={roomName}
            placeholder='Кухня'
            isError={isErrorRoomNameExist}
            onChange={(text) => handleChangeRoomName(text)}
          />
          {
            isErrorRoomNameExist
            &&
              <Text style={s.errorText}>
                Такая комната или группа уже есть
              </Text>
          }
        </View>
        <SetRoomTypePanel 
          roomGroups={roomGroups}
          newRoomGroupName={newRoomGroupName}
          selectedRoomGroupId={selectedRoomGroup?.id || null}
          isErrorRoomGroupName={isErrorRoomGroupNameExist}
          addRoomGroup={handleAddRoomGroup}
          onChangeRoomGroupName={(name) => handleChangeRoomGroupName(name)}
          onChangeSelectedRoomGroup={(group) => setSelectedRoomGroup(group)}
        />
        {
          isErrorRoomGroupNameExist
          ?
            <Text style={[s.errorText, s.errorRoomGroupText]}>
              Такая группа или комната уже есть
            </Text>
          :
            <Text style={s.helpText}>
              Создайте группу для возможности редактирования комнат одновременно.
            </Text>
        }
        <Button 
          type='primary'
          text='Сохранить'
          styles={s.saveBtn}
          onPress={() => roomName ? handleClickSubmit(roomName, selectedRoomGroup) : handleClose()}
          isLoading={isAddRoomLoading || isAddRoomGroupLoading}
          isDisabled={(!roomName || isErrorRoomNameExist) && !isNewRoomGroupAdded}
        />
      </ScrollView>
    </Modal>
  )
}
