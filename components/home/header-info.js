const headerTemplate = document.createElement("template")
headerTemplate.innerHTML = `
<header class="container home active" id="home">
<div class="home-content">
    <div class="h-shape"></div>
    <div class="left-home">
        <div class="image"></div>
    </div>
    <div class="right-home">
    <slot name="hello" ></slot>
    <slot name="myname"></slot>
    <slot name="born"></slot>
    <slot name="description"></slot>

<div class="wrap-main-btn">
    <div class="main-btn" id="roadmap">
        <span class="btn-icon">
            <div class="roadmapIcon" ></div>
        </span>
    </div>
</div>


<div class="modal" id="myModal">
<span class="close">close</span>
<svg height="200" width="710">
    <text x="10" y="20" style="fill: rgb(255, 255, 128)">
        <tspan x="75" y="65">Typescript</tspan>
        <tspan x="170" y="150">Building</tspan>
        <tspan x="255" y="65">AWS</tspan>
        <tspan x="355" y="150">Solidity || Rust</tspan>
        <tspan x="450" y="65">Whisky oak</tspan>
    </text>
    <polyline
        points="19,100 90,100 95,75 100,100 180,100 185,125 190, 100 270, 100 275,75 280,100 400,100 405,125 410,100 510,100 515,75 520,100 630,100"
        style="fill: none; stroke: black; stroke-width: 3"
    />
    <circle
        cx="15"
        cy="100"
        r="10"
        stroke="black"
        stroke-width="3"
        fill="rgb(255,128,128)"
    />
    <polygon
        points="630,90  630,110 660,100"
        style="
            fill: rgb(128, 255, 128);
            stroke: rgb(0, 0, 0);
            stroke-width: 2;
        "
    />
</svg>
</div>

</div>
</div>
</header>

`
class HeaderInfo extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        
        .home-content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            min-height: 100vh;
        }
            .h-shape {
                @include transition-ease;
                width: 100%;
                height: 100%;
                background-color: var(--color-h-shape);
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                clip-path: polygon(
                    15% 0%,
                    15% 15%,
                    0% 15%,
                    0% 85%,
                    15% 85%,
                    15% 100%,
                    85% 100%,
                    85% 85%,
                    100% 85%,
                    100% 15%,
                    15% 85%,
                    85% 0%
                );
            }
        

            .left-home {
                display: flex;
                align-items: center;
                position: relative;
                justify-content: center;
            }
                .image {
                    height: 500px;
                    width: 200px;
                    padding-left: 2.5rem;
                    background-image: url(../img/profile.jpg);
                    background-size: cover;
                    background-position: center center;
                    border-radius: 40px;
                    border: solid;
                    outline: groove;
                    transition: 0.5s;
                }
                
            .right-home {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-right: 10rem;
                text-align: justify;
            }
                ::slotted(h2) {
                    color: var(--color-grey-1);
                    font-size: 2.5rem;
                }
                ::slotted(h1) {
                    color: var(--color-secondary);
                    text-indent: 20px;
                    font-size: 3rem;
                    text-shadow: 1px 1px 1px var(--color-contact-me),
                    1px 1px 1px var(--color-contact-me),
                    1px 1px 1px var(--color-contact-me);
                }
                ::slotted(span) {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                ::slotted(p) {
                    
                    line-height: 2rem;
                    font-size: 1.5rem;
                    text-indent: 50px;
                    color: var(--color-grey-1);
                }  

                
        .wrap-main-btn {
            padding-top: 2rem;
            display: flex;
            justify-content:flex-end;
        }
        
        
            .main-btn {
                border-radius: 33px;
                position: relative;
                border: 2px solid var(--color-secondary);
                overflow: hidden;
                cursor: pointer;
                
            }
            
            
            .btn-icon {
   
                     align-self: center;
                    border-radius: 50%;
                     margin: 1rem;

                }
                .btn-icon::before {
                         content: "";
                         position: absolute;
                         top: 0;
                         right: 0;
                         transform: translateY(100%);
                         z-index: -1;
                     }
        
                .btn-icon:hover::before {
                    width: 100%;
                     height: 100%;
                     background-color: var(--color-secondary);
                     transform: translateY(0%);
                    transition: 1s;
                    
                }    

                .roadmapIcon{
                    background-image:url(./img/r2d2-home.png);
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position:center;
                    width: 33px;
                    height: 33px;
                    

                }   

                .modal {
                    display: none;
                    position: fixed;
                    font-size: 1.2rem;
                    z-index: 1;
                    left: 37.5%;
                    top: 75%;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: transparent;
                }
                
                .close {
                    color: rgb(255, 0, 255);
                    position: fixed;
                    left: 78%;
                    bottom: 10%;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 3rem;
                }
                
                .close:hover {
                        color: rgb(255, 128, 255);
                        text-decoration: none;
                        cursor: pointer;
                    }    
        @media only screen and (min-width: 2560px){
            .image {
                height: 900px;
                width: 420px;
            }
            .right-home {
                padding-right: 22rem;
            }
                ::slotted(h2) {
                    font-size: 4.3rem;
                }
                ::slotted(h1) {
                    text-indent: 50px;
                    font-size: 4.5rem;
                }
                ::slotted(span) {
                        font-size: 2rem;
                    }
                ::slotted(p) {
                    font-size: 2.5rem;
                }  
                .roadmapIcon{
                    width: 69px;
                    height: 90px;
                }
                .modal {
                    font-size: 1.7rem;
                    left: 50.5%;
                    top: 75%;
                }
                .close {
                    left: 78%;
                    bottom: 22%;
                    font-size: 50px;
                }
        }        
        @media only screen and (max-width: 1040px){
            .image {
                height: 450px;
                width: 180px;
            }
            .right-home {
                padding-right: 7rem;
            }
                ::slotted(h2) {
                    font-size: 2rem;
                }
                ::slotted(h1) {
                    text-indent: 50px;
                    font-size: 1.9rem;
                }
                ::slotted(span) {
                        font-size: 1.05rem;
                    }
                ::slotted(p) {
                    font-size: 1.35rem;
                }  
                .roadmapIcon{
                    width: 33px;
                    height: 33px;
                }
                .modal {
                    left: 15%;
                    top: 74.2%;
                    width: 100%;
                }
                .close {
                    left: 78%;
                    bottom: 19%;
                    font-size: 28px;
                }
        }
        @media only screen and (max-width: 768px){
            .image {
                height: 400px;
                width: 150px;
            }
            .right-home {
                padding-right: 6rem;
            }
                ::slotted(h2) {
                    font-size: 1.5rem;
                }
                ::slotted(h1) {
                    text-indent: 50px;
                    font-size: 1.3rem;
                }
                ::slotted(span) {
                        font-size: 0.9rem;
                    }
                ::slotted(p) {
                    font-size: 1.15rem;
                }  
                .roadmapIcon{
                    width: 27px;
                    height: 27px;
                }
                .modal {
                    left: 15%;
                    top: 74.2%;
                    width: 70%;
                }
                .close {
                    left: 73%;
                    bottom: 19%;
                    font-size: 27px;
                }
        }
        @media only screen and (max-width: 426px){
            .home-content {
                margin: 3rem;
                grid-template-columns: repeat(1, 1fr);
            }
            .h-shape{
                display:none;
            }
            .image{
                height: 370px;
                width: 130px;
                margin-bottom: 3rem;
            }
            .right-home{
                padding: 0rem;
                margin-bottom: 1rem;
            }
            ::slotted(h2) {
                font-size: 1.4rem;
            }
            ::slotted(h1) {
                text-indent: 30px;
                font-size: 1.3rem;
            }
            ::slotted(span) {
                    font-size: 0.9rem;
                }
            ::slotted(p) {
                font-size: 1.2rem;
            }  
            .modal{
                left: 5%;
                top: 71%;
                width: 66%;
            }
            .close{
                left:74%;
                bottom: 16%;
                font-size: 25px;
            }
        }
        
        `

        this.shadowRoot.appendChild(style)
    }

    showRoadmap() {
        const modal = this.shadowRoot.querySelector("#myModal")
        modal.style.display = "block"
    }

    closeRoadmap() {
        const modal = this.shadowRoot.querySelector("#myModal")
        modal.style.display = "none"
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("#roadmap")
            .addEventListener("click", () => this.showRoadmap())

        this.shadowRoot
            .querySelector(".close")
            .addEventListener("click", () => this.closeRoadmap())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#roadmap").removeEventListener()

        this.shadowRoot.querySelector(".close").removeEventListener()
    }
}

window.customElements.define("header-info", HeaderInfo)
