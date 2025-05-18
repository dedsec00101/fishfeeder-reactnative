import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Color } from "@nativescript/core";

interface GaugeChartProps {
    title: string;
    value: number;
    unit: string;
    minValue: number;
    maxValue: number;
    warningThreshold: number;
    dangerThreshold: number;
    lowWarningThreshold?: number;
    lowDangerThreshold?: number;
}

export function GaugeChart({
    title,
    value,
    unit,
    minValue,
    maxValue,
    warningThreshold,
    dangerThreshold,
    lowWarningThreshold,
    lowDangerThreshold
}: GaugeChartProps) {
    const percentage = Math.min(
        Math.max(((value - minValue) / (maxValue - minValue)) * 100, 0),
        100
    );

    const getStatusColor = () => {
        if (lowDangerThreshold !== undefined && value <= lowDangerThreshold) {
            return new Color("#E74C3C");
        } else if (lowWarningThreshold !== undefined && value <= lowWarningThreshold) {
            return new Color("#F39C12");
        } else if (value >= dangerThreshold) {
            return new Color("#E74C3C");
        } else if (value >= warningThreshold) {
            return new Color("#F39C12");
        } else {
            return new Color("#2ECC71");
        }
    };

    const statusColor = getStatusColor();

    const getStatusText = () => {
        if (lowDangerThreshold !== undefined && value <= lowDangerThreshold) {
            return "Danger - Too Low";
        } else if (lowWarningThreshold !== undefined && value <= lowWarningThreshold) {
            return "Warning - Low";
        } else if (value >= dangerThreshold) {
            return "Danger - Too High";
        } else if (value >= warningThreshold) {
            return "Warning - High";
        } else {
            return "Excellent";
        }
    };

    return (
        <stackLayout className="border border-gray-200 rounded-lg p-3 bg-white shadow">
            <gridLayout rows="auto, auto" columns="*, auto">
                <label row={0} col={0} className="text-gray-700 font-medium">
                    {title}
                </label>
                <label row={0} col={1} className="text-lg font-bold">
                    {value.toFixed(1)} {unit}
                </label>

                <stackLayout row={1} col={0} colSpan={2} className="mt-2">
                    <gridLayout rows="auto, auto" columns="*">
                        <stackLayout row={0} className="h-4 bg-gray-200 rounded-full overflow-hidden w-full">
                            <stackLayout
                                className="h-full rounded-full"
                                style={{
                                    backgroundColor: statusColor,
                                    width: `${percentage}%`
                                }}
                            />
                        </stackLayout>

                        <gridLayout row={1} columns="auto, *, auto" className="mt-1">
                            <label col={0} className="text-xs text-gray-500">
                                {minValue}
                            </label>
                            <label col={1} className="text-center text-xs" style={{ color: statusColor }}>
                                {getStatusText()}
                            </label>
                            <label col={2} className="text-xs text-gray-500 text-right">
                                {maxValue}
                            </label>
                        </gridLayout>
                    </gridLayout>
                </stackLayout>
            </gridLayout>
        </stackLayout>
    );
}
