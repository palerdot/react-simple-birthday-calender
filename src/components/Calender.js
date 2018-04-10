// main calender component
// holds all the state
import React from 'react'

import _ from 'lodash'

import moment from 'moment'

import { 
  Container, Row, Col,
  Button,
  Card, CardBody, CardTitle, 
  FormGroup, Input, Label,
} from 'reactstrap'

import Birthday from './Birthday'

// import static data
import birthday_data from '../data/birthdays'

class Calender extends React.Component {

  // START: Lifecycle methods
  constructor(props) {
    super(props)
    // set the state
    this.state = {
      birthdays: [],
      year: "2011"
    }
  }

  componentDidMount() {
    this.setState({
      birthdays: birthday_data
    })
  }
  // END: Lifecycle methods
  
  // helper function to get day from index
  _getDayfromIndex(index) {
    switch (index) {
      case 1:
        return "Mon"
      case 2:
        return "Tue"
      case 3:
        return "Wed"
      case 4:
        return "Thu"
      case 5:
        return "Fri"
      case 6:
        return 'Sat'
      case 7:
        return 'Sun'
      default:
        return ''
    }
  }

  // converts name to initials
  _convertNameToInitials(name) {
    return _.map(_.split(name, ' '), (n) => _.upperCase(n[0]))
  }

  // helper function to render birthdays
  _renderBirthdays(day_index) {
    
    let birthdays = _.filter(this.state.birthdays, (info) => {

      let splitted = info.birthday.split("/")

      let month = splitted[0]
      let day = splitted[1]
      let year = splitted[2]

      // construct the moment from the date and get iso week day
      let iso_week_day = moment(year + "-" + month + "-" + day).isoWeekday()

      return year === this.state.year && iso_week_day === day_index
    })

    let dom = document.getElementById("day-of-week-" + day_index)

    // let us wait for the dom to be rendered
    if (!dom) {
      return null
    }
    // calculate square dimensions
    let sq = this._calculateSquareDimensions(birthdays.length)
    let dimension = (dom.offsetWidth)/sq

    return _.map(birthdays, (b, index) => (
      <Birthday
        key={this._convertNameToInitials(b.name)} 
        name={this._convertNameToInitials(b.name)}
        dimension={dimension}
      />
    ))
  }

  // helper function to render days of week boilerplay
  _renderDaysofWeek() {
    return _.map([1, 2, 3, 4, 5, 6, 7], (i) => (
      <Card className={"day-of-week "} key={i}>
        <CardBody>
          <CardTitle className="day-header">{this._getDayfromIndex(i)}</CardTitle>
          <div
            id={"day-of-week-" + i}
            className={"birthday-display-holder " + (_.isEmpty(this._renderBirthdays(i)) ? 'day--empty' : '')}
          >
            {this._renderBirthdays(i)}
          </div>
        </CardBody>
      </Card>
    ))
  }

  // calculate square dimensions
  // find the closes square number
  _calculateSquareDimensions(num) {
    let dimension = 1
    
    while (square(dimension) < num) {
      dimension++
    }

    return dimension

    function square(n) {
      return n * n
    }
  }

  // updates birthday info
  // throws error if needed
  _updateBirthDayInfo = () => {
    // set the state
    // NOTE: we are assuming valid input for now
    this.setState({
      year: this.year_input_dom.value
    })
  }

  // END: helper functions 

  render() {
    return (
      <Container fluid>
        <div className="calender-holder">
          {this._renderDaysofWeek()}
        </div>
        <hr />
        <Row>
          <Col xs="8">
            <FormGroup>
              <Label for="exampleText">Birthdays JSON</Label>
              {/* <Alert color="warning">Data is loaded statically from src/data/birthdays.js</Alert> */}
              <div>
                Data is loaded statically from <code>src/data/birthdays.js</code>
              </div>
            </FormGroup>
          </Col>
          <Col xs="4">
            <FormGroup>
              <Label for="exampleText">Year</Label>
              <Input type="text" name="birthYear" id="birthYear" 
                innerRef={(text_input) => this.year_input_dom = text_input}
                defaultValue={this.state.year}
              />
            </FormGroup>
            <div>
              <Button color="primary"
                onClick={this._updateBirthDayInfo}
              >UPDATE</Button>{' '}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Calender