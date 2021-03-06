import { combinations } from '../src/helpers'

describe('test helpers module', () => {
  it('generates empty given invalid length', () => {
    expect(combinations([1, 2, 3], 4)).toEqual([])
  })

  it('generates correct singletons', () => {
    expect(combinations([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  it('generates correct pairs', () => {
    expect(combinations([1, 2, 3], 2)).toEqual([
      [1, 2],
      [1, 3],
      [2, 3]
    ])
  })

  it('generates correct triples', () => {
    expect(combinations([1, 2, 3, 4], 3)).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4]
    ])
  })
})
