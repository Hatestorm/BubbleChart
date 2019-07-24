import * as d3 from 'd3'
import { stringCombine } from '../data/utils'
import { layout, piechartLayout } from './constant'
import { tooltip } from '../bubble/tooltip'
export const generateIndustryChart = (result, svg) => {
  const { radius, color } = layout()
  d3.select('.heading  h4').html(result[0].category)
  const { industryTooltip, moveTooltip, hideTooltip } = tooltip(result)
  const u = piechartLayout(result, svg)
  u
    .enter()
    .append('path')
    .attr('data-value', function (d) {
      return `${stringCombine(d.data.value.sectors)}`
    })
    .on('mouseover', industryTooltip)
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

  // remove the group that is not present anymore
  u
    .exit()
    .remove()
}
