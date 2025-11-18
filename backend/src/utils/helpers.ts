export const getTokenDynamicPart = (token: string) => {
  if (!token) return
  const firstDotIndex = token.indexOf(".")
  return token.substring(firstDotIndex + 1)
}
