import { useNavigate } from "react-router-dom"

function Navbar({

    darkMode,
    setDarkMode

}) {

    const navigate = useNavigate()

    const role =
        localStorage.getItem("role")

    const logout = () => {

        localStorage.removeItem("token")

        localStorage.removeItem("role")

        navigate("/")
    }

    return (

        <div className="bg-black text-white p-4 flex justify-between items-center shadow-lg">

            <h1 className="text-2xl font-bold">

                Employee Leave Management System

            </h1>

            <div className="flex items-center gap-4">

                <button
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                    className="bg-gray-700 px-4 py-2 rounded-lg"
                >

                    {

                        darkMode
                            ? "☀️ Light"
                            : "🌙 Dark"
                    }

                </button>

                <p className="font-semibold">

                    {role}

                </p>

                <button
                    onClick={logout}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >

                    Logout

                </button>

            </div>

        </div>
    )
}

export default Navbar