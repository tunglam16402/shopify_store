  export const buildEmptyPersonalizationMessage = (
    values: Record<string, string> | undefined,
    lines: { id: string; label: string }[]
  ) => {
    const labelMap = Object.fromEntries(lines.map((l) => [l.id, l.label]))

    const emptyLabels = Object.entries(values ?? {})
      .filter(([, value]) => !value)
      .map(([key]) => labelMap[key] ?? key)
      .map((label) => label.toUpperCase())

    if (emptyLabels.length === 0) return null

    return [
      'You have some empty field(s):',
      emptyLabels.join(', '),
      '',
      'Fields that are not filled in won’t be printed',
    ].join('\n')
  }