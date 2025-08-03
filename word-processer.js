STOPWORDS = [
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
    "by", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
    "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
    "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "me",
    "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only",
    "or", "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should",
    "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves",
    "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until",
    "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who",
    "whom", "with", "you", "your", "yours", "yourself", "yourselves"
]

// Convert to lowercase and replace multiple whitespace characters with a single space
function cleanText(text) {
    return text.toLowerCase()
        .replace(/\s+/g, ' ')
        .replace("—", " ")
        .replace("-", " ")
        .trim();
}

// Get word list based on whitespace
function getWords(text) {
    return text.split(' ');
}

function cleanWords(words, smallestWord, largestWord) {
    const contractions = /(?:n't|’s|'s|'re|’re|'ve|’ve|'ll|’ll|'d|’d|'m|’m)$/i;
    const specialChars = /[.,!?;:'"“”<>:/\\=()[\]{}]/g;
    const numberOnly = /^\d+$/;

    return words
        .map(word => {
            return word
                .replace(contractions, '')     // Remove common contractions
                .replace(specialChars, '')     // Remove trailing punctuation
        })
        .filter(word =>
            word.length >= smallestWord &&
            word.length <= largestWord &&
            !numberOnly.test(word)             // Remove words that are only digits
        );
}

function filterBlacklistWords(words, blacklist) {
    return words.filter(word => !blacklist.includes(word.toLowerCase()));
}

// Returns a map of each word to its frequency number
function getWordCount(words) {
    const wordCount = new Map();
    for (const word of words) {
        if (!word) continue;

        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    return wordCount;
}

// Get Top n Numbers (Also Sorts)
function getTop(n, wordCount) {
    return Array.from(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([word, count]) => ({
            word,
            count
        }));
}

// Main access function to process text
function getWordFrequencies(text, topAmount, smallestWord = 3, largestWord = 80) {
    let output = cleanText(text);
    output = getWords(output);
    output = cleanWords(output, smallestWord, largestWord);
    output = filterBlacklistWords(output, STOPWORDS);
    output = getWordCount(output);
    output = getTop(topAmount, output);
    return output;
}