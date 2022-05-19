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
import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GroupList from "../../components/GroupList"

function Signup() {
	const baseURL = "http://localhost:3005"
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
			.get(`${baseURL}/api/group/`)
			.then((res) => {
				console.log(res.data)
				setGroups(res.data)
			})
			.catch((err) => console.log(err?.response?.status))
		console.log(formData)
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		formData.groups = checked
		console.log(formData)
		try {
			const res = await axios.post(`${baseURL}/api/user/register`, formData)
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
			<CssBaseline />
			<Typography variant="h3" align="center" color="primary" my={2}>
				ESI Hub
			</Typography>
			<Card sx={{ width: 500, marginX: "auto", marginY: "auto" }}>
				<form onSubmit={handleSubmit}>
					<Grid
						container
						alignItems="center"
						justify="center"
						direction="column"
						gap={3}
					>
						<CardHeader title="Signup to ESI Hub" />
						{alert.text !== "" && (
							<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
								{alert.text}
							</Alert>
						)}
						<TextField
							name="name"
							label="Name"
							type="text"
							variant="filled"
							onChange={handleChange}
							value={formData.name}
							required
							sx={{ width: "60%" }}
						/>
						<TextField
							name="email"
							label="Email"
							type="email"
							variant="filled"
							onChange={handleChange}
							value={formData.email}
							required
							sx={{ width: "60%" }}
						/>
						<TextField
							name="password"
							type="password"
							label="Password"
							variant="filled"
							onChange={handleChange}
							value={formData.password}
							required
							sx={{ width: "60%" }}
						/>
						{groups.length > 0 && (
							<GroupList
								data={groups}
								checked={checked}
								setChecked={setChecked}
							/>
						)}
						<Button
							variant="contained"
							color="primary"
							type="submit"
							sx={{ width: "20%" }}
						>
							Signup
						</Button>
						<Typography gutterBottom>
							Already have an account? <Link to="/login">Login</Link>
						</Typography>
					</Grid>
				</form>
			</Card>
		</Container>
	)
}

export default Signup
