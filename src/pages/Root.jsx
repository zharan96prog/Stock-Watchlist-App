import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function RootLayout() {
  return (
    <>
      <div className="bg-background min-h-screen text-primary-foreground font-sans">
        <MainNavigation className="max-w-6xl mx-auto" />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
