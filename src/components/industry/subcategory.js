import * as d3 from 'd3'
import { layout, piechartLayout } from './constant'
import { tooltip } from '../bubble/tooltip'
export const generateSubCategoryChart = (data, svg) => {
  const { radius, color } = layout()
  d3.select('#subCategory .heading  h4').html(data[0].Sector_s)
  const { coinTooltip, moveTooltip, hideTooltip } = tooltip(data)
  const u = piechartLayout(data, svg)

  u
    .enter()
    .append('path')
    .on('mouseover', coinTooltip)
    .on('mousemove', moveTooltip)
    .on('mouseleave', hideTooltip)
    .merge(u)
    .transition()
    .duration(500)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function (d) {
      return (color(d.data.key))
    })
    .style('opacity', 1)

  u
    .exit()
    .remove()
}
