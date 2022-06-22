import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Clock } from './Clock';
import { Time } from '../../../redux/types/room';

const times = [
  {
    id: 1,
    start: '05:00',
    end: '11:00',
  },
  {
    id: 2,
    start: '14:00',
    end: '19:00',
  },
  {
    id: 3,
    start: '21:00',
    end: '23:00',
  },
] as Time[];

storiesOf('Clock', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {story()}
    </View>
  )
  .add('default', () => <Clock day='Пн' times={times} />)