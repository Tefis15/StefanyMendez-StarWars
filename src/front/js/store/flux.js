const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
			showModal: false,

		},
		actions: {

			handleShowModal: () => {
				const store = getStore()
				const actions = getActions()
				setStore({ showModal: true })
			},
			handleDeleteModal: () => {
				const actions = getActions()
				setStore({ showModal: false })

			},
			handleChange: (e) => {
				setStore({ [e.target.name]: e.target.value })
			},
		}
	};
};
export default getState;
