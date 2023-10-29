import { contactInfoData, socialNetworksData } from "../../constants/contact/contactInfoData.js"
import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class ContactInfo extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.contentLoader = contentLoader
        this.contactInfo = contactInfoData
        this.socialNetworks = socialNetworksData
    }

    async loadContent() {
        const templatePath = "/templates/contact/contact-info.html"
        const stylePath = "/styles/contact/contact-info.css"
        const nonce = "contact-info"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    renderContactInfo() {
        const fragment = new DocumentFragment()

        this.contactInfo.forEach((item) => {
            const contactItem = document.createElement("div")
            contactItem.classList.add("contact-item")

            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")
            contactItem.appendChild(imageContainer)

            const itemImage = document.createElement("img")
            itemImage.src = item.image.src
            itemImage.alt = item.image.alt
            itemImage.loading = "lazy"
            itemImage.height = 30
            itemImage.width = 30
            itemImage.classList.add("contact-image")
            imageContainer.appendChild(itemImage)

            const imageType = document.createElement("span")
            imageType.textContent = item.type
            imageType.classList.add("contact-type")
            imageContainer.appendChild(imageType)

            const contactValue = document.createElement("p")
            contactValue.textContent = item.value
            contactValue.classList.add("contact-value")
            contactItem.appendChild(contactValue)

            fragment.appendChild(contactItem)
        })
        const contactContainer = this.shadowRoot.getElementById("contactInfo")
        contactContainer.appendChild(fragment)
    }

    renderSocialNetworks() {
        const socialNetworksContainer = this.shadowRoot.getElementById("socialNetworks")

        const fragment = new DocumentFragment()

        this.socialNetworks.forEach((item) => {
            const networkLink = document.createElement("a")
            networkLink.href = item.link
            networkLink.target = "_blank"

            const linkImage = document.createElement("img")
            linkImage.src = item.image.src
            linkImage.alt = item.image.alt
            linkImage.loading = "lazy"
            linkImage.height = 45
            linkImage.width = 45
            linkImage.classList.add("network-image")
            networkLink.appendChild(linkImage)

            fragment.append(networkLink)
        })

        socialNetworksContainer.appendChild(fragment)
    }

    async connectedCallback() {
        await this.loadContent()
        this.renderContactInfo()
        this.renderSocialNetworks()
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "contact-info",
    class extends ContactInfo {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
