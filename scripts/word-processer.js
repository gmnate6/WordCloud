const STOPWORDS = new Set([
  "a","about","above","after","again","against","all","am","an","and","any","are",
  "as","at","be","because","been","before","being","below","between","both","but",
  "by","did","do","does","doing","down","during","each","few","for","from",
  "further","had","has","have","having","he","her","here","hers","herself","him",
  "himself","his","how","i","if","in","into","is","it","its","itself","me",
  "more","most","my","myself","no","nor","not","of","off","on","once","only",
  "or","other","our","ours","ourselves","out","over","own","same","she","should",
  "so","some","such","than","that","the","their","theirs","them","themselves",
  "then","there","these","they","this","those","through","to","too","under","until",
  "up","very","was","we","were","what","when","where","which","while","who",
  "whom","with","you","your","yours","yourself","yourselves"
]);

// Convert to lowercase and replace multiple whitespace characters with a single space
function cleanText(text) {
    return text.toLowerCase()
        .replace(/[—_(){}\[\]<>.\-\/]/g, ' ')                                // seperate conjoined words
        .replace(/(?:n't|’s|'s|'re|’re|'ve|’ve|'ll|’ll|'d|’d|'m|’m)\b/g, '') // strip contractions
        .replace(/[^a-zà-ž\s]/g, '')                                         // remove everything except letters and spaces
        .replace(/\s+/g, ' ')                                                // collapse multiple spaces into one
        .trim();                                                             // remove leading and trailing whitespace
}

// Get word list based on whitespace
function getWords(text) {
    return text.split(' ');
}

// Filter words based on length and blacklist
function filterWords(words, smallestWord, largestWord, blacklist) {
    return words
        .filter(word =>
            word.length >= smallestWord &&
            word.length <= largestWord &&
            !blacklist.has(word) // Filter out blacklist words  
        );
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
    output = filterWords(output, smallestWord, largestWord, STOPWORDS);
    output = getWordCount(output);
    output = getTop(topAmount, output);
    return output;
}