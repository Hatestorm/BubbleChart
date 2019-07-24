import * as d3 from 'd3'
import { axis, svg } from '../axis'
import { layout } from './layout'
import { tooltip } from './tooltip'
import { stringCombine } from '../data/utils'
import { initAnimate } from '../animate'
import { slider } from '../slider/index'
export const createBubble = (data) => {
  const { x, y, z, xAxis, yAxis } = axis(data)
  const { height } = layout()
  const { showTooltip, moveTooltip, hideTooltip } = tooltip()
  const node = svg.append('g').selectAll('dot')
    .data(data)
    .enter().append('g')

  node.append('circle')
    .attr('class', function (d) {
      return `circle ${stringCombine(d.sectors)}`
    })
    .attr('category', function (d) {
      return stringCombine(d.sectors)
    })
    .attr('opacity', function (d) {
      if (x(d.million) < 0) {
        return 0
      }
    }).attr('opacity', 0)
    .attr('cx', function (d) {
      return x(d.million)
    })
    .attr('cy', function (d) {
      return y(0)
    })
    .attr('r', function (d) {
      return z(0)
    })
    .style('fill', function (d) {
      var o = Math.round
      var r = Math.random
      var s = 255
      return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')'
    }).attr('data-value', function (d) {
      return z(d.million)
    })
    .attr('stroke', '#ddd')
    .attr('stroke', '#ddd')
    .on('mouseover', showTooltip)
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .on('click', function () {})

  node.append('text')
    .attr('class', 'innerText')
    .style('text-anchor', 'middle')
    .attr('opacity', 0)
    .attr('fill', 'white')
    .attr('x', function (d) {
      return x(d.million)
    })
    .attr('y', function (d) {
      return y(d.assets)
    })
    .text(function (d) {
      const t = d.sectors.substring(0, z(d.million) / 4)
      const b = t.split('')
      b.push('..')

      return b.join('')
    })
    .attr('font-size', function (d) {
      return z(d.million) / 4
    })
  slider(data, x, y, z, xAxis, yAxis)
  initAnimate(data, y, z)

  d3.select('#my_dataviz svg > g').append('line')
    .attr('x1', 0)
    .attr('y1', height - 39)
    .attr('x2', 0)
    .attr('y2', height + 1)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.1)

  d3.select('#my_dataviz svg > g').append('line')
    .attr('x1', 0)
    .attr('y1', height + 1)
    .attr('x2', 30)
    .attr('y2', height + 1)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.1)
}
