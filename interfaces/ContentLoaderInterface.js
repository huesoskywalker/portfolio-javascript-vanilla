/**
 * @interface
 */

export class ContentLoaderInterface {
    /**
     * @param {string} templatePath
     * @param {string} stylePath
     * @param {string} nonce
     * @returns {Promise<{ template: HTMLTemplateElement, style: HTMLStyleElement}>}
     */

    async loadContent(templatePath, stylePath, nonce) {}
}
