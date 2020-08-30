export class Card {
  static STR_RANKS = '23456789TJQKA'.split('')
  static INT_RANKS = Array.from(Array(13).keys())
  static PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]
  static STR_RANK_TO_INT_RANK = Object.fromEntries(
    new Map(Card.STR_RANKS.map((_, i) => [Card.STR_RANKS[i], Card.INT_RANKS[i]]))
  )
  static STR_SUIT_TO_INT_SUIT: { [k: string]: number } = {
    s: 1, // spades
    h: 2, // hearts
    d: 4, // diamonds
    c: 8 // clubs
  }
  static INT_SUIT_TO_STR_SUIT = 'xshxdxxxc'.split('')
  static INT_SUIT_TO_PRETTY_SUIT: { [k: string]: string } = {
    1: '♠️',
    2: '♥️',
    4: '♦️',
    8: '♣️'
  }

  static new(id: string): number {
    const rankInt = Card.STR_RANK_TO_INT_RANK[id[0]]
    const suitInt = Card.STR_SUIT_TO_INT_SUIT[id[1]]

    const rankPrime = Card.PRIMES[rankInt]
    const bitRank = (1 << rankInt) << 16
    const suit = suitInt << 12
    const rank = rankInt << 8

    return bitRank | suit | rank | rankPrime
  }

  static handToBinary(cardStrs: string[]) {
    return cardStrs.map(c => Card.new(c))
  }

  static intToStr(cardInt: number) {
    return (
      Card.STR_RANKS[Card.getRankInt(cardInt)] + Card.INT_SUIT_TO_STR_SUIT[Card.getSuitInt(cardInt)]
    )
  }

  static getRankInt(cardInt: number) {
    return (cardInt >> 8) & 0xf
  }

  static getSuitInt(cardInt: number) {
    return (cardInt >> 12) & 0xf
  }

  static getBitRandInt(cardInt: number) {
    return (cardInt >> 16) & 0x1fff
  }

  static getPrime(cardInt: number) {
    return cardInt & 0x3f
  }

  static primeProductFromHand(cardInts: number[]) {
    return cardInts.reduce((x, y) => x * (y & 0xff), 1)
  }

  static primeProductFromRankBits(rankBits: number) {
    return Card.INT_RANKS.filter(i => rankBits & (1 << i)).reduce((x, y) => x * Card.PRIMES[y], 1)
  }

  static intToPrettyStr(cardInt: number) {
    return `[${Card.STR_RANKS[Card.getRankInt(cardInt)]}${
      Card.INT_SUIT_TO_PRETTY_SUIT[Card.getSuitInt(cardInt)]
    }]`
  }

  static printPrettyCard(cardInt: number) {
    console.log(Card.intToPrettyStr(cardInt))
  }

  static printPrettyCards(cardInts: number[]) {
    console.log(cardInts.map(c => Card.intToPrettyStr(c)).join(' '))
  }
}
