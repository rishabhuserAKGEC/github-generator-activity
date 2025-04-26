// script.js

// Generate a 7x53 grid (like GitHub's contribution graph)
const weeks = 53;
const days = 7;
let contributions = [];

function randomLevel() {
  const r = Math.random();
  if (r > 0.8) return 4;
  if (r > 0.6) return 3;
  if (r > 0.3) return 2;
  if (r > 0.1) return 1;
  return 0;
}

function generateContributions() {
  contributions = [];
  for (let w = 0; w < weeks; w++) {
    let week = [];
    for (let d = 0; d < days; d++) {
      week.push(randomLevel());
    }
    contributions.push(week);
  }
}

function renderGraph() {
  const container = document.getElementById('graphContainer');
  container.innerHTML = '';
  for (let d = 0; d < days; d++) {
    const row = document.createElement('div');
    row.className = 'contribution-row';
    for (let w = 0; w < weeks; w++) {
      const cell = document.createElement('div');
      const level = contributions[w][d];
      cell.className = 'contribution-cell' + (level > 0 ? ` level-${level}` : '');
      row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function analyzeContributions() {
  let total = 0;
  let maxWeek = 0, maxWeekSum = 0;
  contributions.forEach((week, i) => {
    const weekSum = week.reduce((a, b) => a + b, 0);
    total += weekSum;
    if (weekSum > maxWeekSum) {
      maxWeekSum = weekSum;
      maxWeek = i + 1;
    }
  });
  return {
    total,
    maxWeek,
    maxWeekSum
  };
}

document.getElementById('generateBtn').onclick = () => {
  generateContributions();
  renderGraph();
  document.getElementById('analysis').innerHTML = '';
};

document.getElementById('analyzeBtn').onclick = () => {
  if (contributions.length === 0) {
    alert('Please generate activity first!');
    return;
  }
  const analysis = analyzeContributions();
  document.getElementById('analysis').innerHTML = `
    <h2>Analysis</h2>
    <p>Total activity points: <strong>${analysis.total}</strong></p>
    <p>Most active week: <strong>Week ${analysis.maxWeek}</strong> with <strong>${analysis.maxWeekSum}</strong> points</p>
    <p>This simulates the result of the github-activity-generator, which visually represents your GitHub contributions for the past year.</p>
  `;
};

// Initial state
generateContributions();
renderGraph();
