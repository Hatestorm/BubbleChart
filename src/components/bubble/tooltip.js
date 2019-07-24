import * as d3 from 'd3'
import { totalMcCalc, fnum } from '../data/utils'
export const tooltip = (result) => {
  const dataDiv = document.getElementById('my_dataviz')
  const dynamic = {
    x: dataDiv.clientX,
    y: dataDiv.clientY
  }
  const eventList = ['touchstart', 'mousemove']
  eventList.forEach(function (e) {
    dataDiv.addEventListener(e, function (event) {
      dynamic.x = event.clientX - this.offsetLeft
      dynamic.y = event.clientY - this.offsetTop
    })
  })
  const tooltip = d3.select('#my_dataviz')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')

  const showTooltip = function (d) {
    tooltip.transition().duration(200)
    tooltip.classed('active', true)
    tooltip.style('opacity', 1).html(`<p>Sectors: ${d.sectors} </p><p>MC: ${d.amount} </p><p>Proportion: ${d.proportion} </p><p>Assets: ${d.assets} </p>`)
      .style('left', (dynamic.x + 30) + 'px')
      .style('top', (dynamic.y + 0) + 'px')
  }
  const moveTooltip = function (d) {
    tooltip.classed('active', true)
    tooltip.style('left', (dynamic.x + 30) + 'px')
      .style('top', (dynamic.y + 0) + 'px')
  }
  const hideTooltip = function (d) {
    tooltip.classed('active', false)
    tooltip.transition().duration(200)
      .style('opacity', 0)
  }
  const industryTooltip = function (d) {
    tooltip.transition().duration(200)
    tooltip.classed('active', true)
    tooltip.style('opacity', 1).html(`<p>Sectors: ${d.data.value.sectors} </p><p>MC: ${fnum(d.data.value.MC)} </p>
    <p>#assets: ${d.data.value.assets} </p>
    <p>Proportion:${(d.data.value.MC / totalMcCalc(result, 'MC') * 100).toFixed(2) + '%'}`)
      .style('left', (dynamic.x + 30) + 'px')
      .style('top', (dynamic.y + 0) + 'px')
  }
  const coinTooltip = function (d) {
    tooltip.transition().duration(200)
    tooltip.classed('active', true)
    tooltip.style('opacity', 1).html(`<p>Name: ${d.data.value.Name} </p><p>MC: ${fnum(d.data.value.MC)} </p>
        <p>Proportion:${(d.data.value.MC / totalMcCalc(result, 'MC') * 100).toFixed(2) + '%'}`)
      .style('left', (dynamic.x + 30) + 'px')
      .style('top', (dynamic.y + 0) + 'px')
  }
  return {
    showTooltip,
    moveTooltip,
    hideTooltip,
    industryTooltip,
    coinTooltip
  }
}
