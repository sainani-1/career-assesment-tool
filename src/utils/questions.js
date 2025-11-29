export function loadQuestions() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

export function addQuestion(q) {
  const list = loadQuestions();
  list.push(q);
  localStorage.setItem("questions", JSON.stringify(list));
  return list;
}

export function updateQuestion(i, newQ) {
  const list = loadQuestions();
  list[i] = newQ;
  localStorage.setItem("questions", JSON.stringify(list));
  return list;
}

export function deleteQuestion(i) {
  const list = loadQuestions();
  list.splice(i, 1);
  localStorage.setItem("questions", JSON.stringify(list));
  return list;
}

export function clearQuestions() {
  localStorage.removeItem("questions");
}
