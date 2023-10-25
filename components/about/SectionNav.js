import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class SectionNav extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.sections = undefined
        this.observer = undefined
        this.targetSection = 0
        this.entry = undefined
    }

    async loadContent() {
        const templatePath = "/templates/about/section-nav.html"
        const stylePath = "/styles/about/section-nav.css"
        const nonce = "section-nav"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    initObserver() {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.0,
            trackVisibility: true,
            delay: 200,
        }

        this.observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && entry.isVisible) {
                    const parentSection = entry.target.parentNode.parentNode.host.parentNode

                    const sectionIndex = Array.from(this.sections).indexOf(parentSection)
                    this.targetSection = sectionIndex

                    this.entry = entry
                }
            }
        }, options)

        this.sections.forEach((section) => {
            const mainContainer =
                section.firstElementChild.shadowRoot.firstElementChild.firstElementChild
            console.log(mainContainer)

            this.observer.observe(mainContainer)
        })
    }

    navigation(direction) {
        const newIndex = this.targetSection + direction

        const currentSection = this.sections[this.targetSection]

        if (
            this.entry.isVisible &&
            direction === -1 &&
            currentSection.getBoundingClientRect().y < 0
        ) {
            currentSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        } else if (newIndex >= 0 && newIndex <= 2) {
            const toNavigateSection = this.sections[newIndex]
            toNavigateSection.scrollIntoView({
                behavior: "smooth",
            })
        }
    }

    async connectedCallback() {
        await this.loadContent()

        this.sections = document.querySelectorAll("section")

        this.previousButton = this.shadowRoot.getElementById("prevNav")
        this.previousButton.addEventListener("click", () => this.navigation(-1))

        this.nextButton = this.shadowRoot.getElementById("nextNav")
        this.nextButton.addEventListener("click", () => this.navigation(+1))

        this.initObserver()
    }

    disconnectedCallback() {
        this.previousButton.removeEventListener("click", () => this.navigation())
        this.nextButton.removeEventListener("click", () => this.navigation())

        this.observer.disconnect()
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "section-nav",
    class extends SectionNav {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
