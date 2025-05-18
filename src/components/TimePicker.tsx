import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { TimePicker as NSTimePicker } from "@nativescript/core"; // Removed invalid `Time` import

interface TimePickerProps {
    onSave: (hours: number, minutes: number) => void;
    onCancel: () => void;
}

export function TimePicker({ onSave, onCancel }: TimePickerProps) {
    const [selectedTime, setSelectedTime] = React.useState({ hour: 12, minute: 0 });

    const handleTimeChange = (args: any) => {
        const picker = args.object as NSTimePicker;
        setSelectedTime({ hour: picker.hour, minute: picker.minute });
    };

    return (
        <absoluteLayout className="bg-black bg-opacity-50 w-full h-full">
            <stackLayout
                className="bg-white rounded-lg w-4/5 p-4"
                horizontalAlignment="center"
                verticalAlignment="middle"
            >
                <label className="text-xl font-bold text-center text-blue-600 mb-4">
                    Set Feeding Time
                </label>

                <timePicker
                    hour={selectedTime.hour}
                    minute={selectedTime.minute}
                    onTimeChange={handleTimeChange}
                    className="mb-4"
                />

                <gridLayout columns="*,*" className="mt-2">
                    <button
                        col={0} // ✅ should be number, not string
                        className="bg-gray-200 text-gray-800 py-3 rounded-lg m-1"
                        onTap={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        col={1} // ✅ should be number, not string
                        className="bg-blue-500 text-white font-semibold py-3 rounded-lg m-1"
                        onTap={() => onSave(selectedTime.hour, selectedTime.minute)}
                    >
                        Save
                    </button>
                </gridLayout>
            </stackLayout>
        </absoluteLayout>
    );
}
