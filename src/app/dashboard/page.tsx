'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import DashboardPage from '../(dashboard)/dashboardPage';
import ProgressBar from '@/components/element/progressBar';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  // Show ProgressBar while checking authentication status
  // if (currentUser === null) {
  //   return <ProgressBar />;
  // } 

  // Render DashboardPage if currentUser exists
  if (currentUser) {
    return <DashboardPage />;
  }

  // Return null to prevent rendering anything else
  return null;
}

export default Dashboard;
