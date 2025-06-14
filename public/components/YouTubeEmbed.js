export class YouTubeEmbed extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['data-url'];
  }

  /**
   * @param {string} prop
   * @param {any} value
   */
  attributeChangedCallback(prop, value) {
    if (prop !== 'data-url') {
      return;
    }

    const url = this.dataset.url;
    const videoId = new URL(url).searchParams.get('v');

    if (!videoId) {
      return;
    }

    this.innerHTML = `
      <iframe
        width="100%"
        height="300"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `;
  }

  connectedCallback() {}
}

customElements.define('youtube-embed', YouTubeEmbed);
