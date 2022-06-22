import { Dimensions, Platform, StyleSheet } from "react-native";

function getTypography (
  weight: '400' | '500' | '600', 
  size: number, 
  height: number
) {

  let fontFamily = '';

  if (Platform.OS === 'ios') fontFamily = 'Inter';
  else if (weight === '400') fontFamily = 'inter_regular';
  else if (weight === '500') fontFamily = 'inter_medium';
  else if (weight === '600') fontFamily = 'inter_semibold';

  const screenWidth = Dimensions.get('screen').width;

  let fontRate = 1;

  if (screenWidth < 375) fontRate = 0.8;
  if (screenWidth >= 414) fontRate = 1;

  return {
    color: 'black',
    fontWeight: weight,
    fontSize: size * fontRate,
    lineHeight: height * fontRate,
    fontFamily,
  }
}

export const text = StyleSheet.create({
  default: getTypography('400', 16, 22), 
  h1: getTypography('600', 18, 22), 
  h2: getTypography('500', 16, 26), 
  h3: getTypography('500', 15, 22), 
  footnote: getTypography('400', 13, 18), 
  link: getTypography('500', 16, 22),
});

export const colors = {
  screen: '#f2f1f7',
  primary: '#5479dd',
  disabled: '#444b6066',
  info: '#fb8c00',
  success: '#34c759',
  error: '#e53935',
  helpText: '#45446080',
  white: '#fff',
  grey: '#a2a2b0',
  green: '#2ca84b',
}

export const borderRadius = 12;
