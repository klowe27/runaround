import { Runaround } from './runaround.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  var runaround = new Runaround('Kristin');
  $('#output').append(`<p>${runaround.name}</p>`);
});
