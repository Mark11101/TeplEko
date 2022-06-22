import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Checkbox } from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {story()}
    </View>
  )
  .add('default', () => <Checkbox isChecked={false} onPress={() => ({})} />)
