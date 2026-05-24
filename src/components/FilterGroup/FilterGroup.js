import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterGroup extends Component {
  state = {selectedSalaryRange: '', selectedEmploymentTypeIds: ''}

  onChangeEmploymentType = event => {
    const {onSelectemploymentType} = this.props

    onSelectemploymentType(event.target.id)
    this.setState({selectedEmploymentTypeIds: event.target.id})
  }

  onChangeSalaryRange = event => {
    const {onSelectsalaryRange} = this.props
    onSelectsalaryRange(event.target.id)
    this.setState({selectedSalaryRange: event.target.id})
  }

  render() {
    const {selectedSalaryRange} = this.state
    return (
      <div className="filterGroup-container">
        <div className="jobs-filter-container">
          <h1 className="job-filter-heading">Type of Employment</h1>
          <ul className="filter-list-container">
            {employmentTypesList.map(eachItem => (
              <li key={eachItem.employmentTypeId}>
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  className="checkbox-input"
                  onChange={this.onChangeEmploymentType}
                  name="employmentType"
                />
                <label htmlFor={eachItem.employmentTypeId}>
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="jobs-filter-container">
          <h1 className="job-filter-heading">Salary Range</h1>
          <ul className="filter-list-container">
            {salaryRangesList.map(eachItem => (
              <li key={eachItem.salaryRangeId}>
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  className="checkbox-input"
                  name="salaryRange"
                  checked={selectedSalaryRange === eachItem.salaryRangeId}
                  onChange={this.onChangeSalaryRange}
                />
                <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterGroup
