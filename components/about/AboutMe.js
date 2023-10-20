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

    renderSlots() {
        const mainContainer = this.shadowRoot.getElementById("aboutContainer")

        const leftAbout = document.createElement("div")
        leftAbout.classList.add("left-about")

        const rightAbout = document.createElement("div")
        rightAbout.classList.add("right-about")

        const lightFragment = new DocumentFragment()
        const shadowFragment = new DocumentFragment()

        this.slotsData.forEach((data) => {
            const slot = document.createElement("slot")
            slot.name = data.slot
            if (data.slot === "story-title" || data.slot === "story") {
                leftAbout.appendChild(slot)
            } else if (data.slot === "bright-side" || data.slot === "dark-side") {
                rightAbout.appendChild(slot)
            } else {
                shadowFragment.appendChild(slot)
            }

            const element = document.createElement(data.tag)
            element.slot = data.slot
            element.textContent = data.content
            lightFragment.appendChild(element)
        })

        shadowFragment.appendChild(leftAbout)
        shadowFragment.appendChild(rightAbout)
        mainContainer.appendChild(shadowFragment)
        this.appendChild(lightFragment)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderSlots()
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
