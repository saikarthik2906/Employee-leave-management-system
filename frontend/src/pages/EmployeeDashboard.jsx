import { useEffect, useState } from "react"
import API from "../api/axios"
import Navbar from "../components/Navbar"

function EmployeeDashboard({

    darkMode,
    setDarkMode

}) {

    const [formData, setFormData] = useState({

        leaveType: "SICK",
        startDate: "",
        endDate: "",
        reason: ""
    })

    const [leaves, setLeaves] = useState([])

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const fetchLeaves = async () => {

        try {

            const token =
                localStorage.getItem("token")

            const response = await API.get(

                "/employees/my-leaves?page=0&size=10&sortBy=createdAt",

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

        fetchLeaves()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const token =
                localStorage.getItem("token")

            const response = await API.post(

                "/employees/apply-leave",

                formData,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)

            fetchLeaves()

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-xl font-semibold">

                            Casual Leave

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            10

                        </p>

                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-xl font-semibold">

                            Sick Leave

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            8

                        </p>

                    </div>

                    <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-xl font-semibold">

                            Earned Leave

                        </h2>

                        <p className="text-4xl font-bold mt-4">

                            12

                        </p>

                    </div>

                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-md">

                        <h1 className="text-3xl font-bold mb-6 text-blue-600">

                            Apply Leave

                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            <select
                                name="leaveType"
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg text-black"
                            >

                                <option value="SICK">
                                    Sick Leave
                                </option>

                                <option value="CASUAL">
                                    Casual Leave
                                </option>

                                <option value="EARNED">
                                    Earned Leave
                                </option>

                            </select>

                            <input
                                type="date"
                                name="startDate"
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg text-black"
                            />

                            <input
                                type="date"
                                name="endDate"
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg text-black"
                            />

                            <textarea
                                name="reason"
                                placeholder="Reason"
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg text-black"
                            />

                            <button
                                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                            >

                                Apply Leave

                            </button>

                        </form>

                    </div>

                    <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-md">

                        <h1 className="text-3xl font-bold mb-6 text-green-600">

                            My Leaves

                        </h1>

                        <div className="space-y-4">

                            {

                                leaves.map((leave) => (

                                    <div
                                        key={leave.id}
                                        className="border p-4 rounded-lg"
                                    >

                                        <h2 className="font-bold text-lg">

                                            {leave.leaveType}

                                        </h2>

                                        <p>

                                            {leave.startDate}
                                            {" "}to{" "}
                                            {leave.endDate}

                                        </p>

                                        <p>

                                            {leave.reason}

                                        </p>

                                        <p
                                            className={`font-bold mt-2 ${

                                                leave.status === "APPROVED"
                                                    ? "text-green-600"

                                                    : leave.status === "REJECTED"
                                                        ? "text-red-600"

                                                        : "text-yellow-600"
                                            }`}
                                        >

                                            {leave.status}

                                        </p>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default EmployeeDashboard