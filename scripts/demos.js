var demo = {};

demo.colorizeLogLine = function (logLine) {
    var responseCode = logLine.split(" ")[3],
        colours = {
            "200": '#2b9ea6',
            "404": 'grey',
            "500": '#e30066'
        };

    return colours[responseCode];
};

demo.widthFromLogTime = function (logLine) {
    var time = logLine.split(" ")[4];
        
    return parseInt(time) / 10;
};

demo.bindingExample = function () {
    var boringServerLogs = [
        '"GET /boring/url HTTP/1.0" 200 3123',
        '"GET /boring/url HTTP/1.0" 200 3003',
        '"GET /boring/url HTTP/1.0" 500 5500',
        '"POST /boring/restful/resource HTTP/1.0" 200 3782',
        '"GET /boring/url HTTP/1.0" 404 1250',
        '"GET /boring/url HTTP/1.0" 200 3425'
        ],
        resultsBox = d3.select('#binding-example');
        
    
    resultsBox.selectAll('div.log-line')
        .data(boringServerLogs)
        .enter()
        .append('div')
        .classed('log-line', true)
        .text(function (logLine) { return logLine; })
        .style('background-color', demo.colorizeLogLine)
        .append('div')
        .style('height', 10)
        .style('width', 0)
        .style('background-color', 'black');

    resultsBox.selectAll('div.log-line div')
        .style('width', 0).transition().duration(1000)
        .style('width', demo.widthFromLogTime)
};

demo.joinsExample = function () {
    var list = d3.select('#joins-example ul');

    list.selectAll('li')
        .data([1,2,3,4,5]).text(String);
};

demo.enterExample = function () {
    var list = d3.select('#enter-example ul');

    list.selectAll('li')
        .data([1,2,3,4,5]).text(String)
        // for new elements
        .enter().append('li').text(
            function (d) { 
                return d + " I'm new!"; 
            });
};

demo.exitExample1 = function () {
    var resultsBox = d3.select('#exit-example'),
        selection = resultsBox.selectAll('div').data([1,2,3,4,5]);
    
    selection.enter().append('div')
        .text(String)
        .attr('style','font-size:32px');
};

demo.exitExample2 = function () {
    d3.select('#exit-example').selectAll('div').data([1,2,3])
        .exit()
        .transition()
        .duration(1000)
        .attr('style','font-size:2px').remove();
};

demo.svgExample = function () {
    var svg = d3.select('#svg-example svg');
    
    svg.selectAll('circle').data([2,4,8,16,32]).enter()
        .append('circle')
        .attr('cx', function (d) { return d*10; })
        .attr('cy', 25)
        .attr('r', Number)
        .attr('fill', '#ff5e3b');

    svg.selectAll('circle')
        .transition()
        .attr('cx', function (d) { return d*10 + Math.random()*25; })
};

demo.svgBasics = function () {
    var svg = d3.select('#svg-basics svg');

    svg.append('rect')
        .attr('x',10)
        .attr('y',10)
        .attr('width', 100)
        .attr('height', 20);

    svg.append('circle')
        .attr('cx', 30)
        .attr('cy', 60)
        .attr('r', 20);

    svg.append('path')
        .attr('d', 'M60,60 L80,70 L100,60 Z')
        .attr('stroke', 'black');
};

demo.barChartData = function () {
    // demo.barCharData()
    return [
        {   pages: 1209, 
            title: "Lord of the Rings", 
            published: new Date("July 29, 1954")
        },
        { 
            pages: 223,
            title: "Harry Potter and the Philosophers Stone",
            published: new Date("June 26, 1997")
        },
        {
            pages: 412,
            title: "Dune",
            published: new Date("January 1, 1965")
        },
        {
            pages: 468, 
            title: "The Amulet of Samarkand",
            published: new Date("July 29, 2011")
        }
    ];
};

