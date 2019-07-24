import * as d3 from 'd3'
export const domEvents = () => {
  document.querySelector('.arrow--block').addEventListener('click', function (e) {
    document.querySelector('.filter--block').classList.toggle('active')
  })

  document.getElementById('close').addEventListener('click', function () {
    document.getElementById('piechart').classList.remove('active')
    d3.selectAll('#piechart .breakdown--list li').remove()
    document.getElementById('subCategory').classList.remove('active')
    d3.selectAll('#subcategory .breakdown--list li').remove()
  })
  document.querySelector('.subCate--btn').addEventListener('click', function () {
    document.getElementById('subCategory').classList.remove('active')
    d3.selectAll('#subcategory .breakdown--list li').remove()
  })
}
