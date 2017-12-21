import React, { Component } from 'react'
import BaseComponent from './BaseComponent'
import { Message, Button, Checkbox, Form, Container } from 'semantic-ui-react'
import Auth from './actions/Auth';
import UserStore from './stores/UserStore';
import PasswordMask from 'react-password-mask';

class LoginForm extends BaseComponent {

  componentDidMount() {
    UserStore.addChangeListener(this.onChange.bind(this))
    let loggedIn = Auth.checkUserLoggedIn().then(
      function(data){
        this.setState({
          'loggedIn': data.signed_in
        })
      }.bind(this)
    );
  }

  onChange() {
    this.setState({
      'loggedIn': UserStore.isAuthenticated()
    })
  }

  handleSubmit(e) {
    let password = document.getElementById('password-field').value
    let email = document.getElementById('email-field').value
    Auth.login(email, password)
  }

  render() {
    if (this.state && this.state['loggedIn'] == true) {
      return(
        <div classnames='flash flash-message alert alert-info'>
          <h2> Logged In! </h2>
        </div>
      )
    } else {

      return(
        <Container>
          <h2> Log in </h2>
          <Form onSubmit={ this.handleSubmit.bind(this) }>
              { this.state && this.state.error && <Message>
                                                    { this.state.error }
                                                </Message>
              }
            <Form.Field>
              <label>Email</label>
              <input id='email-field' placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <PasswordMask
                id="password-field"
                name="password"
                placeholder="Enter password"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Login</Button>
          </Form>
        </Container>
      )

    }
  }
}

export default LoginForm
