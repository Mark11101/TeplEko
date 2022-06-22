import * as React from 'react';
import { 
  View, 
  NativeSyntheticEvent,
  TextInputFocusEventData, 
} from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Input } from './Input';
import { validateEmail, validatePassword } from '../../../utils/validations';

storiesOf('Input', module)
  .addDecorator(story => 
    <View style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {story()}
    </View>
  )
  .add('default', () => <InputWrapper />)

  const InputWrapper = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailIsError, setEmailIsError] = React.useState(false);
    const [passIsError, setPassIsError] = React.useState(false);

    const changeEmail = (mail: string) => {
      emailIsError && setEmailIsError(false);
      setEmail(mail);
    }

    const changePassword = (pass: string) => {
      passIsError && setPassIsError(false);
      setPassword(pass);
    }

    const blurEmail = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      !validateEmail(e.nativeEvent.text) && setEmailIsError(true);
    }

    const blurPass = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      !validatePassword(e.nativeEvent.text) && setPassIsError(true);
    }

    return (
      <>
        <Input 
          value={email} 
          placeholder='Введите почту' 
          isError={emailIsError}
          onChange={changeEmail} 
          onBlur={blurEmail}
          styles={{ marginTop: 15 }}
        />
        <Input 
          value={password} 
          placeholder='Введите пароль' 
          isPassword
          isError={passIsError}
          onChange={changePassword} 
          onBlur={blurPass}
          styles={{ marginTop: 15 }}
        />
      </>
    );
  }
