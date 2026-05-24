import {MdLocationOn} from 'react-icons/md'
import {IoBagSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobDetails = props => {
  const {similarJobDetails} = props

  const {
    title,
    rating,
    jobDescription,
    location,
    employmentType,
    companyLogoUrl,
  } = similarJobDetails
  return (
    <li className="similar-job-card">
      <div className="similar-job-section1">
        <img
          className="similar-job-logo-image"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-title-and-rating-container">
          <h1 className="similar-job-title-heading">{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <div className="description-container">
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-description-text">{jobDescription}</p>
      </div>
      <div className="similar-job-location-and-employment_type-container">
        <div className="icon-card">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="icon-card">
          <IoBagSharp />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobDetails
