import React from 'react'
import Header from './components/Header/Header'
import ChatBot from './components/ChatBot/ChatBot'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/store'

function Layout() {
  return (
    <Provider store={store}>
        <Header />
        <Outlet />
        <ChatBot />
    </Provider>
  )
}

export default Layout
