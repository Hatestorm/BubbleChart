import * as d3 from 'd3'
import { processData } from './processdata'
import { categoryProportion } from './constant'
export const createIndustryChart = (data, pieChartData, wholeData) => {
  d3.selectAll('.circle').on('click', function () {
    const value = d3.select(this).attr('category')
    d3.select('.breakdown--list').classed('active', false)
    d3.selectAll('#piechart .breakdown--list li').remove()
    d3.select('.heading p').html(`Portion of total market Cap:${categoryProportion(value, data)[0].proportion}`)

    processData(value, data, pieChartData, wholeData)
  })
}
