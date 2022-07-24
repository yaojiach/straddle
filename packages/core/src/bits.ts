export function* getNextBitSequence(bits: number): Generator<number, any, number> {
  let t = (bits | (bits - 1)) + 1
  let next = t | ((((t & -t) / (bits & -bits)) >> 1) - 1)
  yield next
  while (true) {
    t = (next | (next - 1)) + 1
    next = t | ((((t & -t) / (next & -next)) >> 1) - 1)
    yield next
  }
}
