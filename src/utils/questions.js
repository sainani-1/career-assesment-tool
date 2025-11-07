import defaults from '../data/questions.json'

const KEY = 'career_assessment_questions_v1'

export function loadQuestions(){
  try{
    const raw = localStorage.getItem(KEY)
    if(raw){
      return JSON.parse(raw)
    }
  }catch(e){ /* ignore */ }
  return defaults
}

export function saveQuestions(arr){
  try{ localStorage.setItem(KEY, JSON.stringify(arr)) }catch(e){}
}

export function addQuestion(q){
  const arr = loadQuestions()
  arr.unshift(q)
  saveQuestions(arr)
  return arr
}

export function clearQuestions(){
  localStorage.removeItem(KEY)
}
