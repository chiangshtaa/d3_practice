// let myData = [100, 125, 320, 440, 500, 250, 710, 720, 320, 50, 475, 1000];

let myData = [];
let dataCount = 50;

for (let i = 0; i < dataCount; i++) {
  myData.push(Math.round(Math.random() * 1000));
}

let margin = {
  top: 30,
  right: 30,
  bottom: 40,
  left: 50
}

let height = 500 - margin.top - margin.bottom;
let width = 500 - margin.left - margin.right;
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

let myChart = d3.select('#app').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', '#f4f4f4')
    // this group element shifts each element in the bar graph over
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('rect')
      .data(myData)
      .enter()
      .append('rect')
        .style('fill', function(d, i) {
          return colors(i);
        })
        .attr('width', xScale.bandwidth())
        // .attr('height', function(d) {
        //   return yScale(d);
        // })
        .attr('x', function(d, i) {
          return xScale(i)
        })
        .attr('y', function(d) {
          return height// - yScale(d);
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

let animationDuration = 700;
let delayDuration = 30;

myChart.transition()
       .attr('height', function(d) {
         return yScale(d);
       })
       .attr('y', function(d) {
         return height - yScale(d);
       })
       .duration(animationDuration)
       .delay(function(d, i) {
         return i * delayDuration;
       })
       .ease(d3.easeBounce)
       // .ease(d3.easeElastic)


// axis and guides

// vertical scale
let vScale = d3.scaleLinear()
               .domain([0, d3.max(myData)])
               .range([height, 0])

// horizontal scale
let hScale = d3.scaleBand()
               .domain(d3.range(0, myData.length))
               .range([0, width])

// V Axis
let vAxis = d3.axisLeft()
              .scale(vScale)
              .ticks(5)
              .tickPadding(5)

// V Guide
var vGuide = d3.select('svg')
                .append('g') // group element
                  .attr('transform', `translate(${margin.left}, ${margin.top})`)                  
                    .call(vAxis);
                  // .vAxis(vGuide)
                  // vGuide.attr('transform', 'translate(35, 10)')
                  // vGuide.selectAll('path')
                  //   .style('fill', 'none')
                  //   .style('stroke', '#000')
                  // vGuide.selectAll('line')
                  //   .style('stroke', '#000')

// H Axis
let hAxis = d3.axisBottom()
              .scale(hScale)
              .tickValues(hScale.domain().filter(function(d, i) {
                // console.log(myData.length);
                console.log(Math.floor((i % (myData.length / 6))));
                return !Math.floor((i % (myData.length / 10)));
                // return !(i % (myData.length / 6));
              }))
              // .tickPadding(5);

// H Guide
var hGuide = d3.select('svg')
                .append('g') // group element
                  .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
                  .call(hAxis);

























