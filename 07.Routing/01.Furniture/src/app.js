import page from '../../../node_modules/page/page.mjs';

import {dashboardPage} from './views/dashboard.js';
import {detailsPage} from './views/details.js';
import {createPage} from './views/create.js';
import {editPage} from './views/edit.js';
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {myPage} from './views/myFurniture.js';

import * as api from '../src/api/data.js';

api.settings.host = 'http://localhost:3030';
window.api = api;

page('/', dashboardPage);
page('/dashboard', dashboardPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/register', registerPage);
page('/login', loginPage);
page('/my-furniture', myPage);

page.start();
