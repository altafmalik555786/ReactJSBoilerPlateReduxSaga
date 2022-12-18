import React, { useState } from 'react';
import Routing from '../router_service'
import { observer } from 'mobx-react';
import MenuBar from '@components/menu-bar';
import { Col, Layout, Row } from 'antd';
import style from './styleCustom.module.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';


const DefaultLayout = observer(() => {
  const { Header } = Layout;

  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout className={style.mainLayoutStructureContainer} >
      <Row>
        <Col span={20} push={4}>
          <Header className={style.mainHeaderContainer}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Routing />
        </Col>
        <Col span={4} pull={20}>
          <MenuBar />
        </Col>
      </Row>
    </Layout>
  );

})
export default DefaultLayout;
