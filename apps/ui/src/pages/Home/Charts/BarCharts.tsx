import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { data } from '../dummyData'

const BarCharts = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomYAxisTick = (props: any) => {
    const { y, payload } = props
    let newNumber
    if (payload.value > 1000000000) {
      newNumber = `${(payload.value / 1000000000).toString()}B`
    } else if (payload.value > 1000000) {
      newNumber = `${(payload.value / 1000000).toString()}M`
    } else if (payload.value > 1000) {
      newNumber = `${(payload.value / 1000).toString()}K`
    } else if (payload.value === 0) {
      newNumber = `$${payload.value.toString()}`
    } else {
      newNumber = payload.value.toString()
    }

    return (
      <g transform={`translate(${0},${y})`}>
        <text x={0} y={0} textAnchor='start' fill='#FFF'>
          {newNumber}
        </text>
      </g>
    )
  }

  const renderBarChart = (
    label: string,
    dataKeys: { first: any; second?: any; third?: any },
    xaDataKey: any,
  ) => (
    <BarChart width={300} height={150} data={data}>
      <XAxis dataKey={xaDataKey} stroke='#fff' axisLine={false} tickLine={false} dy={10} />
      <YAxis
        // stroke='#fff'
        axisLine={false}
        tickLine={false}
        // tickFormatter={dataFormater}
        tick={<CustomYAxisTick />}
      />
      {/* <Tooltip /> */}

      <Bar
        radius={8}
        dataKey={dataKeys.first}
        stackId='a'
        fill='#00FF7F'
        barSize={20}
        // style={{ position: 'absolute', zIndex: 100 }}
      />
      <Bar
        radius={[8, 8, 0, 0]}
        dataKey={dataKeys.second}
        stackId='a'
        fill='#8D79F6'
        barSize={20}
        style={{ transform: `translate(0, 5px)` }}
      />
      <Bar
        radius={[8, 8, 0, 0]}
        dataKey={dataKeys.third}
        stackId='a'
        fill='#a08cfb55'
        barSize={20}
        style={{ transform: 'translate(0px, 10px)' }}
      />
    </BarChart>
  )

  return <>{renderBarChart('Gross Volume', { first: 'pv', second: 'uv', third: 'ad' }, 'name')}</>
}

export default BarCharts
