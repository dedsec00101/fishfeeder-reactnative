import { useEffect, useState } from "react";
import { Http, HttpResponse } from "@nativescript/core";

type ConnectionStatus = "connected" | "disconnected" | "connecting";

export function useESP32Service() {
    const [esp32Address, setESP32Address] = useState("http://192.168.0.100");
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
    const [sensorData, setSensorData] = useState({
        temperature: 0,
        ph: 0,
        ammonia: 0,
    });

    const connectToESP32 = async () => {
        try {
            setConnectionStatus("connecting");

            const response: HttpResponse = await Http.request({
                url: `${esp32Address}/sensors`,
                method: "GET",
            });

            const content = response.content?.toString();

            if (response.statusCode === 200 && content) {
                const data = JSON.parse(content);
                setSensorData(data);
                setConnectionStatus("connected");
            } else {
                setConnectionStatus("disconnected");
            }
        } catch (error) {
            console.error("ESP32 connection error:", error);
            setConnectionStatus("disconnected");
        }
    };

    const updateESP32Address = (newAddress: string) => {
        setESP32Address(newAddress);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            connectToESP32();
        }, 10000);
        return () => clearInterval(interval);
    }, [esp32Address]);

    return {
        esp32Address,
        updateESP32Address,
        connectionStatus,
        connectToESP32,
        sensorData,
    };
}
