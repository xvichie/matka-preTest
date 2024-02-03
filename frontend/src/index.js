import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Test from './screens/TestScreen/TestScreen';

import { store } from './store.js'
import { Provider } from 'react-redux'
import TheoryScreen from './screens/TheoryScreen/TheoryScreen';
import GeometryScreen from './screens/TheoryScreen/GeometryScreen/GeometryScreen';
import AlgebraScreen from './screens/TheoryScreen/AlgebraScreen/AlgebraScreen';
import TheoremComponent from './components/TheoremComponent/TheoremComponent';
import ThesisScreen from './screens/TheoryScreen/ThesisScreen/ThesisScreen';
import TeachersScreen from './screens/TeachersScreen/TeachersScreen';
import ViewTestScreen from './screens/TestScreen/ViewTestScreen/ViewTestScreen.jsx';
import AboutUsScreen from './screens/AboutUsScreen/AboutUsScreen.jsx';
import ViewTeacherScreen from './screens/TeachersScreen/ViewTeacherScreen/ViewTeacherScreen.jsx';
import SolutionsScreen from './screens/SolutionsScreen/SolutionsScreen.jsx';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen/TermsAndConditionsScreen.jsx';
import PrivacyScreen from './screens/PrivacyScreen/PrivacyScreen.jsx';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import NotFoundScreen from './screens/NotFoundScreen/NotFoundScreen.jsx';

if (process.env.NODE_ENV === 'Production') {
  disableReactDevTools();
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />}></Route>
    <Route path='profile' element={<ProfileScreen />}></Route>
    <Route path='aboutUs' element={<AboutUsScreen />}></Route>
    <Route path='termsAndConditions' element={<TermsAndConditionsScreen />}></Route>
    <Route path='privacy' element={<PrivacyScreen />}></Route>
    <Route path='test'>
      <Route index={true} element={<Test />}></Route>
      <Route path=":TestId" element={<ViewTestScreen />} />
    </Route>
    <Route path='theory'>
      <Route index={true} element={<TheoryScreen />}></Route>
      <Route path='geometry'>
        <Route index={true} element={<GeometryScreen />}></Route>
        <Route path=":TheoremId" element={<TheoremComponent TheoremAlgGeo={'Geometry'} />} />
      </Route>
      <Route path='algebra'>
        <Route index={true} element={<AlgebraScreen />}></Route>
        <Route path=":TheoremId" element={<TheoremComponent TheoremAlgGeo={'Algebra'} />} />
      </Route>
      <Route path='thesis'>
        <Route index={true} element={<ThesisScreen />}></Route>
        <Route path=":TheoremId" element={<TheoremComponent TheoremAlgGeo={'Thesis'} />} />
      </Route>
    </Route>
    <Route path='teachers'>
      <Route index={true} element={<TeachersScreen />}></Route>
      <Route path=':TeacherId' element={<ViewTeacherScreen />}></Route>
    </Route>
    <Route path='solutions'>
      <Route index={true} element={<SolutionsScreen />}></Route>
    </Route>
    <Route path='*' element={<NotFoundScreen />}></Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain='dev-qljylwgr26x23vpc.us.auth0.com'
      clientId='kc0J5VgLVJBXyia98AX20kZD6M9KAzo1'
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'anastasia',
        scope: 'openid profile email'
      }}
    >
      <RouterProvider router={router}>
      </RouterProvider>
    </Auth0Provider>
  </Provider>
);

