import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/layout/Layout'

import './lang/i18next';


import SignupIndex from './components/modules/sign-up/SignupIndex.jsx';
import SignupLanding from './components/modules/sign-up/SignupLanding.jsx';
import ViewCard from './components/modules/sign-up/ViewCard.jsx';
import Demo from './components/modules/sign-up/Demo.jsx';
import SignupViewIndex from './components/modules/sign-upView/Sign-upViewIndex.jsx';
function AppRoute() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path='home' element={<SignupLanding />} />
                <Route path='sign-up' element={<SignupIndex />} />
                <Route path='view-card' element={<ViewCard />} />
                <Route path='demo' element={<Demo />} />
                <Route path='sign-upView' element={<SignupViewIndex />} />
            </Route>
        </Routes>

    )
}

export default AppRoute
