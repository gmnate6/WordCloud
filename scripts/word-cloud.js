// Takes Word Friquencies and converts them to a Sized List
function frequenciesToSizedList(wordList, minSize, maxSize) {
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

// Draws the Word Cloud to a SVG Element
function drawWordCloud(wordCount, width, height, minTextSize = 12, maxTextSize = 80, padding = 5) {
    let sizedList = frequenciesToSizedList(wordCount, minTextSize, maxTextSize);
    sizedList.sort((a, b) => b.size - a.size);

    const rotate = function(d) {
        return d.size === sizedList[0].size ? 0 : ~~(Math.random() * 2) * 90;
    };

    // Return a promise because d3.layout.cloud is async
    return new Promise(resolve => {
        d3.layout.cloud()
            .size([width, height])
            .words(sizedList)
            .padding(padding)
            .rotate(rotate)
            .text(d => d.text)
            .font("Impact")
            .fontSize(d => d.size)
            .spiral("archimedean")
            .timeInterval(10)
            .on("end", sizedList => {
                // Create detached SVG element
                const svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
                    .attr("width", width)
                    .attr("height", height);

                const g = svg.append("g")
                    .attr("transform", `translate(${width / 2}, ${height / 2})`);

                g.selectAll("text")
                    .data(sizedList)
                    .enter().append("text")
                    .style("font-size", d => `${d.size}px`)
                    .style("font-family", "Impact")
                    .style("fill", () => customColors[Math.floor(Math.random() * customColors.length)])
                    .attr("text-anchor", "middle")
                    .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
                    .text(d => d.text);

                // Resolve with the SVG element
                resolve(svg.node());
            })
            .start();
    });
}