import { getAllComics, getSoloComics } from "../services/service.js"


class Comics {
	constructor() {
		this.allComics = document.querySelector(".comics__cards")
		this.comicsMore = document.querySelector(".comics__more")
		this.modal = document.querySelector(".modal")
		this.modalWindowCancel = document.querySelector(".modal__window")
		this.modalWindowInfo = document.querySelector(".modal__info")
		this.comicsTitle = document.querySelector(".comics h2")
		this.offset = 200
		this.initialComics()
	}

	initialComics() {
		getAllComics(this.offset).then(data => {
			this.allComics.innerHTML = ""
			this.comicsMore.style.display = "block"
			this.comicsTitle.style.display = "block"
			this.render(data)
		})

		this.comicsMore.addEventListener("click", () => {
			this.loadMoreComics()
		})


		this.allComics.addEventListener("click", (event) => {
			let clickedComics = event.target.closest(".comics__cards-info")
			if (clickedComics) {
				getSoloComics(clickedComics.dataset.id)
					.then(data => this.renderModal(data))
			}
		})

		this.modal.addEventListener("click", (event) => {
			if (event.target.closest(".modal__close-btn")) {
				this.modal.classList.remove("modal__active")
			}
		})

	}

	renderModal(data) {
		this.modal.classList.add("modal__active")
		const comic = data.data.results[0]
		const { title, thumbnail, prices, textObjects, urls } = comic
		console.log(comic)
		this.modal.innerHTML =
			`<div class="modal__window">
        <button class="modal__close-btn">x</button> 
        <div class="row">
        <img src="${thumbnail.path}.${thumbnail.extension}" alt="">  
        <div class="modal__window-content">
        <h3>${title}</h3>
        <p>${textObjects.length === 0 ? "Info is not founded" : textObjects[0].text}</p>
        <p>Price: ${prices[0].price}</p>
        <a href="${urls[0].url}" class="buy">Купити</a>
        </div>
        </div>
    </div>`


	}

	loadMoreComics() {
		this.offset += 20
		getAllComics(this.offset).then(data => this.render(data))
	}
	render(data) {
		const comic = data.data.results
		console.log(comic)
		comic.forEach(element => {
			const { id, title, thumbnail } = element
			this.allComics.innerHTML +=
				`<div class="comics__cards-info" data-id="${id}">
                  <img src="${thumbnail.path}.${thumbnail.extension}" alt="${title}">
                  <h3>${title}</h3>
                  </div>`
			console.log(data.data.results)
		})
	}
}


export default Comics