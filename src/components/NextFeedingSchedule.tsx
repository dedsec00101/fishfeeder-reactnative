import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface NextFeedingScheduleProps {
    nextFeeding: { time: string, relative: string } | null;
}

export function NextFeedingSchedule({ nextFeeding }: NextFeedingScheduleProps) {
    return (
        <stackLayout className="border border-blue-200 rounded-lg p-4 bg-blue-50 mb-4">
            <label className="text-lg font-semibold text-blue-600 mb-2">
                Next Feeding
            </label>
            
            {nextFeeding ? (
                <stackLayout>
                    <label className="text-2xl font-bold text-gray-800">
                        {nextFeeding.time}
                    </label>
                    <label className="text-gray-600">
                        {nextFeeding.relative}
                    </label>
                </stackLayout>
            ) : (
                <label className="text-gray-600">
                    No feeding scheduled. Add a schedule to automate fish feeding.
                </label>
            )}
        </stackLayout>
    );
}