import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import { RootState } from '../../../redux';
import { AllRoomsModal } from '../../../modals/all-rooms/AllRoomsModal';
import BurgerMenuList from './burger-menu-list/BurgerMenuList';
import { Room, RoomGroup } from '../../../redux/types/room';

import WhiteBurgerIcon from '../../../assets/images/white-burger.svg';
import BlackBurgerIcon from '../../../assets/images/black-burger.svg';
import LeftArrowIcon from '../../../assets/images/left-arrow.svg';

import s from './Navbar.styles';

interface Props {
  header: string;
  isLight?: boolean,
  wrapHeader?: boolean,
  goBackBtnTitle?: string;
  withBurgerMenu?: boolean;
  withGoBackBtnIcon?: boolean;
  styles?: StyleProp<ViewStyle>;
  numberOfLinesForHeader?: number,
  leftSideOptionBtn?: React.ReactNode;
  rightSideOptionBtn?: React.ReactNode;
  navigate?(route: string): void;
  goBack?(): void;
  rooms?: Room[],
  roomGroups?: RoomGroup[],
  refetchRooms?(): void;
  refetchRoomGroups?(): void;
}

export const Navbar: React.FC<Props> = (props) => {
  const {
    header,
    styles,
    isLight,
    wrapHeader,
    withBurgerMenu,
    goBackBtnTitle,
    withGoBackBtnIcon,
    leftSideOptionBtn,
    rightSideOptionBtn,
    numberOfLinesForHeader = 1,
    navigate,
    goBack,
    rooms,
    roomGroups,
    refetchRooms,
    refetchRoomGroups,
  } = props;

  const system = useSelector((state: RootState) => state.system);

  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false);
  const [isAllRoomsModalVisible, setIsAllRoomsModalVisible] = useState(false);
  
  const iconFill = isLight ? 'white' : 'black';
  
  return (
    <>
      <View style={[s.navbar, isLight && s.transparent, styles]}>
        <View style={s.side}>
        {
          (goBackBtnTitle || withGoBackBtnIcon) && !leftSideOptionBtn
          &&
            <TouchableOpacity
              style={[s.sideBtn, s.arrowBtn]}
              onPress={goBack}
            >
              <LeftArrowIcon fill={iconFill}/>
              <Text style={[s.arrowBtnText, isLight && s.light]}>
                {goBackBtnTitle}
              </Text>
            </TouchableOpacity>
        }
        {
          leftSideOptionBtn && !(goBackBtnTitle || withGoBackBtnIcon)
          &&
            <View>
              {leftSideOptionBtn}
            </View>
        }
        </View>

        <Text 
          style={[s.title, isLight && s.light]}
          numberOfLines={
            wrapHeader
            ?
              2
            :
              numberOfLinesForHeader
          }
        >
          {header}
        </Text>

        <View style={s.side}>
          {
            withBurgerMenu
            &&
              <TouchableOpacity
                style={[s.sideBtn, s.burgerBtn]}
                onPress={() => setIsBurgerMenuVisible(!isBurgerMenuVisible)}
              >
                {
                  isLight
                  ?
                    <WhiteBurgerIcon />
                  :
                    <BlackBurgerIcon />
                }
              </TouchableOpacity>
          }
          {
            rightSideOptionBtn && !withBurgerMenu
            &&
              <View style={s.rightSide}>
                {rightSideOptionBtn}
              </View>
          }
        </View>
      </View>
      {
        isBurgerMenuVisible && navigate
        &&
          <>
            <TouchableOpacity 
              style={s.burgerMenu}
              onPress={() => setIsBurgerMenuVisible(false)}
            />
            <BurgerMenuList 
              closeBurgerMenu={() => setIsBurgerMenuVisible(false)} 
              showAllRoomsModal={() => setIsAllRoomsModalVisible(true)}
              isOnPause={system.isOnPause}
              navigate={navigate}
            />
          </>
      }
      {
        isAllRoomsModalVisible &&
        rooms &&
        roomGroups &&
        refetchRooms &&
        refetchRoomGroups
        &&
          <AllRoomsModal 
            rooms={rooms}
            roomGroups={roomGroups}
            isVisible={isAllRoomsModalVisible}
            refetchRooms={refetchRooms}
            refetchRoomGroups={refetchRoomGroups}
            onClose={() => setIsAllRoomsModalVisible(false)} 
          />
      }
    </>
  )
}