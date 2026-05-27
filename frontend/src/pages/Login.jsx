import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({

        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await API.post(

                "/employees/login",
                formData
            )

            console.log(response.data)

            const token =
                response.data.data.token

            const role =
                response.data.data.role

            localStorage.setItem(
                "token",
                token
            )

            localStorage.setItem(
                "role",
                role
            )

            alert("Login successful")

            if (role === "EMPLOYEE") {

                navigate("/employee-dashboard")
            }

            else if (role === "MANAGER") {

                navigate("/manager-dashboard")
            }

            else if (role === "ADMIN") {

                navigate("/admin-dashboard")
            }

        } catch (error) {

            console.log(error)

            alert(
                error.response?.data?.message
            )
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">

            <div className="bg-white dark:bg-gray-900 dark:text-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-4xl font-bold text-center mb-2 text-blue-600">

                    Welcome Back

                </h2>

                <p className="text-center text-gray-500 dark:text-gray-300 mb-8">

                    Employee Leave Management System

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg text-black"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg text-black"
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >

                        Login

                    </button>

                    <div className="text-center mt-6">

                        <p className="text-gray-600 dark:text-gray-300">

                            Don't have an account?

                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mt-3 transition"
                        >

                            Register New User

                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default Login