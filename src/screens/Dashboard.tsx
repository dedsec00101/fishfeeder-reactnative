import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ObservableArray } from "@nativescript/core";

import { MainStackParamList } from "../NavigationParamList";
import { GaugeChart } from "../components/GaugeChart";
import { NextFeedingSchedule } from "../components/NextFeedingSchedule";
import { ESP32Connection } from "../components/ESP32Connection";
import { useScheduleService } from "../services/ScheduleService";
import { useESP32Service } from "../services/ESP32Service";

type DashboardProps = {
    route: RouteProp<MainStackParamList, "Dashboard">,
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function Dashboard({ navigation }: DashboardProps) {
    const { nextFeedingTime } = useScheduleService();
    const { sensorData, connectionStatus, connectToESP32 } = useESP32Service();

    // Update sensor data every 5 seconds (simulated)
    React.useEffect(() => {
        const interval = setInterval(() => {
            // In a real app, this would be fetched from the ESP32
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <scrollView className="bg-white">
            <stackLayout className="p-4">
                <label className="text-2xl font-bold text-center text-blue-600 mb-4">
                    Fish Feeder
                </label>
                
                {/* ESP32 Connection Status */}
                <ESP32Connection 
                    status={connectionStatus} 
                    onConnect={connectToESP32} 
                />
                
                {/* Next Feeding Schedule */}
                <NextFeedingSchedule nextFeeding={nextFeedingTime} />
                
                {/* Water Parameters Section */}
                <label className="text-xl font-semibold text-gray-700 mt-4 mb-2">
                    Water Parameters
                </label>
                
                <gridLayout rows="auto, auto, auto" columns="*" className="mb-4">
                    {/* Temperature Gauge */}
                    <stackLayout row="0" className="mb-4">
                        <GaugeChart 
                            title="Temperature" 
                            value={sensorData.temperature} 
                            unit="°C"
                            minValue={18} 
                            maxValue={30}
                            warningThreshold={24}
                            dangerThreshold={28}
                        />
                    </stackLayout>
                    
                    {/* pH Gauge */}
                    <stackLayout row="1" className="mb-4">
                        <GaugeChart 
                            title="pH Level" 
                            value={sensorData.ph} 
                            unit="pH"
                            minValue={6.0} 
                            maxValue={9.0}
                            warningThreshold={7.8}
                            dangerThreshold={8.5}
                            lowWarningThreshold={6.5}
                            lowDangerThreshold={6.0}
                        />
                    </stackLayout>
                    
                    {/* Ammonia Gauge */}
                    <stackLayout row="2" className="mb-4">
                        <GaugeChart 
                            title="Ammonia" 
                            value={sensorData.ammonia} 
                            unit="ppm"
                            minValue={0} 
                            maxValue={8}
                            warningThreshold={0.25}
                            dangerThreshold={1.0}
                        />
                    </stackLayout>
                </gridLayout>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "white",
    },
});