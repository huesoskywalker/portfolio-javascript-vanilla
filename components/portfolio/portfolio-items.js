const projects = [
    {
        title: "NFT Marketplace",
        image: "../../img/nft.png",
        type: "Web 3",
        link: "https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=73805s",
        author: "Patrick Collins & freeCodeCamp",
    },
    {
        title: "Lottery Raffle",
        image: "../../img/web3-lottery-raffle.png",
        type: "Web 3",
        link: "https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=49285s",
        author: "Patrick Collins & freeCodeCamp",
    },
    {
        title: "E-commerce Store",
        image: "../../img/HuesoStore.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=4mOkFXyxfsU&t=592s",
        author: "JavaScript Mastery ",
    },
    {
        title: "Uber Eats clone",
        image: "../../img/UberEats.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=jmvbhuJXFow&t=528s",
        author: "Clever Programmer",
    },
    {
        title: "Tinder clone",
        image: "../../img/Tinder.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=Q70IMS-Qnjk&t=126s",
        author: "Ania Kubów",
    },
    {
        title: "Crypto dashboard API",
        image: "../../img/CryptoDashboard.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=WDwhJNbWka0&t=3005s",
        author: "Ania Kubów",
    },
    {
        title: "Tetris",
        image: "../../img/Tetris.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=rAUn1Lom6dw",
        author: "Ania Kubów & freeCodeCamp",
    },
    {
        title: "Space Invaders",
        image: "../../img/SpaceInvader.png",
        type: "Web 2",
        link: "https://www.youtube.com/watch?v=ec8vSKJuZTk&t=14931s",
        author: "Ania Kubów",
    },
    {
        title: "Certificate",
        image: "../../img/JavaCourse.png",
        type: "Java",
        link: "https://www.udemy.com/certificate/UC-873f7935-7ffe-4f98-a600-27cbd3d898b6/",
        author: "Udemy",
    },
    {
        title: "Certificate",
        image: "../../img/solidity.jpg",
        type: "Solidity",
        link: "https://www.udemy.com/certificate/UC-f1fc04e1-8294-45ef-882d-cd8e482862ef/?utm_campaign=email",
        author: "Udemy",
    },
    {
        title: "Recap+1",
        image: "../../img/impatient-js.jpg",
        type: "JavaScript",
        link: "https://exploringjs.com/impatient-js/toc.html",
        author: "Dr. Axel Rauschmayer",
    },
    {
        title: "Nice 1",
        image: "../../img/deep-javascript.jpg",
        type: "JavaScript",
        link: "https://exploringjs.com/deep-js/toc.html",
        author: "Dr. Axel Rauschmayer",
    },
    {
        title: "Shell",
        image: "../../img/shell-scripting.jpg",
        type: "JavaScript",
        link: "https://exploringjs.com/nodejs-shell-scripting/toc.html",
        author: "Dr. Axel Rauschmayer",
    },
    {
        title: "Portfolio",
        image: "../../img/portfolio.png",
        type: "Portfolio",
        link: "https://www.github.com/huesoskywalker/portfolio-javascript-vanilla",
        author: "huesoskywalker",
    },
    {
        title: "Certificate",
        image: "../../img/datastructure.jpg",
        type: "Data Structure",
        link: "https://www.udemy.com/certificate/UC-0fb3ba80-5b92-432a-bb9d-c99a11114225/",
        author: "Udemy",
    },
    {
        title: "Cloud Practitioner",
        image: "../../img/cloud-practitioner.png",
        type: "AWS",
        link: "https://www.udemy.com/certificate/UC-e478599a-70b3-4041-bdbe-43d69e9e1e05/",
        author: "Udemy",
    },
    {
        title: "DevOps",
        image: "../../img/DevOps.png",
        type: "DevOps",
        link: "https://www.udemy.com/certificate/UC-3b45d537-6ab3-4aa5-a259-31a44164ea0a/",
        author: "Udemy",
    },
    {
        title: "Cypress e2e",
        image: "../../img/cypress-e2e.png",
        type: "Viper",
        link: "https://youtu.be/Vnpv851Q6Pc",
        author: "Cypress draft",
    },
    {
        title: "Shopify - Viper",
        image: "../../img/shopify-viper.jpg",
        type: "Viper",
        link: "https://www.youtube.com/watch?v=Cnmtfi2yzQg",
        author: "Shopify draft",
    },
    {
        title: "Next.Js 13 - Viper",
        image: "../../img/viper-13b.png",
        type: "Viper",
        link: "https://youtu.be/nlp_7W6O2B4",
        author: "First draft",
    },
    {
        title: "Next.Js 12 Only API's",
        image: "../../img/viper.jpg",
        type: "Viper",
        link: "https://github.com/huesoskywalker/viper-nextjs-mongodb",
        author: "huesoskywalker",
    },

    {
        title: "TypeScript",
        image: "../../img/typescript.png",
        type: "JavaScript",
        link: "https://www.typescriptlang.org/docs/handbook/intro.html",
        author: "typescriptlang.org",
    },
    {
        title: "Google Maps API",
        image: "../../img/google-maps-api.png",
        type: "Google Maps API",
        link: "https://www.youtube.com/watch?v=USTM_HdKN2I",
        author: "huesoskywalker",
    },
]

