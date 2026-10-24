const totalClicksOutput = document.querySelector("#total-clicks");
const clickRateOutput = document.querySelector("#click-rate");
const clickButton = document.querySelector("#click-button");
const clickerStatus = document.querySelector("#clicker-status");
const storageKey = "my-pixl-page-total-clicks";
const recentClicks = [];
let totalClicks = 0;
let storageAvailable = true;

try {
  const savedCount = Number(localStorage.getItem(storageKey) ?? 0);
  if (!Number.isSafeInteger(savedCount) || savedCount < 0) {
    throw new Error("Saved click count is not a non-negative safe integer.");
  }
  totalClicks = savedCount;
} catch (error) {
  console.error("Unable to load the saved click count:", error);
  storageAvailable = false;
  clickerStatus.textContent = "Click count will only be saved during this visit.";
}

totalClicksOutput.value = totalClicks.toLocaleString();

clickButton.addEventListener("click", () => {
  if (totalClicks === Number.MAX_SAFE_INTEGER) {
    clickerStatus.textContent = "The total click counter has reached its maximum.";
    return;
  }

  totalClicks += 1;
  recentClicks.push(Date.now());
  totalClicksOutput.value = totalClicks.toLocaleString();
  updateClickRate();

  if (storageAvailable) {
    try {
      localStorage.setItem(storageKey, String(totalClicks));
    } catch (error) {
      console.error("Unable to save the click count:", error);
      storageAvailable = false;
      clickerStatus.textContent = "Click count will only be saved during this visit.";
    }
  }
});

function updateClickRate() {
  const oneSecondAgo = Date.now() - 1000;
  while (recentClicks.length > 0 && recentClicks[0] <= oneSecondAgo) {
    recentClicks.shift();
  }
  clickRateOutput.value = String(recentClicks.length);
}

window.setInterval(updateClickRate, 100);
