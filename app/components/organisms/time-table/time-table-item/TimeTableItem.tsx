import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { HeatingInterval } from '../../../../redux/types/room';
import BasketIcon from '../../../../assets/images/basket.svg';

import s from './TimeTableItem.styles';

interface Props {
  time: HeatingInterval;
  isDisabled: boolean;
  isLoading?: boolean;
  onPress: (timeId: number) => void;
  onDelete: (id: number) => void;
}

const TimeTableItem: React.FC<Props> = (props) => {
  const {
    time,
    isLoading,
    isDisabled,
    onPress,
    onDelete,
  } = props;
  
  const text = [ s.text, isDisabled && s.disabled ];
  const bar = [ s.disabled, s.bar, isDisabled && s.light ];

  return (
    <TouchableOpacity style={s.time} onPress={() => time.id && onPress(time.id)}>
      <View style={s.cell}>
        <Text style={text}>
          {
            time.start.length > 5
            ?
              time.start.slice(0, -3)
            :
              time.start
          }
        </Text>
      </View>

      <Text style={text}>
        -
      </Text>

      <View style={s.cell}>
        <Text style={text}>
          {
            time.end.length > 5
            ?
              time.end.slice(0, -3)
            :
              time.end
          }
        </Text>
      </View>

      <Text style={bar}>
        |
      </Text>
      
      <View style={s.cell}>
        <Text style={text}>
          {time.temperature}°
        </Text>
      </View>

      <Text style={bar}>
        |
      </Text>

      <View style={s.cell} >
        {
          !isDisabled 
          &&
            <>
              {
                isLoading
                ?
                  <ActivityIndicator />
                :
                  <TouchableOpacity style={s.deleteBtn} onPress={() => time.id && onDelete(time.id)}>
                    <BasketIcon />
                  </TouchableOpacity>
              }
            </>
        }
      </View>
    </TouchableOpacity>
  )
}

export default TimeTableItem
