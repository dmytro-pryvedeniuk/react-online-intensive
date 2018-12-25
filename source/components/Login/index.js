import React, { Component } from 'react';
import { func } from 'prop-types';
import Styles from './styles.m.css';

const Login = ({ logIn }) => {
    return (
        <button
            className = { Styles.login }
            onClick = { logIn }>
            Log in
        </button>
    );
};

Login.propTypes = {
    logIn: func.isRequired,
};

export default Login;
