import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

export default function Spinner({isSpinning = false}) {
    return createPortal(isSpinning ? <div className = { Styles.spinner } /> : null, portal);
}