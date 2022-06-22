import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import TimeLine from './TimeLine';
import { HeatingInterval } from '../../../redux/types/room';
import { convertHHmmToMins } from '../../../utils/timeUtils';

import s from './Clock.styles';

const DIAL_RADIUS = 39;
const STROKE_WIDTH = 7;
const SIZE = (DIAL_RADIUS + STROKE_WIDTH) * 2;

interface Props {
  day: string;
  isNotActive?: boolean;
  times: HeatingInterval[] | [];
  styles?: StyleProp<ViewStyle>;
}

export const Clock: React.FC<Props> = (props) => {
  const {
    day,
    times,
    styles,
    isNotActive,
  } = props;

  const getAngle = (time: HeatingInterval, moment: 'start' | 'end'): number => {
    
    return Number((convertHHmmToMins(time[moment]) / 4).toFixed())
  };

  return (
    <View style={[s.clock, isNotActive && s.notActive, styles]}>
      <Svg width={SIZE} height={SIZE}>
        <Circle
          r={DIAL_RADIUS + STROKE_WIDTH}
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill='#e7e5ef'
        />
        <Circle
          r={DIAL_RADIUS}
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill="white"
        />
        {
          times && times.map((time) => (
            <TimeLine 
              key={time.id}
              dialRadius={DIAL_RADIUS} 
              strokeWidth={STROKE_WIDTH} 
              startAngle={getAngle(time, 'start')} 
              endAngle={getAngle(time, 'end')} 
            />
          ))
        }
      </Svg>
      <Text style={s.day}>
        {day}
      </Text>
    </View>
  )
}
