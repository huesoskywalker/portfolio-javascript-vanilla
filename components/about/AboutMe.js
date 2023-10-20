import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { aboutMeData } from "../../constants/about/aboutMeData.js"

class AboutMe extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.slotsData = aboutMeData
        this
    }

    async loadContent() {
        const templatePath = "/templates/about/about-me.html"
        const stylePath = "/styles/about/about-me.css"
        const nonce = "about-me"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    renderData() {
        const mainContainer = this.shadowRoot.getElementById("aboutContainer")

        const leftAbout = document.createElement("div")
        leftAbout.classList.add("left-about")

        const rightAbout = document.createElement("div")
        rightAbout.classList.add("right-about")

        const shadowFragment = new DocumentFragment()

        this.slotsData.forEach((data) => {
            const element = document.createElement(data.tag)
            element.classList.add(data.class)
            element.textContent = data.content

            if (data.class === "story-title" || data.class === "story") {
                leftAbout.appendChild(element)
            } else if (data.class === "bright-side") {
                rightAbout.appendChild(element)
            } else {
                shadowFragment.appendChild(element)
            }
        })

        shadowFragment.appendChild(leftAbout)
        shadowFragment.appendChild(rightAbout)
        mainContainer.appendChild(shadowFragment)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderData()
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "about-me",
    class extends AboutMe {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
