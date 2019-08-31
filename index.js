/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import Home from './ui/Home';
import RootScene from './ui/RootScene'
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => Home);
AppRegistry.registerComponent(appName, () => RootScene);

