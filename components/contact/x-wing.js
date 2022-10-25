const xTemplate = document.createElement("template");
xTemplate.innerHTML = `
<div class="explosion"></div>
<div class="x-wing"></div>
<div class="flama fireAnim">
<div class="red flame"></div>
<div class="yellow flame"></div>
<div class="white flame"></div>
</div>
`;

class XWing extends HTMLElement {
    static get observedAttributes() {
        return ["state"];
    }
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(xTemplate.content.cloneNode(true));

        const style = document.createElement("style");
        style.textContent = `
        .x-wing {
            z-index: -1;
            background-image: url(../img/xwing.png);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            position: absolute;
            transform: rotate(-22deg);
            visibility: hidden;
        }
    
            @keyframes xwing {
                0% {
                    visibility: visible;
                    bottom: 99%;
                    left: -10%;
                    width: 0px;
                    height: 0px;
                }
                40% {

                    width: 75px;
                    height: 90px;
                    opacity: inherit;
                }
                90% {
                    opacity: 0.4;
                    width: 15px;
                    height: 15px;
                    bottom: 66%;
                    left: 94%;
                }
                100% {
                    visibility: hidden;
                    opacity: 0;
                }
            }

        .explosion {
            visibility: hidden;
            z-index: 1;
            position: absolute;
            top: 21.5%;
            left: 75.5%;
            width: 1px;
            height: 1px;
            border-radius: 50%;
        }
            @keyframes explosion {
                0% {
                    visibility: visible;
                    box-shadow: 0 0 0 0 rgb(248, 250, 248), 0 0 0 0 rgb(255, 136, 0),
                        0 0 0 0 rgb(249, 244, 0), 0 0 0 0 rgb(242, 255, 0),
                        0 0 0 0 rgb(214, 131, 37), 0 0 0 0 rgb(196, 7, 0);
                }
                30% {
                    box-shadow: 0 0 30px 30px rgb(248, 250, 248),
                        0 0 20px 20px rgb(255, 136, 0),
                        0 0 60px 60px rgb(249, 244, 0),
                        0 0 30px 30px rgb(242, 255, 0),
                        0 0 80px 80px rgb(214, 131, 37),
                        0 0 100px 100px rgb(196, 7, 0);
                }
                60% {
                    box-shadow: 0 0 30px 30px rgb(248, 250, 248),
                        0 0 20px 20px rgb(255, 136, 0),
                        0 0 60px 60px rgb(249, 244, 0),
                        0 0 30px 30px rgb(242, 255, 0),
                        0 0 80px 80px rgb(214, 131, 37),
                        0 0 100px 100px rgb(196, 7, 0);
                }
                100% {
                    box-shadow: 0 0 3px 3px rgb(248, 250, 248),
                        0 0 2px 2px rgb(255, 136, 0), 0 0 6px 6px rgb(249, 244, 0),
                        0 0 3px 3px rgb(242, 255, 0), 0 0 8px 8px rgb(214, 131, 37),
                        0 0 10px 10px rgb(196, 7, 0);
                }
            }

            .flama {
                visibility: hidden;
                right: 21.3%;
                top: 7.5%;
                width: 120px;
                height: 120px;
                position: fixed;
                transform: rotate(45deg);
                transform-origin: center bottom;
            }      
                @keyframes flama {
                    0% {
                        visibility: visible;
                    }
                 
                    100% {
                        visibility: visible;
                    }
                }
                @media only screen and (min-width: 2560px){
                    @keyframes xwing {
                        0% {
                            visibility: visible;
                            bottom: 99%;
                            left: -10%;
                            width: 0px;
                            height: 0px;
                        }
                        40% {
        
                            width: 95px;
                            height: 110px;
                            opacity: inherit;
                        }
                        90% {
                            opacity: 0.4;
                            width: 15px;
                            height: 15px;
                            bottom: 66%;
                            left: 94%;
                        }
                        100% {
                            visibility: hidden;
                            opacity: 0;
                        }
                    }
                    .flama{
                        right: 22.5%;
                        top: 13%;
                    }
                }
                @media only screen and (max-width: 1024px){
                    @keyframes xwing {
                        0% {
                            visibility: visible;
                            bottom: 99%;
                            left: -10%;
                            width: 0px;
                            height: 0px;
                        }
                        40% {
        
                            width: 65px;
                            height: 80px;
                            opacity: inherit;
                        }
                        90% {
                            opacity: 0.4;
                            width: 15px;
                            height: 15px;
                            bottom: 69%;
                            left: 97%;
                        }
                        100% {
                            visibility: hidden;
                            opacity: 0;
                        }
                    }
                    .explosion{
                        top: 17%;
                        left: 82.5%;
                    }
                    .flama{
                        width: 60px;
                        height: 60px;
                        right: 15%;
                        top: 10%;
                    }
                }
        @media only screen and (max-width: 768px){
            @keyframes xwing {
                0% {
                    visibility: visible;
                    bottom: 99%;
                    left: -10%;
                    width: 0px;
                    height: 0px;
                }
                50% {

                    width: 65px;
                    height: 80px;
                    opacity: inherit;
                }
                90% {
                    opacity: 0.4;
                    width: 15px;
                    height: 15px;
                    bottom: 69%;
                    left: 97%;
                }
                100% {
                    visibility: hidden;
                    opacity: 0;
                }
            }
            .explosion{
                top: 17%;
                left: 86.5%;
            }
            .flama{
                width: 50px;
                height: 50px;
                right: 10%;
                top: 9.5%;
            }
        }
        @media only screen and (max-width: 426px){
            @keyframes xwing {
                0% {
                    visibility: visible;
                    bottom: 99%;
                    left: -10%;
                    width: 0px;
                    height: 0px;
                }
                40% {

                    width: 45px;
                    height: 70px;
                    opacity: inherit;
                }
                90% {
                    opacity: 0.4;
                    width: 15px;
                    height: 15px;
                    bottom: 79%;
                    left: 90%;
                }
                100% {
                    visibility: hidden;
                    opacity: 0;
                }
            }
            .explosion{
                display: none;
            }
            .flama{
                display: none;
            }
        }
        `;

