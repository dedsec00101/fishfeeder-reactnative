import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface ESP32ConnectionProps {
    status: 'connected' | 'disconnected' | 'connecting';
    onConnect: () => void;
}

export function ESP32Connection({ status, onConnect }: ESP32ConnectionProps) {
    const getStatusColor = () => {
        switch (status) {
            case 'connected':
                return 'text-green-600 bg-green-100 border-green-300';
            case 'connecting':
                return 'text-yellow-600 bg-yellow-100 border-yellow-300';
            case 'disconnected':
            default:
                return 'text-red-600 bg-red-100 border-red-300';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'connected':
                return 'Connected to Fish Feeder';
            case 'connecting':
                return 'Connecting...';
            case 'disconnected':
            default:
                return 'Disconnected';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'connected':
                return 'check';
            case 'connecting':
                return 'sync';
            case 'disconnected':
            default:
                return 'close';
        }
    };

    return (
        <gridLayout 
            columns="*, auto" 
            className={`border rounded-lg p-3 mb-4 ${getStatusColor()}`}
        >
            <stackLayout col={0}>
                <label className="font-medium">
                    ESP32 Fish Feeder
                </label>
                <label className="text-sm">
                    {getStatusText()}
                </label>
            </stackLayout>

            {status !== 'connected' && (
                <button 
                    col={1}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                    onTap={onConnect}
                    isEnabled={status !== 'connecting'}
                >
                    Connect
                </button>
            )}
        </gridLayout>
    );
}
