const days = ["Time", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "5:30 AM", "6:30 AM", "7:30 AM", "8:30 AM", "9:30 AM", "10:30 AM",
  "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:30 PM",
  "5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM"
];

const scheduleData = {
  "5:30 AM": {
    Mon: { type: "gi", label: "Gi Fundamentals" },
    Wed: { type: "nogi", label: "No-Gi Drills" },
    Fri: { type: "gi", label: "Gi All Levels" }
  },
  "6:30 AM": {
    Tue: { type: "kids", label: "Youth Class" },
    Thu: { type: "gi", label: "Gi Fundamentals" },
    Sat: { type: "openmat", label: "Open Mat" }
  },
  "6:30 PM": {
    Mon: { type: "gi", label: "Gi Advanced" },
    Wed: { type: "nogi", label: "No-Gi All Levels" },
    Fri: { type: "openmat", label: "Open Mat" }
  },
  "7:30 PM": {
    Mon: { type: "nogi", label: "No-Gi Sparring" },
    Thu: { type: "gi", label: "Gi All Levels" }
  }
};

const scheduleGrid = document.querySelector(".schedule-grid");

if (scheduleGrid) {
  // Add header row
  days.forEach(day => {
    const cell = document.createElement("div");
    cell.classList.add("time-slot", "day-header");
    cell.textContent = day;
    scheduleGrid.appendChild(cell);
  });

  // Generate time slots
  timeSlots.forEach(time => {
    // Add time label
    const timeCell = document.createElement("div");
    timeCell.classList.add("time-slot", "time-label");
    timeCell.textContent = time;
    scheduleGrid.appendChild(timeCell);

    // Fill in each day
    days.slice(1).forEach(day => {
      const cell = document.createElement("div");
      cell.classList.add("time-slot");

      const classInfo = scheduleData[time]?.[day];
      if (classInfo) {
        const classBlock = document.createElement("div");
        classBlock.className = `class-block ${classInfo.type}`;
        classBlock.textContent = classInfo.label;
        cell.appendChild(classBlock);
      }

      scheduleGrid.appendChild(cell);
    });
  });
}
