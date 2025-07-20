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
        .trim();
}

// Get word list based on whitespace
function getWords(text) {
    return text.split(' ');
}

function cleanWords(words) {
    const smallestWord = 3;
    const contractions = /(?:n't|’s|'s|'re|’re|'ve|’ve|'ll|’ll|'d|’d|'m|’m)$/i;
    const punctuation = /[.,!?;:'"<>:/\\=()[\]{}]/g;
    const numberOnly = /^\d+$/;

    return words
        .map(word => {
            // Remove common contractions
            word = word.replace(contractions, '');

            // Remove trailing punctuation
            word = word.replace(punctuation, '');

            return word;
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
    return getTop(25, wordCount);
}













function frequenciesToSizedList(wordList, minSize = 30, maxSize = 100) {
    const values = wordList.map(item => item.count);
    const oldMin = Math.min(...values);
    const oldMax = Math.max(...values);

    const sizedList = [];
    for (const {word, count} of wordList) {
        const normalized = (count - oldMin) / (oldMax - oldMin);
        const size = Math.round(normalized * (maxSize - minSize) + minSize);
        sizedList.push({ text: word, size: size });
    }
    return sizedList;
}

function drawWordCloud(wordCount, width, height) {
    let sizedList = frequenciesToSizedList(wordCount);

    // Define your custom color palette here
    const customColors = ["#070656", "#083C62", "#095768", "#09716E", "#0A8C74", "0AA77A"];

    d3.layout.cloud()
      .size([width, height])
      .words(sizedList)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90) // 0 or 90 degrees
      .fontSize(d => d.size)
      .on("end", draw)
      .start();

    function draw(sizedList) {
      d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll("text")
        .data(sizedList)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("fill", () => customColors[Math.floor(Math.random() * customColors.length)])
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text);
    }
}




















document.addEventListener('DOMContentLoaded', () => {
    const wordCloudCanvas = document.getElementById('wordCloudCanvas');
    const dataField = document.getElementById('dataField');
    const generateButton = document.getElementById('generateButton');
    const downloadButton = document.getElementById('downloadButton');

    const width = 800;
    const height = 800;
    
    generateButton.addEventListener('click', () => {
        let wordCount = processText(dataField.value);

        wordCloudCanvas.innerHTML = ''; // Clear previous canvas
        drawWordCloud(wordCount, width, height);
        
        let message = wordCount
        .map(({word, count}) => `${word}: ${count}`)
        .join('\n');
        
        alert("Top Words:\n" + message);
    });

    downloadButton.addEventListener('click', () => {
      const svg = document.querySelector('svg');
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(svgBlob);
      img.onload = function() {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        const link = document.createElement('a');
        link.download = 'smed_wordcloud.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = url;
    });
});