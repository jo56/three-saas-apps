import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
// import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardLayout } from './components/dashboard-layout'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Features from './pages/Features'
import Pricing from './pages/Pricing'

// Dashboard pages
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Billing from './pages/Billing'

/**
 * Main App Component
 *
 * DEMO MODE (Current - Active):
 * - All routes accessible without authentication
 * - AuthProvider wraps app to enable login/logout functionality
 * - ProtectedRoute is NOT used (commented out)
 *
 * PRODUCTION MODE (Commented):
 * - Wrap dashboard routes with <ProtectedRoute>
 * - Redirects to /login if not authenticated
 * - See comments below for how to enable
 */

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - Always accessible */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />

        {/*
          Dashboard Routes

          DEMO MODE (Active):
          All dashboard routes are publicly accessible.
          No authentication required.
        */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
        <Route path="/customers" element={<DashboardLayout><Customers /></DashboardLayout>} />
        <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
        <Route path="/team" element={<DashboardLayout><Team /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/billing" element={<DashboardLayout><Billing /></DashboardLayout>} />

        {/*
          PRODUCTION MODE (Commented):
          Uncomment the ProtectedRoute wrapper below and comment out the routes above.
          This will require authentication to access dashboard pages.

          Example:
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout><Dashboard /></DashboardLayout>
              </ProtectedRoute>
            }
          />

          Repeat this pattern for all dashboard routes.
        */}
      </Routes>
    </AuthProvider>
  )
}

export default App
