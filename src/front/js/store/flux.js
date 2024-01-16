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
			emailSent : false,

			phone: null,
			email: null,
			role: null,
			isActive: null,
			password: null,
			confirmPassword: null,

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
			diameter: null,
			rotationPeriod: null,
			orbitalPeriod: null,
			gravity: null,
			population: null,
			climate: null,
			terrain: null,
			surfaceWater: null,


			model: null,
			class: null,
			manufacturer: null,
			constInCredits: null,
			length: null,
			crew: null,
			passengers: null,
			maxAtmospheringSpeed: null,
			cargoCapacity: null,
			consumables: null,


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
							setTimeout(actions.logOut, 600000)

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
			resetPassword : async () =>{
				try{
				const store = getStore()
				const actions = getActions()

				const response = await fetch(process.env.BACKEND_URL + `/resetPassword/${store.email}`,{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const result = await response.json()

				if (result.msg == "ok"){
					setStore({ emailSent: true})
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
					setStore({emailSent: false})
				}else{
					actions.showSwalError(result.message)
					actions.clearStore()
				}
			}catch (error) {
				console.log(error + " Error in resetPassword")
			}
			},

			//<---------------------------User------------------------------>//
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
					console.log(result);
					if (result.msg == "ok"){
						setStore({ userLogin: result.User })
						localStorage.setItem("userLogin", JSON.stringify(result.User))
					}else{
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
						actions.getUserById(result.User.id)
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
						console.log(result2);
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
					console.log(error + " Error in addPeopleDeatils")
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
					} else {
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

			//<---------------------------Vehciles------------------------------>//
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

					const response = await fetch(process.env.BACKEND_URL + `/vehicles/favorites/${uid}`, {
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


				setStore({ uid: null })
				setStore({ name: null })
				setStore({ url: null })
				setStore({ description: null })

				setStore({ height: null })
				setStore({ mass: null })
				setStore({ skinColor: null })
				setStore({ eyeColor: null })
				setStore({ birthYear: null })
				setStore({ gender: null })
				setStore({ homeworld: null })

				setStore({ diameter: null })
				setStore({ rotationPeriod: null })
				setStore({ orbitalPeriod: null })
				setStore({ gravity: null })
				setStore({ population: null })
				setStore({ climate: null })
				setStore({ terrain: null })
				setStore({ surfaceWater: null })

				setStore({ model: null })
				setStore({ class: null })
				setStore({ manufacturer: null })
				setStore({ constInCredits: null })
				setStore({ length: null })
				setStore({ crew: null })
				setStore({ passengers: null })
				setStore({ maxAtmospheringSpeed: null })
				setStore({ cargoCapacity: null })
				setStore({ consumables: null })

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
				const store = getStore()
				const actions = getActions()
				setStore({ showModal: true })
			},
			handleDeleteModal: () => {
				const actions = getActions()
				setStore({ showModal: false })
				setStore({ character: null })
				actions.clearStore()
			},
			handleShowModalDetails: () => {
				const store = getStore()
				const actions = getActions()
				setStore({ showModalDetails: true })
			},
			handleDeleteModalDetails: () => {
				const actions = getActions()
				setStore({ showModalDetails: false })
				setStore({ character: null })
				setStore({ characterEdit: null })
				actions.clearStore()
			},
			handleChange: (e) => {
				setStore({ [e.target.name]: e.target.value })
			},
		}
	};
};
export default getState;
