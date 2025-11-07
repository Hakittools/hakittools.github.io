const scanBtn = document.getElementById("scanBtn");
const logOutput = document.getElementById("logOutput");
const consoleBox = document.getElementById("console");
const dashboard = document.getElementById("dashboard");
const issueList = document.getElementById("issueList");
const codePreview = document.getElementById("codePreview");
const codeBlock = document.getElementById("codeBlock");
const downloadBtn = document.getElementById("downloadBtn");

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

const fakeCode = `// Simulated EA Logic
int start() {
  if (AccountNumber() != 123456) {
    Alert("Unauthorized account");
    return(0);
  }

  double rsi = iRSI(NULL, 0, 14, PRICE_CLOSE, 0);
  if (rsi < 30) {
    OrderSend(Symbol(), OP_BUY, 0.1, Ask, 3, 0, 0, "Buy Order", 0, 0, clrGreen);
  } else if (rsi > 70) {
    OrderSend(Symbol(), OP_SELL, 0.1, Bid, 3, 0, 0, "Sell Order", 0, 0, clrRed);
  }

  // DLL call
  int result = CallExternalDLL("secure.dll");
  return(0);
}`;

scanBtn.addEventListener("click", () => {
  logOutput.innerHTML = "";
  issueList.innerHTML = "";
  codeBlock.textContent = "";
  consoleBox.classList.remove("hidden");
  dashboard.classList.add("hidden");
  codePreview.classList.add("hidden");

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
      codePreview.classList.remove("hidden");
      codeBlock.textContent = fakeCode;
      dashboard.classList.remove("hidden");
      issues.forEach(issue => {
        const li = document.createElement("li");
        li.textContent = issue;
        issueList.appendChild(li);
      });
    }
  }, 700);
});

downloadBtn.addEventListener("click", () => {
  const html = `
    <html>
    <head><title>EA Analysis Report</title></head>
    <body>
      <h2>EA Analysis Report</h2>
      <h3>Detected Issues</h3>
      <ul>${issues.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Simulated Code</h3>
      <pre>${fakeCode}</pre>
    </body>
    </html>
  `;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ea_analysis_report.html";
  a.click();
});
