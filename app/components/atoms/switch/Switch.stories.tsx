import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Switch } from './Switch';

storiesOf('Switch', module)
  .addDecorator(story => (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {story()}
    </View>
  ))
  .add('default', () => <SwitchWrapper />);

function SwitchWrapper() {

  const [value, setValue] = React.useState(false);

  return (
    <Switch 
      value={value} 
      onValueChange={setValue} 
      title='Получать уведомления, если термостат переходит в автономный режим' 
    />
  );
}
