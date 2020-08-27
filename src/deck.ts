import { Card } from './card'

export class Deck {
  static FULL_DECK: number[]
  cards: number[]

  constructor() {
    this.cards = this.shuffle(this.getFullDeck())
  }

  shuffle(cards: number[]) {
    return cards.sort(() => Math.random() - 0.5)
  }

  toString() {
    return this.cards.map(c => Card.intToPrettyStr(c))
  }

  private getFullDeck() {
    if (!Deck.FULL_DECK) {
      Deck.FULL_DECK = [
        ...Card.STR_RANKS.map(r => Object.keys(Card.STR_SUIT_TO_INT_SUIT).map(s => r.concat(s)))
      ]
        .flat()
        .map(c => Card.new(c))
    }
    return Deck.FULL_DECK
  }
}
