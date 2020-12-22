export const dateToISODate = date => {
  const target = new Date(date);

  return `${target.getFullYear()}-${target.getMonth() + 1}-${target.getDate()}`;
}

export const formatCurrency = (n, options) => {
  return (+n).toLocaleString("en-EN", { maximumFractionDigits: 2, ...(options || {}) })
}
