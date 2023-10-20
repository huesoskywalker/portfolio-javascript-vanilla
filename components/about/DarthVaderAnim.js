import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class DarthVaderAnim extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
    }
    async loadContent() {
        const templatePath = "/templates/about/darth-vader-anim.html"
        const stylePath = "/styles/about/darth-vader-anim.css"
        const nonce = "darth-vader-anim"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }
    deathStarActive() {
        const vader = document.getElementById("menuButton").getAttribute("state")
        const mode = document.getElementById("themeButton").getAttribute("state")

        if (vader === "open" && mode === "dark-side") {
            this.shadowRoot.querySelector("#wrapper").classList.add("wrapper")
            this.shadowRoot.getElementById("beamWrapper").classList.add("beam-wrapper")
            this.shadowRoot.getElementById("greenBeam").classList.add("beam", "green")
            this.shadowRoot.getElementById("whiteBeam").classList.add("beam", "white")
            this.shadowRoot.querySelector("#vader").classList.add("vader")
            document.querySelector("#darkside").style.visibility = "visible"
            document.querySelector("#storyTitle").style.visibility = "hidden"
            document.querySelector("#story").style.visibility = "hidden"
            document.querySelector("#brightside").style.visibility = "hidden"

            window.scrollTo({
                top: 0,
                behavior: "instant",
                // behavior: "smooth",
            })
        } else {
            this.shadowRoot.querySelector("#wrapper").classList.remove("wrapper")
            this.shadowRoot.getElementById("beamWrapper").classList.remove("beam-wrapper")
            this.shadowRoot.getElementById("greenBeam").classList.remove("beam", "green")
            this.shadowRoot.getElementById("whiteBeam").classList.remove("beam", "white")
            this.shadowRoot.querySelector("#vader").classList.remove("vader")
            document.querySelector("#darkside").style.visibility = "hidden"
            document.querySelector("#storyTitle").style.visibility = "visible"
            document.querySelector("#story").style.visibility = "visible"
            document.querySelector("#brightside").style.visibility = "visible"
        }
    }

    async connectedCallback() {
        await this.loadContent()
        document
            .getElementById("menuButton")
            .addEventListener("click", () => this.deathStarActive())

        // this is the approach, the light DOM
        // const thisStory = (this.querySelector("pre").style.display = "none")
    }
    disconnectedCallback() {
        document
            .getElementById("menuButton")
            .removeEventListener("click", () => this.deathStarActive())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "darth-vader-anim",
    class extends DarthVaderAnim {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
