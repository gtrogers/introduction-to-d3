var demo = {};

demo.bindingExample = function () {
    var data = [
        'hypothesise',
        ['d','e','s','i','g','n'],
        'collect',
        'analyse',
        'validate'
    ];

    var resultsBox = d3.select('#binding-example');
    resultsBox.selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .text(function (d) {return d.length;});
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
};
