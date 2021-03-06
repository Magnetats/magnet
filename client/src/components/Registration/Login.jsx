import React, { Component } from 'react'
import axios from 'axios'

import { Redirect } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import Auth from '../Protected/Auth'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      validForm: false,
      redirectToReferrer: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit() {
    const {
      username, password, validForm, redirectToReferrer,
    } = this.state
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        validForm: false,
      })
    } else {
      this.setState({
        validForm: true,
      })
      const { history } = this.props
      history.listen((e) => {
        console.log('listen to your history in login', e.pathname)
      })
      axios({
        method: 'post',
        data: {
          username, password,
        },
        url: '/api/login',
        // responseType: 'stream'
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('data back from server received in login form', response)
          console.log('this is my props from server coming back from login server endpoint', this.props)
          console.log('login state shows logged in true', this.state.redirectToReferrer)
          console.log('login true coming back from server not state', response.data.authenticated)
          console.log('what is my response status in login', response.status)
          if (response.data.authenticated) {
            Auth.authenticate(() => {
              this.setState(() => ({
                redirectToReferrer: true,
              }))
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.setState({ username: '', password: '' })
    }
  }

  render() {
    const { username, password, redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    console.log('props at top of home coming from Login', this.props)
    console.log('login state redirect shows what?', this.state.redirectToReferrer)
    console.log('login page auth state logged in?', Auth.isAuthenticated)
    // if (Auth.isAuthenticated === true) {
    //   return <Redirect to="/home" />
    // }
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    console.log('login location state then from pathname', from)
    // if (isLoggedIn) {
    //   return <Redirect to="/home" />
    // }
    return (
      <div className="ui text container">
        {/* <Prompt
          when={this.state.validForm !== true}
          message="If you leave this page you\'ll lose your data"
        /> */}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
            <Form.Button
              type="submit"
              value="Log in"
            >Log in
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default Login
