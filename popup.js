document.getElementById("start").addEventListener("click", () => {
  const interval = document.getElementById("interval").value;
  chrome.runtime.sendMessage({ action: "start", interval: Number(interval) }, (response) => {
    document.getElementById("status").textContent = "Auto-refresh started!";
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" }, (response) => {
    document.getElementById("status").textContent = "Auto-refresh stopped.";
  });
});
  