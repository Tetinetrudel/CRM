import { Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import SignIn from './features/Auth/SignIn'
import SignUp from './features/Auth/SignUp'
import PrivateRoute from './layouts/PrivateRoute'

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
        </Route>
      </Route>
    </Routes>
  )
}

export default App
