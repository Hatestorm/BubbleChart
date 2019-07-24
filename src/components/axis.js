import * as d3 from 'd3'
import { layout } from './bubble/layout'
import { fnum } from './data/utils'
import { textMotion } from './animate'
import { value } from './value'

const { width, height, margin } = layout()
export const svg = d3.select('#my_dataviz')
  .append('svg')
  .attr('viewBox', '0 0 1000 400')
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')')
var x, y, z, yAxis, xAxis
const xScale = d3.scalePow().exponent(0.5)
const zscale = d3.scalePow().exponent(0.5)

export const axis = (data) => {
  const { mcMax, maxDensity, mcMin } = value(data)
  z = zscale
    .domain([0, mcMax])
    .range([3, 50])
  x = xScale
    .domain([mcMin, mcMax])
    .range([20, width - 30])

  xAxis = svg.append('g').attr('class', 'axis-line')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickFormat(function (d) {
      return fnum(d * 1000000)
    }).ticks())

  y = d3.scaleLinear()
    .domain([1, maxDensity + 50])
    .range([height - 40, 0])

  yAxis = svg.append('g').attr('class', 'axis-line')

  return {
    x,
    y,
    z,
    xAxis,
    yAxis
  }
}

export const brushZoom = (data) => {
  const brush = d3.brush().extent([[0, 0], [width, height]]).on('end', brushended)
  svg.append('defs').append('svg:clipPath')
    .attr('id', 'clip')
    .attr('pointer-events', 'none')
    .append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)

  var scatter = svg.append('g')
    .attr('id', 'scatterplot')
    .attr('pointer-events', 'none')
    .attr('clip-path', 'url(#clip)')

  scatter.append('g')
    .attr('class', 'brushZoom')
    .attr('pointer-events', 'none')
    .call(brush)

  function brushended () {
    var s = d3.event.selection

    if (!s) {
    } else {
      x.domain([s[0][0], s[1][0]].map(x.invert, x))
      y.domain([s[1][1], s[0][1]].map(y.invert, y))
      scatter.select('.brushZoom').call(brush.move, null)
    }
    zoom()
  }
  const zoom = () => {
    var t = scatter.transition().duration(750)
    xAxis.transition(t).call(d3.axisBottom(x).tickFormat(function (d) {
      return fnum(d * 1000000)
    }))
    yAxis.transition(t).call(d3.axisLeft(y))
    d3.selectAll('circle').transition(t)
      .attr('cx', function (d) { return x(d.million) })
      .attr('cy', function (d) { return y(d.assets) })
      .attr('r', function (d) {
        if (z(d.million) > 0) {
          return z(d.million)
        }
      })
    textMotion(data, x, y, z)
  }
}
