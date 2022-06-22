import React from 'react';
import { View, Text, Switch as NativeSwitch, StyleProp, ViewStyle } from 'react-native';

import s from './Switch.styles';
import { colors } from '../../../styles/variables.styles'

interface Props {
  value: boolean,
  title?: string,
  disabled?: boolean,
  boldText?: boolean,
  styles?: StyleProp<ViewStyle>;
  onValueChange: (value: boolean) => void,
}

export const Switch: React.FC<Props> = (props) => {
  const { 
    value, 
    title, 
    disabled,
    styles, 
    boldText,
    onValueChange 
  } = props;

  return (
    <View style={[s.wrapper, styles]}>
      {
        title 
        && 
          <Text style={[s.text, disabled && s.disabledText, boldText && s.boldText]}>
            {title}
          </Text>
      }
      <NativeSwitch
        style={s.toggle}
        value={value}
        onValueChange={value => onValueChange(value)}
        thumbColor='white'
        trackColor={{
          false: '#e9e9eb',
          true: colors.success,
        }}
        disabled={disabled}
      />
    </View>
  );
};
