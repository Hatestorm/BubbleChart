import * as d3 from 'd3'
import { stringCombine } from '../data/utils'
export const layout = () => {
  const width = 450
  const height = 450
  const margin = 40
  const radius = Math.min(width, height) / 2 - margin
  const color = d3.scaleOrdinal()
    .domain(['a', 'b', 'c', 'd', 'e'])
    .range(['#4f81f0', '#6d96f3', '#7ba1f4', '#9ab6f6', '#e2eafc'])

  return {
    width,
    height,
    margin,
    radius,
    color
  }
}

export const categoryProportion = (value, data) => {
  const result = data.filter((element) => {
    return stringCombine(value) === stringCombine(element.sectors)
  })
  return result
}

export const piechartLayout = (data, svg) => {
  const pie = d3.pie()
    .value(function (d) {
      return d.value.MC
    })
    .sort(function (a, b) {
      return d3.ascending(a.key, b.key)
    })
  const dataReady = pie(d3.entries(data))
  // map to data
  const u = svg.selectAll('path')
    .data(dataReady)
  return u
}
