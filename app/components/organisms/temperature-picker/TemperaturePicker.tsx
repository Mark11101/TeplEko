import * as React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleProp, ViewStyle, Platform, View } from 'react-native';
import { WheelPicker } from "react-native-wheel-picker-android";  

import s from './TemperaturePicker.styles';

interface Props {
  isBlack?: boolean,
  temperature: number,
  styles?: StyleProp<ViewStyle>;
  onChange: (value: number) => void,
}

export const TemperaturePicker: React.FC<Props> = (props) => {
  const {
    styles,
    isBlack,
    temperature,
    onChange,
  } = props;

  const handleChangeAndroidShit = (position: number) => {

    onChange(Number((position / 2).toFixed(2)))
  }

  return (
    <>
      {
        Platform.OS === 'ios' 
        ?
          <Picker
            testID="basic-picker"
            selectedValue={temperature}
            onValueChange={onChange}
            accessibilityLabel="Basic Picker Accessibility Label"
            itemStyle={[s.picker, styles]}
          >
            {
              [
                0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 
                6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
                11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 
                16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5,
                21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5,
                26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5,
                31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5,
              ].map((temperature) => (
                <Picker.Item 
                  color={isBlack ? 'orange' : undefined}
                  key={temperature}
                  label={temperature + '°'} 
                  value={temperature} 
                />
              ))
            }
          </Picker>
        :
          <View style={s.androidWheel}>
            <WheelPicker
              isCyclic
              hideIndicator
              style={s.androidWheel}
              selectedItemTextSize={15}
              itemTextSize={15}
              selectedItem={temperature * 2}
              onItemSelected={handleChangeAndroidShit}
              data={[
                '0°', '0.5°', '1°', '1.5°', '2°', '2.5°', '3°', '3.5°', '4°', '4.5°', '5°', '5.5°', 
                '6°', '6.5°', '7°', '7.5°', '8°', '8.5°', '9°', '9.5°', '10°', '10.5°',
                '11°', '11.5°', '12°', '12.5°', '13°', '13.5°', '14°', '14.5°', '15°', '15.5°', 
                '16°', '16.5°', '17°', '17.5°', '18°', '18.5°', '19°', '19.5°', '20°', '20.5°',
                '21°', '21.5°', '22°', '22.5°', '23°', '23.5°', '24°', '24.5°', '25°', '25.5°',
                '26°', '26.5°', '27°', '27.5°', '28°', '28.5°', '29°', '29.5°', '30°', '30.5°',
                '31°', '31.5°', '32°', '32.5°', '33°', '33.5°', '34°', '34.5°', '35°', '35.5°',
              ]}
            />
          </View>
      }
    </>
  );
}
