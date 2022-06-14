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
import axios from "../../axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"

function Verify() {
	const [email, setEmail] = useState("")

	const [alert, setalert] = useState({
		severity: "",
		text: "",
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const res = await axios.post(`/api/user/verifyAccount`, { email: email })
			if (res.data.error) {
				setalert({
					severity: "error",
					text: <Typography>{res.data.error}</Typography>,
				})
			} else {
				setalert({
					severity: "info",
					text: "Sent a verification email, link expires in 30 minutes",
				})
			}
			console.log({ res })
		} catch (error) {
// 			switch (error.status) {
// 				case 404:
// 					setalert({ severity: "error", text: "Account does not exist" })
// 					break
// 				case 200:
// 					setalert({
// 						severity: "success",
// 						text: (
// 							<Typography>
// 								'Account is now verified, ' +{" "}
// 								<Link to="/login" style={{ textDecoration: "none" }}>
// 									Click here to login
// 								</Link>
// 							</Typography>
// 						),
// 					})
// 				default:
// 					break
// 			}
		  					setalert({ severity: "error", text: error?.response?.data?.error ? error.response.data.error : 'Error verifying your account' })
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
						<CardHeader title="Verify Your Account" />
						{alert.text !== "" && (
							<Alert severity={alert.severity} sx={{ minWidth: "60%" }}>
								{alert.text}
							</Alert>
						)}
						<TextField
							name="email"
							label="Email"
							type="email"
							variant="filled"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							sx={{ width: "60%" }}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							sx={{ width: "20%" }}
						>
							Verify
						</Button>
						<Typography gutterBottom>
							Go back to <Link to="/login">Login Page</Link>
						</Typography>
					</Grid>
				</form>
			</Card>
		</Container>
	)
}
export default Verify
