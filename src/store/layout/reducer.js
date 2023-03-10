// @flow
import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  CHANGE_SIDEBAR_THEME_IMAGE,
  CHANGE_PRELOADER,
  TOGGLE_LEFTMENU,
  SHOW_SIDEBAR,
  CHANGE_LAYOUT_THEME_TYPE
} from "./actionTypes"

const INIT_STATE = {
  isPreloader: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
  }

  const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {

      case SHOW_SIDEBAR:
        return {
          ...state,
          showSidebar: action.payload,
        }

      case CHANGE_PRELOADER:
        return {
          ...state,
          isPreloader: action.payload,
        }

      case TOGGLE_LEFTMENU:
        return {
          ...state,
          leftMenu: action.payload,
        }
      case CHANGE_LAYOUT:
        return {
          ...state,
          layoutType: action.payload,
        }


      case CHANGE_LAYOUT_WIDTH:
        return {
          ...state,
          layoutWidth: action.payload,
        }
      case CHANGE_SIDEBAR_THEME:
        return {
          ...state,
          leftSideBarTheme: action.payload,
        }
      case CHANGE_SIDEBAR_THEME_IMAGE:
        return {
          ...state,
          leftSideBarThemeImage: action.payload,
        }
      case CHANGE_SIDEBAR_TYPE:
        return {
          ...state,
          leftSideBarType: action.payload.sidebarType,
        }
      case CHANGE_TOPBAR_THEME:
        return {
          ...state,
          topbarTheme: action.payload,
        }


      case CHANGE_LAYOUT_THEME_TYPE:
        return {
          ...state,
          layoutTheme: action.payload,
        }

      default:
        return state
    }
  }

export default Layout
