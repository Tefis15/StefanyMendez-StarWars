import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			showModal: false,
			showModalDetails: false,
			deleted: false,
			favoritesPeople: [],
			favoritesPlanets: [],
			favoritesVehicles: [],
			favoritesStarships: [],

			userLogin: JSON.parse(localStorage.getItem("userLogin")) == undefined ? {} : JSON.parse(localStorage.getItem("userLogin")),
			isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) == undefined ? false : JSON.parse(localStorage.getItem("isLoggedIn")),
			emailSent: false,

			users: [],
			user: null,
			phone: null,
			email: null,
			role: null,
			isActive: null,
			password: null,
			confirmPassword: null,
			userEdited: false,

			uid: "",
			name: null,
			url: null,
			description: null,

			people: [],
			character: null,
			characterEdit: null,
			height: null,
			mass: null,
			skinColor: null,
			eyeColor: null,
			birthYear: null,
			gender: null,
			homeworld: null,

			planets: [],
			planet: null,
			planetEdit: null,
			diameter: null,
			rotationPeriod: null,
			orbitalPeriod: null,
			gravity: null,
			population: null,
			climate: null,
			terrain: null,
			surfaceWater: null,

			vehicles: [],
			vehicle: null,
			vehicleEdit: null,
			model: null,
			class: null,
			manufacturer: null,
			costInCredits: null,
			length: null,
			crew: null,
			passengers: null,
			maxAtmospheringSpeed: null,
			cargoCapacity: null,
			consumables: null,

			starships: [],
			starship: null,
			starshipEdit: null,
			hyperdrive: null,
			mglt: null,

		},
		actions: {
			//<---------------------------Login------------------------------>//
			login: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					let user = {}

					if (store.email == null) {
						user = null
					} else if (store.password == null) {
						user = {
							email: store.email
						}
					}
					else {
						user = {
							email: store.email,
							password: store.password
						}
					}

					const response = await fetch(process.env.BACKEND_URL + '/login', {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						if (result.User.is_active == true) {
							Swal.fire({
								title: "Welcome Back",
								text: result.User.name,
								timer: 2000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
									url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
									no-repeat`,
								backdrop: `rgba(0,0,123,0.4)
									url("https://i.pinimg.com/originals/9e/55/63/9e5563a94687963f3b108ed931e443af.gif")
									right top 
									no-repeat`
							})

							localStorage.setItem("jwt-token", result.access_token);
							localStorage.setItem("userLogin", JSON.stringify(result.User))
							localStorage.setItem("isLoggedIn", JSON.stringify(true))
							setStore({ userLogin: result.User })
							setStore({ isLoggedIn: true })
							actions.clearStore()
							setTimeout(actions.logOut, 500000)

						} else {
							Swal.fire({
								icon: 'error',
								text: "Inactivated user",
								timer: 3000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
									url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
									no-repeat`,
								backdrop: `rgba(0,0,123,0.4)
									url("https://i.pinimg.com/originals/8d/20/b5/8d20b5413eb11a0ec9ca478a13f89be5.gif")
									right top 
									no-repeat`
							})
						}
					} else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in login")
					localStorage.setItem("isLoggedIn", JSON.stringify(false))
				}
			},
			logOut: () => {
				setStore({ isLoggedIn: false })
				setStore({ userLogin: {} })
				setStore({ favoritesPeople: [] })
				setStore({ favoritesPlanets: [] })
				setStore({ favoritesVehicles: [] })
				setStore({ favoritesStarships: [] })
				localStorage.clear();
			},
			resetPassword: async () => {
				try {
					const store = getStore()
					const actions = getActions()

					const response = await fetch(process.env.BACKEND_URL + `/resetPassword/${store.email}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ emailSent: true })
						Swal.fire({
							title: "Do it!!!",
							text: `Email Sent`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
						url("https://media0.giphy.com/media/sFawvbjwFzgZdAa7K3/giphy.gif?cid=6c09b952c62nytmzsvs25flf4kqhqcob45kopogktsqn4xx9&ep=v1_stickers_related&rid=giphy.gif&ct=s")
						right top 
						no-repeat`
						})
						actions.clearStore()
						setStore({ emailSent: false })
					} else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in resetPassword")
				}
			},

			//<---------------------------User------------------------------>//
			getAllUsers: async () => {
				try {
					const token = localStorage.getItem('jwt-token')
					const response = await fetch(process.env.BACKEND_URL + '/user', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					setStore({ users: result.Users })
				} catch (error) {
					console.log(error + " Error in getAllUsers")
				}
			},
			getUserById: async (id) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ user: result.User })
					} else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in getUserById")
				}
			},
			getUserByIdLogin: async (id) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					console.log(result);
					if (result.msg == "ok") {
						setStore({ userLogin: result.User })
						localStorage.setItem("userLogin", JSON.stringify(result.User))
					} else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in getUserById")
				}
			},
			editUser: async (email) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let user = {}
					if (store.password != null && store.confirmPassword != null) {
						if (store.password == store.confirmPassword) {

							user.password = store.password

						} else {
							actions.showSwalError("The password don't match")
						}
					}
					if (store.phone != null) {
						user.phone = store.phone
					}

					const response = await fetch(process.env.BACKEND_URL + `/user/${email}`, {
						method: 'PUT',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.getUserByIdLogin(result.User.id)
						Swal.fire({
							title: "Do it!!!",
							text: `${result.User.name} the info was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
						actions.clearStore()
					} else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in editUser")
				}
			},
			editUserActiveAdmin: async (id) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const user = {}


					if (store.isActive != null) {
						console.log(user);
						if (store.isActive == "true") {
							user.is_active = true
							console.log(user);
						}
					}
					if (store.isActive != null) {
						if (store.isActive == "false") {
							user.is_active = false
							console.log(user);
						}
					}

					const response = await fetch(process.env.BACKEND_URL + `/admin/user/${id}`, {
						method: 'PUT',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ userEdited: true })
						setStore({ userEdited: false })
						actions.clearStore()
					} else {
						setStore({ userEdited: false })
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in editUserAdmin")
				}
			},
			addUser: async () => {
				try {
					const store = getStore()
					const actions = getActions()

					const user = {}

					if (store.password != null && store.confirmPassword != null) {
						if (store.password == store.confirmPassword)
							user.password = store.password
						else
							actions.showSwalError("The password don't match")

					}
					if (store.name != null)
						user.name = store.name

					if (store.phone != null)
						user.phone = store.phone

					if (store.email != null)
						user.email = store.email


					const response = await fetch(process.env.BACKEND_URL + '/user', {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						Swal.fire({
							title: "Do it!!!",
							text: `Welcome ${result.User.name}`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://64.media.tumblr.com/44c8c892b4bc22685344a2cedf044b8a/0646d51ff4487ec9-77/s500x750/4c9e28ee49d31b551f91d0b82cca8d67b6a03c10.gif")
							right top 
							no-repeat`
						})
						actions.clearStore()
					}
					else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in addUser")
				}

			},
			addUserAdmin: async () => {
				try {

					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const user = {}

					if (store.name != null)
						user.name = store.name

					if (store.phone != null)
						user.phone = store.phone

					if (store.email != null)
						user.email = store.email

					if (store.password != null)
						user.password = store.password

					if (store.role != null)
						user.role = store.role

					user.is_active = true

					const response = await fetch(process.env.BACKEND_URL + '/admin/user', {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModal()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.User.id} - ${result.User.name} was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
						})
						actions.clearStore()
					} else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in addUserAdmin")
				}
			},
			editUserAdmin: async (id) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const user = {}
					if (store.name != null)
						user.name = store.name

					if (store.phone != null)
						user.phone = store.phone

					if (store.email != null)
						user.email = store.email

					if (store.password != null)
						user.password = store.password

					if (store.role != null)
						user.role = store.role

					const response = await fetch(process.env.BACKEND_URL + `/admin/user/${id}`, {
						method: 'PUT',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModal()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.User.id} - ${result.User.name} was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
						})
						actions.clearStore()
					} else {
						setStore({ userEdited: false })
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in editUserAdmin")
				}
			},
			deleteUser: async (id, name) => {
				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/user/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					console.log(result);
					if (result.msg == "ok") {
						setStore({ deleted: true })
						Swal.fire({
							title: 'Deleted!',
							text: `The user ${name} was deleted`,
							icon: 'success',
							showConfirmButton: false,
							color: '#FFFFFF',
							background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
							timer: 3000,
							backdrop: `
						rgba(0,0,123,0.4)
						url("https://i.pinimg.com/originals/96/ea/bc/96eabc812b02070e025cb41776b91803.gif")
						right top 
						no-repeat
						`
						})
						setStore({ deleted: false })
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in deletePeople")
				}
			},

			//<---------------------------People------------------------------>//
			getAllPeople: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/people', {
						method: 'GET'
					})
					const result = await response.json()

					setStore({ people: result.Results })
				} catch (error) {
					console.log(error + " Error in getAllPeople")
				}
			},
			getPeopleById: async (uid, type) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/people/details/${uid}`, {
						method: 'GET'
					})
					const result = await response.json()
					setStore({ character: result.Results })
					if (type === "details") {
						if (result.msg != "ok") {
							setStore({ character: null })
							setStore({ showModalDetails: false })
							Swal.fire({
								icon: 'error',
								text: result.message,
								timer: 3000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat
						`,
								backdrop: `
						rgba(0,0,123,0.4)
						url("https://media2.giphy.com/media/jq0BlOhhKKv8tO9oOz/giphy.gif?cid=6c09b952u3u8dsur3de499ls2qzc1i2hzuummvnuay3h7a5j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s")
						right top 
						no-repeat
						`
							})
						}
					} else if (type === "edit") {
						const response2 = await fetch(process.env.BACKEND_URL + `/people/${uid}`, {
							method: 'GET'
						})
						const result2 = await response2.json()
						setStore({ characterEdit: result2.People })
					}
				} catch (error) {
					console.log(error + " Error in getPeopleById")
				}
			},
			addPeople: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let people = {}
					if (store.uid != null) {
						people.uid = store.uid
						people.url = `https://www.swapi.tech/api/people/${store.uid}`
					}
					if (store.name != null) {
						people.name = store.name
					}
					const response = await fetch(process.env.BACKEND_URL + '/people', {
						method: 'POST',
						body: JSON.stringify(people),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						actions.handleDeleteModal()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.People.uid} - ${result.People.name} was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
						})
						actions.clearStore()
					}
					else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in addPeople")
				}
			},
			editPeople: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let people = {}

					people.name = store.name

					const response = await fetch(process.env.BACKEND_URL + `/people/${uid}`, {
						method: 'PUT',
						body: JSON.stringify(people),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.People.uid} - ${result.People.name} details was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
									url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
									no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
									url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
									right top 
									no-repeat`
						})
					} else if (store.name != null) {
						actions.editPeople(uid)
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in editPeople")
				}

			},
			deletePeople: async (uid, name) => {
				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/people/${uid}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					console.log(result);
					if (result.msg == "ok") {
						setStore({ deleted: true })
						Swal.fire({
							title: 'Deleted!',
							text: `The character ${name} was deleted`,
							icon: 'success',
							showConfirmButton: false,
							color: '#FFFFFF',
							background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
							timer: 3000,
							backdrop: `
						rgba(0,0,123,0.4)
						url("https://i.pinimg.com/originals/96/ea/bc/96eabc812b02070e025cb41776b91803.gif")
						right top 
						no-repeat
						`
						})
						setStore({ deleted: false })
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in deletePeople")
				}

			},
			addPeopleDetails: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let peopleDetails = {}
					if (store.uid != null) {
						peopleDetails.uid = store.uid
					}
					if (store.description != null) {
						peopleDetails.description = store.description
					}
					if (store.height != null) {
						peopleDetails.height = store.height
					}
					if (store.mass != null) {
						peopleDetails.mass = store.mass
					}
					if (store.skinColor != null) {
						peopleDetails.skin_color = store.skinColor
					}
					if (store.eyeColor != null) {
						peopleDetails.eye_color = store.eyeColor
					}
					if (store.birthYear != null) {
						peopleDetails.birth_year = store.birthYear
					}
					if (store.gender != null) {
						peopleDetails.gender = store.gender
					}
					if (store.homeworld != null) {
						peopleDetails.planet_uid = store.homeworld
					}

					const response = await fetch(process.env.BACKEND_URL + `/people/details`, {
						method: 'POST',
						body: JSON.stringify(peopleDetails),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.People_details.uid} - ${result.People_details.properties.name} details was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addPeopleDetails")
				}
			},
			editPeopleDetails: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let peopleDetails = {}

					if (store.description != null) {
						peopleDetails.description = store.description
					}
					if (store.height != null) {
						peopleDetails.height = store.height
					}
					if (store.mass != null) {
						peopleDetails.mass = store.mass
					}
					if (store.skinColor != null) {
						peopleDetails.skin_color = store.skinColor
					}
					if (store.eyeColor != null) {
						peopleDetails.eye_color = store.eyeColor
					}
					if (store.birthYear != null) {
						peopleDetails.birth_year = store.birthYear
					}
					if (store.gender != null) {
						peopleDetails.gender = store.gender
					}
					if (store.homeworld != null) {
						peopleDetails.planet_uid = store.homeworld
					}

					const response = await fetch(process.env.BACKEND_URL + `/people/details/${uid}`, {
						method: 'PUT',
						body: JSON.stringify(peopleDetails),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.People_details.uid} - ${result.People_details.properties.name} details was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
					} else if (store.name != null) {
						actions.editPeople(uid)
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in editPeopleDetails")
				}
			},
			getPeopleFavorites: async () => {

				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/people/favorites`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ favoritesPeople: result.Results })
					} else if (result.msg == "Token has expired") {
						actions.logOut()
					}
					else {
						setStore({ favoritesPeople: [] })
					}

				} catch (error) {
					console.log(error + " Error in getPeopleFavorites")
				}
			},
			addFavoritesPeople: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.people_uid = uid

					const response = await fetch(process.env.BACKEND_URL + '/people/favorites', {
						method: 'POST',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getPeopleFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addPeopleFavorites")
				}

			},
			deleteFavoritesPeople: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.people_uid = uid

					const response = await fetch(process.env.BACKEND_URL + `/people/favorites`, {
						method: 'DELETE',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getPeopleFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in deletePeopleFavorites")
				}
			},

			//<---------------------------Planets------------------------------>//
			getAllPlanets: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/planets', {
						method: 'GET'
					})
					const result = await response.json()

					setStore({ planets: result.Results })
				} catch (error) {
					console.log(error + " Error in getAllPlanets")
				}
			},
			getPlanetsById: async (uid, type) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/planets/details/${uid}`, {
						method: 'GET'
					})
					const result = await response.json()
					setStore({ planet: result.Results })
					if (type === "details") {
						if (result.msg != "ok") {
							setStore({ planet: null })
							setStore({ showModalDetails: false })
							Swal.fire({
								icon: 'error',
								text: result.message,
								timer: 3000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat
						`,
								backdrop: `
						rgba(0,0,123,0.4)
						url("https://media2.giphy.com/media/jq0BlOhhKKv8tO9oOz/giphy.gif?cid=6c09b952u3u8dsur3de499ls2qzc1i2hzuummvnuay3h7a5j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s")
						right top 
						no-repeat
						`
							})
						}
					} else if (type === "edit") {
						const response2 = await fetch(process.env.BACKEND_URL + `/planets/${uid}`, {
							method: 'GET'
						})
						const result2 = await response2.json()
						setStore({ planetEdit: result2.Planets })

					}
				} catch (error) {
					console.log(error + " Error in getPlanetsById")
				}
			},
			addPlanets: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let planets = {}
					if (store.uid != null) {
						planets.uid = store.uid
						planets.url = `https://www.swapi.tech/api/planets/${store.uid}`
					}
					if (store.name != null) {
						planets.name = store.name
					}
					const response = await fetch(process.env.BACKEND_URL + '/planets', {
						method: 'POST',
						body: JSON.stringify(planets),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						actions.handleDeleteModal()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Planets.uid} - ${result.Planets.name} was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
						})
						actions.clearStore()
					}
					else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in addPlanets")
				}
			},
			editPlanets: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let planets = {}

					planets.name = store.name

					const response = await fetch(process.env.BACKEND_URL + `/planets/${uid}`, {
						method: 'PUT',
						body: JSON.stringify(planets),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Planets.uid} - ${result.Planets.name} details was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
									url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
									no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
									url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
									right top 
									no-repeat`
						})
					} else if (store.name != null) {
						actions.editPlanets(uid)
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in editPlanets")
				}

			},
			deletePlanets: async (uid, name) => {
				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/planets/${uid}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ deleted: true })
						Swal.fire({
							title: 'Deleted!',
							text: `The planet ${name} was deleted`,
							icon: 'success',
							showConfirmButton: false,
							color: '#FFFFFF',
							background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
							timer: 3000,
							backdrop: `
						rgba(0,0,123,0.4)
						url("https://i.pinimg.com/originals/96/ea/bc/96eabc812b02070e025cb41776b91803.gif")
						right top 
						no-repeat
						`
						})
						setStore({ deleted: false })
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in deletePlanets")
				}
			},
			addPlanetsDetails: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let planetsDetails = {}
					if (store.uid != null) {
						planetsDetails.uid = store.uid
					}
					if (store.description != null) {
						planetsDetails.description = store.description
					}
					if (store.diameter != null) {
						planetsDetails.diameter = store.diameter
					}
					if (store.rotationPeriod != null) {
						planetsDetails.rotation_period = store.rotationPeriod
					}
					if (store.orbitalPeriod != null) {
						planetsDetails.orbital_period = store.orbitalPeriod
					}
					if (store.gravity != null) {
						planetsDetails.gravity = store.gravity
					}
					if (store.population != null) {
						planetsDetails.population = store.population
					}
					if (store.climate != null) {
						planetsDetails.climate = store.climate
					}
					if (store.terrain != null) {
						planetsDetails.terrain = store.terrain
					}
					if (store.surfaceWater != null) {
						planetsDetails.surface_water = store.surfaceWater
					}


					const response = await fetch(process.env.BACKEND_URL + `/planets/details`, {
						method: 'POST',
						body: JSON.stringify(planetsDetails),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Planets_details.uid} - ${result.Planets_details.properties.name} details was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addPlanetsDetails")
				}
			},
			editPlanetsDetails: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let planetsDetails = {}

					if (store.description != null) {
						planetsDetails.description = store.description
					}
					if (store.diameter != null) {
						planetsDetails.diameter = store.diameter
					}
					if (store.rotationPeriod != null) {
						planetsDetails.rotation_period = store.rotationPeriod
					}
					if (store.orbitalPeriod != null) {
						planetsDetails.orbital_period = store.orbitalPeriod
					}
					if (store.gravity != null) {
						planetsDetails.gravity = store.gravity
					}
					if (store.population != null) {
						planetsDetails.population = store.population
					}
					if (store.climate != null) {
						planetsDetails.climate = store.climate
					}
					if (store.terrain != null) {
						planetsDetails.terrain = store.terrain
					}
					if (store.surfaceWater != null) {
						planetsDetails.surface_water = store.surfaceWater
					}

					const response = await fetch(process.env.BACKEND_URL + `/planets/details/${uid}`, {
						method: 'PUT',
						body: JSON.stringify(planetsDetails),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Planets_details.uid} - ${result.Planets_details.properties.name} details was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
					} else if (store.name != null) {
						actions.editPlanets(uid)
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in editPlanetsDetails")
				}
			},
			getPlanetsFavorites: async () => {

				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/planets/favorites`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ favoritesPlanets: result.Results })
					} else {
						setStore({ favoritesPlanets: [] })
					}

				} catch (error) {
					console.log(error + " Error in getPlanetsFavorites")
				}
			},
			addFavoritesPlanets: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.planets_uid = uid

					const response = await fetch(process.env.BACKEND_URL + '/planets/favorites', {
						method: 'POST',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getPlanetsFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addPlanetsFavorites")
				}

			},
			deleteFavoritesPlanets: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.planets_uid = uid

					const response = await fetch(process.env.BACKEND_URL + `/planets/favorites`, {
						method: 'DELETE',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getPlanetsFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in deletePlanetsFavorites")
				}
			},

			//<---------------------------Vehicles------------------------------>//
			getAllVehicles: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/vehicles', {
						method: 'GET'
					})
					const result = await response.json()

					setStore({ vehicles: result.Results })
				} catch (error) {
					console.log(error + " Error in getAllVehicles")
				}
			},
			getVehiclesById: async (uid, type) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/vehicles/details/${uid}`, {
						method: 'GET'
					})
					const result = await response.json()
					setStore({ vehicle: result.Results })
					if (type === "details") {
						if (result.msg != "ok") {
							setStore({ vehicle: null })
							setStore({ showModalDetails: false })
							Swal.fire({
								icon: 'error',
								text: result.message,
								timer: 3000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat
						`,
								backdrop: `
						rgba(0,0,123,0.4)
						url("https://media2.giphy.com/media/jq0BlOhhKKv8tO9oOz/giphy.gif?cid=6c09b952u3u8dsur3de499ls2qzc1i2hzuummvnuay3h7a5j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s")
						right top 
						no-repeat
						`
							})
						}
					} else if (type === "edit") {
						const response2 = await fetch(process.env.BACKEND_URL + `/vehicles/${uid}`, {
							method: 'GET'
						})
						const result2 = await response2.json()
						setStore({ vehicleEdit: result2.Vehicles })

					}
				} catch (error) {
					console.log(error + " Error in getVehiclesById")
				}
			},
			addVehicles: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let vehicles = {}
					if (store.uid != null) {
						vehicles.uid = store.uid
						vehicles.url = `https://www.swapi.tech/api/vehicles/${store.uid}`
					}
					if (store.name != null) {
						vehicles.name = store.name
					}
					const response = await fetch(process.env.BACKEND_URL + '/vehicles', {
						method: 'POST',
						body: JSON.stringify(vehicles),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()
					if (result.msg == "ok") {
						actions.handleDeleteModal()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Vehicles.uid} - ${result.Vehicles.name} was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
						})
						actions.clearStore()
					}
					else {
						actions.showSwalError(result.message)
						actions.clearStore()
					}
				} catch (error) {
					console.log(error + " Error in addVehicles")
				}
			},
			editVehicles: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let vehicles = {}

					vehicles.name = store.name

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/${uid}`, {
						method: 'PUT',
						body: JSON.stringify(vehicles),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Vehicles.uid} - ${result.Vehicles.name} details was successfully edited`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
									url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
									no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
									url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
									right top 
									no-repeat`
						})
					} else if (store.name != null) {
						actions.editVehicles(uid)
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in editVehicles")
				}

			},
			deleteVehicles: async (uid, name) => {
				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/${uid}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ deleted: true })
						Swal.fire({
							title: 'Deleted!',
							text: `The vehicle ${name} was deleted`,
							icon: 'success',
							showConfirmButton: false,
							color: '#FFFFFF',
							background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
							timer: 3000,
							backdrop: `
						rgba(0,0,123,0.4)
						url("https://i.pinimg.com/originals/96/ea/bc/96eabc812b02070e025cb41776b91803.gif")
						right top 
						no-repeat
						`
						})
						setStore({ deleted: false })
					}
					else {
						actions.showSwalError(result.message)
					}
				} catch (error) {
					console.log(error + " Error in deleteVehicle")
				}
			},
			addVehiclesDetails: async () => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let vehiclesDetails = {}
					if (store.uid != null) {
						vehiclesDetails.uid = store.uid
					}
					if (store.description != null) {
						vehiclesDetails.description = store.description
					}
					if (store.model != null) {
						vehiclesDetails.model = store.model
					}
					if (store.class != null) {
						vehiclesDetails.vehicle_class = store.class
					}
					if (store.manufacturer != null) {
						vehiclesDetails.manufacturer = store.manufacturer
					}
					if (store.costInCredits != null) {
						vehiclesDetails.cost_in_credits = store.costInCredits
					}
					if (store.length != null) {
						vehiclesDetails.length = store.length
					}
					if (store.crew != null) {
						vehiclesDetails.crew = store.crew
					}
					if (store.passengers != null) {
						vehiclesDetails.passengers = store.passengers
					}
					if (store.maxAtmospheringSpeed != null) {
						vehiclesDetails.max_atmosphering_speed = store.maxAtmospheringSpeed
					}
					if (store.cargoCapacity != null) {
						vehiclesDetails.cargo_capacity = store.cargoCapacity
					}
					if (store.consumables != null) {
						vehiclesDetails.consumables = store.consumables
					}

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/details`, {
						method: 'POST',
						body: JSON.stringify(vehiclesDetails),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						actions.handleDeleteModalDetails()
						Swal.fire({
							title: "Do it!!!",
							text: `${result.Vehicles_details.uid} - ${result.Vehicles_details.properties.name} details was successfully added`,
							timer: 3000,
							padding: "2em",
							color: "#FFC107",
							showConfirmButton: false,
							background: `#000000
								url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
								no-repeat`,
							backdrop: `rgba(0,0,123,0.4)
								url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
								right top 
								no-repeat`
						})
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addVehiclesDetails")
				}
			},
			editVehiclesDetails: async (uid) => {
				try {
					const store = getStore()
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let vehiclesDetails = {}

					if (store.description != null) {
						vehiclesDetails.description = store.description
					}
					if (store.model != null) {
						vehiclesDetails.model = store.model
					}
					if (store.class != null) {
						vehiclesDetails.vehicle_class = store.class
					}
					if (store.manufacturer != null) {
						vehiclesDetails.manufacturer = store.manufacturer
					}
					if (store.costInCredits != null) {
						vehiclesDetails.cost_in_credits = store.costInCredits
					}
					if (store.length != null) {
						vehiclesDetails.length = store.length
					}
					if (store.crew != null) {
						vehiclesDetails.crew = store.crew
					}
					if (store.passengers != null) {
						vehiclesDetails.passengers = store.passengers
					}
					if (store.maxAtmospheringSpeed != null) {
						vehiclesDetails.max_atmosphering_speed = store.maxAtmospheringSpeed
					}
					if (store.cargoCapacity != null) {
						vehiclesDetails.cargo_capacity = store.cargoCapacity
					}
					if (store.consumables != null) {
						vehiclesDetails.consumables = store.consumables
					}
					if (vehiclesDetails != {}) {

						const response = await fetch(process.env.BACKEND_URL + `/vehicles/details/${uid}`, {
							method: 'PUT',
							body: JSON.stringify(vehiclesDetails),
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + token
							}
						})
						const result = await response.json()
						if (result.msg == "ok") {
							actions.handleDeleteModalDetails()
							Swal.fire({
								title: "Do it!!!",
								text: `${result.Vehicles_details.uid} - ${result.Vehicles_details.properties.name} details was successfully edited`,
								timer: 3000,
								padding: "2em",
								color: "#FFC107",
								showConfirmButton: false,
								background: `#000000
							url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
							no-repeat`,
								backdrop: `rgba(0,0,123,0.4)
							url("https://media0.giphy.com/media/ZXAbA9dyEOqaLhNdPE/giphy.gif?cid=6c09b952l37rqthw96yc4srwsebezvgfxt5rzhmawchyf5ne&ep=v1_stickers_related&rid=giphy.gif&ct=s")
							right top 
							no-repeat`
							})
						} else if (store.name != null) {
							actions.editVehicles(uid)
						}
						else {
							actions.showSwalError(result.message)
						}
					}

				} catch (error) {
					console.log(error + " Error in editVehiclesDetails")
				}
			},
			getVehiclesFavorites: async () => {

				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/favorites`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ favoritesVehicles: result.Results })
					} else {
						setStore({ favoritesVehicles: [] })
					}

				} catch (error) {
					console.log(error + " Error in getVehiclesFavorites")
				}
			},
			addFavoritesVehicles: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.vehicles_uid = uid

					const response = await fetch(process.env.BACKEND_URL + '/vehicles/favorites', {
						method: 'POST',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getVehiclesFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addVehiclesFavorites")
				}

			},
			deleteFavoritesVehicles: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.vehicles_uid = uid

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/favorites`, {
						method: 'DELETE',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getVehiclesFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in deleteVehiclesFavorites")
				}
			},

			//<---------------------------Starships------------------------------>//
			getStarshipsFavorites: async () => {

				try {
					const token = localStorage.getItem('jwt-token')

					const response = await fetch(process.env.BACKEND_URL + `/starships/favorites`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					const result = await response.json()

					if (result.msg == "ok") {
						setStore({ favoritesStarships: result.Results })
					} else {
						setStore({ favoritesStarships: [] })
					}

				} catch (error) {
					console.log(error + " Error in getStarshipsFavorites")
				}
			},
			addFavoritesStarships: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.starships_uid = uid

					const response = await fetch(process.env.BACKEND_URL + '/starships/favorites', {
						method: 'POST',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getStarshipsFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in addStarshipsFavorites")
				}

			},
			deleteFavoritesStarships: async (uid) => {
				try {
					const actions = getActions()
					const token = localStorage.getItem('jwt-token')

					let favorite = {}

					favorite.starships_uid = uid

					const response = await fetch(process.env.BACKEND_URL + `/starships/favorites/${uid}`, {
						method: 'DELETE',
						body: JSON.stringify(favorite),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})

					const result = await response.json()
					if (result.msg == "ok") {
						actions.getStarshipsFavorites()
					}
					else {
						actions.showSwalError(result.message)
					}

				} catch (error) {
					console.log(error + " Error in deleteStarshipsFavorites")
				}
			},


			clearStore: () => {

				setStore({ email: null })
				setStore({ phone: null })
				setStore({ password: null })
				setStore({ confirmPassword: null })
				setStore({ isActive: null })
				setStore({ role: null })
				setStore({ user: null })


				setStore({ uid: null })
				setStore({ name: null })
				setStore({ url: null })
				setStore({ description: null })

				setStore({ character: null })
				setStore({ characterEdit: null })
				setStore({ height: null })
				setStore({ mass: null })
				setStore({ skinColor: null })
				setStore({ eyeColor: null })
				setStore({ birthYear: null })
				setStore({ gender: null })
				setStore({ homeworld: null })
				setStore({ character: null })
				setStore({ characterEdit: null })

				setStore({ planet: null })
				setStore({ planetEdit: null })
				setStore({ diameter: null })
				setStore({ rotationPeriod: null })
				setStore({ orbitalPeriod: null })
				setStore({ gravity: null })
				setStore({ population: null })
				setStore({ climate: null })
				setStore({ terrain: null })
				setStore({ surfaceWater: null })

				setStore({ vehicle: null })
				setStore({ vehicleEdit: null })
				setStore({ model: null })
				setStore({ class: null })
				setStore({ manufacturer: null })
				setStore({ costInCredits: null })
				setStore({ length: null })
				setStore({ crew: null })
				setStore({ passengers: null })
				setStore({ maxAtmospheringSpeed: null })
				setStore({ cargoCapacity: null })
				setStore({ consumables: null })

				setStore({ starship: null })
				setStore({ starshipEdit: null })
				setStore({ hyperdrive: null })
				setStore({ mglt: null })

			},
			showSwalError: (message) => {
				Swal.fire({
					icon: 'error',
					text: message,
					timer: 3000,
					padding: "2em",
					color: "#FFC107",
					showConfirmButton: false,
					background: `#000000
						url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
						no-repeat`,
					backdrop: `rgba(0,0,123,0.4)
						url("https://media2.giphy.com/media/QC0iYuIqKccSoLW0Bf/200.gif?cid=95b27944solsgq6e6y3ixpq7t2w3f6jdgizt5fodhuqjmha0&ep=v1_gifs_gifId&rid=200.gif&ct=s")
						right top 
						no-repeat`
				})
			},
			handleShowModal: () => {
				setStore({ showModal: true })
			},
			handleDeleteModal: () => {
				const actions = getActions()
				setStore({ showModal: false })
				actions.clearStore()
			},
			handleShowModalDetails: () => {
				setStore({ showModalDetails: true })
			},
			handleDeleteModalDetails: () => {
				const actions = getActions()
				setStore({ showModalDetails: false })
				actions.clearStore()
			},
			handleChange: (e) => {
				setStore({ [e.target.name]: e.target.value })
			},
		}
	};
};
export default getState;
