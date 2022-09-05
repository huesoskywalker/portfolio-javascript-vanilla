const newWish = []
class MyTerminal extends HTMLElement {
    constructor(wish) {
        super()
        this.wish = wish

        const style = document.createElement("style")
        style.textContent = `
        .review-btn {
            z-index: 2;
            box-shadow: -1px 1px 0px 1px var(--color-bg-text);
            border: none;
            position: fixed;
            cursor: pointer;
            top: 31%;
            left: 3.3%;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            background-color: var(--color-contact);
            color: var(--color-secondary);
        }
        i{
            font-size: 1.2em;
        }
            .review-btn:active {
                transform: translateY(3px) translateX(-3px);
                box-shadow: 0px 0px 0px 0px rgb(0, 0, 0, 0);
            }
            .wantToWrapper {
                z-index: 7;
                position: flex;
                align-items: center;
                justify-content: center;
            }
                .wantTo {
                    display: flex;
                    position: fixed;
                    padding: 5px;
                    border-radius: 5px;
                    top: 22%;
                    left: 31%;
                    z-index: 2;
                    background: black;
                }
                    .homie {
                        vertical-align: baseline;
                        font-size: 1rem;
                        color: rgb(0, 255, 0);
                        padding: 0 5px;
                        margin-right: 5px;
                    }
                    .terminal {
                        font-size: 0.9rem;
                        width: 266px;
                        text-align: start;
                        background-color: black;
                        color: rgb(192, 192, 192);
                        caret-color: rgb(128, 128, 0);
                        border: none;
                    }
                    .enterReview {
                        cursor: crosshair;
                        background: black;
                        padding: 0 5px;
                        margin: 0 5px;
                    }
 
                        .add {

                            color: rgb(0, 255, 255);
                            width: 20px;
                            height: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    
                    .redoReview {
                        cursor: no-drop;
                        background: black;
                        padding: 0 5px;
                        margin: 0 5px;
                    }
                        .remove {
                            color: rgb(128, 0, 0);
                            height: 20px;
                            width: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
  
            .areUready {
                visibility: hidden;
            }
            .stamps {
                z-index: -1;
                position: absolute;
                max-width:500px;
            }
            .wishes {
                display: grid;
                grid-template-rows: auto auto auto;
                row-gap: 11px;
            
                align-self: center;
                z-index: 1;
            }
            @media only screen and (min-width: 2560px){
                .review-btn {
                    width: 75px;
                    height: 75px;
                    box-shadow: -2px 2px 0px 2px var(--color-bg-text);
                    border-radius: 10px;
                }
                i{
                    font-size: 1.9em;
                }
                .wantTo {
                    padding: 10px;
                    border-radius: 10px;
                    top: 18.5%;
                    left: 32.75%;
                }
                .homie {
                    font-size: 1.6rem;
                }
                .terminal {
                    font-size: 1.3rem;
                    width: 380px;
                }
                .enterReview {
                    padding: 0 10px;
                    margin: 0 10px;
                }

                    .add {

                        width: 22px;
                        height: 22px;
                    }
                    .redoReview {
                        padding: 0 10px;
                        margin: 0 10px;
                    }
                        .remove {
                            height: 23px;
                            width: 23px;
                        }
            }
            @media only screen and (max-width: 1024px){
                .review-btn {
                    width: 40px;
                    height: 40px;
                }
                i{
                    font-size: 1.1em;
                }
                .wantTo {
                    top: 19%;
                    left: 22%;
                }
                .homie {
                    font-size: 0.9rem;
                }
                .terminal {
                    font-size: 0.8rem;
                    width: 240px;
                }
                .enterReview {
                    padding: 0 4px;
                    margin: 0 4px;
                }

                    .add {

                        width: 17px;
                        height: 17px;
                    }
                    .redoReview {
                        padding: 0 4px;
                        margin: 0 4px;
                    }
                        .remove {
                            height: 17px;
                            width: 17px;
                        }
            }
            @media only screen and (max-width: 768px){
                .wantTo {
                    top: 19%;
                    left: 13%;
            }
            @media only screen and (max-width: 426px){
                .wantTo {
                    top: 40%;
                    left: 0%;
                }
                .homie{
                    font-size: 0.7rem;
                }
                .terminal {
                    font-size: 0.6rem;
                    width: 140px;
                }
                .add{
                    height: 14px;
                    width: 14px;
                }
                .remove{
                    height: 14px;
                    width: 14px;
                }
                h1{
                    font-size: 1.5rem;
                }
            }
        `
        document.body.appendChild(style)
    }

