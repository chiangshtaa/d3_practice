let myData = [100, 125, 320, 440, 500, 250, 710, 720, 320, 50, 475];
let height = 500;
let width = 500;
// let barWidth = 35;
// let barOffset = 5;

let tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('background', '#f4f4f4')
                .style('padding', '5px 15px')
                .style('border', '1px #333 solid')
                .style('border-radius', '5px')
                .style('opacity', '0')

let yScale = d3.scaleLinear()
               .domain([0, d3.max(myData)])
               .range([0, height])

let xScale = d3.scaleBand()
               .domain(d3.range(0, myData.length))
               .range([0, width])

let colors = d3.scaleLinear()
               .domain([0, myData.length])
               .range(['#90ee90', '#30c230'])

d3.select('#app').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#f4f4f4')
    .selectAll('rect')
      .data(myData)
      .enter()
      .append('rect')
        .style('fill', function(d, i) {
          return colors(i);
        })
        .attr('width', xScale.bandwidth())
        .attr('height', function(d) {
          return yScale(d);
        })
        .attr('x', function(d, i) {
          return xScale(i)
        })
        .attr('y', function(d) {
          return height - yScale(d);
        })
  .on('mouseover', function(d) {
    tooltip.transition()
           .style('opacity', 1)

    tooltip.html(d)
           .style('left', (d3.event.pageX) + 'px')
           .style('top', (d3.event.pageY) + 'px')

    d3.select(this).style('opacity', 0.5);
  })
  .on('mouseout', function(d) {
    tooltip.transition()
           .style('opacity', 0)

    d3.select(this).style('opacity', 1);
  })





















  







