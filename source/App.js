import Component from "./core/Component.js";
import VideoCardsList from "./components/VideoCardsList.js";
import PlayList from "./components/PlayList.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

export default class App extends Component {
    setup() {
        this.state = {
            isPlaying: false,
            VideoCards: [
                {
                    contents: "1",
                    src: "./source/resource/5s.mp4",
                },
                {
                    contents: "2",
                    src: "./source/resource/5s.mp4",
                },
                {
                    contents: "3",
                    src: "./source/resource/5s.mp4",
                },
                {
                    contents: "4",
                    src: "./source/resource/5s.mp4",
                },
                {
                    contents: "5",
                    src: "./source/resource/5s.mp4",
                },
            ],
        };
    }

    //todo : 헤더 메뉴 , footer , main 하단부
    // 리스트 위에 글자추가 https://twogood.com.au/ font "Futura Now Headline"
    //https://colabs.com.au/
    template() {
        return `
      <header></header>
      <main>
        <section id='VideoCardsList'></section>
        
      </main>
      <footer></footer>
    `;
    }
    // <section id="PlayList"></section>
    // mounted
    mounted() {
        const { VideoCards, PrevSlide, NextSlide } = this;
        const $Header = this.$target.querySelector("header");
        const $VideoCardsList = this.$target.querySelector("#VideoCardsList");
        const $PlayList = this.$target.querySelector("#PlayList");
        const $Footer = this.$target.querySelector("footer");
        // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
        // 다음과 같이 새로운 함수를 만들어줘야 한다.
        // ex) { addItem: contents => addItem(contents) }
        new Header($Header, {});
        new VideoCardsList($VideoCardsList, {
            VideoCards,
            PrevSlide: PrevSlide.bind(this),
            NextSlide: NextSlide.bind(this),
        });
        // new PlayList($PlayList, {});
        new Footer($Footer, {});
    }

    get VideoCards() {
        const { VideoCards } = this.state;

        return VideoCards;
    }

    PrevSlide(currSlide) {
        const slide = document.querySelector("#VideoCardsList");
        const slideItems = document.querySelectorAll(".main_music_card");
        const slideWidth = slide.clientWidth;
        const slideItemsLength = slideItems.length;
        const prevVideo =
            slideItems[currSlide].getElementsByClassName("video")[0];

        prevVideo.pause();
        prevVideo.currentTime = 0;

        currSlide--;
        currSlide >= 0 ? currSlide : (currSlide = slideItemsLength - 1);

        const offset = slideWidth * currSlide;
        slideItems.forEach((i) => {
            i.setAttribute("style", `left: ${-offset}px`);
        });

        const currVideo =
            slideItems[currSlide].getElementsByClassName("video")[0];
        currVideo.play();

        return currSlide;
    }
    NextSlide(currSlide) {
        const slide = document.querySelector("#VideoCardsList");
        const slideItems = document.querySelectorAll(".main_music_card");
        const slideWidth = slide.clientWidth;
        const slideItemsLength = slideItems.length;
        const prevVideo =
            slideItems[currSlide].getElementsByClassName("video")[0];

        prevVideo.pause();
        prevVideo.currentTime = 0;

        currSlide++;
        currSlide == slideItemsLength ? (currSlide = 0) : currSlide;

        const offset = slideWidth * currSlide;
        slideItems.forEach((i) => {
            i.setAttribute("style", `left: ${-offset}px`);
        });

        const currVideo =
            slideItems[currSlide].getElementsByClassName("video")[0];
        currVideo.play();

        return currSlide;
    }

    //     addItem(contents) {
    //         const { items } = this.state;
    //         const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    //         const active = false;
    //         this.setState({
    //             items: [...items, { seq, contents, active }],
    //         });
    //     }

    //     deleteItem(seq) {
    //         const items = [...this.state.items];
    //         items.splice(
    //             items.findIndex((v) => v.seq === seq),
    //             1
    //         );
    //         this.setState({ items });
    //     }

    //     toggleItem(seq) {
    //         const items = [...this.state.items];
    //         const index = items.findIndex((v) => v.seq === seq);
    //         items[index].active = !items[index].active;
    //         this.setState({ items });
    //     }

    //     filterItem(isFilter) {
    //         this.setState({ isFilter });
    //     }
}