demo.bookLength1 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');

    chart.selectAll('rect').data(bookData).enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (book, index) { return index*30; })
        .attr('width', function (book) { return book.pages / 3; })
        .attr('height', 18)
        .attr('fill', '#2b9ea6');
};

demo.bookLength2 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');
    
    chart.selectAll('text.book-label').data(bookData).enter()
        .append('text')
        .classed('book-label','true')
        .attr('x', function (book) { return book.pages / 3 + 4; })
        .attr('y', function (book, index) { return index*30 + 15; })
        .attr('text-anchor', 'start')
        .attr('fill','black')
        .text(function (book) { return book.title; });
};

demo.bookLength3 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');

        chart.selectAll('text.page-count').data(bookData).enter()
            .append('text')
            .classed('page-count', true)
            .attr('x', 4)
            .attr('y', function (book, index) { return index*30 + 12; })
            .text(function (book) { return book.pages; });

        d3.select('#book-length .title')
            .text('The length of books by page count');
};

demo.scaleExample = function () {
    var scale = d3.scale.linear().range([0,50]).domain([0,5]),
        resultBox = d3.select('#scale-example');

    resultBox.selectAll('div')
        .data([0,1,2,3,4])
        .enter()
        .append('div')
        // the below line is short for 
        // .text(function (d) { return scale(d); })
        .text(scale);
};

demo.colourScaleExample = function () {
    var scale = d3.scale.linear(),
        resultBox = d3.select('#colour-scale-example');

    scale.range(['#e30066','#2b9ea6']).domain([0,1]);

    resultBox.selectAll('div')
        .data([
                0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 
                0.6, 0.7, 0.8, 0.9, 1.0
        ])
        .enter()
        .append('div')
        .style('background-color',scale)
        .text(scale);
};


demo.pagesVsPublication1 = function () {
    var books = demo.barChartData(),
        chart = d3.select('#pages-vs-publication svg');

    chart.selectAll('circle').data(books)
        .enter()
        .append('circle')
        .attr('cx', 10)
        .attr('cy', 10)
        .attr('r', 10);
};

demo.pagesVsPublication2 = function () {
    var books = demo.barChartData(),
        chart = d3.select('#pages-vs-publication svg'),
        latestBook = d3.max(books, function (book) { 
            return book.published; 
        }),
        earliestBook = d3.min(books, function (book) {
            return book.published;
        }),
        xScale = d3.time.scale();

    xScale.range([50,550]).domain([earliestBook, latestBook]);
    
    chart.selectAll('circle').data(books)
        .transition().duration(1000)
        .attr('cx', function (book) { return xScale(book.published); });

    // save the scale for later
    demo.bookChartXScale = xScale;
};

demo.pagesVsPublication3 = function () {
    var books = demo.barChartData(),
        chart = d3.select('#pages-vs-publication svg'),
        maxPages = d3.max(books, function (book) { 
            return book.pages; 
        }),
        minPages = d3.min(books, function (book) {
            return book.pages;
        }),
        yScale = d3.scale.linear();

    yScale.range([10,130]).domain([maxPages, minPages]);
    
    chart.selectAll('circle').data(books)
        .transition().duration(1000)
        .attr('cy', function (book) { return yScale(book.pages); });

    // save the scale for later
    demo.bookChartYScale = yScale;
};

demo.axisExample = function () {
    var chart = d3.select('#pages-vs-publication svg'),
        xAxis = d3.svg.axis(),
        yAxis = d3.svg.axis();

    xAxis.scale(demo.bookChartXScale)
        .orient('bottom')
        .ticks(d3.time.years, 5);

    yAxis.scale(demo.bookChartYScale)
        .orient('left')
        .ticks(5);
    
    chart.append('g')
        .attr('transform','translate(0,130)')
        .call(xAxis);    
    
    chart.append('g')
        .attr('transform','translate(50,0)')
        .call(yAxis);    
};

