document.addEventListener("DOMContentLoaded", () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  // Add only day headers (no Time)
  days.forEach(day => {
    const dayCell = document.createElement("div");
    dayCell.classList.add("time-slot", "day-header");
    dayCell.textContent = day;
    scheduleGrid.appendChild(dayCell);
  });

  // Helper to calculate 1-hour end time
  function getEndTime(startTime) {
    const [time, meridian] = startTime.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    hour += 1;
    if (hour === 12) {
      return `${hour}:${minute.toString().padStart(2, "0")} ${meridian === "AM" ? "PM" : "AM"}`;
    } else if (hour > 12) {
      hour -= 12;
    }
    return `${hour}:${minute.toString().padStart(2, "0")} ${meridian}`;
  }

  // Loop over each time slot
  timeSlots.forEach(startTime => {
    const endTime = getEndTime(startTime);

    // Check if any class exists for this time
    const hasAnyClass = days.some(day => scheduleData[startTime]?.[day]);

    if (!hasAnyClass) return; // Skip this row if no classes at this time

    // If at least one class exists, generate cells for each day
    days.forEach(day => {
      const cell = document.createElement("div");
      cell.classList.add("time-slot");

      const classInfo = scheduleData[startTime]?.[day];
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
