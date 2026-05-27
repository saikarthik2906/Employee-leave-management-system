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

    const updateLeaveStatus = async (

        leaveId,
        status

    ) => {

        try {

            const token =
                localStorage.getItem("token")

            const response = await API.put(

                `/employees/update-leave-status/${leaveId}`,

                {

                    status: status,

                    managerComment:

                        status === "APPROVED"

                            ? "Approved by manager"

                            : "Rejected by manager"
                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)

            fetchPendingLeaves()

        } catch (error) {

            console.log(error)

            alert(
                error.response?.data?.message
            )
        }
    }

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

                                    <span className="font-semibold">

                                        Leave Type:

                                    </span>

                                    {" "}
                                    {leave.leaveType}

                                </p>

                                <p>

                                    <span className="font-semibold">

                                        Dates:

                                    </span>

                                    {" "}
                                    {leave.startDate}
                                    {" "}to{" "}
                                    {leave.endDate}

                                </p>

                                <p>

                                    <span className="font-semibold">

                                        Reason:

                                    </span>

                                    {" "}
                                    {leave.reason}

                                </p>

                                <div className="flex gap-4 mt-6">

                                    <button
                                        onClick={() =>
                                            updateLeaveStatus(
                                                leave.id,
                                                "APPROVED"
                                            )
                                        }
                                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                                    >

                                        Approve

                                    </button>

                                    <button
                                        onClick={() =>
                                            updateLeaveStatus(
                                                leave.id,
                                                "REJECTED"
                                            )
                                        }
                                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                                    >

                                        Reject

                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </>
    )
}

export default ManagerDashboard
