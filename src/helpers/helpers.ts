export const getPhoneLast4Digits = (phone: string) => {
  const numberStr: string = phone
  const lastFourDigits = numberStr?.slice(-4)
  return lastFourDigits
}
