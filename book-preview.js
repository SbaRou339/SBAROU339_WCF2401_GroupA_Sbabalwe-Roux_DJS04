// book-preview.js

class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.querySelector('[data-list-close]').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('close'));
        });
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
            <style>
                .preview-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    background-color: #fff;
                }
                .preview-image {
                    max-width: 100%;
                    height: auto;
                }
                .preview-title {
                    font-size: 1.5rem;
                    margin: 0.5rem 0;
                }
                .preview-author {
                    font-size: 1rem;
                    color: #555;
                }
                .preview-description {
                    font-size: 1rem;
                    margin-top: 0.5rem;
                }
            </style>
            <div class="preview-container">
                <img class="preview-image" src="${this._book.image}" alt="${this._book.title}">
                <div class="preview-title">${this._book.title}</div>
                <div class="preview-author">${this._book.author}</div>
                <div class="preview-description">${this._book.description}</div>
            </div>
        `;
    }
}

customElements.define('book-preview', BookPreview);
