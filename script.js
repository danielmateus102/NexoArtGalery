const COUNTER_WORKSPACE = "daniel-mateuss-team-2093";

// Optional: if you want the navbar pill to show the same counter as it increments
// Match this with the key you use in onclick (e.g., 'opcion1' or 'registrarse')
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

  const counterUrl = `https://api.counterapi.dev/v2/${COUNTER_WORKSPACE}/${encodeURIComponent(counterKey)}/up`;

  const target = e.currentTarget;
  const href = target?.getAttribute?.("href"); // exists on <a>, not on <button>

  fetch(counterUrl, { method: "GET", keepalive: true, cache: "no-store" })
    .catch(() => {})
    .finally(() => {
      // If it's a link with href -> redirect
      if (href && href !== "#") {
        window.location.href = href;
        return;
      }

      // If it's a button (no redirect) -> refresh the UI count
      updateCounterUI(counterKey);
    });
}
