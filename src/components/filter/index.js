import * as d3 from 'd3'
import { filtersectorName, stringCombine } from '../data/utils'
export const filterContent = (data) => {
  const sectorsName = filtersectorName(data[0], 'Category')
  const sectorsList = document.getElementById('sectorsList')
  for (let i = 0; i < sectorsName.length; i++) {
    const li = document.createElement('li')

    li.innerHTML = `<p>${sectorsName[i]}</p>
        <label class="switch">
        <input type="checkbox" checked data-attribute='${stringCombine(sectorsName[i])}'>
        <span class="slider round">
        </span>
        </label>
        `
    sectorsList.appendChild(li)
  }
  d3.selectAll('.switch input').on('change', update)

  function update () {
    const grp = d3.select(this).attr('data-attribute')
    const radius = document.querySelector(('.' + grp)).getAttribute('data-value')
    if (!d3.select(this).property('checked')) {
      d3.selectAll('.' + grp).transition().duration(800).style('opacity', 0).attr('r', function (d) {
        return 0
      })
      d3.selectAll('.' + grp + '+ .innerText').attr('opacity', 0)
    } else {
      d3.selectAll('.' + grp).transition().duration(800).style('opacity', 1).attr('r', function (d) {
        return radius
      })
      d3.selectAll('.' + grp + '+ .innerText').attr('opacity', 1)
    }
  }
}
