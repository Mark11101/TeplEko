import * as React from 'react';
import { View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Modal } from './Modal';
import { Button } from '../../atoms/button/Button'

import { text } from '../../../styles/variables.styles';

const defaultText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Morbi sed lectus neque. Aenean fermentum augue eget ipsum ullamcorper porta. 
  Phasellus consectetur eleifend nulla at auctor. 
  Praesent feugiat non nulla ut molestie. Sed a nisi congue, feugiat purus sed, tincidunt lacus. 
  Cras turpis justo, placerat at sollicitudin nec, fringilla nec tellus. 
  Donec euismod, turpis nec tempus laoreet, mauris enim rutrum ligula, id commodo lectus purus in ex. 
  Interdum et malesuada fames ac ante ipsum primis in faucibus.
`;

const ModalWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View style={{ padding: 12 }}>
      <Text style={text.default}>
        {defaultText}
      </Text>

      <Button
        type='link'
        onPress={() => setIsOpen(true)}
        text='open modal'
      />

      <Modal 
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between', 
          alignItems: 'center' 
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Button 
              type='link'
              onPress={() => setIsOpen(false)}
              text='Отмена'
            />
          </View>
          
          <View style={{ flex: 2 }}>
            <Text style={text.h2}>
              Создание комнаты
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button 
              type='link'
              isDisabled={true}
              onPress={() => setIsOpen(false)}
              text='Сохранить'
            />
          </View>
        </View>

        <Text style={text.default}>
          {defaultText}
        </Text>
      </Modal>
    </View>
  )
}

storiesOf('Modal', module)
  .addDecorator(story => 
    <View style={{ 
        height: '100%', 
        backgroundColor: '#F2F1F7'
      }}
    >
      {story()}
    </View>
  )
  .add('default', () => <ModalWrapper />)
