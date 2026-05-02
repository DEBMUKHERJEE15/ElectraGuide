"use client";
import { useState, useEffect } from "react";

type Event = {
  id: number;
  date: string;
  event: string;
  description: string;
};

export default function ElectionTimeline() {
  const [timeline, setTimeline] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("National");

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/timeline?location=${location}`);
        const data = await res.json();
        if (res.ok) setTimeline(data.timeline);
      } catch (err) {
        console.error("Failed to fetch timeline", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [location]);

  return (
    <div className="w-full glass-panel p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold gradient-text">Election Timeline</h2>
        <select 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Select state for timeline"
        >
          <option value="National">National</option>
          <option value="Texas">Texas</option>
          <option value="California">California</option>
          <option value="New York">New York</option>
        </select>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 md:ml-4">
          {timeline.map((item, index) => (
            <div key={item.id} className="mb-10 ml-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-[var(--card-bg)] dark:bg-blue-900">
                <svg className="w-2.5 h-2.5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {item.event}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
