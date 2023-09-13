import Component from "../core/Component.js";
import Carousel from "../components/Slider3d.js";
import AlbumPage from "./AlbumPage.js";

export default class MainPage extends Component {
    setup() {}

    template() {
        return `
        <div class="loading"></div>
        <div class="main_content"></div>
    `;
    }

    mounted() {
        const $Carousel = this.$target.querySelector(".main_content");
        const { goAlbumPage } = this;
        new Carousel($Carousel, {
            goAlbumPage: goAlbumPage.bind(this),
        });
    }

    goAlbumPage(e, selectedIndex, currentSlide) {
        const loading = document.querySelector(".loading");

        loading.style.left = `${e.clientX}px`;
        loading.style.top = `${e.clientY}px`;
        loading.style.opacity = `1`;
        loading.style.transition = `0.8s ease-in-out all`;
        loading.style.width = `200vw`;
        loading.style.height = `200vw`;

        // contents change
        setTimeout(() => {
            new AlbumPage(document.querySelector(".main_content"), {
                artistIndex: selectedIndex,
                albumIndex: currentSlide,
            });
        }, 1000);

        setTimeout(() => {
            loading.style.transition = `0.8s ease-in-out all`;
            loading.style.height = `0vw`;
            loading.style.width = `0vw`;
        }, 1500);
    }
}
