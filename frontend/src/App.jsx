import {

    BrowserRouter,
    Routes,
    Route

} from "react-router-dom"

import { useState } from "react"

import Login from "./pages/Login"
import Register from "./pages/Register"

import EmployeeDashboard
from "./pages/EmployeeDashboard"

import ManagerDashboard
from "./pages/ManagerDashboard"

import AdminDashboard
from "./pages/AdminDashboard"

import ProtectedRoute
from "./components/ProtectedRoute"

function App() {

    const [darkMode, setDarkMode] =
        useState(false)

    return (

        <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>

            <BrowserRouter>

                <Routes>

                    <Route
                        path="/"
                        element={
                            <Login />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <Register />
                        }
                    />

                    <Route
                        path="/employee-dashboard"
                        element={

                            <ProtectedRoute
                                allowedRole="EMPLOYEE"
                            >

                                <EmployeeDashboard
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />

                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/manager-dashboard"
                        element={

                            <ProtectedRoute
                                allowedRole="MANAGER"
                            >

                                <ManagerDashboard
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />

                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin-dashboard"
                        element={

                            <ProtectedRoute
                                allowedRole="ADMIN"
                            >

                                <AdminDashboard
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                />

                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </BrowserRouter>

        </div>
    )
}

export default App