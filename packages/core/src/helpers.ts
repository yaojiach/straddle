export function combinations(a: any[], k: number) {
  let combs: any[]

  if (k > a.length || k <= 0) {
    return []
  }

  if (k == a.length) {
    return [a]
  }

  if (k == 1) {
    return a.map((i) => [i])
  }

  combs = []
  for (let i = 0; i < a.length - k + 1; i++) {
    let head = a.slice(i, i + 1)
    let tail = combinations(a.slice(i + 1), k - 1)
    tail.forEach((j) => {
      combs.push(head.concat(j))
    })
  }
  return combs
}
