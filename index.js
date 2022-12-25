const code = document.getElementById('code')
const speed = 25
const chars = 250
const sources = [
  'https://cdn.jsdelivr.net/gh/quantum9innovation/the-jankiest/index.min.js',
  'https://cdn.jsdelivr.net/gh/quantum9innovation/hulet/dist/hulet.min.js',
  'https://cdn.jsdelivr.net/gh/quantum9innovation/sost/dist/sost.min.js',
  'https://code.jquery.com/jquery-3.6.3.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js',
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
const shuffle = (arr) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
const clear = () => code.innerText = ''
const reset = () => {
  j++
  if (j == trash.length) {
    j = 0
    shuffle(trash)
    clear()
  }
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
  fetch(source).then(res => {
    res.text().then(text => {
      let formatted = text.replace(/\n/g, '')
      trash.push(formatted)
    })
  })
})
setTimeout(type, 1000)
document.addEventListener('keypress', clear)
