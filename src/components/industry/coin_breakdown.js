import * as d3 from 'd3'
import { layout } from './constant'
import { totalMcCalc } from '../data/utils'
import { generateSubCategoryChart } from './subcategory'

export const subCategoryPieChart = (data) => {
  const { width, height } = layout()
  const svg = d3.select('#subCategory .wrapper')
    .append('svg')
    .attr('viewBox', '0 0 450 450')
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
  generateSubCategoryChart(data, svg)
  const ul = document.querySelector('#subCategory ul')
  for (let i = 0; i < data.length; i++) {
    const li = document.createElement('li')
    li.innerHTML = `<span class='name'>${data[i].Name}</span>
                                  <span class='no'>${data[i].Marketcap}</span>
                                  <span class='percent'>${((data[i].price / totalMcCalc(data, 'price')) * 100).toFixed(4) + '%'}<i></i></span>`
    ul.appendChild(li)
  }
}
