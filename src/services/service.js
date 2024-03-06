import { _URL, _OPTION } from "./key.js"

async function getAllCharacters(offset) {
	try {

		const url = `${_URL}characters${_OPTION}&offset=${offset}`
		const res = await fetch(url)
		const data = await res.json()
	} catch (error) {
		
		return data
	}
}

async function getCharacter(id) {
	try {
		
		const url = `${_URL}characters/${id}${_OPTION}`
		const res = await fetch(url)
		const data = await res.json()
	} catch (error) {
		
		return data
	}
}

async function getAllComics(offset) {
	try {
		const url = `${_URL}comics${_OPTION}&offset=${offset}`
		const res = await fetch(url)
		const data = await res.json()
	} catch (error) {
		
		return data
	}
}

async function getSoloComics(id) {
	try {
		const url = `${_URL}comics/${id}${_OPTION}`
		const res = await fetch(url)
		const data = await res.json()
	} catch (error) {
		return data
	}
}

async function getHtml(content) {
	try {
		const url = `./src/pages/${content}.html`
		const res = await fetch(url)
		const data = await res.text()
	} catch (error) {
		
		return data
	}
}

export { getAllCharacters, getCharacter, getAllComics, getSoloComics, getHtml }