class PortfolioItems extends HTMLElement {
    static get observedAttributes() {
        return ["state"]
    }
    constructor() {
        super()

        const style = document.createElement("style")
        style.textContent = `
        .portfolios {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 2rem;
            margin-top: 11rem;
            padding-left: 2rem;
        }
        .portfolio-item {
                padding-bottom: 2rem;
                position: relative;
                border-radius: 15px;
            }
            
            img {
                display: flex;
                align-items: center;
                justify-content:center;
                    width: 300px;
                    height: 350px;
                    object-fit: cover;
                    border-radius: 15px;
                }
                .hover-items {
                    width: 300px;
                    height: 350px;
                    background-color: var(--color-hover-portfolio);
                    position: absolute;
                    left: 0;
                    top: 0;
                    border-radius: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    opacity: 0;
                    transform: scale(0);
                    transition: 0.5s ease-out;
                }

                    h3 {
                        font-size: 2rem;
                        text-align:center;
                        font-weight: 600;
                        color: var(--color-bg-text);
                        margin-bottom: 1.5rem;
                        text-shadow: 1px 1px 1px var(--color-about-life),
                            1px 1px 1px var(--color-about-life),
                            1px 1px 1px var(--color-about-life);
                    }
                    .icons {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
  
                        a{
                            font-size:1.2rem;
                            font-weight:400;
                            color: rgb(0,128,255);
                        }
                                 
        .portfolio-item:hover .hover-items {
            opacity: 1;
            transform: scale(1);
        }
@media only screen and (min-width: 2560px){
    .portfolios {
        grid-gap: 5rem;
        margin-top: 15rem;
    }
    img {
        width: 500px;
        height: 550px;
        border-radius: 45px;
    }
    .hover-items {
        width: 500px;
        height: 550px;
        border-radius: 45px;
    }
    h3 {
        font-size: 3.2rem;
    }
    a{
        font-size:2.1rem;
    }
}
@media only screen and (max-width: 1024px){
    .portfolios {
        margin-top: 10.2rem;
    }
    img {
        width: 235px;
        height: 275px;
    }
    .hover-items {
        width: 235px;
        height: 275px;
    }
    h3 {
        font-size: 1.6rem;
    }
    a{
        font-size:1rem;
    }
}
@media only screen and (max-width: 768px){
    .portfolios {
        grid-template-columns: repeat(2, 1fr);
        }
    }
    @media only screen and (max-width: 426px){
        .portfolios {
            margin-top: 12rem;
            grid-template-columns: repeat(1, 1fr);
        }
        .portfolio-item{
            margin-left: 2rem;
        }
        .image{
            width:235px;
            height: 275px;
        }
    }
        `
        document.body.appendChild(style)
    }

    get state() {
        return this.getAttribute("state")
    }
    set state(val) {
        this.setAttribute("state", val)
    }
    attributeChangedCallback(prop, oldVal, newVal) {
        if (this.state !== "hide") {
            this.render()
        } else {
            document.querySelector("#portfolios").style.display = "none"
            this.render()
        }
    }
    connectedCallback() {
        this.render()
    }
    render() {
        this.innerHTML = `
        <div class="portfolios" id="portfolios">
        ${projects
            .filter(({ type }) => type === `${this.state}`)
            .map(({ image, title, link, author }) => {
                return `
        <div class="portfolio-item">
                <div class="image">
                    <img src=${image} alt="" />
                </div>
                 <div class="hover-items">
                    <h3>${title}</h3>
                <div class="icons">
                    <a href="${link}" target="_blank">${author}
                    </a>
                </div>
            </div>
        </div>
            `
            })
            .join("")}
    </div>
        `
    }
}

customElements.define("portfolio-items", PortfolioItems)
