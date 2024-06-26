import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import { toast } from 'react-toastify'
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Spinner from "../components/Spinner"

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        } 

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])
    
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

  return <>
    <section className="heading">
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
    </section>

    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
  </>
}
