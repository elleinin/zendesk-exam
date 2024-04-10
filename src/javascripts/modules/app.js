/**
 *  Example app
 **/
import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { UnorderedList } from '@zendeskgarden/react-typography'
import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, escapeSpecialChars as escape} from '../../javascripts/lib/helpers'
import { getTickets } from '../lib/actions'
import ListComponent from '../components/list'
import { ToggleButton } from '@zendeskgarden/react-buttons';


const MAX_HEIGHT = 1000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}

// note: I structured my components as functional components but the boilerplate app is a class component - something to learn more about

class App {
  constructor (client, _appData) {
    this._client = client
    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  // state = {
  //   tickets: [],
  //   isDefaultSort: true
  // }

  /**
   * Initialize module, render main template
   */
  async init () {
    // this.state.tickets = (await getTickets(this._client)).results
    // console.log(this.state.tickets)

    const appContainer = document.querySelector('.main')
    const client = this._client

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <Grid>
          <Row>
            <Col data-test-id='sample-app-description'>
              View all tickets from customer below
            </Col>
          </Row>
          <Row>
            <Col>
              <ListComponent client={client}
              />
            </Col>
          </Row>
        </Grid>
      </ThemeProvider>,
      appContainer
    )
    return resizeContainer(this._client, MAX_HEIGHT)
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App
