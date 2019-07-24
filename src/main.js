import 'nouislider/distribute/nouislider.min.css'
import '../main.scss'
import { getChartData } from './components/data/index'
import { createChart } from './components/index'

(async () => {
  const chartData = await getChartData()
  const { outputData, piechartData, wholeData } = chartData
  createChart(outputData, piechartData, wholeData)
})()
