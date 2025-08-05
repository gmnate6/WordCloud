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
const exampleButton = document.getElementById('example-button');
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

    // Check dataField for content
    if (dataField.value.trim() === '') {
        alert("Please enter some data to generate a word cloud.");
        return;
    }

    let wordCount = getWordFrequencies(dataField.value, topAmount, minWordSize, maxWordSize);

    clearWordCloud(); // Clear previous word cloud

    drawWordCloud(wordCount, width, height, minFontSize, maxFontSize, padding).then(svgWC => {
        wordCloud.appendChild(svgWC);
    });

    output.style.display = 'flex'; // Show the output area
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

exampleButton.addEventListener('click', () => {
    // Use fetch to get the content of the 5why.txt file
    fetch('examples/5why.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Set the content of the dataField to the text from the file
            dataField.value = data;
            console.log('5 Whys text loaded successfully!');
        })
        .catch(error => {
            console.error('Error loading the 5 Whys text:', error);
            alert('Failed to load the 5 Whys text. Please try again.');
        }
    );
});

exampleButton.addEventListener('click', () => {
    const exampleData = "apple banana orange apple banana apple orange banana apple orange banana";
    dataField.value = exampleData;
});

clearButton.addEventListener('click', () => {
    clearWordCloud();
    dataField.value = ''; // Clear the input field
});

downloadButton.addEventListener('click', () => {
    downloadWordCloud();
});

retryButton.addEventListener('click', () => {
    generateWordCloud();
});

closeButton.addEventListener('click', () => {
    output.style.display = 'none'; // Hide output area
    clearWordCloud(); // Clear the word cloud
});
