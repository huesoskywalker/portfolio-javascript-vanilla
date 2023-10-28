import { selectorData } from "/../../constants/portfolio/selectorData.js"
import { ContentLoaderInterface } from "/../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "/../../util/ContentLoaderInjector.js"

class PathSelector extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.selectorData = selectorData
        this.openModal = undefined
        this.modal = undefined
        this.confirmBtn = undefined
    }

    async loadContent() {
        const templatePath = "/templates/portfolio/path-selector.html"
        const stylePath = "/styles/portfolio/path-selector.css"
        const nonce = "path-selector"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    renderSelector() {
        const fragment = new DocumentFragment()

        const defaultOption = document.createElement("option")
        defaultOption.value = "default"
        defaultOption.textContent = "None"
        fragment.appendChild(defaultOption)

        Object.keys(this.selectorData).forEach((type) => {
            const optGroup = document.createElement("optgroup")
            optGroup.label = type

            this.selectorData[type].forEach((section) => {
                const option = document.createElement("option")
                option.value = section
                option.textContent = section
                optGroup.appendChild(option)
            })

            fragment.appendChild(optGroup)
        })
        this.pathSelector.appendChild(fragment)
    }

    displayModal() {
        this.modal.showModal()
    }

    selectPath() {
        this.confirmBtn.value = this.pathSelector.value
    }

    triggerItems() {
        const portfolioItems = document.getElementById("portfolioItems")

        portfolioItems.setAttribute("state", `${this.modal.returnValue}`)
    }

    async connectedCallback() {
        await this.loadContent()

        this.openModal = this.shadowRoot.getElementById("openModal")
        this.openModal.addEventListener("click", () => this.displayModal())

        this.modal = this.shadowRoot.getElementById("modal")
        this.modal.addEventListener("close", () => this.triggerItems())

        this.pathSelector = this.modal.querySelector("select")
        this.renderSelector()
        this.pathSelector.addEventListener("change", () => this.selectPath())

        this.confirmBtn = this.modal.querySelector("#confirmButton")
    }

    disconnectedCallback() {
        this.openModal.removeEventListener("click", () => this.displayModal())
        this.modal.removeEventListener("close", () => this.triggerItems())
        this.pathSelector.removeEventListener("change", () => this.selectPath())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "path-selector",
    class extends PathSelector {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
