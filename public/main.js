class player {
  name = ''
  selectedMove = ''

  constructor(name) {
    this.name = name
  }
}

class selector {
  target = ''
  action = ''
  handler = {}

  constructor(target, action, handler) {
    this.target = target
    this.action = action
    this.handler = handler
  }
}

const state = {
  players: [new player('Player 1'), new player('Player 2')],
  currentPlayer: 0,
  ruleSet: {'Rock' : ['Paper', 'Spock'], 'Paper': ['Scissors', 'Lizard'], 'Scissors': ['Rock', 'Spock'], 'Lizard': ['Rock', 'Scissors'], 'Spock': ['Lizard', 'Paper']},
}

function moveMenu() {
  const moves = Object.keys(state.ruleSet)

  return `
    <form class='move-menu'>
      <h1 class='move-player'>${state.players[state.currentPlayer].name}</h1>
      <fieldset class='move-set'>
        ${moves
          .map(
            (move) =>
              `<button class='move' data-move='${move}'>${move}</button>`
          )
          .join('\n')}
      </fieldset>
    </form>
  `
}

function winner() {
  if (state.players[0].selectedMove === state.players[1].selectedMove) {
    return `<h1 class='winner'>It's a draw!</h1>`
  }

  let winner = (state.ruleSet[state.players[1].selectedMove].includes(state.players[0].selectedMove)) ? 0 : 1;


  return `
    <h1 class='winner'>${state.players[winner].name} wins!</h1>
    <h2 class='winner'>${state.players[winner].selectedMove} beats ${state.players[winner ^= 1].selectedMove}!</h2>
    `
}

function handleClick(event) {
  console.log(state.currentPlayer, state.players.length)
  if (state.currentPlayer < state.players.length - 1) {
    state.players[state.currentPlayer].selectedMove = event.target.dataset.move
    state.currentPlayer++
    render(moveMenu)
  } else {
    state.players[state.currentPlayer].selectedMove = event.target.dataset.move
    render(winner)
  }
}

function render(component) {
  const html = `
    <div class='container'>
      ${component()}
    </div>
  `
  document.querySelector('body').innerHTML = html
  for (target of document.querySelectorAll('.move')) {
    target.addEventListener('click', handleClick)
  }
}

const main = () => {
  render(moveMenu)
}

document.addEventListener('DOMContentLoaded', main)
