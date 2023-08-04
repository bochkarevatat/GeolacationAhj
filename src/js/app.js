// TODO: write code here
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import Timeline from './timeline.js';

const container = document.querySelector('#container');
console.log(container);
const timeline = new Timeline(container);
timeline.bindToDOM();
