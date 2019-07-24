import * as d3 from 'd3'
import { processData } from './utils'
export const getChartData = async () => {
  const data = await d3.csv('assets/data/data-category.csv').then((data) => {
    const res = processData(data)
    return res
  })
  return data
}
