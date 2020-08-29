import { pairs } from '../src/helpers'

describe('test helpers module', () => {
  it('generates correct pairs', () => {
    expect(pairs([1, 2, 3])).toEqual([
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2]
    ])
  })
})
