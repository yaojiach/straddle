# Straddle

Poker hand evaluator in TypeScript.

```sh
npm install straddle
# or
yarn add straddle
```

```javascript
const deck = new Deck() // create and shuffle the deck
const hand = deck.draw(2) // draw 2 cards from deck
Card.printPrettyCards(hand) // print the hand: [8♣️] [3♦️]
const board = deck.draw(5)
const evaluator = new Evaluator()
let score = evaluator.evaluate(hand, board) // evaluate best hand

score = evaluator.evaluate(
  [Card.new('Ah'), Card.new('Kh')], // create card directly
  [Card.new('Qh'), Card.new('Jh'), Card.new('Th')]
)
// {
//   score: 1,
//   hand: [ 268446761, 134228773, 67119647, 33564957, 16787479 ],
//   handStr: [ 'Ah', 'Kh', 'Qh', 'Jh', 'Th' ],
//   handPrettyStr: [ '[A♥️]', '[K♥️]', '[Q♥️]', '[J♥️]', '[T♥️]' ],
//   handName: 'Royal 👑 Flush'
// }
```
