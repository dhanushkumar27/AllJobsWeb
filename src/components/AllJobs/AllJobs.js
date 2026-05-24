import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import ProductCard from '../ProductCard/ProductCard'
import Profile from '../Profile/Profile'
import FilterGroup from '../FilterGroup/FilterGroup'

import './index.css'

const allProductsSections = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class AllJobs extends Component {
  state = {
    productsDetailsState: allProductsSections.initial,
    allJobDetails: [],
    searchedJob: '',
    employmentTypeList: [],
    minimunPackage: '',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({productsDetailsState: allProductsSections.inProcess})
    const {searchedJob, employmentTypeList, minimunPackage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList.join()}&minimum_package=${minimunPackage}&search=${searchedJob}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobs: data.jobs.map(eachObj => ({
          companyLogoUrl: eachObj.company_logo_url,
          employmentType: eachObj.employment_type,
          id: eachObj.id,
          jobDescription: eachObj.job_description,
          location: eachObj.location,
          packagePerAnnum: eachObj.package_per_annum,
          rating: eachObj.rating,
          title: eachObj.title,
        })),
        total: data.total,
      }

      this.setState({
        allJobDetails: updatedData,
        productsDetailsState: allProductsSections.success,
      })
    } else {
      this.setState({productsDetailsState: allProductsSections.failure})
    }
  }

  renderSuccessDetails = () => {
    const {allJobDetails} = this.state
    const jobResponse =
      allJobDetails.jobs.length > 0 ? (
        <ul className="success-unorder-list">
          {allJobDetails.jobs.map(eachJobDetails => (
            <ProductCard
              key={eachJobDetails.id}
              eachJobDetails={eachJobDetails}
            />
          ))}
        </ul>
      ) : (
        <div className="no-job-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-job-image"
          />
          <h1 className="no-job-heading">No Jobs Found</h1>
          <p className="no-job-text">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )

    return jobResponse
  }

  renderLoadingDetails = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureDetails = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="alljob-failure-heading">Oops! Something Went Wrong</h1>
      <p className="alljob-failure-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="alljob-failure-button"
        type="button"
        onClick={this.getProductDetails}
      >
        Retry
      </button>
    </>
  )

  renderProductDetails = () => {
    const {productsDetailsState} = this.state

    switch (productsDetailsState) {
      case allProductsSections.inProcess:
        return this.renderLoadingDetails()
      case allProductsSections.success:
        return this.renderSuccessDetails()
      case allProductsSections.failure:
        return this.renderFailureDetails()
      default:
        return null
    }
  }

  onChangeSearchInput = event =>
    this.setState({searchedJob: event.target.value})

  changeEmploymentType = value => {
    const {employmentTypeList} = this.state
    let updatedEmploymentTypeList = employmentTypeList
    const isIncluded = employmentTypeList.includes(value)

    if (isIncluded) {
      updatedEmploymentTypeList = employmentTypeList.filter(
        eachJob => eachJob !== value,
      )

      this.setState(
        {employmentTypeList: updatedEmploymentTypeList},
        this.getProductDetails,
      )
    } else {
      updatedEmploymentTypeList.push(value)

      this.setState(
        {employmentTypeList: updatedEmploymentTypeList},
        this.getProductDetails,
      )
    }
  }

  changeSalaryRange = value => {
    this.setState({minimunPackage: value}, this.getProductDetails)
  }

  onClickSearchButton = () => this.getProductDetails()

  render() {
    const {searchedJob} = this.state
    return (
      <div className="allJob-bg-container">
        <div className="input-main-container">
          <input
            type="search"
            placeholder="search"
            className="input-element"
            onChange={this.onChangeSearchInput}
            value={searchedJob}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="profile-container">
          <Profile />
        </div>
        <div className="FilterGroup-container">
          <FilterGroup
            onSelectemploymentType={this.changeEmploymentType}
            onSelectsalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="product-details-container">
          {this.renderProductDetails()}
        </div>
      </div>
    )
  }
}

export default AllJobs
