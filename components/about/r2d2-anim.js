const r2d2Anim = document.createElement("template")
r2d2Anim.innerHTML = `
<div id="r2d2" class="r2d2"></div>
`
class R2d2Anim extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(r2d2Anim.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .r2d2 {
            z-index: 1;
            position: fixed;
            width: 0px;
            height: 0px;
            top: 2.4%;
            left: 34%;
            background-image: url(../img/r2d2.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
    
            animation: flyMarty 3s forwards;
            animation-delay: 7s;
        }
            @keyframes flyMarty {
                0% {
                    z-index: 1;
                    width: 1px;
                    height: 1px;
                    opacity: initial;
                }
    
                100% {
                    z-index: 1;
                    top: 22%;
                    left: 3%;
                    width: 74px;
                    height: 80px;
                    transform: rotate(720deg);
                    opacity: 0.6;
                }
            }
            .r2d2:hover::before {
                    content: "";
                    position: absolute;
                    right: 42px;
                    top: 9px;
                    width: 130px;
                    height: 3px;
                    border-radius: 10px;
                    background-color: rgb(255, 0, 0);
                    filter: brightness(350%);
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px 1px rgba(255, 0, 0);
                }    
                @media screen and (min-width: 2560px){
                    .r2d2 {
                        top: 4%;
                        left: 36.5%;
                
                    }
                    @keyframes flyMarty {
                        0% {
                            z-index: 1;
                            width: 1px;
                            height: 1px;
                            opacity: initial;
                        }
            
                        100% {
                            z-index: 1;
                            top: 35%;
                            left: 3%;
                            width: 94px;
                            height: 120px;
                            transform: rotate(720deg);
                            opacity: 0.6;
                        }
                    }
                }  
                @media only screen and (max-width: 1024px){
                    .r2d2 {
                        top: 1.5%;
                        left: 36%;
                
                    }
                    @keyframes flyMarty {
                        0% {
                            z-index: 1;
                            width: 1px;
                            height: 1px;
                            opacity: initial;
                        }
            
                        100% {
                            z-index: 1;
                            top: 18%;
                            left: 3%;
                            width: 66px;
                            height: 70px;
                            transform: rotate(720deg);
                            opacity: 0.6;
                        }
                    }
                }
                @media only screen and (max-width: 426px){
                    .r2d2{
                        display: none;
                    }
                }
        
        `

        this.shadowRoot.appendChild(style)
    }
}

window.customElements.define("r2d2-anim", R2d2Anim)
