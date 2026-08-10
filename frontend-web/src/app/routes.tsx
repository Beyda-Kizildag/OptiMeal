import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Onboarding } from './pages/onboarding';
import { DesignSystem } from './pages/DesignSystem';
import { Dashboard } from './pages/Dashboard';
import { Badges } from './pages/Badges';
import { ComingSoon } from './pages/ComingSoon';
import { Recipes } from './pages/Recipes';
import { Settings } from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'design-system',
        element: <DesignSystem />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/onboarding',
    element: <Onboarding />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/dashboard/badges',
    element: <Badges />
  },
  {
    path: '/dashboard/recipes',
    element: <Recipes />
  },
  {
    path: '/dashboard/health',
    element: <ComingSoon title="Health Report" description="Comprehensive health analytics and reports are coming soon! Track your progress over time." />
  },
  {
    path: '/dashboard/community',
    element: <ComingSoon title="Community" description="Connect with others on their health journey! Share recipes, tips, and support." />
  },
  {
    path: '/dashboard/settings',
    element: <Settings />
  }
]);