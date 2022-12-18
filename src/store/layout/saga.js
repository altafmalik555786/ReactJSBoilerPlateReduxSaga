// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects"

import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_THEME,
  CHANGE_LAYOUT_THEME_TYPE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_THEME_IMAGE,
  CHANGE_TOPBAR_THEME,
} from "./actionTypes"

import {
  changeSidebarType as changeSidebarTypeAction,
  changeTopbarTheme as changeTopbarThemeAction,
} from "./actions"

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
// function manageBodyClass(cssClass, action = "toggle") {
//   switch (action) {
//     case "add":
//       if (document.body) document.body.classList.add(cssClass)
//       break
//     case "remove":
//       if (document.body) document.body.classList.remove(cssClass)
//       break
//     default:
//       if (document.body) document.body.classList.toggle(cssClass)
//       break
//   }

//   return true
// }

/**
 * Changes the layout type
 * @param {*} param0
 */

function* changeLayout({ payload: layout }) {
  try {
    if (layout !== "horizontal") {
      yield put(changeTopbarThemeAction("light"))
    }
    yield call(changeBodyAttribute, "data-layout", layout)
  } catch (error) {undefined}
}

/**
 * Changes the layout Theme
 * @param {*} param0
 */
 function* changeLayoutTheme({ payload: layout }) {
  try {
    if (layout === "dark") {
      yield put({type: CHANGE_LAYOUT_THEME_TYPE, payload: "light"})
    } else {
      yield put({type: CHANGE_LAYOUT_THEME_TYPE, payload: "dark"})
    }
    yield call(changeBodyAttribute, "theme-color", layout)
  } catch (error) {undefined}
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload: width }) {
  try {
    if (width === "boxed") {
      yield put(changeSidebarTypeAction("icon"))
      yield call(changeBodyAttribute, "data-layout-size", width)
      yield call(changeBodyAttribute, "data-layout-scrollable", false)
    } else if (width === "scrollable") {
      yield put(changeSidebarTypeAction("default"))
      yield call(changeBodyAttribute, "data-layout-scrollable", true)
    } else {
      yield put(changeSidebarTypeAction("default"))
      yield call(changeBodyAttribute, "data-layout-size", width)
      yield call(changeBodyAttribute, "data-layout-scrollable", false)
    }
  } catch (error) {undefined}
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-sidebar", theme)
  } catch (error) {undefined}
}

/**
 * Changes the left sidebar theme Image
 * @param {*} param0
 */
 function* changeLeftSidebarThemeImage({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-sidebar-image", theme)
  } catch (error) {undefined}
}


function* changeTopbarTheme({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-topbar", theme)
  } catch (error) {undefined}
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(CHANGE_LAYOUT, changeLayout)
}

export function* watchChangeLayoutWidth() {
  yield takeEvery(CHANGE_LAYOUT_WIDTH, changeLayoutWidth)
}

export function* watchChangeLeftSidebarTheme() {
  yield takeEvery(CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme)
}

export function* watchChangeLeftSidebarThemeImage() {
  yield takeEvery(CHANGE_SIDEBAR_THEME_IMAGE, changeLeftSidebarThemeImage)
}

export function* watchChangeTopbarTheme() {
  yield takeEvery(CHANGE_TOPBAR_THEME, changeTopbarTheme)
}


export function* watchChangeLayoutTheme() {
  yield takeEvery(CHANGE_LAYOUT_THEME, changeLayoutTheme)
}

function* LayoutSaga() {
  yield all([
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeLeftSidebarTheme),
    fork(watchChangeLeftSidebarThemeImage),
    fork(watchChangeTopbarTheme),
    fork(watchChangeLayoutTheme),
  ])
}

export default LayoutSaga
