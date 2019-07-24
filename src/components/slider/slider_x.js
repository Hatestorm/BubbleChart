import * as d3 from 'd3'
import { svg } from '../axis'
import { layout } from '../bubble/layout'
import { fnum } from '../data/utils'
import { textMotion } from '../animate'
import { value } from '../value'

export const sliderX = (data, x, y, z, xAxis, yAxis) => {
  const { mcMax, mcMin } = value(data)
  const { width } = layout()
  const xBrush = d3.scalePow().exponent(0.5)
    .domain([mcMin, mcMax])
    .range([0, width - 30])

  const brushX = d3.brushX()
    .extent([[0, -30], [width - 30, -10]])
    .on('brush', brushedX)
  const brushg = svg.append('g')
    .attr('class', 'brush')
    .call(brushX)
  let tempMin
  let tempMax
  function brushedX () {
    const range = d3.brushSelection(this)
      .map(xBrush.invert)

    if (Math.round(range[0]) !== Math.round(range[1])) {
      z.domain([Math.round(range[0]), Math.round(range[1])])
        .range([3, 50])
      x.domain([range[0], range[1]])
      tempMin = range[0]
      tempMax = range[1]
    } else {
      z.domain([tempMin, tempMax])
        .range([3, 50])
      x.domain([tempMin, tempMax])
    }
    xAxis.transition().duration(200).call(d3.axisBottom(x).tickFormat(function (d) {
      return fnum(d * 1000000)
    }))

    textMotion(data, x, y, z)
    d3.selectAll('.circle')
      .data(data)
      .transition()
      .duration(200)
      .attr('r', function (d) {
        if (z(d.million) > 0) {
          return z(d.million)
        }
      }).attr('data-value', function (d) {
        return z(d.million)
      })
      .attr('cx', function (d) {
        return x(d.million)
      })
      .attr('cy', function (d) {
        return y(d.assets)
      })
  }
  brushX.move(brushg, [mcMin, mcMax].map(xBrush))
}
