import 'angular';
import 'angular-route';
import './index.scss';
import config from './config';
import appServices from './services.js';
import appFilters from './filters.js';
import addEditController from './components/addEditForm/addEditForm.ctrl.js';
import mainController from './components/main/main.ctrl.js';

angular.module('todoApp', ['ngRoute', 'todoApp.services', 'todoApp.filters'])
    .config(config)
    .controller('mainController', mainController)
    .controller('addEditController', addEditController);
