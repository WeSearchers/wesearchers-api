import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Form, Text, formState } from 'informed';
import axios from 'axios';


class LoginForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super();
    //this._onSubmit = this._onSubmit.bind(this);
    this.state = {

    }
  }

  handleUserNameChange = (event) => {
    //do smth
  }

  handlePasswordChange = (event) => {
    //do smth
  }

  /*
  const FormContent = ({ formState }) => (
    <div>
      <Text field="test" />
      <button type="submit" >Submit</button>
    </div>
  );
  */

  formSubmit = (info, submitClick) => {
    if (info.values === null || info.values === undefined ) { return; }
    const data = {
      username: info.values.username,
      password: info.values.password,
    }
    console.log(data);
    axios.post(`/api/user/login`, {data} ).then (res => {
      console.log(res);
      console.log(res.data);
    })
    //submitClick(data);
  }

  render() {
    return (
      <div>
        <h2>LOGIN STUFF</h2>
        <Form id="form-api-form">
          {({ formApi }) => (
            <div>
              <label htmlFor="form-state-name">First name:</label>
              <Text field="username" id="form-api-name" type="username" validate={null} />
              <Text field="password" id="form-api-password" type="password" />
              <button type="button" onClick={() => formApi.setValue('username', 'Joe')}>
                Set Name to "Joe"
              </button>
              <button type="button" onClick={() => formApi.setValue('username', 'Kevin')}>
                Set Name to "Kevin"
              </button>
              <button type="button" onClick={() => formApi.reset()}>
                Reset
              </button>
              <button type="submit" onClick={() => this.formSubmit(formApi.getState(), null)}>Submit</button>
            </div>
          )}
        </Form>
      </div>
    )
  }
}

export default LoginForm;