const c3p0Anim = document.createElement("template");
c3p0Anim.innerHTML = `
<div id="c3po" class="c3po"></div>
`;

class C3p0Anim extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(c3p0Anim.content.cloneNode(true));

        const style = document.createElement("style");
        style.textContent = `
        .c3po {
            z-index: 1;
            width: 0px;
            height: 0px;
            top: 21%;
            right: 8%;
            position: fixed;
            background-image: url(../img/c3po);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            animation: arnold 5s ease-in forwards;
            animation-delay: 11s;
            display: block;
        }
            @keyframes arnold {
                0% {
                    width: 0px;
                    height: 0px;
                    top: 19.5%;
                    right: 8%;
                    opacity: inherit;
                    transform: rotate(10.5deg);
                }
                10% {
                    transform: rotate(-9deg);
                }
                20% {
                    transform: rotate(8deg);
                }
                30% {
                    transform: rotate(-7deg);
                }
                40% {
                    transform: rotate(6deg);
                }
                50% {
                    transform: rotate(-5deg);
                }
                60% {
                    transform: rotate(4deg);
                }
                70% {
                    transform: rotate(-3deg);
                }
                80% {
                    transform: rotate(2deg);
                }
                90% {
                    transform: rotate(-1deg);
                }
    
                100% {
                    transform: rotate(0deg);
                    width: 170px;
                    height: 200px;
                    top: 18%;
                    right: 1%;
                    opacity: 0.5;
                }
            }
            @media screen and (min-width: 2560px){
                    @keyframes arnold {
                        0% {
                            width: 0px;
                            height: 0px;
                            top: 29.5%;
                            right: 8%;
                            opacity: inherit;
                            transform: rotate(10.5deg);
                        }
                        10% {
                            transform: rotate(-9deg);
                        }
                        20% {
                            transform: rotate(8deg);
                        }
                        30% {
                            transform: rotate(-7deg);
                        }
                        40% {
                            transform: rotate(6deg);
                        }
                        50% {
                            transform: rotate(-5deg);
                        }
                        60% {
                            transform: rotate(4deg);
                        }
                        70% {
                            transform: rotate(-3deg);
                        }
                        80% {
                            transform: rotate(2deg);
                        }
                        90% {
                            transform: rotate(-1deg);
                        }
            
                        100% {
                            transform: rotate(0deg);
                            width: 170px;
                            height: 200px;
                            top: 28%;
                            right: 2.5%;
                            opacity: 0.5;
                        }
                    }
            }
            @media screen and (max-width: 1024px){
                    @keyframes arnold {
                        0% {
                            width: 0px;
                            height: 0px;
                            top: 13.5%;
                            right: 1%;
                            opacity: inherit;
                            transform: rotate(10.5deg);
                        }
                        10% {
                            transform: rotate(-9deg);
                        }
                        20% {
                            transform: rotate(8deg);
                        }
                        30% {
                            transform: rotate(-7deg);
                        }
                        40% {
                            transform: rotate(6deg);
                        }
                        50% {
                            transform: rotate(-5deg);
                        }
                        60% {
                            transform: rotate(4deg);
                        }
                        70% {
                            transform: rotate(-3deg);
                        }
                        80% {
                            transform: rotate(2deg);
                        }
                        90% {
                            transform: rotate(-1deg);
                        }
            
                        100% {
                            transform: rotate(0deg);
                            width: 80px;
                            height: 140px;
                            top: 17.5%;
                            right: 2.5%;
                            opacity: 0.5;
                        }
                    }
            }
            @media only screen and (max-width: 426px){
                @keyframes arnold {
                    0% {
                        width: 0px;
                        height: 0px;
                        top: 13.5%;
                        right: 33%;
                        opacity: inherit;
                        transform: rotate(10.5deg);
                    }
                    10% {
                        transform: rotate(-9deg);
                    }
                    20% {
                        transform: rotate(8deg);
                    }
                    30% {
                        transform: rotate(-7deg);
                    }
                    40% {
                        transform: rotate(6deg);
                    }
                    50% {
                        transform: rotate(-5deg);
                    }
                    60% {
                        transform: rotate(4deg);
                    }
                    70% {
                        transform: rotate(-3deg);
                    }
                    80% {
                        transform: rotate(2deg);
                    }
                    90% {
                        transform: rotate(-1deg);
                    }
        
                    100% {
                        transform: rotate(0deg);
                        width: 50px;
                        height: 80px;
                        top: 17.5%;
                        right: 33.5%;
                        opacity: 0.5;
                    }
                }
            }
            @media only screen and (max-width: 426px){
                .c3po{
                    display: none;
                }
            }
        `;
        this.shadowRoot.appendChild(style);
    }
    mode() {
        const mode = document.querySelector("#theme").getAttribute("state");
        const c3po = this.shadowRoot.querySelector(".c3po");
        if (mode === "solid") {
            c3po.style.display = "none";
        } else {
            c3po.style.display = "block";
        }
    }
    connectedCallback() {
        const mode = localStorage.getItem("mode");
        const theme = this.shadowRoot.querySelector(".c3po");
        if (mode !== "star-wars") theme.style.display = "none";

        document.querySelector("#theme").addEventListener("click", () => this.mode());
    }
    disconnectedCallback() {
        document.querySelector("#theme").removeEventListener();
    }
}
window.customElements.define("c3p0-anim", C3p0Anim);
