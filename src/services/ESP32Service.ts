import * as React from "react";
import { Http } from "@nativescript/core";

interface SensorData {
    temperature: number;
    ph: number;
    ammonia: number;
    lastUpdated: Date | null;
}

export function useESP32Service() {
    const [connectionStatus, setConnectionStatus] = React.useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
    const [esp32Address, setEsp32Address] = React.useState<string>('192.168.1.1');
    const [sensorData, setSensorData] = React.useState<SensorData>({
        temperature: 23.5,
        ph: 7.2,
        ammonia: 0.1,
        lastUpdated: null
    });

    const connectToESP32 = () => {
        setConnectionStatus('connecting');
        setTimeout(() => {
            setConnectionStatus('connected');
            fetchSensorData();
        }, 2000);
    };

    const fetchSensorData = () => {
        if (connectionStatus !== 'connected') {
            return Promise.reject('Not connected to ESP32');
        }

        return new Promise<SensorData>((resolve) => {
            setTimeout(() => {
                const newData = {
                    temperature: 22 + Math.random() * 6,
                    ph: 6.8 + Math.random() * 1.5,
                    ammonia: Math.random() * 1.5,
                    lastUpdated: new Date()
                };

                setSensorData(newData);
                resolve(newData);
            }, 1000);
        });
    };

    const triggerFeeding = () => {
        if (connectionStatus !== 'connected') {
            return Promise.reject('Not connected to ESP32');
        }

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log("Feeding triggered manually");
                resolve();
            }, 1000);
        });
    };

    const updateESP32Address = (address: string) => {
        setEsp32Address(address);
        setConnectionStatus('disconnected');
    };

    React.useEffect(() => {
        if (connectionStatus === 'disconnected') {
            if (sensorData.lastUpdated !== null) {
                connectToESP32();
            }
        }
    }, [connectionStatus]);

    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (connectionStatus === 'connected') {
            interval = setInterval(() => {
                fetchSensorData().catch(error => {
                    console.error("Error fetching sensor data", error);
                    setConnectionStatus('disconnected');
                });
            }, 10000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [connectionStatus]);

    return {
        connectionStatus,
        sensorData,
        esp32Address,
        connectToESP32,
        fetchSensorData,
        triggerFeeding,
        updateESP32Address
    };
}
