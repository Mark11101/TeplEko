import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';

import store from '../../../redux';
import { CircularSlider } from './CircularSlider';
import { WeekdaysTypes } from '../../../redux/types/common';

storiesOf('Circular slider', module)
  .addDecorator(story => (
    <Provider store={store}>
      <View
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {story()}
      </View>
    </Provider>
  ))
  .add('default', () => <CircularSlider day={WeekdaysTypes.MONDAY} />);
