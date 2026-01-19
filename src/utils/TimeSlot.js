const timeToMinutes = (timeStr) => {
  // "5:00 PM" → 1020
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const calculateTimeSlot = (startTimeStr, services) => {
  const startMinutes = timeToMinutes(startTimeStr);

  const totalDuration = services.reduce(
    (sum, s) => sum + (Number(s.durationMins) || 0),
    0
  );

  const endMinutes = startMinutes + totalDuration;

  return {
    start: minutesToTime(startMinutes),
    end: minutesToTime(endMinutes),
  };
};