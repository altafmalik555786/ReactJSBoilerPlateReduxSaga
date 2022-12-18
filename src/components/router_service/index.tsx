import { constRoute } from '../../utils/route'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '@components/dashboard';
import About from '@components/about';
import { Layout } from 'antd';
import style from './style.module.scss'

const Routing = () => {
  return (
    <div className={style.layoutPageMainContainer} >
    <Layout  >
      <Routes>
        <Route path={`/`} element={<DashBoard />} />
        <Route path={constRoute.home} element={<DashBoard />} />
        <Route path={constRoute.about} element={<About />} />
      </Routes>
    </Layout>
    </div>
  )
}
export default Routing