export const formatCategoryLabel = (label: string): string => {
  if (!label) return ''

  let result = label

  result = result.replace(/^ygroup_/i, '')

  result = result.replace(/[_-]+/g, ' ')

  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')

  result = result
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return result.trim()
}