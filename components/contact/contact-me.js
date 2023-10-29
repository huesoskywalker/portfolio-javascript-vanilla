const formTemplate = document.createElement("template")
formTemplate.innerHTML = `
<div class="right-contact">
<form class="contact-form" onsubmit="return false">
    <div class="i-c-2"></div>
    <div class="input-control">
        <textarea
            name="subject"
            id="hisSubject"
            cols="1"
            rows="1"
            placeholder="SUBJECT"
            data-words='["Hello Agustin!"]'
            required
        ></textarea>
    </div>
    <div class="input-control">
        <textarea
            name="subject_text"
            id="hisMessage"
            cols="15"
            rows="8"
            placeholder="Message here..."
            required
        ></textarea>
    </div>
    <div class="submit">
        <button
            class="submit-btn"
            id="mailSender"
        >
            <span class="btn-text">Send</span>
        </button>
    </div>
</form>
</div>
`

class ContactMe extends HTMLElement {
    constructor(txtElement, words) {
        super()

        this.txtElement = txtElement
        this.words = words
        this.txt = ""
        this.wordIndex = 0
        this.isTyping = true
        if (this.words) {
            setTimeout(() => this.walkieTalkie(), 900)
        }

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(formTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .right-contact {
            flex: 3;
            margin-left: 5rem;
            margin-top: 5.5rem;
        }
        .contact-form{
            justify-content: center;
            align-items: center;
            
        }
            .input-control {
                margin: 1.1rem 0;
            }
            .i-c-2 {
                display: flex;
            }
            .i-c-2:last-child {
                    margin-left: 1.5rem;
                }
                input,
                textarea {
                    border-radius: 30px;
                    font-size: 1.1rem;
                    padding: 0.8rem 1.1rem;
                    outline: none;
                    border: none;
                    background-color: var(--color-input-form);
                    width: 100%;
                    color: var(--color-about-text);
                    resize: none;
                }           

            .submit-btn {
                z-index: 7;
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--color-input-form);
                overflow: hidden;
                font-weight: 600;
                border-radius: 30px;
                margin-left: 0.3rem;
                cursor: pointer;
                border: 2px solid var(--color-bg-text);
            }
 
                .btn-text {
                    font-size: 1rem;
                    padding: 0.4rem 1.6rem;
                    color: var(--color-about-text);
                }

                .submit-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translateX(-100%);
                    @include transition-ease;
                    z-index: 7;
                }

               
                .submit-btn:hover::before {
                    width: 100%;
                    height: 100%;
                    background-color: var(--color-input-form);
                    transform: translateX(0);
                    @include transition-ease;
                }
                .submit-btn:active{
                    transform: translateY(3px);
                    border: none;
                }
                @media only screen and (min-width: 2560px){
                    .right-contact{
                        margin-top: 9.5rem;
                    }
                    .input-control{
                        margin: 1.7rem 0;
                    }
                    input,
                    textarea {
                        font-size: 1.7rem;
                        padding: 1.3rem 1.6rem;
                    }
                    .btn-text {
                        font-size:1.6rem;
                        padding: 0.6rem 2rem;
                    }
                }
                @media only screen and (max-width: 1024px){
                    .right-contact{
                        margin-left: 1.5rem;
                    }
                    .input-control{
                        margin: 0.9rem 0;
                    }
                    input,
                    textarea {
                        font-size: 0.9rem;
                        padding: 0.6rem 0.9rem;
                    }
                    .btn-text {
                        font-size: 0.8rem;
                        padding: 0.3rem 1.4rem;
                    }
                }
                @media only screen and (max-width: 768px){
                    .submit{
                        margin-bottom: 4.4rem;
                    }
                }
                @media only screen and (max-width: 426px){
                    input,
                    textarea{
                        width: 80%;
                }
                .right-contact {
                    margin-top: 1.5rem;
                }
            }
        `

        this.shadowRoot.appendChild(style)
    }

    sendIt() {
        const mailTitle = this.shadowRoot.querySelector("#hisSubject").value.length
        const mailText = this.shadowRoot.querySelector("#hisMessage").value.length
        if (mailTitle > 2 && mailText > 2) {
            const link =
                "mailto:huesoskywalker@gmail.com" +
                "?cc=" +
                "&subject=" +
                encodeURIComponent(this.shadowRoot.querySelector("#hisSubject").value) +
                "&body=" +
                encodeURIComponent(this.shadowRoot.querySelector("#hisMessage").value)
            window.location.href = link
        }
    }

    walkieTalkie() {
        const current = this.wordIndex % this.words.length
        const fullTxt = this.words[current]
        let typeSpeed = 150
        const timeoutID = setTimeout(() => this.walkieTalkie(), typeSpeed)

        if (this.isTyping) {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }
        this.txtElement.innerHTML = `${this.txt}`

        if (this.isTyping && this.txt === fullTxt) {
            document.querySelector("#resistance").setAttribute("state", "gogogo")
            clearTimeout(timeoutID)
        }
    }

    farAway() {
        const message = this.shadowRoot.querySelector("#hisMessage")
        if (message.value.length > 0) {
            document.querySelector("#galaxy").setAttribute("state", "mtfbwy")
        }
    }

    init() {
        const txtElement = this.shadowRoot.querySelector("#hisSubject")
        const words = JSON.parse(txtElement.getAttribute("data-words"))
        new ContactMe(txtElement, words)

        this.shadowRoot.querySelector("#hisMessage").focus({ focusVisible: true })
    }
    connectedCallback() {
        // this.shadowRoot
        //     .querySelector("#hisMessage")
        //     .addEventListener("keypress", () => this.farAway())
        // this.shadowRoot.querySelector("#mailSender").addEventListener("click", () => this.sendIt())
        // this.shadowRoot.addEventListener("DOMContentLoaded", this.init())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#mailSender").removeEventListener()
        this.shadowRoot.querySelector("#hisSubject").removeEventListener()
        this.shadowRoot.querySelector("#hisMessage").removeEventListener()
        this.shadowRoot.removeEventListener()
    }
}
customElements.define("contact-me", ContactMe)
