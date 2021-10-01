import { useLocation } from 'react-router-dom';

export const authentication = (): boolean => {
  const user = localStorage.getItem('user');
  const { pathname } = useLocation();
  return user !== null || pathname === '/login' ? true : false;
};
