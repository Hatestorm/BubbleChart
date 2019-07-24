import * as d3 from 'd3'
import { stringCombine, totalMcCalc, covertNumber, fnum } from '../data/utils'
import { generateIndustryChart } from './industry_breakdown'
import { subCategoryPieChart } from './coin_breakdown'
import { generateSubCategoryChart } from './subcategory'
import { categoryProportion, layout } from './constant'
export const pieChart = (result, arr) => {
  const { width, height } = layout()
  const svg = d3.select('#piechart .wrapper')
    .append('svg')
    .attr('viewBox', '0 0 450 450')
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  if (result.length !== 1) {
    generateIndustryChart(result, svg)
    const ul = document.querySelector('#piechart ul')
    for (let i = 0; i < result.length; i++) {
      const li = document.createElement('li')
      li.innerHTML = `<span class='name'>${result[i].sectors}</span>
                                <span class='no'>${fnum(result[i].MC)}</span>
                                <span class='percent'>${((result[i].MC / totalMcCalc(result, 'MC')) * 100).toFixed(4) + '%'}<i></i></span>`
      ul.appendChild(li)
    }
    d3.selectAll('#piechart path').on('click', function () {
      const value = d3.select(this).attr('data-value')
      d3.selectAll('#subCategory .breakdown--list li').remove()
      d3.select('#subcategory .breakdown--list').classed('active', true)
      d3.select('#subCategory .heading p').html(`Portion of total market Cap:${((categoryProportion(value, result)[0].MC / totalMcCalc(result, 'MC')) * 100).toFixed(4) + '%'}`)

      const selectedSectors = []
      for (const i in arr) {
        arr[i].filter((element) => {
          if (stringCombine(value) === stringCombine(element.Sector_s)) {
            selectedSectors.push(element)
          }
        })
      }

      const data = selectedSectors.map((element) => {
        element['MC'] = covertNumber(element.Marketcap) // total market cap value
        return element
      })
      d3.select('#subCategory svg').remove()
      const subCategoryDiv = document.getElementById('subCategory')
      if (!subCategoryDiv.classList.contains('active')) {
        subCategoryDiv.classList.toggle('active')
      }
      subCategoryPieChart(data)
    })
  } else {
    d3.select('#piechart .breakdown--list').classed('active', true)
    d3.selectAll('#piechart .breakdown--list li').remove()
    const selectedSectors = []
    for (const i in arr) {
      arr[i].filter((element) => {
        if (stringCombine(result[0].category) === stringCombine(element.Sector_s)) {
          selectedSectors.push(element)
        }
      })
    }
    const data = selectedSectors.map((element) => {
      element['MC'] = covertNumber(element.Marketcap) // total market cap value
      return element
    })
    generateSubCategoryChart(data, svg)
    const ul = document.querySelector('#piechart .breakdown--list ul')
    for (let i = 0; i < selectedSectors.length; i++) {
      const li = document.createElement('li')
      li.innerHTML = `<span class='name'>${selectedSectors[i].Name}</span>
                    <span class='no'>${selectedSectors[i].Marketcap}</span>
                    <span class='percent'>${((selectedSectors[i].price / totalMcCalc(selectedSectors, 'price')) * 100).toFixed(4) + '%'}<i></i></span>`
      ul.appendChild(li)
    }
  }
}
