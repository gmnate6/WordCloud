console.log("Word Cloud script loaded");

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
    "whom", "why", "with", "you", "your", "yours", "yourself", "yourselves"
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

function cleanWords(words) {
    const smallestWord = 3;
    const contractions = /(?:n't|’s|'s|'re|’re|'ve|’ve|'ll|’ll|'d|’d|'m|’m)$/i;
    const specialChars = /[.,!?;:'"<>:/\\=()[\]{}]/g;
    const numberOnly = /^\d+$/;

    return words
        .map(word => {
            return word
                .replace(contractions, '')     // Remove common contractions
                .replace(specialChars, '')     // Remove trailing punctuation
                .replace(/[""]/g, '"')         // Normalize smart quotes to straight
                .replace(/['']/g, "'");        // Normalize smart single quotes
        })
        .filter(word =>
            word.length >= smallestWord &&
            !numberOnly.test(word) // Remove words that are only digits
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

// Get Top _
function getTop(num, wordCount) {
    return Array.from(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, num)
        .map(([word, count]) => ({
            word,
            count
        }));
}

function processText(text) {
    text = cleanText(text);

    let words = getWords(text);
    words = cleanWords(words);
    words = filterBlacklistWords(words, STOPWORDS);

    let wordCount = getWordCount(words);
    return getTop(100, wordCount);
}













function frequenciesToSizedList(wordList, minSize = 12, maxSize = 80) {
    const values = wordList.map(item => item.count);
    const oldMin = Math.min(...values);
    const oldMax = Math.max(...values);

    const sizedList = [];
    for (const {word, count} of wordList) {
        const normalized = Math.pow((count - oldMin) / (oldMax - oldMin), 0.8); // Less extreme size differences
        const size = Math.round(normalized * (maxSize - minSize) + minSize);
        sizedList.push({ text: word, size: size });
    }
    return sizedList;
}

function drawWordCloud(wordCount, width, height) {
    let sizedList = frequenciesToSizedList(wordCount);
    
    // Sort the list by size to identify the largest word
    sizedList.sort((a, b) => b.size - a.size);
    
    // Force the largest word to have 0 rotation when layout is calculated
    const rotate = function(d) {
        // The first word (largest) gets 0 rotation, others get random rotation
        return d.size === sizedList[0].size ? 0 : ~~(Math.random() * 2) * 90;
    };

    // Define your custom color palette here
    const customColors = ["#070656", "#083C62", "#095768", "#09716E", "#0A8C74", "0AA77A"];

    d3.layout.cloud()
        .size([width, height])
        .words(sizedList)
        .padding(5)                   // Add some padding between words
        .rotate(rotate)               // Use custom rotate function
        .text(d => d.text)
        .fontSize(d => d.size)
        .spiral("archimedean")        // Try archimedean spiral for better spacing
        .timeInterval(10)             // Animation step interval
        //.random(() => 0.5)            // Deterministic layout
        .on("end", draw_animation)
        .start();

    function draw_animation(sizedList) {
        const svg = d3.select("#word-cloud")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const words = svg.selectAll("text")
            .data(sizedList)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("font-family", "Impact")
            .style("fill", () => customColors[Math.floor(Math.random() * customColors.length)])
            .style("opacity", 0)  // Start with opacity 0
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);

        // Animate words appearing
        words.transition()
            .duration(500)            // Animation duration in milliseconds
            .delay((d, i) => i * 25)  // Stagger each word's appearance
            .style("opacity", 1);     // Fade in to full opacity
    }
}
















document.addEventListener('DOMContentLoaded', () => {
    const wordCloud = document.getElementById('word-cloud');
    const dataField = document.getElementById('data-field');
    const generateButton = document.getElementById('generate-button');
    const downloadButton = document.getElementById('download-button');
    
    generateButton.addEventListener('click', () => {
        let wordCount = processText(dataField.value);
        let width = wordCloud.clientWidth;
        let height = wordCloud.clientHeight;

        wordCloud.innerHTML = ''; // Clear previous canvas
        drawWordCloud(wordCount, width, height);
        
        let message = wordCount
        .map(({word, count}) => `${word}: ${count}`)
        .join('\n');
        console.log(message);
    });

    downloadButton.addEventListener('click', () => {
        const svg = document.querySelector('svg');

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        const link = document.createElement('a');
        link.download = 'smed_wordcloud.svg';
        link.href = url;
        link.click();
        
        URL.revokeObjectURL(url);
    });
});