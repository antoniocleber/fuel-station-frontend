export const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals)
}

export const formatDate = (dateStr: string, locale = 'pt-BR'): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale)
  } catch {
    return dateStr
  }
}

export const formatDateTime = (dateStr: string, locale = 'pt-BR'): string => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleString(locale)
  } catch {
    return dateStr
  }
}

export const formatLiters = (value: number): string => {
  return `${formatNumber(value)} L`
}
