import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/LoginRegister/Login/Login"
import Signup from "./pages/LoginRegister/Signup/Signup"
import Verify from "./pages/LoginRegister/Verify"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import { DarkContext } from "./DarkThemeProvider"
import "./App.css"
import HomePage from "./pages/HomePage/HomePage"
import Chat from "./pages/Chat/Chat"
import WelcomePage from "./pages/WelcomePage/WelcomePage"

const darkTheme = createTheme({
	palette: {
		mode: "light",
	},
})

const queryClient = new QueryClient()

export default function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/verify" element={<Verify />} />
						<Route path="/welcome" element={<WelcomePage />} />
						<Route
							path="/*"
							element={<ProtectedRoute component={Dashboard} />}
						/>
					</Routes>
				</QueryClientProvider>
			</ThemeProvider>
		</BrowserRouter>
	)
}
