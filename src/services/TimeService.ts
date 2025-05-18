export async function fetchRealTime(): Promise<string | null> {
    try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/Etc/UTC");
        const data = await response.json();
        return data.datetime; // Returns ISO string like "2025-05-18T12:34:56.123456+00:00"
    } catch (error) {
        console.error("Failed to fetch real time:", error);
        return null;
    }
}
