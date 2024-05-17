// book-preview.js

class BookPreview extends HTMLElement {
    
    /**
     * Constructor for initializing the BookPreview element.
     * 
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    
    /**
     * Calls the render method to render the element.
     *
     */
    connectedCallback() {
        this.render();
    }

    /**
     * Sets the book property of the element and triggers a re-render.
     *
     * @param {type} book - The book object to set.
     * @return {type} Description of the return value.
     */
    set book(book) {
        this._book = book;
        this.render();
    }

    /**
     * Getter for the book property.
     *
     * @return {type} description of return value
     */
    get book() {
        return this._book;
    }

    /**
     * Renders the book information into the shadow DOM.
     *
     */
    render() {
        // If there is no book, return early
        if (!this._book) return;

        // Define the styles for the preview container
        const styles = `
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
        `;

        // Define the HTML structure for the preview
        const html = `
            <div class="preview-container">
                <img class="preview-image" src="${this._book.image}" alt="${this._book.title}">
                <div class="preview-title">${this._book.title}</div>
                <div class="preview-author">${this._book.author}</div>
                <div class="preview-description">${this._book.description}</div>
            </div>
        `;

        // Set the innerHTML of the shadowRoot to the styles and HTML
        this.shadowRoot.innerHTML = `${styles}${html}`;
    }
}

customElements.define('book-preview', BookPreview);
