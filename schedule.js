document.addEventListener("DOMContentLoaded", () => {
  const days = [
    { key: "Mon", label: "MONDAY" },
    { key: "Tue", label: "TUESDAY" },
    { key: "Wed", label: "WEDNESDAY" },
    { key: "Thu", label: "THURSDAY" },
    { key: "Fri", label: "FRIDAY" },
    { key: "Sat", label: "SATURDAY" },
    { key: "Sun", label: "SUNDAY" }
  ];

  const timeSlots = [
    "5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM", "9:30 AM", "10:30 AM",
    "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM",
    "5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM"
  ];

  const scheduleData = {
    "5:30 AM": {
      Mon: { label: "Gi Fundamentals" },
      Wed: { label: "No-Gi Drills" },
      Fri: { label: "Gi All Levels" }
    },
    "6:30 AM": {
      Tue: { label: "Youth Class" },
      Thu: { label: "Gi Fundamentals" },
      Sat: { label: "Open Mat" }
    },
    "6:30 PM": {
      Mon: { label: "Gi Advanced" },
      Wed: { label: "No-Gi All Levels" },
      Fri: { label: "Open Mat" }
    },
    "7:30 PM": {
      Mon: { label: "No-Gi Sparring" },
      Thu: { label: "Gi All Levels" }
    }
  };

  const scheduleGrid = document.querySelector(".schedule-grid");

  // Add day headers
  days.forEach(({ label }) => {
    const dayCell = document.createElement("div");
    dayCell.classList.add("time-slot", "day-header");
    dayCell.textContent = label;
    scheduleGrid.appendChild(dayCell);
  });

  // Helper: get end time for a 1-hour block
  function getEndTime(startTime) {
    const [time, meridian] = startTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    hour += 1;

    let newMeridian = meridian;
    if (hour === 12) {
      newMeridian = meridian === "AM" ? "PM" : "AM";
    } else if (hour > 12) {
      hour -= 12;
    }

    return `${hour}:${minute.toString().padStart(2, "0")} ${newMeridian}`;
  }

  // Loop over each time slot
  timeSlots.forEach(startTime => {
    const endTime = getEndTime(startTime);

    const hasAnyClass = days.some(({ key }) => scheduleData[startTime]?.[key]);

    if (!hasAnyClass) return;

    days.forEach(({ key }) => {
      const cell = document.createElement("div");
      cell.classList.add("time-slot");

      const classInfo = scheduleData[startTime]?.[key];
      if (classInfo) {
        const classBlock = document.createElement("div");
        classBlock.className = "class-block";

        const title = document.createElement("div");
        title.className = "class-title";
        title.textContent = classInfo.label;

        const timeText = document.createElement("div");
        timeText.className = "class-time";
        timeText.textContent = `${startTime} – ${endTime}`;

        classBlock.appendChild(title);
        classBlock.appendChild(timeText);
        cell.appendChild(classBlock);
      }

      scheduleGrid.appendChild(cell);
    });
  });
});
