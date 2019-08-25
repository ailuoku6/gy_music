/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Home from './ui/Home';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Home);
