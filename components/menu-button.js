const menuData = [
    {
        title: "HOME",
        link: "index.html",
        menuIcon: "./img/jedi.png",
    },
    {
        title: "ABOUT",
        link: "about.html",
        menuIcon: "./img/jedi-order.png",
    },
    {
        title: "PORTFOLIO",
        link: "portfolio.html",
        menuIcon: "./img/jedi-new-order.png",
    },
    {
        title: "CONTACT",
        link: "contact.html",
        menuIcon: "./img/menu-xwing2.png",
    },
]
const buttonTemplate = document.createElement("template")
buttonTemplate.innerHTML = `

<div class="menu-btn" id="vaderActivate">
<span class="_showMenu menuAnim"></span>
</div>
<nav class="nav">
<ul class="menu-nav">
${menuData
    .map((icon) => {
        return `
    <li class="menu-nav__item">
    <a href=${icon.link} class="menu-nav__icons">
    <span class="icon-title">${icon.title}</span>
    <i class="icon" style="background-image:url(${icon.menuIcon})">
    </i>
    </a>
            </li>
    `
    })
    .join("")}
            </ul>
            </nav>
           
            `

class MenuButton extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .menu-btn {
            position: fixed;
            z-index: 2;
            right: 0%;
            top: 2%;
            height: 130px;
            width: 130px;
            cursor: pointer;
        }
        ._showMenu {
            transition: 1.5s;
            position: absolute; 
        }
        .nav {
            z-index: 1;
            position: fixed;
            top: 0;
            right: 0;
            width: 10vw;
            visibility: hidden;
                
            }
            .menu-nav {      
                display: flex;
                flex-flow: column wrap;
                align-items: center;
                justify-content: flex-end;
                height: 100vh;
                overflow: hidden;
                padding: 0rem;
                background: transparent;
                list-style-type: none;
                transform: translateY(-100%);
            }
             .menu-nav__icons {
        
                display:flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 70px;
                text-decoration: none;
               
            }
            .menu-nav__item {  
                transform: translateY(100vh);
            }  
            .open {      
            visibility: visible;
        }
        .moveY {
            transform: translateY(0);
        }
        .moveX {
            transform: translateX(0);
        }
        .icon{
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            width:70px;
            height:70px; 
        }
        .icon-title{
            z-index: 1;
            position:fixed;
            justify-content: center;
           align-self: center;
            font-size: 1.4rem;
            color: rgb(128,128,128,0);
            
        }
        .icon-title:hover{
        color: rgb(255,255,255);
        text-shadow: 1px 1px 1px var(--color-grey-4),
        1px 1px 1px var(--color-grey-4),
        1px 1px 1px var(--color-grey-4);
        }

        @media only screen and (min-width: 2560px){
            .menu-btn {
                right: 0%;
                top: 2%;
                height: 220px;
                width: 220px;
            }

            .menu-nav__icons {
                margin-bottom: 115px;
            }
            .icon{
                width:110px;
                height:110px; 
            }
            .icon-title{
                font-size: 2.2rem;
            }
        }

        @media only screen and (max-width: 1024px){
            .menu-btn {
                right: 0%;
                top: 2%;
                height: 110px;
                width: 110px;
            }
            .icon{
                width:55px;
                height:55px; 
            }
            .icon-title{
                font-size: 0.9rem;
            }
        }
        @media only screen and (max-width: 768px){

            .menu-nav__icons {
                margin-right: 15px;
            }
            .icon-title{
                font-size: 0.8rem;
            }
        }
        @media only screen and (max-width: 426px){
            .menu-btn {
                height: 100px;
                width: 100px;
                margin-bottom: 75px;
            }
         .nav{
            width: 20vw
         }
        }
        `

        this.shadowRoot.appendChild(style)
    }
    get state() {
        return this.getAttribute("state")
    }
    set state(value) {
        this.setAttribute("state", value)
    }
    attributeChangedCallback(prop, oldVal, newVal) {
        if (this.state === "hold") {
            alert("Please interact to keep walking")
            this.toggleMenu(!this.showInfo)
        }
    }

    toggleMenu() {
        this.showInfo = !this.showInfo

        const hamburger = this.shadowRoot.querySelector("._showMenu")
        const nav = this.shadowRoot.querySelector(".nav")
        const menuNav = this.shadowRoot.querySelector(".menu-nav")
        const navItems = this.shadowRoot.querySelectorAll(".menu-nav__item")

        document.querySelector("#menu-button").setAttribute("state", "open")

        if (this.showInfo) {
            hamburger.classList.add("open")
            nav.classList.add("open")
            menuNav.classList.add("moveY")
            navItems.forEach((item) => item.classList.add("moveX"))
        } else {
            hamburger.classList.remove("open")
            nav.classList.remove("open")
            menuNav.classList.remove("open")
            navItems.forEach((item) => item.classList.remove("open"))

            document.querySelector("#menu-button").setAttribute("state", "close")
        }
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector(".menu-btn")
            .addEventListener("click", () => this.toggleMenu())

        const menuAnimation = this.shadowRoot.querySelector(".menuAnim")
        const menuRender = bodymovin.loadAnimation({
            container: menuAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets1.lottiefiles.com/private_files/lf30_42ffmwih.json",
        })

        menuRender.play()
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector(".menu-btn").removeEventListener()

        const menuAnim = this.shadowRoot.querySelector(".menuAnim").pause()
    }
}
window.customElements.define("menu-button", MenuButton)
