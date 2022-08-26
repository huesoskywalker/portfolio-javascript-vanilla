const tittleTemplate = document.createElement("template")
tittleTemplate.innerHTML = `
<div class="contact-title">
    <h2>Contact <span>Me</span></h2>
</div>
<span class="bg-text">Greeting</span>

    `

class ContactTittle extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(tittleTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
            .contact-title {
                z-index: 1;
                text-align: center;
                margin-bottom: 8rem;
            }
            .bg-text {
                z-index: -1;
                position: absolute;
                justify-content: center;
                display: flex;
                margin-top: 10px;
                top: 0%;
                left: 51%;
                color: var(--color-bg-text);
                font-weight: 500;
                font-size: 8rem;
                text-transform: uppercase;
                transform: translateX(-50%);
            }
                h2 {
                    position: fixed;
                     top: 0%;
                    left: 37.5%;
                    text-transform: uppercase;
                    font-size: 4rem;
                    font-weight: 500;
                    color: var(--color-contact);
                }
                    span {
                        color: var(--color-secondary);
                    }

               
            @media only screen and (min-width: 2560px){
                .bg-text{
                    font-size: 10rem;
                }
                h2{
                    font-size: 5rem;
                    left: 41%;
                }
            }
            @media only screen and (max-width: 1024px){
                .bg-text{
                    font-size: 6.5rem;
                }
                h2{
                    font-size: 3rem;
                    top: 1%;
                    left: 36%;
                }
            }
            @media only screen and (max-width: 768px){
                h2{
                    left: 30%;
                }
            }
            @media only screen and (max-width: 426px){
                .bg-text{
                    top: 1%;
                    font-size: 2.6rem;
                }
                h2{
                    font-size: 1.5rem;
                }
            }

        `
        this.shadowRoot.appendChild(style)
    }
}

customElements.define("contact-tittle", ContactTittle)
