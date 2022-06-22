// if you use expo remove this line
import { AppRegistry } from 'react-native';

import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import './rn-addons';

import { name as appName } from '../app.json';

/* eslint-env node */

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('../app/components/atoms/button/Button.stories.tsx');
  require('../app/components/atoms/checkbox/Checkbox.stories.tsx');
  require('../app/components/atoms/clock/Clock.stories.tsx');
  require('../app/components/atoms/divider/Divider.stories.tsx');
  require('../app/components/atoms/input/Input.stories.tsx');
  require('../app/components/atoms/panel/Panel.stories.tsx');
  require('../app/components/atoms/switch/Switch.stories.tsx');
  require('../app/components/atoms/temperature/Temperature.stories.tsx');
  require('../app/components/atoms/title/Title.stories.tsx');
  require('../app/components/organisms/circular-slider/CircularSlider.stories');
  require('../app/components/organisms/navbar/Navbar.stories');
  require('../app/components/organisms/time-table/TimeTable.stories');
  require('../app/components/organisms/rooms-temps-panel/RoomsTempsPanel.stories');
  require('../app/components/organisms/modal/Modal.stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
