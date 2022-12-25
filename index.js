const code = document.getElementById('code')
const speed = 25
const chars = 100
const sources = [
  'https://cdn.jsdelivr.net/gh/quantum9innovation/hulet/dist/hulet.min.js',
  'https://cdn.jsdelivr.net/gh/quantum9innovation/sost/dist/sost.min.js',

]
const trash = []
let jank = `console.log("Hacking...");`
let strings = jank.split('')
let i = 0
let j = 0

const highlight = () => {
  document.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el)
  })
}
const reset = () => {
  j++
  j = j % sources.length
  if (trash[j] !== undefined) {
    jank = trash[j]
    strings = jank.split('')
  } else return
}
const type = () => {
  if (i < strings.length) {
    let selected = strings.slice(i, i + chars)
    code.innerText += selected.join('')
    i += chars
    highlight()
    code.scrollTop = code.scrollHeight;
    setTimeout(type, speed)
  } else {
    reset()
    i = 0
    type()
  }
}

sources.forEach((source) => {
  fetch(source).then(res => res.text().then(text => trash.push(text)))
})
setTimeout(type, 1000)
