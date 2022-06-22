import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

import s from './Title.styles';

interface Props {
  styles?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Title: React.FC<Props> = (props) => {
  const {
    styles,
    children,
  } = props;

  return (
    <Text style={[s.title, styles]}>
      {children}
    </Text>
  )
}
