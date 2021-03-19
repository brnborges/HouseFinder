import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import VacanciesMap from './pages/VacanciesMap';
import Vacancy from './pages/Vacancy';
import CreateVacancy from './pages/CreateVacancy';

function Routes() {
    return(
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={VacanciesMap} />

            <Route path="/vacancies/create" component={CreateVacancy} />
            <Route path="/vacancies/:id" component={Vacancy} />

          </Switch>

        </BrowserRouter>
    );
}

export default Routes;