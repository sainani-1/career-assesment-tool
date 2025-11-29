export function loadResults() {
  return JSON.parse(localStorage.getItem("results") || "[]");
}

export function saveResult(r) {
  const old = loadResults();
  old.push(r);
  localStorage.setItem("results", JSON.stringify(old));
}

export function clearResults() {
  localStorage.removeItem("results");
}
