import * as React from "react";
import { LocalNotifications } from "@nativescript/local-notifications";

export function useNotificationService() {
    // Initialize notifications
    React.useEffect(() => {
        // Request permission
        LocalNotifications.requestPermission().then(granted => {
            if (granted) {
                console.log("Notification permission granted");
            } else {
                console.log("Notification permission denied");
            }
        });
    }, []);
    
    // Schedule a notification
    const scheduleNotification = (
        id: number,
        title: string,
        body: string,
        at: { hour: number, minute: number }
    ) => {
        // Calculate when to schedule
        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(at.hour, at.minute, 0);
        
        // If the time has passed today, schedule for tomorrow
        if (scheduledTime < now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }
        
        LocalNotifications.schedule([
            {
                id: id,
                title: title,
                body: body,
                at: scheduledTime,
                forceShowWhenInForeground: true,
                channel: "fish_feeder",
                sound: "default", // ✅ FIXED: 'sound' must be a string
            }
        ]).then(() => {
            console.log(`Notification scheduled for ${scheduledTime}`);
        }).catch(error => {
            console.error("Error scheduling notification", error);
        });
    };
    
    // Cancel all notifications
    const cancelAllNotifications = () => {
        LocalNotifications.cancelAll();
    };
    
    return {
        scheduleNotification,
        cancelAllNotifications,
    };
}
