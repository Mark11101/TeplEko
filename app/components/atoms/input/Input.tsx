import React from 'react';
import { 
  View,
  ViewStyle,
  TextInput, 
  StyleProp,
  TouchableOpacity,
  KeyboardTypeOptions, 
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputEndEditingEventData,
} from 'react-native';

import OpenedEye from '../../../assets/images/eyes/eye-opened.svg';
import ClosedEye from '../../../assets/images/eyes/eye-closed.svg';

import s from './Input.styles';
import { colors } from '../../../styles/variables.styles';

interface Props {
  value: string;
  isError?: boolean;
  placeholder: string;
  styles?: StyleProp<ViewStyle>;
  isPasswordNotVisible?: boolean;
  keyboardType?: KeyboardTypeOptions;
  type?: 'text' | 'password' | 'confirm';
  onShowPassword?: () => void;
  onChange: (value: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData | TextInputEndEditingEventData>) => void;
}

export const Input: React.FC<Props> = (props) => {
  const {
    value,
    styles,
    isError,
    placeholder,
    type = 'text',
    keyboardType = 'default',
    isPasswordNotVisible = false,
    onBlur,
    onFocus,
    onChange,
    onShowPassword,
  } = props;

  const iconFill = isError ? colors.error : colors.primary;

  const placeholderTextColor = isError ? '#f29c9a' : undefined;

  return (
    <View style={s.wrapper}>
      <TextInput 
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        style={[s.input, isError && s.error, styles]}
        secureTextEntry={((type === 'password') || (type === 'confirm')) && isPasswordNotVisible}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChange}
        onEndEditing={(e) => onBlur && onBlur(e)}
      />
      {
        (type === 'password') 
        &&
          <TouchableOpacity 
            style={s.icon} 
            onPress={onShowPassword}   
          >
            {
              isPasswordNotVisible 
              ? 
                <ClosedEye fill={iconFill} />
              :
                <OpenedEye fill={iconFill} />
            }
          </TouchableOpacity>
      }
  </View>
  )
}
