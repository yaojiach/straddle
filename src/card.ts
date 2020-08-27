export class Card {
  static STR_RANKS = '23456789TJQKA'.split('')
  static INT_RANKS = [...Array(13).keys()]
  static PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]
  static STR_RANK_TO_INT_RANK = Object.fromEntries(
    Card.STR_RANKS.map((_, i) => [Card.STR_RANKS[i], Card.INT_RANKS[i]])
  )
}
