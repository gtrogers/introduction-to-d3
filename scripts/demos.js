var demo = {};

demo.bindingExample = function () {
    var data = [
        'hypothesise',
        ['d','e','s','i','g','n'],
        'collect',
        'analyse',
        {name: 'validate', length: 50}
    ];

    var resultsBox = d3.select('#binding-example');
    resultsBox.selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .text(function (d) {return d.length;})
        .attr('style', 'background-color:orange');
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
        .exit().transition().duration(1000)
            .attr('style','font-size:2px').remove();
};

demo.svgExample = function () {
    var svg = d3.select('#svg-example svg');
    
    svg.selectAll('circle').data([2,4,8,16,32]).enter()
        .append('circle')
        .attr('cx', function (d) { return d*10; })
        .attr('cy', 25)
        .attr('r', Number);
};

demo.barChartData = function () {
    // TODO: replace this with data for real books
    // Bar chart data
    return [
        { length: 500, title: "1"},
        { length: 550, title: "2"},
        { length: 200, title: "3"},
        { length: 15,  title: "4"},
        { length: 27,  title: "5"},
        { length: 100, title: "6"}
    ];
};

demo.bookLength1 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');

    chart.selectAll('rect').data(bookData).enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d,i) { return i*20; })
        .attr('width', function (d) { return d.length; })
        .attr('height', 18)
        .attr('fill', '#2b9ea6');
};

demo.bookLength2 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');
    
    chart.selectAll('text.book-label').data(bookData).enter()
        .append('text')
        .classed('book-label','true')
        .attr('x', 3)
        .attr('y', function (d,i) { return i*20 + 16; })
        .attr('text-anchor', 'start')
        .attr('fill','#f0f0f0')
        .text(function (d) { return d.title; });
};

demo.bookLength3 = function () {
    var bookData = demo.barChartData(),
        chart = d3.select('#book-length svg');

        chart.selectAll('text.page-count').data(bookData).enter()
            .append('text')
            .classed('page-count', true)
            .attr('x', function (d) { return d.length; })
            .attr('y', function (d, i) { return i*20 + 16; })
            .text(function (d) { return d.length + " pages"});
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
