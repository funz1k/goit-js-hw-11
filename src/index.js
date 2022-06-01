import './css/styles.css';
import Notiflix, { Loading } from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
var debounce = require('lodash.debounce');
import fetchCountry from './API';
import baseCountryTpl from "./templates/baseCounty.hbs";
import fullCountryTpl from "./templates/fullCountry.hbs";

const DEBOUNCE_DELAY = 300;

const refs = {

}

