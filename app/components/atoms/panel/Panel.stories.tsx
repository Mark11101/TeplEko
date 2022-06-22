import * as React from 'react';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Panel } from './Panel';

storiesOf('Panel', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#5479DD'}}>
      {story()}
    </View>
  )
  .add('default', () =>(
    <Panel>
      <Text>sample text</Text>
      <Text>sample text</Text>
      <Text>sample text</Text>
    </Panel>
  ))
