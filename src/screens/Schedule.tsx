import * as React from 'react';
import { gridLayout, stackLayout, scrollView, label, button } from '@nativescript/core';
import { ScheduleProps } from '../NavigationParamList';
import { useScheduleService } from '../services/ScheduleService';
import { FeedingScheduleItem } from '../components/FeedingScheduleItem';
import { TimePicker } from '../components/TimePicker';

// No import changes needed
export function Schedule({ navigation }: ScheduleProps) {
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const { schedules = [], addSchedule, removeSchedule } = useScheduleService();

    const handleAddSchedule = (hours: number, minutes: number) => {
        if (typeof hours === "number" && typeof minutes === "number") {
            addSchedule({ hours, minutes, enabled: true });
            setShowTimePicker(false);
        }
    };

    const handleCancelAddSchedule = () => {
        setShowTimePicker(false);
    };

    return (
        <gridLayout rows="auto, *, auto" className="bg-white h-full">
            <label row={0} className="text-2xl font-bold text-center text-blue-600 p-4">
                Feeding Schedule
            </label>

            <scrollView row={1} className="px-4">
                <stackLayout>
                    {schedules.length === 0 ? (
                        <stackLayout className="items-center justify-center py-8">
                            <label className="text-gray-500 text-center mb-4">
                                No feeding schedules yet. Add your first schedule to automate fish feeding.
                            </label>
                        </stackLayout>
                    ) : (
                        <>
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
                        </>
                    )}
                </stackLayout>
            </scrollView>

            <stackLayout row={2} className="p-4 border-t border-gray-300">
                <button
                    className="bg-blue-500 text-white font-semibold py-3 rounded-lg"
                    onTap={() => setShowTimePicker(true)}
                >
                    {schedules.length === 0 ? "Add Schedule" : "Add Feeding Time"}
                </button>
            </stackLayout>

            {showTimePicker && (
                <TimePicker
                    onSave={handleAddSchedule}
                    onCancel={handleCancelAddSchedule}
                />
            )}
        </gridLayout>
    );
}
