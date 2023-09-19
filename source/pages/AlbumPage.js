import AlbumDetail from "../components/AlbumDetail.js";
import MainPage from "../pages/MainPage.js";
import Component from "../core/Component.js";
import MusicPlayer from "../components/MusicPlayer.js";

export default class AlbumPage extends Component {
    setup() {}

    template() {
        return `
        <div class="layout"></div>
        `;
    }

    mounted() {
        const { artistIndex, albumIndex } = this.props,
            { goMainPage, getMusicPlayer } = this,
            $AlbumDetail = this.$target.querySelector(".layout");

        new AlbumDetail($AlbumDetail, {
            artistIndex: artistIndex,
            albumIndex: albumIndex,
            goMainPage: goMainPage.bind(this),
            getMusicPlayer: getMusicPlayer.bind(this),
        });
    }

    goMainPage(e) {
        const loading = document.querySelector(".loading");

        loading.style.left = `${e.clientX}px`;
        loading.style.top = `${e.clientY}px`;
        loading.style.opacity = `1`;
        loading.style.transition = `1s ease-in-out all`;
        loading.style.width = `250vw`;
        loading.style.height = `250vw`;

        // contents change
        setTimeout(() => {
            new MainPage(document.querySelector("#app"));
        }, 1000);

        setTimeout(() => {
            loading.style.transition = `1s ease-in-out all`;
            loading.style.height = `0vw`;
            loading.style.width = `0vw`;
        }, 1500);

        setTimeout(() => {
            loading.style = "";
        }, 2500);
    }
    getMusicPlayer(trackId) {
        new MusicPlayer(document.querySelector("#fixed"), trackId);
    }
}
