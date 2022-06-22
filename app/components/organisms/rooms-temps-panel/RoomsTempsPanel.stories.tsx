import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { RoomsTempsPanel } from './RoomsTempsPanel';

const defaultRooms = [
  {
    id: 1,
    index: 1,
    name: 'Подвал',
    currentTemperature: 25,
    isAtHomeFunctionOn: true,
    times: [
      {
        id: 1,
        start: '12:00',
        end: '22:00',
        temperature: 25,
        isPressed: false,
      }
    ],
    weekdaysSchedule: [],
  },
];

storiesOf('RoomsTempsPanel', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F1F7' }}>
      {story()}
    </View>
  )
  .add('default', () => <RoomsTempsPanel rooms={defaultRooms} title='Температуры' />)
