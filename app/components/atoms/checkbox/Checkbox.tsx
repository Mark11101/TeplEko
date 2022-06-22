import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import s from './Checkbox.styles';

interface Props {
  isChecked: boolean;
  styles?: StyleProp<ViewStyle>;
  onPress: (checked: boolean) => void;
}
   
export const Checkbox: React.FC<Props> = (props) => {
  const { 
    styles, 
    isChecked, 
    onPress 
  } = props;

  return (
    <View style={styles}>
      <BouncyCheckbox
        size={25}
        isChecked={isChecked}
        fillColor='#5479DD'
        iconStyle={s.icon}
        onPress={onPress}
      />
    </View>
  );
};
