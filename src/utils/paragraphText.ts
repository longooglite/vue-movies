export const paragraphText = (text: string) => {
    const sentences = text.split('.')
    const transformedSentences = sentences.map((sentence) => {
        const words = sentence.split(' ')
        const firstWord = words[0]
        const otherWords = words.slice(1)
        const transformedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
        const transformedOtherWords = otherWords.map(word => word.charAt(0).toLowerCase() + word.slice(1))
        return `${transformedFirstWord} ${transformedOtherWords.join(' ')}.`
    })
    return transformedSentences.join(' ')
}