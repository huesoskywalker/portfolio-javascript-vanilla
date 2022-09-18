const dialogTemplate = document.createElement("template")
dialogTemplate.innerHTML = `
<dialog id="favDialog" class="dialog">
  <form method="dialog">
    <p><label>Pick a pickle:
      <select>
          <option value="hide">None</option>
        <optgroup label="Courses">
          <option>Java</option>
          <option>Javascript</option>
          <option>Solidity</option>
          <option>Data Structure</option>
        </optgroup>
        <optgroup label="Tutorials">
          <option>Web 3</option>
          <option>Web 2</option>
        </optgroup>
        <optgroup label="Do it yourself">
        <option>Scratch</option>
        </optgroup>
      </select>
    </label></p>
    <div>
      <button id="confirmBtn" value="default" class="confirm">Confirm</button>
    </div>
  </form>
</dialog>
<p>
  <button id="updateDetails" class="open">Latest Path</button>
</p>
<output></output>

`

class DialogBox extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(dialogTemplate.content.cloneNode(true))

        const style = document.createElement("style")
        style.textContent = `
        .open{
          z-index: 2;
          position: fixed;
          top: 23.7%;
          left: 3%;
          color: var(--color-grey-1);
          background-color: var(--color-contact);
          border: 2px solid var(--color-grey-1);
          padding: 0.3em 0.5em;
          font-weight: 100;
          cursor: pointer;
          letter-spacing: 1px;
      }
      .dialog{
        padding: 1.2rem;
        font-size: 1.2rem;
        color: var(--color-about-text);
        background-color: var(--color-grey-6);
        border: 3px solid var(--color-grey-3);
      }
      select{
        width: 125px;
      }

      .confirm{
        color: var(--color-about-text);
        background-color: var(--color-grey-6);
        border: 3px solid var(--color-grey-2);
        padding: 0.3em 0.5em;
        cursor: pointer;
    }
    @media only screen and (min-width: 2560px){
      .open{
          font-size: 1.6rem;
      }
      .dialog{
          padding: 2rem;
          font-size: 1.8rem;
          border: 6px solid var(--color-grey-3);
      }
      
      select{
        width: 180px;
        height: 40px;
        font-size: 1.1rem;
      }
      .confirm{
          border: 5px solid var(--color-secondary);
          font-size: 1.5rem;
      }
  }
  
          `
        this.shadowRoot.appendChild(style)
    }

    updateDetails() {
        const favDialog = this.shadowRoot.querySelector("#favDialog")
        if (typeof favDialog.showModal === "function") {
            favDialog.showModal()
        }
    }
    selectType(e) {
        const confirmBtn = this.shadowRoot.querySelector("#confirmBtn")
        const favDialog = this.shadowRoot.querySelector("#favDialog")
        const selectType = favDialog.querySelector("select")

        confirmBtn.value = selectType.value
    }

    triggerItems() {
        const favDialog = this.shadowRoot.querySelector("#favDialog")

        const portfolioItems = document.querySelector("#portfolio-items")

        portfolioItems.setAttribute("state", `${favDialog.returnValue}`)
    }
    connectedCallback() {
        this.shadowRoot
            .querySelector("#updateDetails")
            .addEventListener("click", () => this.updateDetails())
        this.shadowRoot.querySelector("select").addEventListener("change", () => this.selectType())
        this.shadowRoot
            .querySelector("#favDialog")
            .addEventListener("close", () => this.triggerItems())
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector("#updateDetails").removeEventListener()
        this.shadowRoot.querySelector("select").removeEventListener()
        this.shadowRoot.querySelector("#favDialog").removeEventListener()
    }
}

customElements.define("dialog-box", DialogBox)
