import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
require("@nativescript/local-notifications");

// ✅ Fix TS error
declare const global: any;

Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(React.createElement(MainStack, {}, null));
