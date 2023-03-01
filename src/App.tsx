import classNames from "classnames"
import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Provider from "./components/Provider"
import { Provider as ProviderStore } from "react-redux"
import { store } from "./app/store"

const Home = React.lazy(() => import("./pages/Home/Home"))
const Auth = React.lazy(() => import("./pages/Auth/Auth"))

const Community = React.lazy(() => import("./pages/Community/Community"))
const Docs = React.lazy(() => import("./pages/Docs/Docs"))
const Team = React.lazy(() => import("./pages/Team/Team"))

function App() {
  return (
    <ProviderStore store={store}>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route
              index
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/auth"
              element={
                <Suspense>
                  <Auth />
                </Suspense>
              }
            />
            <Route
              path="/docs"
              element={
                <Suspense>
                  <Docs />
                </Suspense>
              }
            />
            <Route
              path="/community"
              element={
                <Suspense>
                  <Community />
                </Suspense>
              }
            />
            <Route
              path="/team"
              element={
                <Suspense>
                  <Team />
                </Suspense>
              }
            />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ProviderStore>
  )
}

export default App
