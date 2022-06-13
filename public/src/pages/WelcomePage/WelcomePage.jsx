import React from "react"
import "./WelcomePage.css"
import { Link } from "react-router-dom"
import img2 from "/assets/a122.png"
import img3 from "/assets/welcomepg.svg"
import img4 from "/assets/loupe.svg"
import img5 from "/assets/chatwelcome.svg"

const WelcomePage = () => {
	return (
		<div className="page">
			<div className="top">
				{" "}
				<img src={img2}></img>
			</div>

			<div className="loupe">
				{" "}
				<img src={img4}></img>
			</div>
			<div className="wlcm">
				{" "}
				<img src={img3}></img>
			</div>
			<div className="chat">
				{" "}
				<img src={img5}></img>
			</div>
			<div className="text">
				<h1>Welcome KHAYI ! </h1>
				<p>
					&nbsp; &nbsp; Esi hub est un réseau social pour les personnes qui font{" "}
					<br /> partie de l'esi sba, y compris les étudiants, les professeurs{" "}
					<br />
					et le staff administratif.
					<br />
					<br />
					&nbsp; &nbsp; Le but principal de ce projet est de fournir une
					plate-forme
					<br /> organisée et facile à utiliser, afin de pouvoir partager les{" "}
					<br /> documents et les idées avec d'autres personnes autour.
				</p>
			</div>
			<div className="loginfirst">
				<Link to="/login">
					<button>Login</button>
				</Link>
			</div>
			<div className="signinfirst">
				<Link to="/signup">
					<button>Sign in</button>
				</Link>
			</div>
		</div>
	)
}

export default WelcomePage
