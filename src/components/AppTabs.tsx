import * as React from "react";
import { useNavigation } from "@react-navigation/core";

export const AppTabs = () => {
    const navigation = useNavigation();

    return (
        <gridLayout
            columns="auto, auto"
            padding={10}
            backgroundColor="#eee"
            horizontalAlignment="center"
            verticalAlignment="bottom"
        >
            <button
                text="DASHBOARD"
                col={0}
                width={120}
                height={40}
                marginRight={8}
                onTap={() => navigation.navigate("Dashboard")}
            />
            <button
                text="SCHEDULE"
                col={1}
                width={120}
                height={40}
                onTap={() => navigation.navigate("Schedule")}
            />
        </gridLayout>
    );
};