    get wish() {
        return this._wish
    }
    set wish(wish) {
        return (this._wish = wish)
    }
    reviewMe = () => {
        document.querySelector("#wantToWrapper").classList.toggle("areUready")
    }

    add() {
        const feedMe = document.forms["feedMe"]
        const wish = feedMe["wishCatcher"]

        const yAxis = () => {
            const u = Math.floor(Math.random() * 60) + 25
            return u + "%"
        }
        const xAxis = () => {
            const u = Math.floor(Math.random() * 80) + 2
            return u + "%"
        }
        const rgb = () => {
            const r = Math.floor(Math.random() * 255)
            const g = Math.floor(Math.random() * 255)
            const b = Math.floor(Math.random() * 255)
            return "rgb(" + r + "," + g + "," + b + ")"
        }

        if (wish.value.length > 0) {
            document.querySelector("#portfolio-items").setAttribute("state", "hide")
            newWish.push(new MyTerminal(wish.value))

            async function wishPromise() {
                const inkMe = document.createElement("div")
                inkMe.setAttribute("class", "stamps")
                inkMe.style.top = `${yAxis()}`
                inkMe.style.left = `${xAxis()}`

                let wishes = new Promise(function (resolve) {
                    resolve(
                        `${newWish
                            .map(({ _wish }) => {
                                return `
                                <h1 style="color: ${rgb()}";>
    
                                ${_wish}
                                </h1>
    
                                `
                            })
                            .slice(-1)}`
                    )
                })
                document.body.appendChild(inkMe).innerHTML = await wishes
            }

            wishPromise()
        }

        document.getElementById("wishCatcher").value = ""
        localStorage.setItem("divs", JSON.stringify(newWish))
    }

    remove() {
        const wishes = localStorage.getItem("divs")
        const clearStamps = document.querySelectorAll(".stamps")
        if (wishes) {
            localStorage.removeItem("divs")
            for (let i = 0; i < clearStamps.length; i++) {
                this.parentNode.removeChild(clearStamps[i])
            }
        }
    }

    pleaseInteract() {
        const feedBack = document.querySelector("#menu-button").getAttribute("state")
        const haveWishes = localStorage.getItem("divs")
        const openTerminal = document.querySelector("#wantToWrapper")
        const focusWish = document.querySelector("#wishCatcher")

        if (feedBack === "open" && !haveWishes) {
            openTerminal.style.visibility = "visible"
            focusWish.focus({ focusVisible: true })
            document.querySelector("#menu-button").setAttribute("state", "hold")
        }
    }
    connectedCallback() {
        this.render()
        document.querySelector("#add").addEventListener("click", () => this.add())
        document.querySelector("#remove").addEventListener("click", () => this.remove())
        document.querySelector("#reviewMe").addEventListener("click", () => this.reviewMe())

        document
            .querySelector("#menu-button")
            .addEventListener("click", () => this.pleaseInteract())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#add").removeEventListener()
        this.shadowRoot.querySelector("#remove").removeEventListener()
        this.shadowRoot.querySelector("#reviewMe").removeEventListener()
        document.querySelector("#menu-button").removeEventListener()
    }

    render() {
        this.innerHTML = `
        
        <button class="review-btn" id="reviewMe">
        <i class="fas fa-terminal"></i>
        </button>
        <div id="wantToWrapper" class="wantToWrapper areUready">
        <form class="wantTo" id="feedMe" onsubmit="return false">
            <p class="homie">mileniumfalcon@huesoskywalker:</p>
            <input
                type="text"
                id="wishCatcher"
                class="terminal"
                placeholder="send a wish to a galaxy far, far away..."
            />
            <button class="enterReview" id="add">
                <i class="far fa-hand-point-left add"></i>
            </button>
            <button class="redoReview" id="remove">
                <i class="fas fa-redo remove"></i>
            </button>
        </form>
        </div>

            `
    }
}

customElements.define("my-terminal", MyTerminal)
