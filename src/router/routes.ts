import { lazy, LazyExoticComponent } from 'react';

const Dashboard = lazy(() => import('../Components/HiringManagerDashboard/components/Dashboard'));
const Login = lazy(() => import('../Components/HiringManagerLogin/components/Login'));
const JobApplicants = lazy(() => import('../Components/HiringManagerDashboard/components/JobApplicants'));
const Profile = lazy(() => import('../Components/Profile/components/Profile'));

export type Route = {
  path: string;
  exact: boolean;
  component: LazyExoticComponent<() => JSX.Element>;
  showHeader: boolean;
};

export const allAccessRoutes: Route[] = [
  {
    path: '/login',
    exact: true,
    component: Login,
    showHeader: true,
  },
  {
    path: '/',
    exact: true,
    component: Dashboard,
    showHeader: true,
  },
  {
    path: '/job/:jobId',
    exact: false,
    component: JobApplicants,
    showHeader: true,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    showHeader: true,
  },
];
