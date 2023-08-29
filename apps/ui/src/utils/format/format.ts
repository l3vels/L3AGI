export function shortenAddress(address: string): string {
  return shortenText(address, { head: 6, tail: 4 })
}

export function shortenTransactionHash(hash: string) {
  return shortenText(hash, { head: 8, tail: 6 })
}

function shortenText(text: string, { head, tail }: { head: number; tail: number }) {
  return `${text.slice(0, head)}...${text.slice(-tail)}`
}
