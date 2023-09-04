import Component from "../core/Component.js";
import Carousel from "../components/Slider3d.js";

export default class MainPage extends Component {
    setup() {}

    template() {
        return `
        <div class="container3d"></div>
    `;
    }

    mounted() {
        const $Carousel = this.$target.querySelector(".container3d");
        new Carousel($Carousel, {});
    }
}
