import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class PortfolioTittle extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader

        this.textElement = undefined
        this.words = ""
        this.wait = 0
        this.text = ""
        this.wordIndex = 0
        this.isDeleting = false
        this.timeoutId = null
    }
    async loadContent() {
        const templatePath = "/templates/portfolio/portfolio-title.html"
        const stylePath = "/styles/portfolio/portfolio-title.css"
        const nonce = "portfolio-title"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    type() {
        const current = this.wordIndex % this.words.length
        const fullText = this.words[current]

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1)
        } else {
            this.text = fullText.substring(0, this.text.length + 1)
        }

        this.textElement.innerHTML = `<span>${this.text}</span>`

        let typeSpeed = 300

        if (this.isDeleting) {
            typeSpeed /= 2
        }

        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait
            this.isDeleting = true
        } else if (this.isDeleting && this.text === "") {
            this.isDeleting = false
            typeSpeed = 500
        }

        this.timeoutId = setTimeout(() => this.type(), typeSpeed)
    }

    async connectedCallback() {
        await this.loadContent()

        this.textElement = document.getElementById("typeText")

        this.words = JSON.parse(this.textElement.getAttribute("data-words"))

        this.wait = JSON.parse(this.textElement.getAttribute("data-wait"), 10)

        setTimeout(() => this.type(), 500)
    }

    disconnectedCallback() {
        clearTimeout(this.timeoutId)
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "portfolio-tittle",
    class extends PortfolioTittle {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
