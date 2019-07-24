import { sliderX } from './slider_x'
import { sliderY } from './slider_y'

export const slider = (data, x, y, z, xAxis, yAxis) => {
  sliderX(data, x, y, z, xAxis, yAxis)
  sliderY(data, x, y, z, xAxis, yAxis)
}
