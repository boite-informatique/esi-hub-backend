import {
	Button,
	Card,
	CardHeader,
	Container,
	Grid,
	TextField,
	Typography,
	Alert,
	CssBaseline,
} from "@mui/material"
import axios from "../../../axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GroupList from "../../../components/GroupList"
import "./Signup.css"
import logo from "../Login/logo2(1).svg"

function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		groups: [],
		password: "",
	})

	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((values) => ({ ...values, [name]: value }))
	}

	const [groups, setGroups] = useState([])
	const [checked, setChecked] = useState([])

	useEffect(() => {
		axios
			.get(`/api/group/`)
			.then((res) => {
				setGroups(res.data)
			})
			.catch((err) => console.log(err?.response?.status))
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		formData.groups = checked
		console.log(formData)
		try {
			const res = await axios.post(`/api/user/register`, formData)
			console.log(res.data)
			if (res.data.error) {
				setalert({
					severity: "error",
					text: <Typography>{res.data.error}</Typography>,
				})
			} else {
				setalert({
					severity: "success",
					text: (
						<Typography>
							'Account created, ' +{" "}
							<Link to="/login" style={{ textDecoration: "none" }}>
								Click here to login
							</Link>
						</Typography>
					),
				})
			}
		} catch (error) {
			console.log(error)
			if (error.response.status === 400) {
				setalert({
					severity: "error",
					text: (
						<Typography>
							'Account already exists ' +{" "}
							<Link to="/login" style={{ textDecoration: "none" }}>
								Click here to login
							</Link>
						</Typography>
					),
				})
			} else {
				setalert({
					severity: "error",
					text: <Typography>Unknown error</Typography>,
				})
			}
		}
	}

	return (
		<Container>
			<img src={logo} alt="cv chweya" className="helloo"></img>

			<div className="centert">
				<h1>Register</h1>

				{alert.text !== "" && (
					<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
						{alert.text}
					</Alert>
				)}

				<form onSubmit={handleSubmit}>
					<div className="txt_fielde">
						<input
							name="name"
							label="Name"
							type="text"
							variant="filled"
							onChange={handleChange}
							value={formData.name}
							required
						/>
						<label>Name</label>
						<span></span>
					</div>
					<div className="txt_fielde">
						<input
							name="email"
							label="Email"
							type="text"
							variant="filled"
							onChange={handleChange}
							value={formData.email}
							required
						/>
						<label>Email</label>
						<span></span>
					</div>
					<div className="txt_fielder">
						<input
							name="password"
							type="password"
							label="Password"
							variant="filled"
							onChange={handleChange}
							value={formData.password}
							required
						/>
						<label>Password</label>
						<span></span>
					</div>
					{groups.length > 0 && ( //change to bigger than later
						<div className="scrolly">
							<GroupList
								data={groups}
								checked={checked}
								setChecked={setChecked}
							/>
						</div>
					)}
				</form>
				<input type="submit" value="Sign up" onClick={handleSubmit}></input>
				<div className="signup_link	">
					Already have an account? <Link to="/login">Login</Link>{" "}
				</div>
			</div>
		</Container>
	)
}

export default Signup
