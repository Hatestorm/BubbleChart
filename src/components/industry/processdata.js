import * as d3 from 'd3'
import { stringCombine, covertNumber, filtersectorName, totalMc } from '../data/utils'
import { pieChart } from './piechart'

export const processData = (value, data, req, wholeData) => {
  let result

  for (const i in req) {
    if (value === stringCombine(i)) {
      result = req[i]
    }
  }

  for (const i in result) {
    result[i]['price'] = covertNumber(result[i].Marketcap)
  }
  const sectorsName = filtersectorName(result, 'Sector_s')

  const tempResult = {}

  for (let i = 0; i < sectorsName.length; i++) {
    var output1 = wholeData[0].filter((element, index) => {
      return element.Sector_s.toLowerCase() === sectorsName[i]
    })
    tempResult[sectorsName[i]] = output1
  }
  const outpResult = []
  for (const i in tempResult) {
    const obj = {}

    obj['category'] = tempResult[i][0].Category
    obj['sectors'] = i
    obj['assets'] = tempResult[i].length
    obj['MC'] = totalMc(tempResult[i], 'Marketcap')
    obj['proportion'] = tempResult[i][0].proportion

    outpResult.push(obj)
  }

  d3.select('#piechart svg').remove()

  const pieDiv = document.getElementById('piechart')

  if (!pieDiv.classList.contains('active')) {
    pieDiv.classList.toggle('active')
  }
  pieChart(outpResult, req)
}
