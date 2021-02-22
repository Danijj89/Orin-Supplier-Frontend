import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '../features/shared/components/AppRoute.js';
import { MuiThemeProvider, } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import appTheme from './themes/theme.js';
import NotFound from '../features/shared/components/NotFound.js';
import HomeContainer from '../features/home/HomeContainer.js';
import LoginContainer from 'app/LoginContainer.js';
import {initGA, PageView} from 'app/utils/helpers'

initGA();
PageView();

export default function App() {

    return (
        <MuiThemeProvider theme={ appTheme }>
            <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                <Switch>
                    <Route exact path={ ['/', '/login'] }>
                        <LoginContainer />
                    </Route>
                    <Route path='/home'>
                        <HomeContainer/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}


