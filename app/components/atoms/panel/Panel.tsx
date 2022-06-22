import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import s from './Panel.styles';

interface Props {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

export const Panel: React.FC<Props> = (props) => {
  const {
    styles,
    children,
  } = props;

  return (
    <View style={[s.panel, styles]}>
      {children}
    </View>
  )
}

export default Panel
