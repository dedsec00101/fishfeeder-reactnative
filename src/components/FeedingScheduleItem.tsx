import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Color, Switch } from "@nativescript/core";

import { FeedingSchedule } from "../models/FeedingSchedule";
import { useScheduleService } from "../services/ScheduleService";

interface FeedingScheduleItemProps {
    schedule: FeedingSchedule;
    onRemove: () => void;
    isLast: boolean;
}

export function FeedingScheduleItem({ schedule, onRemove, isLast }: FeedingScheduleItemProps) {
    const { toggleSchedule } = useScheduleService();

    const formatTime = (hours: number, minutes: number) => {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <gridLayout 
            columns="auto, *, auto" 
            rows="auto" 
            className={`p-4 ${!isLast ? 'border-b border-gray-300' : ''}`}
        >
            <switch 
                col={0}
                checked={schedule.enabled}
                className="mr-3"
                onCheckedChange={(args) => {
                    toggleSchedule(schedule, args.value);
                }}
            />

            <label col={1} className={`text-lg ${schedule.enabled ? 'text-gray-800' : 'text-gray-400'}`}>
                {formatTime(schedule.hours, schedule.minutes)}
            </label>

            <button 
                col={2}
                className="text-red-500 p-1"
                onTap={onRemove}
            >
                Remove
            </button>
        </gridLayout>
    );
}
