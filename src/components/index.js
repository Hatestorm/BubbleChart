import { createBubble } from './bubble/plugin'
import { createIndustryChart } from './industry'
import { domEvents } from './dom'
import { filterContent } from './filter'

export const createChart = (data, piecharData, wholeData) => {
  // brushZoom(data)
  createBubble(data)
  createIndustryChart(data, piecharData, wholeData)
  domEvents()
  filterContent(wholeData)
}
