import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {eachJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobDetails

  return (
    <li className="job-list-container">
      <Link to={`/jobs/${id}`} className="job-card-container">
        <div className="job-card-section1">
          <div className="job-card-company-details">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="job-title-and-rating-card">
              <h1 className="jobcard-heading">{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div className="job-location-type-package-container">
            <div className="job-location-and-employmentType-details-card">
              <p className="job-location">{location}</p>
              <p className="job-employmentType">{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line-job-details" />
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default ProductCard
