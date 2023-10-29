import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"
import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"

class ContactMe extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader

        this.mailSubject = undefined
        this.mailMessage = undefined
        this.sendButton = undefined

        this.words = ""
        this.text = ""
        this.wordIndex = 0
    }

    async loadContent() {
        const templatePath = "/templates/contact/contact-me.html"
        const stylePath = "/styles/contact/contact-me.css"
        const nonce = "contact-me"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    writeSubject() {
        const current = this.wordIndex % this.words.length
        const fullText = this.words[current]

        let typeSpeed = 150

        this.text = fullText.substring(0, this.text.length + 1)
        this.mailSubject.value = this.text

        const timeoutID = setTimeout(() => this.writeSubject(), typeSpeed)

        if (this.text === fullText) {
            // document.querySelector("#resistance").setAttribute("state", "gogogo")
            clearTimeout(timeoutID)
            this.shadowRoot.getElementById("message").focus({ focusVisible: true })
        }
    }

    // farAway() {
    // we got this variable stored
    //     const message = this.shadowRoot.querySelector("#hisMessage")
    //     if (message.value.length > 0) {
    //         document.querySelector("#galaxy").setAttribute("state", "mtfbwy")
    //     }
    // }

    sendMail() {
        const messageWithRegards = this.mailMessage.value + "\n\nKind regards"

        if (this.mailMessage.value.length > 2) {
            const link =
                "mailto:huesoskywalker@gmail.com" +
                "?cc=" +
                "&subject=" +
                encodeURIComponent(this.mailSubject.value) +
                "&body=" +
                encodeURIComponent(messageWithRegards)

            window.open(link, "_blank")
        }
    }

    async connectedCallback() {
        await this.loadContent()

        this.mailSubject = this.shadowRoot.getElementById("subject")

        this.words = JSON.parse(this.mailSubject.getAttribute("data-words"))

        setTimeout(() => this.writeSubject(), 1000)

        this.mailMessage = this.shadowRoot.getElementById("message")
        // this.mailMessage.addEventListener("keypress", () => this.farAway())

        this.sendButton = this.shadowRoot.getElementById("mailSender")
        this.sendButton.addEventListener("click", () => this.sendMail())
    }
    disconnectedCallback() {
        this.sendButton.removeEventListener("click", () => this.sendMail())
        // this.mailMessage.removeEventListener('keypress', () => this.farAway())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "contact-me",
    class extends ContactMe {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
