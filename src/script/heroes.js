import { getAllCharacters, getCharacter } from "../services/service.js"

class Heroes {
	constructor() {
		this.randomButton = document.querySelector(".random__hero-btn")
		this.allHeroes = document.querySelector(".heros")
		this.moreBtn = document.querySelector(".more")
		this.randomCard = document.querySelector(".random__card .row")
		this.heroElement = document.querySelector(".heroes__card")
		this.offset = 0
		this.initialHeroes()
		this.randomHero()
	}

	initialHeroes() {
		getAllCharacters(this.offset).then(data => {
			this.allHeroes.innerHTML = ""
			this.render(data)
		})

		this.moreBtn.addEventListener("click", () => {
			this.moreBtn.disabled = true
			setTimeout(() => {
				this.moreBtn.disabled = false
			}, 1000)
			this.loadMoreHero()
		})
		
		this.randomButton.addEventListener("click", () => this.randomHero())
		this.allHeroes.addEventListener("click", (event) => {
			let clickedCard = event.target.closest(".hero")
			if (clickedCard) {
				getCharacter(clickedCard.dataset.id).then(data => this.renderInfoHero(data))
			}
		}) 
	}

	renderInfoHero(data) {
		const { name, description, urls, thumbnail, comics} = data.data.results[0]
		let comicsElemetn = ""

		if (comics.items.length > 0) {
			comics.items.forEach(element => {
				comicsElemetn += `
				<div class="heroes__info-text">
				<a clas="button__text "href="${element.resourceURI}">${element.name}</a>
				</div>
				`
			})
		}
		console.log(comicsElemetn)
		this.heroElement.innerHTML = `
		<div class="row">
		<img class="random__hero-img" src="${thumbnail.path}.${thumbnail.extension}" alt="">
							<div class="heroes__info">
								<h3>${name}</h3>
								<p>${description}</p>
								<a href="${urls.length > 0 ? urls[0].url : "https://www.google.com"}">Homepage</a>
							</div>
						</div>
						<h3>Comics Whith the Characters</h3>
						${comicsElemetn}
		`
	}

	render(data) {
		const array = data.data.results


		array.forEach(element => {
			this.allHeroes.innerHTML +=
				`<div class="hero" data-id="${element.id}">
				  <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="">
				  <h3>${element.name}</h3>
				  </div>`
		})

		
	}

	loadMoreHero() {
		this.offset += 20
		getAllCharacters(this.offset).then(data => this.render(data))
		
	}

	
	renderRandomHero(hero) {
		const { name, description, urls, thumbnail } = hero

		this.randomCard.innerHTML = `
		<img class="random__hero-img" src="${thumbnail.path}.${thumbnail.extension}" alt="">
		<div class="card__info">
			<h3>${name ? name : "Name is not defined"}</h3>
			<p>${description ? description : "Descr is not defined"}</p>
			<a href="${urls.length > 0 ? urls[0].url : "https://www.google.com"}">Homepage</a>
		</div>`
	}

	randomHero() {
		this.randomCard.innerHTML = `<img src="/src/image/spiner.png" alt="">`
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id)
			.then(data => this.renderRandomHero(data.data.results[0]))
			.catch(() => this.randomCard.innerHTML = `<img src="/src/image/404.png" alt="">`)
	}

	
}

export default Heroes



