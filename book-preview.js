// book-preview.js

class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    set book(book) {
      this._book = book;
      this.render();
    }
  
    get book() {
      return this._book;
    }
  
    render() {
      if (!this._book) return;
  
      this.shadowRoot.innerHTML = `
              <div class="preview-container">
                  <img class="preview-image" src="${this._book.image}" alt="${this._book.title}">
                  <div class="preview-details">
                      <div class="preview-title">${this._book.title}</div>
                      <div class="preview-author">${this._book.author}</div>
                      <div class="preview-description">${this._book.description}</div>
                  </div>
              </div>
              <style>
                  .preview-container {
                      display: flex;
                      padding: 1rem;
                      border: 1px solid #ccc;
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1);
                      background-color: #fff;
                  }
                  .preview-image {
                      max-width: 50%;
                      height: auto;
                  }
                  .preview-details {
                      margin-left: 1rem;
                  }
                  .preview-title {
                      font-size: 2rem;
                      font-weight: bold;
                      margin: 0.5rem 0;
                  }
                  .preview-author {
                      font-size: 1rem;
                      font-style: italic;
                      color: #555;
                  }
                  .preview-description {
                      font-size: 0.8rem;
                      margin-top: 0.5rem;
                  }
              </style>
              
          `;
    }
}
customElements.define("book-preview", BookPreview);
