const KEY = 'career_assessment_results_v1'

export function loadResults(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  }catch(e){ return [] }
}

export function saveResult(r){
  const arr = loadResults()
  arr.unshift(r)
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function clearResults(){
  localStorage.removeItem(KEY)
}
