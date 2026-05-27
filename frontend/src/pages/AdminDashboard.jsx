import { useEffect, useState } from "react"

import API from "../api/axios"

import Navbar from "../components/Navbar"

import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer

} from "recharts"

function AdminDashboard({

    darkMode,
    setDarkMode

}) {

    const [dashboard, setDashboard] = useState({

        totalEmployees: 0,
        totalLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0,
        pendingLeaves: 0
    })

    const fetchDashboardData = async () => {

        try {

            const token =
                localStorage.getItem("token")

            const response = await API.get(

                "/employees/dashboard",

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setDashboard(
                response.data.data
            )

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        fetchDashboardData()

    }, [])

    const chartData = [

        {
            name: "Approved",
            value: dashboard.approvedLeaves
        },

        {
            name: "Rejected",
            value: dashboard.rejectedLeaves
        },

        {
            name: "Pending",
            value: dashboard.pendingLeaves
        }
    ]

    const COLORS = [

        "#22c55e",
        "#ef4444",
        "#eab308"
    ]

    return (

        <>

            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div className="min-h-screen bg-gray-100 dark:bg-black p-10">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-4xl font-bold mb-10 text-red-600 dark:text-white">

                        Admin Dashboard

                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg">

                            <h2>Total Employees</h2>

                            <p className="text-4xl font-bold mt-4">

                                {dashboard.totalEmployees}

                            </p>

                        </div>

                        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg">

                            <h2>Total Leaves</h2>

                            <p className="text-4xl font-bold mt-4">

                                {dashboard.totalLeaves}

                            </p>

                        </div>

                        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg">

                            <h2>Approved Leaves</h2>

                            <p className="text-4xl font-bold mt-4">

                                {dashboard.approvedLeaves}

                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <PieChart>

                                    <Pie
                                        data={chartData}
                                        dataKey="value"
                                        label
                                    >

                                        {

                                            chartData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index]}
                                                />
                                            ))
                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart data={chartData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="name" />

                                    <YAxis />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="value"
                                        fill="#2563eb"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default AdminDashboard