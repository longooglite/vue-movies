export const paragraphText = (text: string): string => {
    const normalizedSentences = text
        .split('.')
        .map((segment) => segment.trim())
        .filter((segment) => segment.length > 0)

    if (normalizedSentences.length === 0) {
        return ''
    }

    const transformedSentences = normalizedSentences
        .map((sentence) => {
            const words = sentence.split(/\s+/).filter(Boolean)
            if (words.length === 0) {
                return ''
            }

            const firstWord = words[0]
            const otherWords = words.slice(1)

            // Capitalize first character of first word; keep remainder as-is
            const transformedFirstWord =
                firstWord.charAt(0).toUpperCase() + firstWord.slice(1)

            // Lowercase only the first character of subsequent words; keep remainder as-is
            const transformedOtherWords = otherWords.map(
                (word) => word.charAt(0).toLowerCase() + word.slice(1),
            )

            const rebuilt = [transformedFirstWord, ...transformedOtherWords].join(' ')
            return `${rebuilt}.`
        })
        .filter((s) => s.length > 0)

    return transformedSentences.join(' ')
}