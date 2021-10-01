import { lazy, LazyExoticComponent } from 'react';

const Dashboard = lazy(() => import('../Components/HiringManagerDashboard/components/Dashboard'));
const Login = lazy(() => import('../Components/HiringManagerLogin/components/Login'));
const JobApplicants = lazy(() => import('../Components/HiringManagerDashboard/components/JobApplicants'));
const BuildProfile = lazy(() => import('./../Components/CanidateAccount/BuildProfile'));

export type Route = {
  path: string;
  exact: boolean;
  component: LazyExoticComponent<() => JSX.Element>;
  showHeader: boolean;
};

export const allAccessRoutes: Route[] = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
    showHeader: true,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    showHeader: true,
  },
  {
    path: '/job/:jobId',
    exact: false,
    component: JobApplicants,
    showHeader: true,
  },
  {
    path: '/signup',
    exact: true,
    component: BuildProfile,
    showHeader: true,
  },
];
