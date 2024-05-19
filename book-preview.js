class BookPreview extends HTMLElement {
  /**
   * Initializes a new instance of the class.
   *
   * This constructor sets up the shadow DOM for the element and attaches it to the DOM.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the book and authors for the component and triggers a render.
   *
   * @param {Object} book - The book object.
   * @param {Object} authors - The authors object.
   */
  set book({ book, authors }) {
    this._book = book;
    this._authors = authors;
    this.render();
  }

  /**
   * Get the book object.
   *
   * @return {Object} The book object.
   */
  get book() {
    return this._book;
  }

  /**
   * Called when the custom element is inserted into a document. This method is responsible for rendering the component.
   *
   * @return {void} This function does not return anything.
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Adds event listeners to the close button, modal overlay, and modal content.
   *
   * @return {void} This function does not return anything.
   */
  addEventListeners() {
    const closeButton = this.shadowRoot.querySelector("[data-close-button]");
    const modalOverlay = this.shadowRoot.querySelector(
      "[data-book-preview-overlay]"
    );
    const modalContent = this.shadowRoot.querySelector(".book-preview-content");

    if (closeButton && modalOverlay && modalContent) {
      closeButton.addEventListener("click", this.closeModal.bind(this));
      modalOverlay.addEventListener("click", this.closeModal.bind(this));
      modalContent.addEventListener("click", (event) =>
        event.stopPropagation()
      );
    }

    this.listenersAdded = true; // Set the flag to true after adding listeners
  }

  /**
   * Closes the modal by removing it from the DOM and resetting the flag indicating if listeners are added.
   *
   * @return {void} This function does not return anything.
   */
  closeModal() {
    this.remove(); // Remove the modal from the DOM
    this.listenersAdded = false; // Reset the flag when the modal is closed
  }

  /**
   * Renders the book preview modal with the book details.
   *
   * @return {void} This function does not return anything.
   */
  render() {
    if (!this._book || !this._authors) return;

    // Truncate the description to around 60 words
    const words = this._book.description.split(' ');
    const truncatedWords = words.slice(0, 50);
    const truncatedDescription = truncatedWords.join(' ');

    // Add three dots at the end if the description was truncated
    const finalDescription = truncatedWords.length < words.length ? truncatedDescription + '...' : truncatedDescription;

    const authorName = `${this._authors[this._book.author]} (${this._book.year})`;

    this.shadowRoot.innerHTML = `
            <div class="book-preview-overlay" data-book-preview-overlay>
                <div class="book-preview-content">
                    <div class="preview-container">
                        <img class="preview-image" src="${this._book.image}" alt="${this._book.title}">
                        <div class="preview-details">
                            <div class="preview-title">${this._book.title}</div>
                            <div class="preview-author">${authorName}</div>
                            <div class="preview-description">${finalDescription}</div>
                            <button data-close-button class="close-button">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .book-preview-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .book-preview-content {
                    background: black; /* Dark background similar to the image */
                    color: #fff; /* White text for contrast */
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    position: relative;
                    max-width: 600px; /* Set a max-width for the modal */
                    width: 100%; /* Ensure it takes the full width up to the max-width */
                    max-height: 80%; /* Set a max-height for the modal content */
                    overflow-y: auto; /* Enable vertical scrolling if content overflows */
                    text-align: center; /* Center align text */
                }
                .book-preview-content::-webkit-scrollbar {
                    width: 0; /* For WebKit-based browsers */
                    height: 0;
                }
                .book-preview-content {
                    -ms-overflow-style: none; /* For Internet Explorer and Edge */
                    scrollbar-width: none; /* For Firefox */
                }
                .book-preview-content::-webkit-scrollbar-thumb {
                    background: transparent;
                }
                .book-preview-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .close-button {
                    background-color: #007bff; /* Blue background color for the button */
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                }
                .preview-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .preview-image {
                    max-width: 100%;
                    height: auto;
                    border-bottom: 1px solid #444; /* Add a border to separate the image */
                    margin-bottom: 1rem; /* Add margin below the image */
                }
                .preview-details {
                    margin-top: 1rem;
                }
                .preview-title {
                    font-size: 1.5rem; /* Adjusted font size */
                    font-weight: bold;
                    margin: 0.5rem 0;
                }
                .preview-author {
                    font-size: 1rem;
                    font-style: italic;
                    color: #aaa; /* Lighten the author text color for better readability */
                }
                .preview-description {
                    font-size: 0.9rem; /* Slightly larger font size */
                    margin-top: 0.5rem;
                }
            </style>
        `;

    this.addEventListeners();
  }
}

customElements.define("book-preview", BookPreview);
