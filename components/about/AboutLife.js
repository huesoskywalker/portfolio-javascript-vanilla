import { aboutLifeData } from "../../constants/about/aboutLifeData.js"
import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
class AboutLife extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.lifeData = aboutLifeData
    }
    async loadContent() {
        const templatePath = "/templates/about/about-life.html"
        const stylePath = "/styles/about/about-life.css"
        const nonce = "about-life"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }
    renderData() {
        const timeline = this.shadowRoot.getElementById("timeline")

        const sortedData = this.lifeData.sort((a, b) => b.duration.localeCompare(a.duration))

        const fragment = new DocumentFragment()

        sortedData.forEach((data) => {
            const timelineItem = document.createElement("div")
            timelineItem.classList.add("timeline-item")

            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")

            const itemImg = document.createElement("img")
            // itemImg.src = data.image.src
            // itemImg.alt = data.image.alt
            itemImg.loading = "lazy"
            imageContainer.appendChild(itemImg)

            const itemDuration = document.createElement("span")
            itemDuration.classList.add("item-duration")
            itemDuration.textContent = data.duration
            imageContainer.appendChild(itemDuration)

            timelineItem.appendChild(imageContainer)

            const titleContainer = document.createElement("div")
            titleContainer.classList.add("title-container")

            const itemTitle = document.createElement("h2")
            itemTitle.textContent = data.title
            itemTitle.classList.add("item-title")
            titleContainer.appendChild(itemTitle)

            if (data.link) {
                const itemLink = document.createElement("a")
                itemLink.href = data.link
                itemLink.target = "_blank"

                const linkText = document.createElement("span")
                linkText.classList.add("item-link")
                linkText.textContent = data.linkText
                itemLink.appendChild(linkText)

                titleContainer.appendChild(itemLink)
            }

            timelineItem.appendChild(titleContainer)

            const itemDescription = document.createElement("p")
            itemDescription.classList.add("item-description")
            itemDescription.textContent = data.description
            timelineItem.appendChild(itemDescription)

            fragment.appendChild(timelineItem)
        })

        timeline.appendChild(fragment)
    }
    async connectedCallback() {
        await this.loadContent()
        this.renderData()
    }

    disconnectedCallback() {}
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "about-life",
    class extends AboutLife {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
