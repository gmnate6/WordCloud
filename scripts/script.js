console.log("Script Loaded!");

// Output Elements
const output = document.getElementById('output');
const wordCloud = document.getElementById('word-cloud');
const downloadButton = document.getElementById('download-button');
const retryButton = document.getElementById('retry-button');
const closeButton = document.getElementById('close-button');

// Input Elements
const dataField = document.getElementById('data-field');

const widthField = document.getElementById('width-field');
const heightField = document.getElementById('height-field');

const topAmountField = document.getElementById('top-amount-field');

const paddingField = document.getElementById('padding-field');

const minFontSizeField = document.getElementById('min-font-field');
const maxFontSizeField = document.getElementById('max-font-field');

const minWordSizeField = document.getElementById('min-word-size-field');
const maxWordSizeField = document.getElementById('max-word-size-field');

const generateButton = document.getElementById('generate-button');
const clearButton = document.getElementById('clear-button');

// Custom Colors for Word Cloud
const customColors = ["#070656", "#083C62", "#095768", "#09716E", "#0A8C74", "#0AA77A"];

function clampNumberInput(input) {
    const min = parseInt(input.min, 10);
    const max = parseInt(input.max, 10);

    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value === '') {
        input.value = min;
        return;
    }

    const value = parseInt(input.value, 10);
    input.value = Math.max(min, Math.min(max, value));
}

function clearWordCloud() {
    wordCloud.innerHTML = '';
}

function generateWordCloud() {
    // Validate and clamp input values
    clampNumberInput(widthField);
    clampNumberInput(heightField);
    clampNumberInput(topAmountField);
    clampNumberInput(paddingField);
    clampNumberInput(minFontSizeField);
    clampNumberInput(maxFontSizeField);
    clampNumberInput(minWordSizeField);
    clampNumberInput(maxWordSizeField);
    
    let width = parseInt(widthField.value, 10);
    let height = parseInt(heightField.value, 10);
    let topAmount = parseInt(topAmountField.value, 10);
    let padding = parseInt(paddingField.value, 10);
    let minFontSize = parseInt(minFontSizeField.value, 10);
    let maxFontSize = parseInt(maxFontSizeField.value, 10);
    let minWordSize = parseInt(minWordSizeField.value, 10);
    let maxWordSize = parseInt(maxWordSizeField.value, 10);

    if (minFontSize > maxFontSize) {
        alert("Minimum font size cannot be greater than maximum font size.");
        return;
    }

    let wordCount = getWordFrequencies(dataField.value, topAmount, minWordSize, maxWordSize);

    clearWordCloud(); // Clear previous word cloud

    drawWordCloud(wordCount, width, height, minFontSize, maxFontSize, padding).then(svgWC => {
        wordCloud.appendChild(svgWC);
    });

    output.style.display = 'flex'; // Show output area
}

function downloadWordCloud() {
    const svg = wordCloud.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.download = 'smed_wordcloud.svg';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
}







generateButton.addEventListener('click', () => {
    generateWordCloud();
});

retryButton.addEventListener('click', () => {
    generateWordCloud();
});

clearButton.addEventListener('click', () => {
    clearWordCloud();
    dataField.value = ''; // Clear the input field
});

downloadButton.addEventListener('click', () => {
    downloadWordCloud();
});

closeButton.addEventListener('click', () => {
    output.style.display = 'none'; // Hide output area
    clearWordCloud(); // Clear the word cloud
});