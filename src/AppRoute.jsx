import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/layout/Layout'

import './lang/i18next';


import SignupIndex from './components/modules/sign-up/SignupIndex.jsx';
import SignupLanding from './components/modules/sign-up/SignupLanding.jsx';
function AppRoute() {

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route path='home' element={<SignupLanding />} />
                <Route path='sign-up' element={<SignupIndex />} />
            </Route>
        </Routes>

    )
}

export default AppRoute
