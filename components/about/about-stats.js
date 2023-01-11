const progressData = [
    {
        language: "Html & Css / Tailwind",
        progress: "70%",
    },
    {
        language: "React.js",
        progress: "72%",
    },
    {
        language: "JavaScript / TypeScript",
        progress: "79%",
    },
    {
        language: "NodeJs",
        progress: "75%",
    },
    {
        language: "Next.Js",
        progress: "78%",
    },
    {
        language: "Express.Js",
        progress: "68%",
    },
    {
        language: "Java",
        progress: "55%",
    },
    {
        language: "Hibernate, Struts",
        progress: "44%",
    },
    {
        language: "MySql, MongoDB",
        progress: "73%",
    },
    {
        language: "Python",
        progress: "47%",
    },
    {
        language: "GraphQL",
        progress: "48%",
    },
    {
        language: "Php",
        progress: "41%",
    },
    {
        language: "Hardhat",
        progress: "33%",
    },
    {
        language: "Solidity",
        progress: "27%",
    },
]

class AboutStats extends HTMLElement {
    constructor(language, progress) {
        super()
        this.language = language
        this.progress = progress

        const style = document.createElement("style")
        style.textContent = `
        .about-stats {
            padding-bottom: 8rem;
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
            .progress-bars {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 2rem;
            }
                .progress-bar {
                    display: flex;
                    flex-direction: column;
                }
                    .prog-title {
                        text-transform: uppercase;
                        font-weight: 600;
                        font-size: 1.1rem;
                        color: var(--color-bg-text);
                        text-shadow: 1px 1px 1px var(--color-about-life),
                            1px 1px 1px var(--color-about-life),
                            1px 1px 1px var(--color-about-life);
                    }
                    .progress-con {
                        display: flex;
                        align-items: center;
                    }
                        .prog-text {
                            color: var(--color-about-text);
                        }
                        .progress {
                            width: 100%;
                            height: 0.45rem;
                            background-color: var(--color-grey-4);
                            margin-left: 1rem;
                            position: relative;
                        }
                            .progress-mode {
                                position: absolute;
                                top: 0;
                                left: 0;
                                height: 100%;
                                background-color: var(--color-grey-2);
                                @include transition-ease;
                                width: 60%;
                            }
                            .form-skills{
                                letter-spacing: 1.1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-bottom: 3.3rem;
                            }
                            .new-skills{
                                margin: 0.66rem;
                                width: 15%;
                                padding: 0.33rem;
                                border-radius: 10px;
                                border: 2px solid var(--color-primary);
                                outline: none;
                                background-color: var(--color-input-form);
                                color: var(--color-about-text);
                                transition: background 0.2s, border-color 0.2s;
                            }
                            .new-skills:focus {
                                border-color: var(--color-bg-text);
                                background: var(--color-secondary);
                            }
                            .percentage{
                                width: 6%;
                            }
                            .percentage::-webkit-outer-spin-button,
                            .percentage::-webkit-inner-spin-button {
                                  -webkit-appearance: none;
                                     margin: 0;
                                }
                            .btn-skills{
                                padding: 0.33rem 0.5rem;
                                border: 2px solid var(--color-secondary);
                                border-radius: 10px;
                                outline: none;
                                background-color: var(--color-secondary);
                                color: var(--color-bg-text);
                                cursor: pointer;
                            }
                            .btn-skills:hover{
                                border-color: var(--color-bg-text)
                            }
            @media only screen and (min-width: 2560px){
                .stat-title {
                    font-size: 2.8rem;
                }
                .progress-bars {
                    grid-gap: 6rem;
                }
                .prog-title {
                    font-size: 2.2rem;
                }
                .prog-text{
                    font-size: 1.5rem;
                }
                .progress {
                    height: 0.6rem;
                }
                .new-skills{
                    margin: 1rem;
                    width: 19%;
                    padding: 0.55rem;
                    font-size: 1.5rem;
                }
                .percentage{
                    width: 7%;
                }
                .btn-skills{
                    font-size: 1.5rem;
                    padding: 0.66rem 0.8rem;
                    border: 3px solid var(--color-secondary);
                }
            }
            @media only screen and (max-width: 1024px){
                .stat-title {
                    font-size: 1.5rem;
                }
                .prog-title {
                    font-size: 1rem;
                }
                .progress {
                    height: 0.6rem;
                }
                .new-skills{
                    width: 17%;
                }
                .percentage{
                    width: 8%;
                }
                .btn-skills{
                    font-size: 0.9rem;
                }
            }
            @media only screen and (max-width: 768px){
                .progress {
                    height: 0.5rem;
                }
                .new-skills{
                    width: 33%;
                }
                .percentage{
                    width: 12%;
                }
                .btn-skills{
                    font-size: 0.9rem;
                }
            }
            @media only screen and (max-width: 426px){
                .percentage{
                    width: 17%;
                }
            }
        `
        document.body.appendChild(style)
    }

    get language() {
        return this._language
    }
    set language(language) {
        return (this._language = language)
    }
    get progress() {
        return this._progress
    }
    set progress(progress) {
        return (this._progress = progress + "%")
    }

    add() {
        const feedMe = document.forms["customize"]
        const language = feedMe["language"]
        const progress = feedMe["progress"]

        if (language.value.length > 0 && progress.value >= 0 && progress.value <= 99) {
            progressData.push(new AboutStats(language.value, progress.value))

            this.connectedCallback()
        }

        document.querySelector("#language").value = ""
        document.querySelector("#progress").value = ""
    }

    reviewMe = () => {
        document.getElementById("wantToWrapper").classList.toggle("areUready")
    }
    connectedCallback() {
        this.render()
        document.querySelector("#add").addEventListener("click", () => this.add())
    }
    render() {
        this.innerHTML = `
        
        <div class="about-stats">
        <h4 class="stat-title" id="statTittle">My skills</h4>
        <form class=form-skills id="customize" onsubmit="return false">
        <input class="new-skills" type="text" id="language" placeholder="example: jedi" required />
        <input class="new-skills percentage" type="number" id="progress" placeholder="0 to 99" required />
        <button class="btn-skills" id="add" type="button">add</button>
        </form>
        <div class="progress-bars" id="progress-bars">
        
        ${progressData
            .sort((a, b) => String(b.progress).localeCompare(a.progress))
            .map(({ language, progress }) => {
                return `

                <div class="progress-bar">
                <p class="prog-title" id="progTittle">${language}</p>
                <div class="progress-con">
                <p class="prog-text">${progress}</p>
                <div class="progress">
                <span class="progress-mode"style="width:${progress}"></span>
        </div>
        </div>
        </div>
                                    `
            })

            .join("")}
    </div>
    </div>

            `
    }

    disconnectedCallback() {
        document.querySelector("#add").removeEventListener()
    }
}

customElements.define("about-stats", AboutStats)
