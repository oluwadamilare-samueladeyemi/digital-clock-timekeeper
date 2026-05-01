function stopAlarm() {
  if (alarmSound) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }

  // 🧹 Clear everything
  alarmTime = null;
  localStorage.removeItem("alarmTime");
  localStorage.removeItem("alarmTone");
}