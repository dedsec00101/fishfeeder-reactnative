import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";
import { FeedingScheduleItem } from "../components/FeedingScheduleItem";
import { TimePicker } from "../components/TimePicker";
import { useScheduleService } from "../services/ScheduleService";

type ScheduleProps = {
    route: RouteProp<MainStackParamList, "Schedule">,
    navigation: FrameNavigationProp<MainStackParamList, "Schedule">,
};

export function Schedule({ navigation }: ScheduleProps) {
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const { schedules = [], addSchedule, removeSchedule } = useScheduleService();

    const handleAddSchedule = (hours: number, minutes: number) => {
        if (typeof hours === "number" && typeof minutes === "number") {
            addSchedule({ hours, minutes, enabled: true });
            setShowTimePicker(false);
        } else {
            console.warn("Invalid time values:", { hours, minutes });
        }
    };

    const handleCancelAddSchedule = () => {
        setShowTimePicker(false);
    };

    return (
        <gridLayout rows="*, auto" className="bg-white h-full">
            {/* Main Content */}
            <scrollView row={0}>
                <stackLayout className="p-4">
                    <label className="text-2xl font-bold text-center text-blue-600 mb-2">
                        Feeding Schedule
                    </label>

                    {schedules.length === 0 ? (
                        <stackLayout className="items-center justify-center mt-10">
                            <label className="text-gray-500 text-center mb-4">
                                No feeding schedules yet. Add your first schedule to automate fish feeding.
                            </label>
                            <button
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                                onTap={() => setShowTimePicker(true)}
                            >
                                Add Schedule
                            </button>
                        </stackLayout>
                    ) : (
                        <stackLayout>
                            <label className="text-gray-600 mb-2">
                                Your fish will be fed at these times every day:
                            </label>

                            <stackLayout className="border border-gray-300 rounded-lg">
                                {schedules.map((schedule, index) => (
                                    <FeedingScheduleItem
                                        key={index}
                                        schedule={schedule}
                                        onRemove={() => removeSchedule(index)}
                                        isLast={index === schedules.length - 1}
                                    />
                                ))}
                            </stackLayout>

                            <button
                                className="bg-blue-500 text-white font-semibold mt-6 py-3 rounded-lg"
                                onTap={() => setShowTimePicker(true)}
                            >
                                Add Feeding Time
                            </button>
                        </stackLayout>
                    )}
                </stackLayout>
            </scrollView>

            {/* Bottom Navigation Bar */}
            <gridLayout row={1} columns="*, *" className="bg-gray-100 border-t border-gray-300 py-2 px-4">
                <button
                    col={0}
                    className="text-blue-600 font-semibold"
                    onTap={() => navigation.navigate({ name: "Dashboard", params: {} })}
                >
                    Dashboard
                </button>
                <button
                    col={1}
                    className="text-blue-600 font-semibold"
                    onTap={() => navigation.navigate({ name: "Schedule", params: {} })}
                >
                    Schedule
                </button>
            </gridLayout>

            {/* Time Picker Overlay */}
            {showTimePicker && (
                <stackLayout className="absolute left-0 top-0 right-0 bottom-0 bg-black bg-opacity-40 justify-center items-center z-50">
                    <stackLayout className="bg-white p-6 rounded-lg w-4/5 shadow-lg">
                        <label className="text-lg font-semibold text-center mb-4 text-blue-600">
                            Set Feeding Time
                        </label>
                        <TimePicker
                            onSave={handleAddSchedule}
                            onCancel={handleCancelAddSchedule}
                        />
                    </stackLayout>
                </stackLayout>
            )}
        </gridLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
    },
});