/**
 *  Example app
 **/
import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { resizeContainer} from '../../javascripts/lib/helpers'
import ListComponent from '../components/list'

const MAX_HEIGHT = 1000

class App {
  // eslint-disable-next-line no-unused-vars
  constructor (client, _appData) {
    this._client = client
    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
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
