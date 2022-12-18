import React from 'react'
import style from './style.module.scss'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom'
import { constRoute } from '../../utils/route'
import { useNavigate } from 'react-router-dom'

function MenuBar() {
    const navigate = useNavigate()

    const itemsList = [
        {
            label: 'Dashboard',
            key: 'dashboard_page',
        },
        { label: 'item 2', key: 'about_page' },
        {
            label: 'sub menu',
            key: 'submenu',
            children: [{ label: 'Submenu Item1', key: 'submenu-item1' }],
        },
    ]

    const navigateMenuList = [
        {
            key: 'dashboard_page',
            to: constRoute.home,
        },
        {
            key: 'about_page',
            to: constRoute.about,
        }
    ]

    const onMenuItemClick = (item) => {
        const currentPath = navigateMenuList.find((e) => e?.key == item?.key)?.to
        navigate(currentPath)
    }

    return (
        <Layout className={style.mainVerticalMenuBar} >
            <NavLink className={style.Logo} to={constRoute?.home}> Logo </NavLink>
            <Menu mode='vertical' items={itemsList} onClick={onMenuItemClick} />
        </Layout>
    )
}

export default MenuBar



