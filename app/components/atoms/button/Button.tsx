import React from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import PlusIcon from '../../../assets/images/plus.svg';

import s from './Button.styles';
import { colors } from '../../../styles/variables.styles';

interface Props {
  text?: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  styles?: StyleProp<ViewStyle>;
  type: 'default' | 'primary' | 'secondary' | 'link' | 'addBtn' | 'delete';
}

export const Button: React.FC<Props> = (props) => {
  const { 
    text, 
    type, 
    styles, 
    isLoading,
    isDisabled, 
    onPress 
  } = props;

  const isDefault   = type === 'default';
  const isPrimary   = type === 'primary';
  const isSecondary = type === 'secondary';
  const isLink      = type === 'link';
  const isAddBtn    = type === 'addBtn';
  const isDelete    = type === 'delete';

  return (
    <TouchableOpacity
      style={[
        s.button,
        isDefault && s.button_default,
        isPrimary && s.button_primary,
        isSecondary && s.button_secondary,
        isAddBtn && s.button_text_with_icon,
        isDelete && s.button_delete,
        isDisabled 
        &&
          (
            (isDefault || isPrimary) && s.bg_disabled ||
            isSecondary && s.border_disabled
          ),
        styles,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {
        isAddBtn 
        && 
          <>
            {
              isLoading
              ?
                <ActivityIndicator 
                  style={s.icon} 
                />
              :
                <PlusIcon 
                  width={24} 
                  height={24}
                  fill={isDisabled ? colors.disabled : colors.primary}
                  style={s.icon} 
                />
            }
          </>
      }
      <Text
        style={[
          (isLink || isAddBtn) ? s.link_text : s.button_text,
          isAddBtn && s.black_text,
          (isDefault || isLink) && s.blue_text,
          (isPrimary || isSecondary) && s.white_text,
          isDelete && s.red_text,
          isDisabled && s.grey_text,
        ]}
      >
        {
          isLoading && !isAddBtn
          ?
            <ActivityIndicator />
          :
            text
        }
      </Text>
    </TouchableOpacity>
  );
};
