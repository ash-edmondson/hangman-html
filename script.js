var wordDiv       = document.getElementById('word')
var badGuessesDiv = document.getElementById('badGuesses')
var statusDiv     = document.getElementById('status')
var manImg        = document.getElementById('man')
var resetButton   =  document.getElementById('reset')

var word       = 'monkey'
var guesses    = []
var badGuesses = []

function reset(){

 fetch('https://tomnomnom.uk/hm/').then(r =>{
  r.text().then(t => {
  word = t
  })
 })
  guesses = []
  badGuesses= []
  statusDiv.innerHTML = '&nbsp;'
  manImg.src ='images/hm-0.png'
  
  updateWordDiv()
  updateBadGuesses()
}

reset()

resetButton.addEventListener('click',reset)


function updateWordDiv(){
  // mo-k--
  wordDiv.innerText = word.split('').map(l => {
    if (guesses.includes(l)){
      return l
    }
    return '-'
  }).join('')
}
updateWordDiv()

function updateBadGuesses(){
  badGuessesDiv.innerText = badGuesses.join('')
}
updateBadGuesses()


document.addEventListener('keydown', function(e){

if (badGuesses.length > 9){

  return
}
  var letter = e.key.toLowerCase()

  if (letter.length != 1 || !letter.match(/[a-z]/)){
    return
  }

  if (word.split('').includes(letter)){
    guesses.push(letter)
  } else if (!badGuesses.includes(letter)){
    badGuesses.push(letter)
  }

  updateWordDiv()
  updateBadGuesses()

  // check if they've won
  var lettersLeft = word.split('').filter(l => {
    return !guesses.includes(l)
  }).length
  

  if (lettersLeft == 0){
    statusDiv.innerText = "you win"
    
  }

 
  manImg.src =`images/hm-${badGuesses.length}.png`

  if (badGuesses.length == 10){
  statusDiv.innerText = 'you lose'


  guesses = guesses.concat(word.split(''))
  updateWordDiv()
  }
  
})