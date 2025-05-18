// project/src/components/MainStack.tsx
import { BaseNavigationContainer } from "@react-navigation/core";
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { Dashboard } from "../screens/Dashboard";
import { Schedule } from "../screens/Schedule";
import { AppTabs } from "./AppTabs";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator initialRouteName="Dashboard">
            <StackNavigator.Screen name="Dashboard" component={DashboardWithTabs} />
            <StackNavigator.Screen name="Schedule" component={ScheduleWithTabs} />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);

const DashboardWithTabs = (props: any) => (
    <>
        <Dashboard {...props} />
        <AppTabs />
    </>
);

const ScheduleWithTabs = (props: any) => (
    <>
        <Schedule {...props} />
        <AppTabs />
    </>
);
