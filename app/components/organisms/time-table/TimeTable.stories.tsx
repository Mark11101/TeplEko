import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { TimeTable } from './TimeTable';
import { ScheduleSection } from '../../../redux/types/room';
import { WeekdaysTypes } from '../../../redux/types/common';

const defaultSchedule = {
  id: 0,
  dayType: WeekdaysTypes.ALL_DAYS,
  times: [
    {
      id: 0,
      start: '06:00',
      end: '09:00',
    },
    {
      id: 1,
      start: '10:00',
      end: '12:00',
    },
    {
      id: 2,
      start: '13:30',
      end: '15:00',
    },
    {
      id: 3,
      start: '15:30',
      end: '18:00',
    },
    {
      id: 4,
      start: '18:00',
      end: '06:00',
    },
  ],
  temperature: 0,
} as ScheduleSection;

storiesOf('TimeTable', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray', }}>
      {story()}
    </View>
  )
  .add('default', () => (
    <TimeTable 
      activeTimeId={0}
      schedule={defaultSchedule} 
      onAddTimePeriod={() => console.log('onAddTimePeriod')} 
      onDeleteTimePeriod={() => console.log('onDeleteTimePeriod')}
    />
  ))
