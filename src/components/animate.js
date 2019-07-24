import * as d3 from 'd3'
export const initAnimate = (data, y, z) => {
  d3.selectAll('.circle').data(data).transition().duration(2500).delay(function (d, i) {
    return i * 15
  }).ease(d3.easeBack)
    .attr('r', function (d) {
      return z(d.million)
    })
    .attr('cy', function (d) {
      return y(d.assets)
    })
    .attr('opacity', 1)

  d3.selectAll('.innerText').data(data).transition().duration(500).delay(function (d, i) {
    return i * 15
  })
    .attr('fill', 'white').attr('opacity', function (d) {
      if (z(d.million) < 30) {
        return 0
      }
      return 1
    })
}

export const textMotion = (data, x, y, z) => {
  d3.selectAll('.innerText')
    .data(data)
    .transition()
    .duration(200)
    .attr('x', function (d) {
      return x(d.million)
    })
    .attr('y', function (d) {
      return y(d.assets)
    })
    .text(function (d) {
      const t = d.sectors.substring(0, z(d.million) / 4)
      const b = t.split('')
      b.push('..')

      return b.join('')
    })
    .attr('font-size', function (d) {
      return z(d.million) / 4
    })
    .attr('fill', 'white').attr('opacity', function (d) {
      if (z(d.million) < 20) {
        return 0
      }
      return 1
    })
    .attr('fill', 'white')
}
