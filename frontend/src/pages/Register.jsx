import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        role: "EMPLOYEE"
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
                "/employees/register",
                formData
            )

            alert(response.data.message)

            navigate("/")

        } catch (error) {

            alert(
                error.response.data.message
            )
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6 text-green-600">

                    Register

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

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

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Register