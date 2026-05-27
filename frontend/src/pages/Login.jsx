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

            console.log(
                localStorage.getItem("token")
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

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">

                    Login

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>
    )
}

export default Login