/**
 * A record of the navigation params for each route in your app.
 */
export type MainStackParamList = {
  Dashboard: {};
  Schedule: {};
  Settings: {};
  One: undefined; // or {} if you plan to send parameters
  Two: { message: string };
};
