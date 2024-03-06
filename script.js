import Heroes from "./src/script/heroes.js";
import Comics from "./src/script/comics.js";
import { getHtml } from "./src/services/service.js";

const mainContainer = document.querySelector("main")
const toCharactersBtn = document.querySelector("#to-characters")
const toComicsBtn = document.querySelector("#to-comics")

let currentContent = "characters"
let heroComponent
let comicsComponent

toCharactersBtn.addEventListener("click", () => changeContent("characters"))
toComicsBtn.addEventListener("click", () => changeContent("comics"))

function renderContent() {
	if (currentContent === "characters") {
		getHtml("characters")
			.then(data => mainContainer.innerHTML = data)
			.then(() => { heroComponent = new Heroes() })
	}

	if (currentContent === "comics") {
		getHtml("comics")
			.then(data => mainContainer.innerHTML = data)
			.then(() => { comicsComponent = new Comics() })
	}
}

renderContent()

function changeContent(content) {
	if (currentContent !== content) {
		currentContent = content
		renderContent()
	}
}
