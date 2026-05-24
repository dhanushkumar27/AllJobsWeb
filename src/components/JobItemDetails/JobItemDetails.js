import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdLocationOn} from 'react-icons/md'
import {IoBagSharp} from 'react-icons/io5'

import Header from '../Header/Header'
import SimilarJobDetails from '../SimilarJobDetails/SimilarJobDetails'

import './index.css'

const productView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class JobItemDetails extends Component {
  state = {
    productDetails: [],
    productResponse: productView.initial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({productResponse: productView.inProcess})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
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
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          employmentType: data.job_details.employment_type,
          companyWebsiteUrl: data.job_details.company_website_url,

          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          skills: data.job_details.skills.map(eachObj => ({
            imageUrl: eachObj.image_url,
            name: eachObj.name,
          })),
        },
        similarJobs: data.similar_jobs.map(eachSemilarObj => ({
          companyLogoUrl: eachSemilarObj.company_logo_url,
          employmentType: eachSemilarObj.employment_type,
          id: eachSemilarObj.id,
          jobDescription: eachSemilarObj.job_description,
          location: eachSemilarObj.location,
          rating: eachSemilarObj.rating,
          title: eachSemilarObj.title,
        })),
      }

      this.setState({
        productDetails: updatedData,
        productResponse: productView.success,
      })
    } else {
      this.setState({productResponse: productView.failure})
    }
  }

  renderJobDetails = () => {
    const {productDetails} = this.state

    const {jobDetails} = productDetails

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <div className="jobItemDetails-details-container">
          <div className="job-card-company-details">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="job-title-and-rating-card">
              <h1 className="jobItemDetails-job-title">{title}</h1>
              <div>
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-type-package-container">
            <div className="job-location-and-employmentType-details-card">
              <div className="icon-card">
                <MdLocationOn />
                <p className="job-location">{location}</p>
              </div>
              <div className="icon-card">
                <IoBagSharp />
                <p className="job-employmentType">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="horizontal-line-job-details" />

        <div className="jobItemDetails-description-container">
          <div className="description-and-vist-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} rel="noreferrer" target="_blank">
              Visit
            </a>
          </div>
          <p className="description-text">{jobDescription}</p>
        </div>

        <div className="jobItemDetails-skills-container">
          <h1 className="jobItemDetails-skills-heading">Skills</h1>
          <ul className="jobItemDetails-skills-unorder-container">
            {skills.map(eachObj => (
              <li className="skill-item" key={eachObj.name}>
                <img
                  src={eachObj.imageUrl}
                  alt={eachObj.name}
                  className="skill-image"
                />
                <p>{eachObj.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="jobItemDetails-lifeAtCompany-container">
          <h1>Life at Company</h1>
          <div className="lifeAtCompany-container">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
      </>
    )
  }

  renderSuccess = () => {
    const {productDetails} = this.state
    const {similarJobs} = productDetails
    return (
      <div className="jobitem-success-container">
        {this.renderJobDetails()}
        <div className="similar-job-details-container">
          <h1 className="similar-jobs-main-heading">Similar Jobs</h1>
          <ul className="similar-job-container">
            {similarJobs.map(similarjobItem => (
              <SimilarJobDetails
                key={similarjobItem.id}
                similarJobDetails={similarjobItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getProductDetails}>
        Retry
      </button>
    </>
  )

  renderProductDetails = () => {
    const {productResponse} = this.state

    switch (productResponse) {
      case productView.inProcess:
        return this.renderLoading()
      case productView.success:
        return this.renderSuccess()
      case productView.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
