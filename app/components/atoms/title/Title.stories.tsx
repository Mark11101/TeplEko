import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Title } from './Title';

storiesOf('Title', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {story()}
    </View>
  )
  .add('default', () => <Title>sample text</Title>)