        this.shadowRoot.appendChild(style);
    }
    get state() {
        return this.getAttribute("state");
    }
    set state(value) {
        this.setAttribute("state", value);
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (this.state === "gogogo") {
            this.shadowRoot.querySelector(".x-wing").style.animation = "xwing 10s 1 forwards";
            this.shadowRoot.querySelector(".explosion").style.animation =
                "explosion 4.5s 4.65s 1 alternate";
            this.shadowRoot.querySelector(".flama").style.animation =
                "flama 1s 7s infinite alternate";
        }
    }
    mode() {
        const mode = document.querySelector("#theme").getAttribute("state");
        const xwing = this.shadowRoot.querySelector(".x-wing");
        const explosion = this.shadowRoot.querySelector(".explosion");
        const flama = this.shadowRoot.querySelector(".flama");
        if (mode === "solid") {
            xwing.style.display = "none";
            explosion.style.display = "none";
            flama.style.display = "none";
        } else {
            xwing.style.display = "block";
            explosion.style.display = "block";
            flama.style.display = "block";
        }
    }
    connectedCallback() {
        const fireAnimation = this.shadowRoot.querySelector(".fireAnim");
        const fireRender = bodymovin.loadAnimation({
            container: fireAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets1.lottiefiles.com/packages/lf20_uletvhke.json",
        });

        fireRender.play();

        const mode = localStorage.getItem("mode");
        const theme = this.shadowRoot.querySelector(".x-wing");
        const explosion = this.shadowRoot.querySelector(".explosion");
        const flama = this.shadowRoot.querySelector(".flama");
        if (mode !== "star-wars") {
            theme.style.display = "none";
            explosion.style.display = "none";
            flama.style.display = "none";
        }
        document.querySelector("#theme").addEventListener("click", () => this.mode());
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector(".fireAnim").pause();
        document.querySelector("#theme").removeEventListener();
    }
}

customElements.define("x-wing", XWing);
