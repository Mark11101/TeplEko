import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import RootStackParamsList from '../../RootStackParams';
import { Panel, Divider } from '../../../components/atoms';
import { Navbar } from '../../../components/organisms';
import { Screens } from '../../../constants/Routes'
import Arrow from '../../../assets/images/right-arrow.svg'

import s from './SettingsListScreen.styles';

export const SettingsListScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList, Screens.SETTINGS_LIST>>();

  const options = [
    {
      title: 'Уведомления',
      route: Screens.NOTIFICATIONS,
    },
    {
      title: 'Информация о приложении',
      route: Screens.APP_INFO,
    },
    {
      title: 'Пользовательское соглашение',
      route: Screens.TERMS_OF_USE,
    },
    {
      title: 'Изменение конфигурации',
      route: Screens.CONFIGURATION,
    },
    {
      title: 'Статус системы',
      route: Screens.SYSTEM_STATUS,
    },
    {
      title: 'Сброс до заводских настроек',
      route: Screens.FACTORY_SETTINGS_RESET,
    },
  ] as {
    title: string;
    route: keyof RootStackParamsList;
  }[];

  return (
    <>
      <Navbar 
        header='Настройки'
        withGoBackBtnIcon
        styles={s.navbar}
        navigate={navigation.navigate}
        goBack={navigation.goBack}
      />
      <View style={s.screen}>
        <Panel styles={s.list}>
          {
            options.map((option, i) => (
              <View key={i}>
                <TouchableOpacity 
                  style={s.option}
                  onPress={() => navigation.navigate(option.route)}
                >
                  <Text style={s.text}>
                    {option.title}
                  </Text>
                  <Arrow />
                </TouchableOpacity>

                {
                  i + 1 !== options.length
                  &&
                    <Divider styles={s.divider} />
                }
              </View>
            ))
          }
        </Panel>
      </View>
    </>
  )
}