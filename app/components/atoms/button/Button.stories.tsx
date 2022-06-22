import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Button } from './Button';

storiesOf('Button', module)
  .addDecorator(story => (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {story()}
    </View>
  ))
  .add('default', () => <ButtonGroup />);

  const ButtonGroup = () => {
    
    const [isDisabled, setIsDisabled] = React.useState(false);
  
    return (
      <>
        <View style={{padding: 15, width: '100%'}}>
          <Button isDisabled={isDisabled} type="primary" text="Primary" onPress={() => ({})} />
        </View>
    
        <View style={{padding: 15, width: '100%', backgroundColor: '#5479DD'}}>
          <Button isDisabled={isDisabled} type="default" text="Default" onPress={() => ({})} />
        </View>

        <View style={{width: '100%'}}>
          <Button isDisabled={isDisabled} type="link" text="Link" onPress={() => ({})} />
        </View>

        <View style={{padding: 15, width: '100%', backgroundColor: '#5479DD'}}>
          <Button isDisabled={isDisabled} type="secondary" text="Secondary" onPress={() => ({})} />
        </View>

        <View style={{ paddingHorizontal: 15, width: '100%'}}>
          <Button 
            isDisabled={isDisabled}
            type="addBtn" 
            text="Add" 
            onPress={() => ({})} 
          />
        </View>

        <View style={{padding: 15, width: '100%', marginTop: 15}}>
          <Button type="link" text="Change isDisabled" onPress={() => setIsDisabled(!isDisabled)} />
        </View>
      </>
    )
  }
