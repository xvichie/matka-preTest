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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />}></Route>
    <Route path='profile' element={<ProfileScreen />}></Route>
    <Route path='test' element={<Test />}></Route>
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
    </Route>
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

