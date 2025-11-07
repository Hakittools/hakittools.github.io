const scanBtn = document.getElementById("scanBtn");
const logOutput = document.getElementById("logOutput");
const consoleBox = document.getElementById("console");
const dashboard = document.getElementById("dashboard");
const issueList = document.getElementById("issueList");

const logs = [
  "Initializing EA scan...",
  "Reading file structure...",
  "Checking for indicator usage...",
  "Detecting trade logic...",
  "Warning: DLL dependency found",
  "Error: Account lock detected",
  "Warning: Expiry date embedded in code",
  "Analyzing risk settings...",
  "Error: Obfuscated logic blocks detected",
  "Scan complete. 3 issues found."
];

const issues = [
  "DLL dependency may cause instability on some terminals.",
  "Account lock restricts usage to specific brokers or accounts.",
  "Obfuscated logic prevents full transparency and safe modification."
];

scanBtn.addEventListener("click", () => {
  logOutput.innerHTML = "";
  issueList.innerHTML = "";
  consoleBox.classList.remove("hidden");
  dashboard.classList.add("hidden");

  let i = 0;
  const interval = setInterval(() => {
    if (i < logs.length) {
      const line = document.createElement("div");
      line.textContent = logs[i];
      logOutput.appendChild(line);
      logOutput.scrollTop = logOutput.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
      dashboard.classList.remove("hidden");
      issues.forEach(issue => {
        const li = document.createElement("li");
        li.textContent = issue;
        issueList.appendChild(li);
      });
    }
  }, 800);
});
