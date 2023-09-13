import AlbumDetail from "../components/AlbumDetail.js";
import Component from "../core/Component.js";

export default class AlbumPage extends Component {
    setup() {}

    template() {
        return `
        <div class="layout"></div>
        `;
    }

    mounted() {
        const { artistIndex, albumIndex } = this.props;
        const $AlbumDetail = this.$target.querySelector(".layout");
        new AlbumDetail($AlbumDetail, { artistIndex, albumIndex });
    }
}
