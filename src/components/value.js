import * as d3 from 'd3'
import { maxX, maxDensityY } from './data/utils'
export const value = (data) => {
  // eslint-disable-next-line no-unused-vars
  const mcMaxFixed = d3.max(maxX(data))
  const mcMax = d3.max(maxX(data)) + 15900
  const mcMin = d3.min(maxX(data))
  // eslint-disable-next-line no-unused-vars
  const maxDensityFixed = d3.max(maxDensityY(data))
  const maxDensity = d3.max(maxDensityY(data)) + 50
  const minDensity = d3.min(maxDensityY(data))

  return {
    mcMax,
    mcMin,
    maxDensity,
    minDensity
  }
}
