const lifeTrip = [
    {
        duration: "2021 - ∞",
        tittle: "Full Stack Developer",
        description:
            "While I was in nature and had time, I started to study Java and I liked it very much. The backend part is certainly more attractive for my personal tastes. Then Javascript to get to know the frontend and a world of questions, knowledge and curiosities opened up for me. Eager to continue studying, professionalizing and creating, I let you continue browsing my portfolio.",
        icon: "codeAnim",
        link: "",
        linkText: "",
    },

    {
        duration: "2019 - 2022",
        tittle: "Carpenter&Gardener     / Booking",
        description:
            "Back in my country, I began to study the technology of wood and furniture to travel to Australia and work as a carpenter. My flight was canceled on the 17th of March 2020 and I stayed on a family land working in nature, planting trees and growing vegetables, renting a house in the summer season and making furniture.",
        icon: "treeAnim",
        link: "",
        linkText: "",
    },

    {
        duration: "2016-2019",
        tittle: "bartender",
        description:
            "I arrived in Barcelona and started working in a clothing store and at the same time in a bar. I began to read the history of cocktails to learn more and that led me to study the Spirits. So called because the craftsman collects the steam from the distillations he carried out from nature. Tasting placer of the palate I lived in Eivissa and then Andorra working in bars.",
        icon: "beerAnim",
        link: "",
        linkText: "",
    },
    {
        duration: "2015-2016",
        tittle: "loco diamante",
        description:
            "I returned from Spain to my country, Argentina, and started studying Industrial Design. Fresh, nourished by many adventures and new things and wanting to continue traveling, I started to build a clothing brand from scratch. At the end of that year I created a spring-summer collection of t-shirts and jeans. The following year I started developing shirts and sweatshirts for autumn-winter. And at the time of making another collection, something happened inside me that I got on a plane back to Europe to satisfy some appetites I had.",
        icon: "designAnim",
        link: "href='https://www.instagram.com/loco.diamante'",
        linkText: "Let's Watch!",
    },
    {
        duration: "2012-2014",
        tittle: "hospitality",
        description:
            "I started a Europe trip to clear my mind after 2 years of Mechanical Engineering and I fell in love with Barcelona. I stayed to work there, I got to know new cultures, languages, stories, cities and countries. Then I went to live in Mexico, I did the same and I returned to Barcelona for the summer season.",
        icon: "travelAnim",
        link: "",
        linkText: "",
    },
]
const lifeTemplate = document.createElement("template")
lifeTemplate.innerHTML = `
<div class="about-life">
<h4 class="stat-title">My life</h4>
<div class="timeline">
${lifeTrip
    .sort((a, b) => String(b.duration).localeCompare(a.duration))
    .map(({ icon, duration, tittle, link, linkText, description }) => {
        return `
     <div class="timeline-item">
                        <div class="tl-icon">
                            <i class="${icon}"></i>
                        </div>
                        <p class="tl-duration">${duration}</p>
                        <h5>${tittle}<a class="show" target="_blank" ${link}>${linkText}</a></h5>
                        <p class="tl-description">
                            ${description}
                        </p>
                    </div>
    `
    })
    .join("")}
    </div>
    </div>

`

