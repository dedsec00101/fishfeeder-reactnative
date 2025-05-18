import { FeedingSchedule } from "../models/FeedingSchedule";

export function getNextFeedingTime(schedules: FeedingSchedule[]): { time: string, relative: string } | null {
    const now = new Date();
    const upcoming = schedules
        .filter(s => s.enabled)
        .map(s => {
            const date = new Date();
            date.setHours(s.hours, s.minutes, 0, 0);
            if (date < now) {
                // schedule is earlier today; consider next day
                date.setDate(date.getDate() + 1);
            }
            return date;
        })
        .sort((a, b) => a.getTime() - b.getTime());

    if (upcoming.length === 0) return null;

    const nextTime = upcoming[0];
    const diffMs = nextTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    const relative = hours > 0
        ? `${hours}h ${minutes}m from now`
        : `${minutes}m from now`;

    return {
        time: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relative,
    };
}
