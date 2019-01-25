let myData = [100, 125, 320, 440, 500, 250, 710, 720, 320, 50, 475];
let height = 500;
let width = 500;
// let barWidth = 35;
// let barOffset = 5;

let yScale = d3.scaleLinear()
               .domain([0, d3.max(myData)])
               .range([0, height])

let xScale = d3.scaleBand()
               .domain(d3.range(0, myData.length))
               .range([0, width])


d3.select('#app')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#f4f4f4')
  .selectAll('rect')
  .data(myData)
  .enter()
  .append('rect')
  .style('fill', 'green')
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