class AboutLife extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(lifeTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .about-life{
            padding-top: 4rem;
        }
        .stat-title {
            text-transform: uppercase;
            font-size: 1.8rem;
            text-align: center;
            padding: 3.5rem 0;
            position: relative;
            color: var(--color-about);
        }
    
            .stat-title::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 0;
                width: 70%;
                height: 1px;
                background-color: var(--color-grey-5);
                transform: translateX(-50%);
            }
     
        .timeline {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 2rem;
            padding-bottom: 3rem;
        }
            .timeline-item {
                position: relative;
                padding-left: 3rem;
                border-radius: 30px;
                border-bottom: 1px solid var(--color-bg-text);
            }
                .tl-icon {
                    position: absolute;
                    left: -35px;
                    top: 0;
                    width: 77px;
                    height: 77px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .tl-duration {
                    padding: 0.2rem 0.6rem;
                    background-color: var(--color-grey-4);
                    color: var(--color-about-text);
                    border-radius: 15px;
                    display: inline-block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    font-weight: 500;
                    text-align:center;
                }
                h5 {
                    text-transform: uppercase;
                    font-size: 1.3rem;
                    font-weight: 900;
                    color: var(--color-bg-text);
                    text-shadow: 1px 1px 1px var(--color-about-life),
                        1px 1px 1px var(--color-about-life),
                        1px 1px 1px var(--color-about-life);
                }
                .show{
                    padding:1rem;
                    vertical-align: super;
                    font-size: 0.9rem;
                    text-decoration:none;
                    color: rgb(0,0,255);
                    text-shadow: 1px 1px 1px var(--color-grey-6),
                        1px 1px 1px var(--color-grey-6),
                        1px 1px 1px var(--color-grey-6);
                }
                .tl-description {
                    text-indent: 22px;
                    word-spacing: 2px;
                    color: var(--color-about-text);
                    font-weight: 400;
                    font-size: 1.1rem;
                }   
        @media only screen and (min-width: 2560px){
            .stat-title {
                font-size: 2.8rem;
            }
            .timeline {
                grid-gap: 6rem;
            }
                    .tl-icon {
                        left: -110px;
                        width: 150px;
                        height: 150px;
                    }
                    .tl-duration {
                        padding: 0.4rem 0.8rem;
                        font-size: 1.3rem;
                    }
                    h5 {
                        font-size: 2.2rem;
                    }
                    .show{
                        padding:2rem;
                        font-size: 1.6rem;
                    }
                    .tl-description {
                        word-spacing: 2.6px;
                        letter-spacing: 1px;
                        font-size: 2rem;
                    }   
        }
        @media only screen and (max-width:1040px){
            .stat-title {
                font-size: 1.5rem;
            }
            .timeline {
                grid-template-columns: repeat(2, 1fr);
            }
                    .tl-icon {
                        left: -35px;
                        width: 66px;
                        height: 66px;
                    }
                    .tl-duration {
                        font-size: 0.7rem;
                    }
                    h5 {
                        font-size: 1.1rem;
                    }
                    .show{
                        font-size: 0.75rem;
                    }
                    .tl-description {
                        font-size: 1rem;
                    }   
        }
        @media only screen and (max-width:768px){
            .stat-title {
                font-size: 1.5rem;
            }
            .timeline {
                grid-template-columns: repeat(1, 1fr);
                grid-gap: 2rem;
            }
                    .tl-icon {
                        left: -35px;
                        width: 66px;
                        height: 66px;
                    }
                    .tl-duration {
                        font-size: 0.7rem;
                    }
                    h5 {
                        font-size: 1.1rem;
                    }
                    .show{
                        font-size: 0.75rem;
                    }
                    .tl-description {
                        font-size: 1rem;
                    }   
        }
        @media only screen and (max-width: 426px){
            .stat-title {
                font-size: 1.25rem;
            }
            .timeline-item {
                padding-left: 2rem;
                padding-right: 1rem;
            }
            .timeline {
                grid-gap: 1rem;
            }
                    .tl-icon {
                        left: -10px;
                        width: 44px;
                        height: 44px;
                    }
        }
        `

        this.shadowRoot.appendChild(style)
    }
    connectedCallback() {
        const codeAnimation = this.shadowRoot.querySelector(".codeAnim")
        const codeRender = bodymovin.loadAnimation({
            container: codeAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets2.lottiefiles.com/private_files/lf30_ZOuB83.json",
        })

        codeRender.play()

        const treeAnimation = this.shadowRoot.querySelector(".treeAnim")
        const treeRender = bodymovin.loadAnimation({
            container: treeAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets1.lottiefiles.com/packages/lf20_5szujujo.json",
        })

        treeRender.play()

        const beerAnimation = this.shadowRoot.querySelector(".beerAnim")
        const beerRender = bodymovin.loadAnimation({
            container: beerAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets10.lottiefiles.com/packages/lf20_1x1kukyl.json",
        })

        beerRender.play()

        const designAnimation = this.shadowRoot.querySelector(".designAnim")
        const designRender = bodymovin.loadAnimation({
            container: designAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets9.lottiefiles.com/packages/lf20_kts3o7k3.json",
        })

        designRender.play()

        const travelAnimation = this.shadowRoot.querySelector(".travelAnim")
        const travelRender = bodymovin.loadAnimation({
            container: travelAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets2.lottiefiles.com/packages/lf20_wzaxxisv.json",
        })

        travelRender.play()
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector(".codeAnim").pause()

        this.shadowRoot.querySelector(".treeAnim").pause()

        this.shadowRoot.querySelector(".beerAnim").pause()

        this.shadowRoot.querySelector(".designAnim").pause()

        this.shadowRoot.querySelector(".travelAnim").pause()
    }
}
customElements.define("about-life", AboutLife)
