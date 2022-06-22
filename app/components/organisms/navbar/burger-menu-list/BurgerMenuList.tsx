import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

import { Panel } from '../../../atoms';
import { Screens } from '../../../../constants/Routes'

import s from './BurgerMenuList.styles';

interface Props {
  isOnPause?: boolean,
  closeBurgerMenu(): void;
  showAllRoomsModal(): void;
  navigate(route: string): void;
}

const BurgerMenuList: React.FC<Props> = (props) => {
  const {
    closeBurgerMenu,
    navigate,
  } = props;

  return (
    <View style={s.burgerMenuList}>
      <Panel>

        {/* <TouchableOpacity 
          style={s.burgerMenuItem}
          onPress={() => {
            closeBurgerMenu();
            showAllRoomsModal();
          }}
          disabled={isOnPause}
        >
          <Text style={[s.text, isOnPause && s.disabledText]}>
            Все комнаты
          </Text>
          <Image source={{}}/>
        </TouchableOpacity>

        <View style={s.bigDivider} /> */}

        <TouchableOpacity 
          style={s.burgerMenuItem}
          onPress={() => {
            closeBurgerMenu();
            navigate(Screens.SETTINGS_LIST);
          }}
        >
          <Text style={s.text}>
            Настройки
          </Text>
          <Image source={{}}/>
        </TouchableOpacity>
      </Panel>
    </View>
  )
}

export default BurgerMenuList
