import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layout/app-layout';
import LandingPage from './page/landing';
import OnBoading from "./page/onboading";
import JobListing from './page/job-listing';
import JobPage from "./page/job-page";
import MyJob from './page/my-jobs';
import PostJob from './page/post-job';
import SaveJob from './page/saved-job';
import { ThemeProvider } from './components/ui/theme-provider';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboading",
        element: (
          <ProtectedRoute>
            <OnBoading />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoute>
            <SaveJob />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() { 
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )}

export default App
