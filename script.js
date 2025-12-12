const COUNTER_WORKSPACE = "daniel-mateuss-team-2093";

function countAndGo(e, counterKey) {
  e.preventDefault();

  const counterUrl = `https://api.counterapi.dev/v2/${COUNTER_WORKSPACE}/${encodeURIComponent(counterKey)}/up`;
  const href = e.currentTarget.getAttribute("href");

  fetch(counterUrl, { method: "GET", keepalive: true })
    .catch(() => {})
    .finally(() => {
      window.location.href = href;
    });
}
