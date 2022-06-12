import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:3005",
	// baseURL: "/",
	withCredentials: true,
})

export default instance
