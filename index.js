const remainingCardsEl = document.querySelector('#remaining-cards')
const cardsEl = document.querySelector('.card-slots')
const winnerEl = document.querySelector('#winner')
const hiddenClass = document.querySelector('.hidden')
const getCardsBtn = document.querySelector('#get-cards')
const getDeckBtn = document.querySelector('#get-deck')
const cardDeckEl = document.querySelector('.card-deck')

const personScoreEl = document.querySelector('.person-score')
const computerScoreEl = document.querySelector('.computer-score')

let personScore  = 0
let computerScore = 0
let deckId = ''

// function getDeck() {
//   fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
//     .then(res => res.json())
//     .then(deck =>  {
//       remainingCardsEl.textContent = `Available cards: ${deck.remaining}`
//       deckId = deck.deck_id
//       getCardsBtn.disabled = false
//     })
// } 

// Using async await
async function getDeck() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
  const deck = await res.json()
  remainingCardsEl.textContent = `Available cards: ${deck.remaining}`
  deckId = deck.deck_id
  getCardsBtn.disabled = false

}

// function getCards() {
//   fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
//   .then(res => res.json())
//   .then(data => {
//     if(data.remaining == 0) {
//       getCardsBtn.disabled = true
//       cardDeckEl.innerHTML = (personScore > computerScore) ? `<h1>You Won!!</h1>` 
//                     :(personScore < computerScore) ? `<h1>The Computer won!</h1>` 
//                     : `<h1>Its a tie!</h1>`
//     } else {
//       render(data)
//     }  
//   })  
// }

// Using async await
async function getCards()  {
  const res  = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  const data = await res.json()
  if(data.remaining === 0) {
    getCardsBtn.disabled = true
    cardDeckEl.innerHTML = (personScore > computerScore) ? `<h1>You Won!!</h1>` 
                        :(personScore < computerScore) ? `<h1>The Computer won!</h1>` 
                        : `<h1>Its a tie!</h1>`
  } else {
    render(data)
  }
}

getDeckBtn.addEventListener('click', getDeck)
getCardsBtn.addEventListener('click', getCards)

// HELPER FUNCTIONS
function render(data) {
  remainingCardsEl.textContent  = (data.remaining === undefined) ? `Shuffle Deck Please!` : `Remaining Cards: ${data.remaining}`
  cardsEl.children[0].innerHTML = `<img src=${data.cards[0].image}>`
  cardsEl.children[1].innerHTML = `<img src=${data.cards[1].image}>`   
  winnerEl.textContent          = determineWinner(data.cards[0], data.cards[1])
  personScoreEl.textContent     = `Me: ${personScore}`
  computerScoreEl.textContent   = `Computer: ${computerScore}`
}

function determineWinner(card1, card2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
  "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = valueOptions.indexOf(card1.value)
  const card2ValueIndex = valueOptions.indexOf(card2.value)

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++
    return "Computer wins!"
  } else if(card1ValueIndex < card2ValueIndex) {
    personScore++
    return "You win!"
  } else {
    return "War!"
  }
}


