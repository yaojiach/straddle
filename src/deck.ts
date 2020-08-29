import { Card } from './card'

export class Deck {
  cards: number[]

  constructor() {
    this.cards = this.getFullDeck()
    this.shuffle()
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5)
  }

  draw(n = 1) {
    return this.cards.splice(0, n)
  }

  toString() {
    return this.cards.map(c => Card.intToPrettyStr(c))
  }

  private getFullDeck() {
    return [
      ...Card.STR_RANKS.map(r => Object.keys(Card.STR_SUIT_TO_INT_SUIT).map(s => r.concat(s)))
    ]
      .flat()
      .map(c => Card.new(c))
  }
}
