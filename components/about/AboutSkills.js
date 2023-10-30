import { skillsData } from "../../constants/about/aboutSkillsData.js"
import { ContentLoaderInterface } from "../../interfaces/ContentLoaderInterface.js"
import { ContentLoaderInjector } from "../../util/ContentLoaderInjector.js"

class AboutSkills extends HTMLElement {
    /**
     *
     * @param {ContentLoaderInterface} contentLoader
     */
    constructor(contentLoader) {
        super()
        this.attachShadow({ mode: "open" })
        this.skillsData = skillsData
        this.contentLoader = contentLoader
        this.formButton = undefined
    }

    async loadContent() {
        const templatePath = "/templates/about/about-skills.html"
        const stylePath = "/styles/about/about-skills.css"
        const nonce = "about-skills"

        const { template, style } = await this.contentLoader.loadContent(
            templatePath,
            stylePath,
            nonce
        )

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.appendChild(style)
    }

    renderSkills(skills) {
        const skillsContainer = this.shadowRoot.getElementById("skillsContainer")

        const sortedData = skills.sort((a, b) => b.progress - a.progress)

        const fragment = new DocumentFragment()

        sortedData.forEach((data) => {
            const mainContainer = document.createElement("div")
            mainContainer.classList.add("skill")

            const skillName = document.createElement("p")
            skillName.classList.add("skill-name")
            skillName.textContent = data.skill
            mainContainer.appendChild(skillName)

            const progressContainer = document.createElement("div")
            progressContainer.classList.add("progress-container")

            const progressBar = document.createElement("div")
            progressBar.classList.add("progress-bar")

            const progressSpan = document.createElement("span")
            progressSpan.classList.add("progress-bar-fill")
            progressSpan.style.width = data.progress + "%"
            progressBar.appendChild(progressSpan)

            progressContainer.appendChild(progressBar)

            mainContainer.appendChild(progressContainer)

            fragment.appendChild(mainContainer)
        })

        const tempDiv = document.createElement("div")
        tempDiv.appendChild(fragment)

        skillsContainer.innerHTML = tempDiv.innerHTML
    }

    addSkill() {
        const skillForm = this.shadowRoot.getElementById("skillForm")

        const skill = skillForm["skill"]
        const isSkillValid = this.validateField(skill)

        const progress = skillForm["progress"]
        const isProgressValid = this.validateField(progress)

        if (isSkillValid && isProgressValid) {
            this.formButton.classList.toggle("clicked")

            this.skillsData.push({ skill: skill.value, progress: progress.value })

            this.renderSkills(this.skillsData)

            this.shadowRoot.getElementById("skill").value = ""
            this.shadowRoot.getElementById("progress").value = ""

            setTimeout(() => {
                this.formButton.classList.toggle("clicked")
            }, 500)
        }
    }

    validateField(field) {
        const fieldLabel = this.shadowRoot.querySelector(`label[for=${field.id}]`)

        const existingErrorMessage = fieldLabel.querySelector("#errorMessage")

        const isValidField = field.checkValidity()

        if (!isValidField) {
            if (existingErrorMessage) {
                fieldLabel.removeChild(existingErrorMessage)
            }

            const errorMessageElement = document.createElement("div")
            errorMessageElement.id = "errorMessage"
            errorMessageElement.classList.add("error-message")

            if (!field.value) {
                const capitalized = field.id.at(0).toUpperCase() + field.id.slice(1)
                errorMessageElement.textContent = `${capitalized} field is required`
            } else {
                errorMessageElement.textContent = `Please enter a valid value`
            }

            fieldLabel.appendChild(errorMessageElement)

            field.classList.add("error-input")
        } else if (isValidField && existingErrorMessage) {
            fieldLabel.removeChild(existingErrorMessage)
            field.classList.remove("error-input")
        }

        return isValidField
    }

    async connectedCallback() {
        await this.loadContent()

        this.renderSkills(this.skillsData)

        this.formButton = this.shadowRoot.getElementById("addButton")
        this.formButton.addEventListener("click", () => this.addSkill())
    }

    disconnectedCallback() {
        this.formButton.removeEventListener("click", () => this.addSkill())
    }
}

const contentLoaderInstance = ContentLoaderInjector.getInstance()

customElements.define(
    "about-skills",
    class extends AboutSkills {
        constructor() {
            super(contentLoaderInstance)
        }
    }
)
