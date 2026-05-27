import { useEffect, useState } from "react"
import API from "../api/axios"
import Navbar from "../components/Navbar"

function ManagerDashboard({

    darkMode,
    setDarkMode

}) {

    const [leaves, setLeaves] = useState([])

    const fetchPendingLeaves = async () => {

        try {

            const token =
                localStorage.getItem("token")

            const response = await API.get(

                "/employees/pending-leaves?page=0&size=10&sortBy=createdAt",

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            setLeaves(
                response.data.data.content
            )

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        fetchPendingLeaves()

    }, [])

    return (

        <>

            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div className="min-h-screen bg-gray-100 dark:bg-black p-10">

                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">

                    <h1 className="text-4xl font-bold">

                        Manager Control Panel

                    </h1>

                    <p className="mt-2 text-lg">

                        Review and manage employee leave requests

                    </p>

                </div>

                <div className="space-y-4">

                    {

                        leaves.map((leave) => (

                            <div
                                key={leave.id}
                                className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg"
                            >

                                <h2 className="text-2xl font-bold">

                                    {leave.employee.firstName}
                                    {" "}
                                    {leave.employee.lastName}

                                </h2>

                                <p className="mt-2">

                                    {leave.leaveType}

                                </p>

                                <p>

                                    {leave.startDate}
                                    {" "}to{" "}
                                    {leave.endDate}

                                </p>

                                <p>

                                    {leave.reason}

                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>

        </>
    )
}

export default ManagerDashboard