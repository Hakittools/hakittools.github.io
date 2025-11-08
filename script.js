const scanBtn = document.getElementById("scanBtn");
const codeBlock = document.getElementById("codeBlock");
const issueList = document.getElementById("issueList");
const chartSection = document.getElementById("chartSection");
const totals = document.getElementById("totals");
const codePreview = document.getElementById("codePreview");
const issues = document.getElementById("issues");
const downloadBtn = document.getElementById("downloadBtn");

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

const issuesFound = [
  "DLL dependency may cause instability on some terminals.",
  "Account lock restricts usage to specific brokers or accounts.",
  "Obfuscated logic prevents full transparency and safe modification."
];

scanBtn.addEventListener("click", () => {
  chartSection.classList.remove("hidden");
  totals.classList.remove("hidden");
  codePreview.classList.remove("hidden");
  issues.classList.remove("hidden");

  codeBlock.textContent = fakeCode;
  issueList.innerHTML = "";
  issuesFound.forEach(issue => {
    const li = document.createElement("li");
    li.textContent = issue;
    issueList.appendChild(li);
  });

  const ctx = document.getElementById("lineChart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["10 MAY", "12 MAY", "14 MAY", "16 MAY", "18 MAY", "20 MAY", "22 MAY", "24 MAY", "26 MAY"],
      datasets: [{
        label: 'Total Lines',
        data: [300, 350, 400, 450, 480, 500, 512, 512, 512],
        borderColor: '#00ff88',
        backgroundColor: 'transparent',
        tension: 0.3
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff' } }
      },
      plugins: {
        legend: { labels: { color: '#fff' } }
      }
    }
  });
});

downloadBtn.addEventListener("click", () => {
  const html = `
    <html>
    <head><title>EA Analysis Report</title></head>
    <body style="font-family:Arial;padding:20px;">
      <h2>EA Analysis Report</h2>
      <h3>Simulated EA Code</h3>
      <pre>${fakeCode}</pre>
      <h3>Detected Issues</h3>
      <ul>${issuesFound.map(i => `<li>${i}</li>`).join("")}</ul>
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
