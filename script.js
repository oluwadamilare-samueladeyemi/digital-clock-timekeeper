// STATE VARIABLES
let is24HourFormat = true; // true = 24hr, false = 12hr
let isDarkMode = true;

let alarmTime = null; // stores alarm time
let timerInterval = null;

// CLOCK APP OBJECT
const clockApp = {
  // Add leading zero (5 → 05)
  formatNumber(num) {
    return num < 10 ? "0" + num : num;
  },

  // Get current time (based on user's timezone)
  getNow() {
    return new Date(); // automatically uses system timezone
  },

  // Build time string
  getTimeString() {
    let now = this.getNow();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let ampm = "";

    // 12-hour conversion
    if (!is24HourFormat) {
      ampm = h >= 12 ? " PM" : " AM";
      h = h % 12 || 12;
    }

    // Format numbers
    h = this.formatNumber(h);
    m = this.formatNumber(m);
    s = this.formatNumber(s);

    return `${h}<span>:</span>${m}<span>:</span>${s}${ampm}`;
  },

  // Get formatted date
  getDateString() {
    let now = this.getNow();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  },

  // Update UI
  updateDisplay() {
    document.getElementById("clock-display").innerHTML = this.getTimeString();
    document.getElementById("date-display").innerText = this.getDateString();

    this.checkAlarm();
  },

  // Check if alarm should ring
  checkAlarm() {
    if (!alarmTime) return;

    let now = new Date();
    let current =
      clockApp.formatNumber(now.getHours()) +
      ":" +
      clockApp.formatNumber(now.getMinutes());

    if (current === alarmTime) {
      alert(" Alarm ringing!");
      alarmTime = null;
    }
  },
};

// Update clock every second
setInterval(() => clockApp.updateDisplay(), 1000);

// Initial load
clockApp.updateDisplay();

// Toggle 12/24 format
function handleToggle() {
  is24HourFormat = !is24HourFormat;
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  isDarkMode = !isDarkMode;
}

// SET ALARM
function setAlarm() {
  const input = document.getElementById("alarm-input").value;
  if (!input) return alert("Select a valid time");

  alarmTime = input;
  alert("Alarm set for " + input);
}

// ⏱TIMER FUNCTION
function startTimer() {
  let seconds = parseInt(document.getElementById("timer-input").value);

  if (isNaN(seconds) || seconds <= 0) {
    alert("Enter valid seconds");
    return;
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds--;

    document.getElementById("timer-display").innerText =
      "Timer: " + seconds + "s";

    if (seconds <= 0) {
      clearInterval(timerInterval);
      alert(" Timer done!");
    }
  }, 1000);
}