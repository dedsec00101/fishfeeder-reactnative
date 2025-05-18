import * as React from "react";
import { useNavigation } from "@react-navigation/core";

export const AppTabs = () => {
    const navigation = useNavigation();

    return (
        <gridLayout
            columns="*, *"
            horizontalAlignment="center"
            verticalAlignment="bottom"
            className="bg-gray-100 border-t border-gray-300 py-2 px-4"
        >
            <button
                col={0}
                text="DASHBOARD"
                className="text-blue-600 font-semibold"
                onTap={() => navigation.navigate("Dashboard")}
            />
            <button
                col={1}
                text="SCHEDULE"
                className="text-blue-600 font-semibold"
                onTap={() => navigation.navigate("Schedule")}
            />
        </gridLayout>
    );
};