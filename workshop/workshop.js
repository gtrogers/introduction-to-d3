// put your awesome code here

vis = {};

vis.svg = d3.select('#data-vis svg');
vis.width = vis.svg.attr('width');
vis.height = vis.svg.attr('height');
vis.gridSize = 40;
vis.boxesPerRow = vis.width / vis.gridSize;
vis.offset = 4;

vis.svg.selectAll('rect').data(comics)
    .enter()
    .append('rect')
    .attr('x', function (comic, index) { return (index % vis.boxesPerRow) * vis.gridSize + vis.offset; })
    .attr('y', function (comic, index) { return parseInt(index / vis.boxesPerRow) * vis.gridSize + vis.offset; })
    .attr('width', vis.gridSize - vis.offset*2)
    .attr('height', vis.gridSize - vis.offset*2)
    .attr('fill', '#f0f0f0');

