import React, { Component } from 'react'
import BaseComponent from './BaseComponent'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'
import Auth from './lib/Auth';
import PasswordMask from 'react-password-mask';

const auth = new Auth()

class LoginForm extends BaseComponent {

  componentDidMount() {
    let loggedIn = auth.checkUserLoggedIn().then(function(data){
      this.setState({
        'loggedIn': data.signed_in
      })
    }.bind(this));
  }

  handleSubmit(e) {
    let password = document.getElementById('password-field').value
    let email = document.getElementById('email-field').value
    auth.login(email, password).then(function(data) {
      this.setState({
        'loggedIn': false,
        'error': "Incorrect email/password combination."
      })
    }.bind(this))
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
            <Form.Field>
              { this.state && <div>
                                { this.state.error }
                            </div>
              }
            </Form.Field>

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
