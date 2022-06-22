import React from 'react';
import { View, Modal as NativeModal, StyleProp, ViewStyle } from 'react-native';

import s from './Modal.styles';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>,
  onClose: () => void;
}

export const Modal: React.FC<Props> = (props) => {
  const {
    isVisible,
    children,
    styles,
    onClose,
  } = props;

  return (
    <NativeModal
      animationType='slide'
      visible={isVisible}
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <View style={[s.modalView, styles]}>
        {children}
      </View>
    </NativeModal>
  )
}