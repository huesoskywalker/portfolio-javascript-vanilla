const yodaAnim = document.createElement("template")
yodaAnim.innerHTML = `
<div class="k1">
            <div id="yoda" class="yoda"></div>
        </div>
`

class YodaAnim extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(yodaAnim.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .k1:hover {
                z-index: 1;
                cursor: grab;
                position: fixed;
                width: 250px;
                height: 270px;
                top: 14.5%;
                right: 31%;
                animation: k1 1s infinite;
                animation-direction: alternate;
                background-position: center;
                background-size: 230px auto;
                background-image: url("../img/k1.png");
                background-repeat: no-repeat;
            }
                @keyframes k1 {
                    0% {
                        background-size: 230px auto;
                    }
                    100% {
                        background-size: 270px auto;
                    }
                }
            
            .yoda {
                z-index: 1;
                width: 133px;
                height: 133px;
                position: fixed;
                top: 18.5%;
                right: 35%;
                background-image: url(../img/yoda.webp);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0.4;
            } 
                
                .yoda:hover {
                    cursor: grabbing;
                }
                    .yoda:hover::before {
                        content: "";
                        position: absolute;
                        right: 36px;
                        top: -43px;
                        width: 4.5px;
                        height: 90px;
                        border-radius: 10px;
                        background-color: rgb(0, 0, 0);
                        background-image: linear-gradient(
                            rgba(255, 255, 255, 0.6),
                            rgb(0, 255, 0)
                        );
                        box-shadow: 0px -11px 10px 1px rgba(0, 255, 0);
                        filter: brightness(350%);
                    }

                    .yoda:hover::after {
                        content: "";
                        position: absolute;
                        right: 36px;
                        top: 28px;
                        width: 4.5px;
                        height: 20px;
                        border-radius: 10px;
                        background-color: rgba(0, 0, 0, 0.33);
                        background-image: linear-gradient(
                            rgb(128, 128, 128),
                            rgb(0, 0, 0)
                        );
                        filter: contrast(250%);
                    }
               
            @media screen and (min-width: 2560px) {
                .k1:hover{
                    top: 26%;
                    right: 37.8%;
                }
                .yoda {
                    top: 29.5%;
                    right: 40%;
                } 
            }

            @media screen and (max-width: 1024px){
                .k1:hover{
                    top: 7.5%;
                    right: 24.8%;
                }
                .yoda {
                    height: 80px;
                    width: 80px;
                    top: 13%;
                    right: 33%;
                } 
                .yoda:hover::before {
                    right: 20px;
                    top: -43px;
                    height: 70px;
                }

                .yoda:hover::after {
                    right: 20px;
                    top: 15px;
                }
            }
            @media only screen and (max-width: 426px){
                .k1{
                    display: none;
                }
                .yoda{
                    display: none;
                }
            }
            
        `
        this.shadowRoot.appendChild(style)
    }
}

window.customElements.define("yoda-anim", YodaAnim)
