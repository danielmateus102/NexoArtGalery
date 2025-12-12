const COUNTER_WORKSPACE = "daniel-mateuss-team-2093";

function updateCounterUI(counterKey) {
  const el = document.getElementById("likeCount");
  if (!el) return;

  const readUrl = `https://api.counterapi.dev/v2/${COUNTER_WORKSPACE}/${encodeURIComponent(counterKey)}`;
  fetch(readUrl, { method: "GET", cache: "no-store" })
    .then(r => r.json())
    .then(json => {
      const up = json?.data?.up_count;
      el.textContent = (typeof up === "number" ? up : 0).toLocaleString();
    })
    .catch(() => {});
}

function countAndGo(e, counterKey) {
  e.preventDefault();

  const counterUrl =
    `https://api.counterapi.dev/v2/${COUNTER_WORKSPACE}/${encodeURIComponent(counterKey)}/up`;

  fetch(counterUrl, { method: "GET", keepalive: true, cache: "no-store" })
    .catch(() => {})
    .finally(() => {
      updateCounterUI(counterKey);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const pill = document.querySelector(".counter-pill[data-counter]");
  if (!pill) return;

  updateCounterUI(pill.dataset.counter);
});

