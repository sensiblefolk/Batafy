import store from 'store'
import actions from './actions'

const STORED_SETTINGS = storedSettings => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}

const initialState = {
  ...STORED_SETTINGS({
    locale: 'en-US',
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    isMenuShadow: false,
    isMenuUnfixed: false,
    menuLayoutType: 'top', // left, top, top-dark, nomenu
    menuType: 'default', // default, flyout, compact
    menuColor: 'white', // dark, blue, gray, white
    flyoutMenuColor: 'gray', // dark, blue, gray, white
    systemLayoutColor: 'gray', // white, dark, blue, gray, image
    isTopbarFixed: false,
    isFooterDark: false,
    isContentNoMaxWidth: false,
    isAppMaxWidth: false,
    isGrayBackground: true,
    isGrayTopbar: true,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
    routerAnimation: 'slide-fadein-up', // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
  }),
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
