export function asNumber() {
  return {
    serializer: (value: any) => value.toString(),
    deserializer: (value: string) => Number(value),
  }
}
export function asString() {
  return {
    serializer: (value: any) => `${value} is the best`,
    deserializer: (value: string) => (value ?? '').split(' ')[0]
  }
}
