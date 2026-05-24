import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileSections = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Profile extends Component {
  state = {userProfile: '', profileState: profileSections.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileState: profileSections.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
        profileDetails: {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
      }
      this.setState({
        userProfile: updatedData,
        profileState: profileSections.success,
      })
    } else {
      this.setState({profileState: profileSections.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessProfileDetails = () => {
    const {userProfile} = this.state
    const {profileDetails} = userProfile
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailure = () => (
    <>
      <button
        className="retry-profile"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </>
  )

  renderProfileDetails = () => {
    const {profileState} = this.state
    switch (profileState) {
      case profileSections.inProcess:
        return this.renderLoading()
      case profileSections.success:
        return this.renderSuccessProfileDetails()
      case profileSections.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileDetails()
  }
}

export default Profile
