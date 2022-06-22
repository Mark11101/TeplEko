import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Text,
} from 'react-native';

import Cross from '../../assets/images/cross.svg';
import { Title, Panel, Switch, Button } from '../../components/atoms/index';
import { Modal, TemperaturePicker } from '../../components/organisms/index';

import s from './ExtendedRoomSettingsModal.styles';

interface Props {
  isVisible: boolean;
  onClose(): void;
}

export const ExtendedRoomSettingsModal: React.FC<Props> = (props) => {
  const {
    isVisible,
    onClose,
  } = props;

  const [minTempThreshold, setMinTempThreshold] = useState(10);
  const [maxTempThreshold, setMaxTempThreshold] = useState(30);

  const [minNotificationThreshold, setMinNotificationThreshold] = useState(10);
  const [maxNotificationThreshold, setMaxNotificationThreshold] = useState(30);

  const [isThermostatOn, setIsThermostatOn] = useState(false);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <View style={s.closeBtnView}>
        <TouchableOpacity onPress={onClose}>
          <Cross />  
        </TouchableOpacity>
      </View>
      <ScrollView style={s.scrollView}>
        <View style={s.block}>
          <Title styles={s.title}>
            Ограничение температуры
          </Title>
          <Panel styles={s.panel}>
            <Text style={s.panelItemText}>
              Мин
            </Text>
            <TemperaturePicker 
              temperature={minTempThreshold} 
              styles={s.temperaturePicker}
              onChange={(value) => setMinTempThreshold(value)}
            />
            <Text style={s.panelItemText}>
              Макс
            </Text>
            <TemperaturePicker 
              temperature={maxTempThreshold} 
              styles={s.temperaturePicker}
              onChange={(value) => setMaxTempThreshold(value)}
            />
          </Panel>
          <Text style={s.helpText}>
            Выберите минимальную и максимальную температуру, ниже 
            (выше) которой не должно охлаждаться помещение
          </Text>
        </View>
        <View style={s.block}>
          <Title styles={s.title}>
            Уведомления при превышении лимита
          </Title>
          <Panel styles={s.panel}>
            <Text style={s.panelItemText}>
              Мин
            </Text>
            <TemperaturePicker 
              temperature={minNotificationThreshold} 
              styles={s.temperaturePicker}
              onChange={(value) => setMinNotificationThreshold(value)}
            />
            <Text style={s.panelItemText}>
              Макс
            </Text>
            <TemperaturePicker 
              temperature={maxNotificationThreshold} 
              styles={s.temperaturePicker}
              onChange={(value) => setMaxNotificationThreshold(value)}
            />
          </Panel>
          <Text style={s.helpText}>
            Выберите минимальную и максимальную температуру, ниже 
            (выше) которой будет отправляться уведомление
          </Text>
        </View>
        <View style={s.lastBlock}>
          <Switch 
            styles={[s.panel, s.switchPanel]}
            title='Терморегулятор включен'
            value={isThermostatOn}
            onValueChange={() => setIsThermostatOn(!isThermostatOn)}
          />
          <Text style={s.helpText}>
            Вы можете включить/отключить терморегулятор 
          </Text>
        </View>
        <Button 
          type='primary'
          text='Сохранить'
          onPress={onClose}
        />
      </ScrollView>
    </Modal>
  )
}
