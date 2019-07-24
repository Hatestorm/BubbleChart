import * as d3 from 'd3'
import { svg } from '../axis'
import { layout } from '../bubble/layout'
import { textMotion } from '../animate'
import { value } from '../value'

export const sliderY = (data, x, y, z, xAxis, yAxis) => {
  const { maxDensity } = value(data)
  const { width, height } = layout()
  const yBrush = d3.scaleLinear()
    .domain([0, maxDensity])
    .range([height, 0])
  const brushY = d3.brushY()
    .extent([[0, 0], [20, height]])
    .on('brush', brushedY)
  const brushgY = svg.append('g')
    .attr('class', 'brush')
    .attr('transform', 'translate(' + (width - 0) + ',' + (0) + ')')
    .call(brushY)
  let tempMin
  let tempMax
  function brushedY () {
    const range = d3.brushSelection(this)
      .map(yBrush.invert)
    if (Math.round(range[0]) !== Math.round(range[1])) {
      y.domain([Math.round(range[1]), Math.round(range[0])])
      tempMin = range[1]
      tempMax = range[0]
    } else {
      y.domain([tempMin, tempMax])
    }

    yAxis.transition().duration(200).call(d3.axisLeft(y))
    // Update chart
    textMotion(data, x, y, z)
    d3.selectAll('.circle')
      .data(data)
      .transition()
      .duration(200)
      .attr('cx', function (d) {
        return x(d.million)
      })
      .attr('cy', function (d) {
        return y(d.assets)
      })
  }
  brushY.move(brushgY, [maxDensity, 0].map(yBrush))
}
