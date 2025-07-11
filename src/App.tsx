import { BrowserRouter, Routes, Route } from './router'
import { ThemeProvider } from './theme'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import GroupPage from './pages/Group'
import GroupManager from './components/GroupManager'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<GroupManager />} />
          <Route path="/groups/:slug" element={<GroupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
