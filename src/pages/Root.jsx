import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { checkUser } from '../redux/slices/authSlice';
import Spinner from '../components/UI/Spinner';

export default function RootLayout() {
  const dispatch = useDispatch();
  const isAuthChecking = useSelector((state) => state.auth.isAuthChecking);

  useEffect(() => {
    console.log('Checking user...');
    dispatch(checkUser()).then(() => {
      console.log('User check completed');
    });
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-dark/10  text-primary-foreground font-sans">
      <MainNavigation className="max-w-6xl mx-auto" />
      <main className="pt-16">{isAuthChecking ? <Spinner /> : <Outlet />}</main>
    </div>
  );
}
