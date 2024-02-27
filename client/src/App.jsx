import { Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import SignIn from './features/Auth/SignIn'
import SignUp from './features/Auth/SignUp'
import PrivateRoute from './layouts/PrivateRoute'
import SettingsLayout from './layouts/SettingsLayout'
import Settings from './pages/Settings'
import Profile from './features/settings/profile/Profile'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home page</h1>} />
          
            <Route path="/products">
              <Route index element={<h1>products page</h1>} />
            </Route>

            <Route path="/clients">
              <Route index element={<h1>clients page</h1>} />
            </Route>

            <Route path="/inventory">
              <Route index element={<h1>inventory page</h1>} />
            </Route>

            <Route path="/reports">
              <Route index element={<h1>reports page</h1>} />
            </Route>

            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path='/settings/profile' element={<Profile />} />
              <Route path='/settings/teams' element={<h1>teams settings</h1>} />
              <Route path='/settings/category' element={<h1>products categories settings</h1>} />
            </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
