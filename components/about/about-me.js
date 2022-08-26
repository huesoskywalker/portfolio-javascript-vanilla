const meTemplate = document.createElement("template")
meTemplate.innerHTML = `
<slot name="aka"></slot>
<div class="about-container">
<div class="left-about">
    <slot name="storyTittle"></slot>
    <div class="cover">
    <slot name="story"></slot>
    </div>
    </div>
    <div class="right-about">
    <slot name="brightside"></slot>
    <slot name="darkside"></slot>
</div>
</div>
<div id="vader"></div>
<div id="wrapper">
<div id="beam-wrapper">
    <div id="beam-green"></div>
    <div id="beam-white"></div>
</div>
</div>
`

class AboutMe extends HTMLElement {
    static get observedAttributes() {
        return ["story"]
    }
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(meTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        ::slotted(span) {
            z-index: -1;
            position: absolute;
            justify-content: center;
            display: flex;
            top: 0%;
            left: 50%;
            color: var(--color-bg-text);
            font-weight: 500;
            font-size: 8rem;
            text-transform: uppercase;
            transform: translateX(-50%);
        }
        .about-container {
            display: grid;
            grid-gap: 3rem;
            grid-template-columns: repeat(2, 1fr);
            padding-top: 5rem;
            padding-bottom: 4rem;
        }
        
                ::slotted(h1) {
                    visibility: visible;
                    column-span: all;
                    position: absolute;
                    top: 12.6%;
                    color: transparent;
                    font-size: 2.5rem;
                    text-transform: uppercase;
                    -webkit-text-stroke: 0.7px rgba(255, 255, 0, 0.88);
                }
        
                .left-about{
                    margin-top: 1.5em;
                    display: grid;
                    row-gap: 2em;
                }
                ::slotted(h4) {
                    text-align: center;
                    color: var(--color-secondary);
                    text-shadow: 1px 1px 1px var(--color-contact-me),
                        1px 1px 1px var(--color-contact-me),
                        1px 1px 1px var(--color-contact-me);
                    font-size: 2rem;
                    text-transform: uppercase;
                }
                
                .cover{
                    padding: 1.2rem;
                }
                .cover:hover {
                    background-image: url(../img/sky.jpg);
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    border-radius: 20px;
                    
                }
                ::slotted(pre) {
                    letter-spacing: 2.2px;
                    color: var(--color-about-text);
                    font: italic small-caps 300 1rem/2rem Georgia, serif;
                    padding: 1rem;
                }
            
          .wrapper {
            position: fixed;
            width: 100px;
            left: 74%;
            top: 6.5%;
            transform: rotate(45deg);
            z-index: -1;
        }
        .beam-wrapper {
            position: relative;
            animation: superLaser 200ms ease-in-out infinite;
        }
        .beam {
            bottom: 0;
            position: absolute;
            border-radius: 50% 50% 50% 0%;
            transform: rotate(-45deg);
        }
        
        .green {
            width: 35px;
            height: 55px;
            background: rgba(0, 255, 0);
            box-shadow: 1px -1px 20px 5px rgba(0, 255, 0);
            filter: brightness(1000%);
        }
        .white {
            left: 5px;
            width: 35px;
            height: 45px;
            background: rgba(255, 255, 255);
            filter: blur(5px);
        }
        
        @keyframes superLaser {
            0% {
                transform: rotate(-1.5deg) scaleY(4);
            }
            20% {
                transform: rotate(1.5deg) scaleY(4.5) scale;
            }
            40% {
                transform: rotate(-1.5deg) scaleY(5);
            }
            60% {
                transform: rotate(1.5deg) scaleY(5.5);
            }
            80% {
                transform: rotate(-1.5deg) scaleY(6);
            }
            100% {
                transform: rotate(1.5deg) scaleY(6.5);
            }
        }
        .vader {
            z-index: 0;
            position: fixed;
            width: 550px;
            height: 550px;
            top: 6%;
            left: 30%;
        
            transition: all ease-out 3s;
            background-color: rgb(0, 0, 0);
            -webkit-mask-image: url(../img/vader1.png);
            -webkit-mask-size: 100%;
            -webkit-mask-repeat: no-repeat;
        }
        ::slotted(h2) {
            z-index: 1;
            width: 300px;
            visibility: hidden;
            column-span: all;
            position: fixed;
            top: 9%;
            left: 38%;
            color: transparent;
            text-align: center;
            font-size: 1.7rem;
            text-transform: uppercase;
            -webkit-text-stroke: 0.5px rgba(255, 255, 0, 0.88);
        }

        @media screen and (min-width: 2560px){
            ::slotted(span) {
                font-size: 13.5rem;               
            }
            .about-container {
                grid-gap: 5rem;
            }
            
                    ::slotted(h1) {
                        top: 17.6%;
                        font-size: 3.5rem;
                    }
                    ::slotted(h4) {
                        font-size: 3.3rem;
                    }
                    ::slotted(pre) {
                        font: italic small-caps 300 2rem/2.5rem Georgia, serif;
                    }
                     .wrapper {
                        left: 74.3%;
                        top: 10.2%;
                    }
                    .vader {
                        width: 750px;
                        height: 750px;
                        top: 10%;
                        left: 36%;
                    }
                    ::slotted(h2) {
                        width: 400px;
                        top: 14%;
                        left: 43%;
                        font-size: 2.4rem;
                    }
        }
        @media screen and (max-width: 1024px){
            ::slotted(span) {
                font-size: 5rem;               
            }
            .about-container {
            grid-gap: 1rem;
           padding 4rem 0;
            }
            
                    ::slotted(h1) {
                        top: 7.6%;
                        font-size: 1.6rem;
                    }
                    .left-about{
                        margin-top: 1em;
                        row-gap: 1em;
                    }
                    ::slotted(h4) {
                        font-size: 1.5rem;
                    }
                    ::slotted(pre) {
                        font: italic small-caps 300 0.9rem/1.1rem Georgia, serif;
                    }
                     .wrapper {
                        left: 80.3%;
                        top: 5.2%;
                    }
                    .green {
                        width: 20px;
                        height: 38px;
                    }
                    .white {
                        width: 20px;
                        height: 30px;
                    }
                    .vader {
                        width: 400px;
                        height: 400px;
                        top: 6%;
                        left: 30%;
                    }
                    ::slotted(h2) {
                        width: 220px;
                        top: 8%;
                        left: 38.5%;
                        font-size: 1.2rem;
                    }
        }
        @media screen and (max-width: 768px){
            .about-container {
                padding: 4rem 0;
            grid-gap: 0rem;
            }
            ::slotted(span) {
                font-size: 3.8rem;               
            }
            
                    .left-about{
                        row-gap: 0em;
                    }
                     .wrapper {
                        left: 84%;
                        top: 5%;
                    }
                    .green {
                        width: 10px;
                        height: 11px;
                    }
                    .white {
                        width: 10px;
                        height: 11px;
                    }
                    .vader {
                        top: 6%;
                        left: 25%;
                    }
                    ::slotted(h2) {
                        top: 8%;
                        left: 37%;
                    }
        }
        @media only screen and (max-width: 426px){
            .about-container{
                grid-template-columns: repeat(1, 1fr);
            }
            .left-about{
                margin-top: 5rem;
            }
            ::slotted(span){
                top: 1%;
                font-size: 1.4rem;
            }
            ::slotted(h4) {
                font-size: 1.25rem;
            }
            ::slotted(pre){
                font-size: 0.8rem;
            }
            ::slotted(h1){
                font-size: 1.22rem;
                left: 6%;
                top: 13%;
            }
            .left-about{
                row-gap: 0em;
            }
             .wrapper {
                display: none;
            }

            .vader {
                top: 3%;
                left: 8%;
                width: 300px;
                height: 300px;
            }
            ::slotted(h2) {
                top: 3.8%;
                left: 26%;
                width: 150px;
                font-size: 1.1rem;
            }
        }
            `
        this.shadowRoot.appendChild(style)
    }

    deathstarActive() {
        const vader = document.querySelector("#menu-button").getAttribute("state")

        if (vader === "open") {
            this.shadowRoot.querySelector("#wrapper").classList.add("wrapper")
            this.shadowRoot.querySelector("#beam-wrapper").classList.add("beam-wrapper")
            this.shadowRoot.querySelector("#beam-green").classList.add("beam", "green")
            this.shadowRoot.querySelector("#beam-white").classList.add("beam", "white")
            this.shadowRoot.querySelector("#vader").classList.add("vader")
            document.querySelector("#darkside").style.visibility = "visible"
            document.querySelector("#storyTittle").style.visibility = "hidden"
            document.querySelector("#story").style.visibility = "hidden"
            document.querySelector("#brightside").style.visibility = "hidden"

            window.scrollTo(0, 0)
        } else {
            this.shadowRoot.querySelector("#wrapper").classList.remove("wrapper")
            this.shadowRoot.querySelector("#beam-wrapper").classList.remove("beam-wrapper")
            this.shadowRoot.querySelector("#beam-green").classList.remove("beam", "green")
            this.shadowRoot.querySelector("#beam-white").classList.remove("beam", "white")
            this.shadowRoot.querySelector("#vader").classList.remove("vader")
            document.querySelector("#darkside").style.visibility = "hidden"
            document.querySelector("#storyTittle").style.visibility = "visible"
            document.querySelector("#story").style.visibility = "visible"
            document.querySelector("#brightside").style.visibility = "visible"
        }
    }

    connectedCallback() {
        document
            .querySelector("#menu-button")
            .addEventListener("click", () => this.deathstarActive())
    }

    disconnectedCallback() {
        document.querySelector("#menu-button").removeEventListener()
    }
}
customElements.define("about-me", AboutMe)
