import { ContentLoaderInterface } from "../interfaces/ContentLoaderInterface.js"

export class ContentLoader extends ContentLoaderInterface {
    /**
     * @inheritdoc
     */
    async loadContent(templatePath, stylePath, nonce) {
        const [html, css] = await Promise.all([
            fetch(templatePath).then((response) => response.text()),
            fetch(stylePath).then((response) => response.text()),
        ])

        const template = document.createElement("template")
        template.innerHTML = html

        const style = document.createElement("style")
        style.textContent = css
        style.setAttribute("nonce", nonce)

        return { template, style }
    }
}
