import Values from "../constants/Values"

export const shortenText = (text, maxCharacters) => {
    if (text.length > maxCharacters) {
        return text.substring(0, maxCharacters) + "..."
    } else {
        return text
    }
}