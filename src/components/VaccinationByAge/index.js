import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props

  return (
    <div className="chart-container">
      <h1 className="headings">Vaccination by Age</h1>

      <ResponsiveContainer
        width="100%"
        height={300}
        className="chart-container"
      >
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAgeList}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#5a8dee" />
            <Cell name="45-60" fill="#f54394" />
            <Cell name="Above 60" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
