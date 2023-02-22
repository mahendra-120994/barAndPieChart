import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccinationList} = props

  return (
    <div className="chart-container">
      <h1 className="headings">Vaccination Coverage</h1>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={last7DaysVaccinationList} margin={{top: 5}}>
          <XAxis
            dataKey="vaccine_date"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
            iconType="square"
            layout="horizontal"
          />
          <Bar
            dataKey="dose_1"
            name="Dose 1"
            fill="#2d87bb"
            barSize="20%"
            radius={5}
          />
          <Bar
            dataKey="dose_2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            radius={5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