demo.pathsExample1 = function () {
    // in this example data is an array or arrays
    var data = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        chart = d3.select('#paths-example svg'),
        xPos = function (d, i) { return i*60; },
        yPos = function (d, i) { return 100 - Math.pow(d,2); },
        lineFunction = d3.svg.line().interpolate('linear').x(xPos).y(yPos);

    chart.selectAll('g.graph-line').data(data).enter()
        .append('g').classed('graph-line', true)
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('d', lineFunction);

    // let's store the position functions for later
    demo.paths = {xPos: xPos, yPos: yPos};
};

demo.pathsExample2 = function () {
    var chart = d3.select('#paths-example svg'),
        data = chart.select('g.graph-line').data()[0];

        chart.selectAll('circle').data(data)
            .enter()
            .append('circle')
            // set the position using the xPos 
            // function from the previous example
            .attr('cx', demo.paths.xPos)
            .attr('cy', 0)
            .attr('r', 4)
            .attr('fill', '#e30066')
            .attr('stroke', 'black');

        chart.selectAll('circle')
            .attr('cy', 0)
            .transition()
            .duration(2000)
            // same for the yPos
            .attr('cy', demo.paths.yPos);
};

demo.pathDSL = function () {
    var chart = d3.select('#paths-example svg'),
        pathRegex = /(\D\d+,\d+)/g,
        pathDescription = chart.select('path').attr('d').match(pathRegex),
        data = chart.select('g.graph-line').data()[0];
        
        chart.selectAll('text').data(data)
            .enter()
            .append('text')
            .attr('x', demo.paths.xPos)
            .attr('y', function (d,i) { 
                return demo.paths.yPos(d,i) + 18; 
            })
            .text(function (d,i) { return pathDescription[i]; });
};

demo.eventsExample1 = function () {
    var chart = d3.select('#events-example svg'),
        data = ['*', 'J', 'D', 'D', '2', '0', '1', '3'],
        xRow = function (d, i) { return (i%4)*48 + 4; },
        yRow = function (d, i) { return parseInt(i/4)*24 + 24; };

    chart.selectAll('rect').data(data).enter()
        .append('rect')
        .attr('width', 20).attr('height', 20)
        .attr('x', xRow)
        .attr('y', function (d,i) { return yRow(d, i) - 18; })
        .attr('fill', 'red');
    
    chart.selectAll('text.jdd-letter').data(data).enter()
        .append('text')
        .classed('jdd-letter', true)
        .attr('x', xRow).attr('y', yRow)
        .attr('stroke-width', 0)
        .text(String);
};

demo.eventsExample2 = function () {
    var chart = d3.select('#events-example svg');

    chart.selectAll('text.jdd-letter')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .attr('stroke-width', 10)
                .transition().attr('stroke-width', 0);
        });
};


demo._init = function () {
    var codeExamples = document.getElementsByTagName('code');
    for (var i = 0, len = codeExamples.length; i < len; i++) {
        var source = codeExamples[i].getAttribute('data-source'),
            codeBlock = codeExamples[i];
        if (source) {
            codeBlock.innerHTML = demo[source].toString();
            hljs.highlightBlock(codeBlock);
            codeBlock.onclick = demo[source];
        }
    }

    var stickyDivs = document.getElementsByClassName('sticky');
    for (var i = 0, len = stickyDivs.length; i < len; i++) {
        var div = stickyDivs[i];
        div.onclick = function () {
            var currentClass = this.getAttribute('class');
            if (!currentClass.match("stuck")) {
                this.setAttribute('class','result stuck');
            } else {
                this.setAttribute('class', 'result sticky');
            }
        };
    }
};

demo._aboutMe = function () {
    var resultsBox = document.getElementById('about-me'),
        me = {
                name: "Gareth Rogers",
                twitter: "@GarethRogers0"
        };
    
    resultsBox.innerHTML = JSON.stringify(me);
};
