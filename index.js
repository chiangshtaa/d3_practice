let myData = [100, 125, 320, 440, 500, 250, 320, 50, 475];
let height = 500;
let width = 500;
let barWidth = 35;
let barOffset = 5;
let myChart = d3.select('#app')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('background', '#f4f4f4')
                .selectAll('rect')
                .data(myData)
                .enter()
                .append('rect')
                .style('fill', 'green')
                .attr('width', barWidth)
                .attr('height', function(d) {
                  return d;
                })
                .attr('x', function(d, i) {
                  return i * (barWidth + barOffset);
                })
                .attr('y', function(d) {
                  return height - d;
                })