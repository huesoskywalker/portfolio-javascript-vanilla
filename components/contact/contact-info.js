const basicInfo = [
    {
        type: "Location",
        value: "Córdoba, Argentina",
        icon: "fas fa-map-marker-alt",
    },
    {
        type: "Languages:",
        value: "Spanish, English, Italian",
        icon: "fas fa-globe-africa",
    },
]

const socialNetworks = [
    {
        link: "https://www.linkedin.com/in/agustin-lavezzari",
        icon: "fab fa-linkedin-in",
    },
    {
        link: "https://github.com/huesoskywalker",
        icon: "fab fa-github",
    },
    {
        link: "https://www.youtube.com/@huesoskywalker",
        icon: "fab fa-youtube",
    },
    {
        link: "https://leetcode.com/huesoskywalker/",
        icon: "fa fa-code",
    },
]

class ContactInfo extends HTMLElement {
    constructor() {
        super()

        const style = document.createElement("style")
        style.textContent = `
        .left-contact {
            padding-top: 2.7rem;
            flex: 2;
        }
            h4 {
                margin-bottom: 2.6rem;
                font-size: 1.4rem;
                text-transform: uppercase;
                color: var(--color-about-tittle);
                text-shadow: 1px 1px 1px var(--color-theme-inverse),
                    1px 1px 1px var(--color-theme-inverse),
                    1px 1px 1px var(--color-theme-inverse);
            }

                .contact-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .icon {
                    display: grid;
                    grid-template-columns: 40px 1fr;
                }
                .mine {
                    color: var(--color-contact);
                    display: flex;
                    align-items: center;
                    font-size: 1.5rem;
                }
                span{
                    align-items:center;
                    font-size: 1.2rem;
                    
                }
               
                    p {
                        margin: 0.5em 0 !important;
                        padding: 0 !important;
                        color: var(--color-about-text);
                        font-size: 1.2rem;
                        text-shadow: 1px 1px 1px var(--color-grey-6),
                    1px 1px 1px var(--color-grey-6),
                    1px 1px 1px var(--color-grey-6);
                    }
                 

            .contact-icon {
                display: flex;
                justify-content: flex-start;
                margin-top: 2rem;
            }
                a {
                    display: flex;
                    align-items: center;
                    background-color: var(--color-input-form);
                    cursor: pointer;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin: 0 0.4rem;
                    @include transition-ease;
                }
                .item{
                    font-size: 1.6rem;
                    color: var(--color-grey-3);
                }
                .item:hover {
                    color: var(--color-grey-2);
        }
        @media only screen and (min-width: 2560px){
            .left-contact{
                padding-top: 5rem;
            }
            h4{
                font-size: 2.7rem;
            }
            .icon{
                padding: 1.5rem;
            }
            .mine{
                font-size: 2.8rem;
            }
            span{
                padding: 0 2rem;
                font-size: 2rem;
            }
            p{
               font-size: 2rem; 
            }
            a{
                width: 70px;
                height: 70px;
                margin: 0 0.8rem;
            }
            .item{
                font-size: 2.4rem;
            }
        }
        @media only screen and (max-width: 1024px){
            .left-contact{
                padding-top: 2rem;
            }
            h4{
                font-size: 1.2rem;
            }
            .mine{
                font-size: 1.3rem;
            }
            span{
                font-size: 1.1rem;
            }
            p{
               font-size: 1.1rem; 
            }
            a{
                width: 40px;
                height: 40px;
                margin: 0 0.3rem;
            }
            .item{
                font-size: 1.4rem;
            }
        }
        @media only screen and (max-width: 426px){
            .left-contact{
                padding: 0 1rem;
            }
        }
        `
        document.body.appendChild(style)
    }

    connectedCallback() {
        this.render()
    }
    render() {
        this.innerHTML = `

            <div class="left-contact">
            <h4 id="contactTitle">Buckle your seatbelt Dorothy</h4>
            <div class="contact-info">
        ${basicInfo
            .map(({ icon, type, value }) => {
                return `
            <div class="contact-item">
                <div class="icon">
                    <i class="${icon} mine"></i>
                    <span>${type}</span>
                </div>
                <p>${value}</p>
            </div>
            `
            })
            .join("")}
           
        </div>
            <div class="contact-icon">
            ${socialNetworks
                .map(({ link, icon }) => {
                    return `
                <a
                    href="${link}"
                    target="_blank"
                >
                    <i class="${icon} item"></i>
                </a>
            `
                })
                .join("")}
            </div>
        </div>
        `
    }
}

customElements.define("contact-info", ContactInfo)
