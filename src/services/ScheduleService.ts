import * as React from "react";
import { ApplicationSettings } from "@nativescript/core";
import { FeedingSchedule } from "../models/FeedingSchedule";
import { useNotificationService } from "./NotificationService";
import { fetchRealTime } from "../services/TimeService";

const SCHEDULES_KEY = "fish_feeder_schedules";

export function useScheduleService() {
    const [schedules, setSchedules] = React.useState<FeedingSchedule[]>([]);
    const [nextFeedingTime, setNextFeedingTime] = React.useState<{ time: string, relative: string } | null>(null);
    const { scheduleNotification, cancelAllNotifications } = useNotificationService();
    
    // Load schedules from storage on component mount
    React.useEffect(() => {
        loadSchedules();
    }, []);
    
    // Update next feeding time whenever schedules change
    React.useEffect(() => {
        updateNextFeedingTime();
        setupNotifications();
    }, [schedules]);
    
    // Load schedules from storage
    const loadSchedules = () => {
        try {
            const savedSchedules = ApplicationSettings.getString(SCHEDULES_KEY);
            if (savedSchedules) {
                setSchedules(JSON.parse(savedSchedules));
            }
        } catch (error) {
            console.error("Error loading schedules", error);
        }
    };
    
    // Save schedules to storage
    const saveSchedules = (newSchedules: FeedingSchedule[]) => {
        try {
            ApplicationSettings.setString(SCHEDULES_KEY, JSON.stringify(newSchedules));
            setSchedules(newSchedules);
        } catch (error) {
            console.error("Error saving schedules", error);
        }
    };
    
    // Add a new schedule
    const addSchedule = (schedule: FeedingSchedule) => {
        const newSchedules = [...schedules, schedule];
        saveSchedules(newSchedules);
    };
    
    // Remove a schedule
    const removeSchedule = (index: number) => {
        const newSchedules = schedules.filter((_, i) => i !== index);
        saveSchedules(newSchedules);
    };
    
    // Toggle schedule enabled/disabled
    const toggleSchedule = (schedule: FeedingSchedule, enabled: boolean) => {
        const index = schedules.findIndex(
            s => s.hours === schedule.hours && s.minutes === schedule.minutes
        );
        
        if (index !== -1) {
            const newSchedules = [...schedules];
            newSchedules[index] = { ...schedule, enabled };
            saveSchedules(newSchedules);
        }
    };
    
    // Calculate the next feeding time
    const updateNextFeedingTime = () => {
        const enabledSchedules = schedules.filter(s => s.enabled);
        if (enabledSchedules.length === 0) {
            setNextFeedingTime(null);
            return;
        }
        
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Find the next scheduled time
        let nextSchedule: FeedingSchedule | null = null;
        let timeUntilNextFeed = Infinity;
        
        for (const schedule of enabledSchedules) {
            let hours = schedule.hours - currentHour;
            let minutes = schedule.minutes - currentMinute;
            
            if (hours < 0 || (hours === 0 && minutes < 0)) {
                // This schedule is for tomorrow
                hours += 24;
            }
            
            const totalMinutes = hours * 60 + minutes;
            
            if (totalMinutes < timeUntilNextFeed) {
                timeUntilNextFeed = totalMinutes;
                nextSchedule = schedule;
            }
        }
        
        if (nextSchedule) {
            const nextTime = `${nextSchedule.hours.toString().padStart(2, '0')}:${nextSchedule.minutes.toString().padStart(2, '0')}`;
            
            let relativeTime = '';
            if (timeUntilNextFeed < 60) {
                relativeTime = timeUntilNextFeed === 0 ? 'Now' : `In ${timeUntilNextFeed} minutes`;
            } else {
                const hours = Math.floor(timeUntilNextFeed / 60);
                const minutes = timeUntilNextFeed % 60;
                relativeTime = `In ${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`;
            }
            
            setNextFeedingTime({ time: nextTime, relative: relativeTime });
        } else {
            setNextFeedingTime(null);
        }
    };
    
    // Setup notifications for schedules
    const setupNotifications = () => {
        // Cancel all existing notifications first
        cancelAllNotifications();
        
        // Setup notifications for enabled schedules
        schedules.forEach((schedule, index) => {
            if (schedule.enabled) {
                scheduleNotification(
                    index,
                    "Fish Feeder",
                    "The fish has been fed.",
                    { hour: schedule.hours, minute: schedule.minutes }
                );
            }
        });
    };
    
    return {
        schedules,
        nextFeedingTime,
        addSchedule,
        removeSchedule,
        toggleSchedule,
    };
}