const readTemplate = document.createElement("template")
readTemplate.innerHTML = `
<button class="open">README</button>
<dialog class="show">
<slot name="read-me"></slot> 
<button class="close">close</button>
</dialog>
`

class ReadMe extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(readTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .open{
            z-index: 2;
            position: fixed;
            top: 17.5%;
            left: 3%;
            color: var(--color-grey-1);
            background-color: var(--color-contact);
            border: 2px solid var(--color-grey-1);
            padding: 0.3em 0.5em;
            font-weight: 300;
            cursor: pointer;
        }
        .show{
            padding: 1.5rem;
            font-size: 0.9rem;
            color: var(--color-about-text);
            background-color: var(--color-grey-6);
            border: 4px solid var(--color-grey-3);
        }
        .close{
            position: relative;
            top: 44%;
            left: 42%;
            color: var(--color-about-text);
            background-color: var(--color-grey-6);
            border: 3px solid var(--color-secondary);
            padding: 0.3em 0.5em;
            cursor: pointer;
        }
        @media only screen and (min-width: 2560px){
            .open{
                font-size: 1.4rem;
            }
            .show{
                padding: 2.7rem;
                font-size: 1.6rem;
                border: 6px solid var(--color-grey-3);
            }
            .close{
                border: 5px solid var(--color-secondary);
                font-size: 1.4rem;
            }
        }
        @media only screen and (max-width: 1024px){
            .open{
                font-size: 0.65rem;
                border: 1.5px solid var(--color-grey-1);
            }
            .show{
                padding: 1.2rem;
                font-size: 0.85rem;
            }
            .close{
                font-size: 0.8rem;
            }
        }
        @media only screen and (max-width: 426px){
            .show{
                padding: 0.8rem;
                font-size: 0.72rem;
            }
        }
        
        `
        this.shadowRoot.appendChild(style)
    }
    connectedCallback() {
        const readMe = this.shadowRoot.querySelector(".show")
        this.shadowRoot.querySelector(".open").addEventListener("click", () => readMe.showModal())
        this.shadowRoot.querySelector(".close").addEventListener("click", () => readMe.close())
    }
}

customElements.define("read-me", ReadMe)
