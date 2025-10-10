import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './components/dashboard-layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Billing from './pages/Billing'

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
