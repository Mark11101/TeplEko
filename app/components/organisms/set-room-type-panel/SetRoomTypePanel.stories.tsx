import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { SetRoomTypePanel } from './SetRoomTypePanel';

storiesOf('SetRoomTypePanel', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {story()}
    </View>
  )
  .add('default', () => (
    <SetRoomTypePanel 
      roomGroups={[]} 
      newRoomType='' 
      onChangeNewRoomTypeText={() => ({})} 
      onChangeSelectedRoomName={() => ({})}
    />
  ))
