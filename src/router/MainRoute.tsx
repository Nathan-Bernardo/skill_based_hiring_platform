/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import { authentication } from '../Components/HiringManagerLogin/actions/Authentication';
import { Loading } from '../Components/Shared/components/Loading';
import { Nav } from '../Components/Shared/components/Nav';
import { flexColumn, stretchHeight } from '../Components/Shared/styles/shared';
import { allAccessRoutes } from './routes';

const Routes = (): JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {allAccessRoutes.map(({ component: Component, showHeader, ...routeProps }, index) => (
        <Route key={`${index.toString()}${routeProps.path}`} {...routeProps}>
          <div css={[flexColumn, stretchHeight]}>
            {showHeader && <Nav />}
            {authentication() ? <Component /> : <Redirect to="/login" />}
          </div>
        </Route>
      ))}
    </Switch>
  </Suspense>
);

const MainRoute = (): JSX.Element => (
  <Router>
    <Routes />
  </Router>
);

export default MainRoute;
