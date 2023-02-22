import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiViewStatus = {
  initial: 'INITIAL',
  succesS: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
    apiStatus: apiViewStatus.initial,
  }

  componentDidMount() {
    this.getCovidIndiaData()
  }

  getCovidIndiaData = async () => {
    this.setState({apiStatus: apiViewStatus.loading})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const last7DaysVaccinationList = data.last_7_days_vaccination
      const vaccinationByAgeList = data.vaccination_by_age
      const vaccinationByGenderList = data.vaccination_by_gender
      this.setState({
        last7DaysVaccinationList,
        vaccinationByAgeList,
        vaccinationByGenderList,
        apiStatus: apiViewStatus.success,
      })
    } else {
      this.setState({apiStatus: apiViewStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {
      last7DaysVaccinationList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state
    return (
      <>
        <VaccinationCoverage
          last7DaysVaccinationList={last7DaysVaccinationList}
        />
        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />
        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </>
  )

  render() {
    const {apiStatus} = this.state

    let viewToBeRender

    switch (apiStatus) {
      case apiViewStatus.success:
        viewToBeRender = this.renderSuccessView()
        break
      case apiViewStatus.failure:
        viewToBeRender = this.renderFailureView()
        break
      case apiViewStatus.loading:
        viewToBeRender = this.renderLoadingView()
        break
      default:
        break
    }

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="app-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          <div className="view-container">{viewToBeRender}</div>
        </div>
      </div>
    )
  }
}
export default CowinDashboard
