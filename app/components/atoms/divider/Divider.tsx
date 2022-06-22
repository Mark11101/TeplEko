import React from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';

import s from './Divider.styles';

interface Props {
  styles?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<Props> = (props) => {
  const {
    styles,
  } = props;

  return (
    <View style={[s.divider, styles]} />
  )
}
