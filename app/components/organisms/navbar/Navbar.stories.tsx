import * as React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { storiesOf } from '@storybook/react-native';

import RootStackParamsList from '../../../screens/RootStackParams';
import { Navbar } from './Navbar';
import { Divider } from '../../atoms'
import PlusIcon from '../../../assets/images/plus.svg'

import { text } from '../../../styles/variables.styles'

storiesOf('Navbar', module)
  .addDecorator(story => 
    <View style={{ height: '100%'}}>
      {story()}
    </View>
  )
  .add('default', () => (
    <NavigationContainer>
      <NavbarWrapper />
    </NavigationContainer>
  ))

  const NavbarWrapper: React.FC = () => {
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

    return (
      <>
        <Navbar 
          header='Главная' 
          leftSideOptionBtn={
            <TouchableOpacity>
              <PlusIcon />
            </TouchableOpacity>
          } 
          withBurgerMenu 
          navigate={navigation.navigate}
        />

        <Divider />

        <Navbar 
          header='Статус системы' 
          goBackBtnTitle='Назад'
          withGoBackBtnIcon
          withBurgerMenu 
          navigate={navigation.navigate}
        />

        <Divider />

        <Navbar 
          header='Кухня' 
          withGoBackBtnIcon
          navigate={navigation.navigate}
          rightSideOptionBtn={
            <TouchableOpacity>
              <Text style={{ ...text.default, textAlign: 'right' }}>
                Изменить
              </Text>
            </TouchableOpacity>
          } 
        />

        <Divider />

        <Text style={{ ...text.default, padding: 12 }}>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Mauris dui turpis, bibendum id eros eu, elementum sodales odio. 
          Sed elementum arcu nec purus tempus, et venenatis lacus blandit. 
          Donec finibus placerat ullamcorper. 
          Praesent sit amet nibh ligula. 
          Aenean iaculis odio eget convallis tempor. 
          Etiam ac turpis malesuada, pulvinar sem at, porttitor justo. 
          Praesent sagittis tellus id aliquam venenatis. 
          Mauris in nibh lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
          Nullam ac tincidunt sem. Donec iaculis ornare nibh quis ullamcorper.
        </Text>
      </>
    )
  }
