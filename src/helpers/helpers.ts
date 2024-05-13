export const getPhoneLast4Digits = (phone: string) => {
  const numberStr: string = phone
  const lastFourDigits = numberStr?.slice(-4)
  return lastFourDigits
}

export const formatFirebaseTimestamp = (firebaseTimestamp: any) => {
  if (!firebaseTimestamp) return 'N/A'
  const date = firebaseTimestamp.toDate()

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const formattedDate =
    date.toLocaleString('en-US', { month: 'long' }) +
    ' ' +
    date.getDate() +
    getOrdinalSuffix(date.getDate()) +
    ', ' +
    date.getFullYear()
  // May 7th, 2024
  return formattedDate
}
