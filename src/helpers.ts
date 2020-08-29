export const pairs = (a: any[]) => a.map(v => a.filter(x => x !== v).map(w => [v, w])).flat()
