import Component from "./core/Component.js";
import VideoCardsList from "./components/VideoCardsList.js";
import Header from "./components/Header.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
    setup() {
        this.state = {
            isFilter: 0,
            VideoCards: [
                {
                    contents: "1",
                    src: "./source/resource/colabs-hero.mp4",
                },
                {
                    contents: "2",
                    src: "./source/resource/colabs-hero.mp4",
                },
                {
                    contents: "3",
                    src: "./source/resource/colabs-hero.mp4",
                },
                {
                    contents: "4",
                    src: "./source/resource/colabs-hero.mp4",
                },
                {
                    contents: "5",
                    src: "./source/resource/colabs-hero.mp4",
                },
            ],
        };
    }

    template() {
        return `
      <header data-component="item-appender"></header>
      <main>
        <section id='VideoCardsList' data-component="VideoCardsList"></section>
      </main>
      <footer data-component="item-filter"></footer>
    `;
    }

    // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
    mounted() {
        const { VideoCards, PrevSlide, NextSlide, toggleItem, filterItem } =
            this;
        const $Header = this.$target.querySelector(
            '[data-component="item-appender"]'
        );
        const $VideoCardsList = this.$target.querySelector(
            '[data-component="VideoCardsList"]'
        );
        const $itemFilter = this.$target.querySelector(
            '[data-component="item-filter"]'
        );

        // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
        // 다음과 같이 새로운 함수를 만들어줘야 한다.
        // ex) { addItem: contents => addItem(contents) }
        new Header($Header, {
            // addItem: addItem.bind(this),
        });
        new VideoCardsList($VideoCardsList, {
            VideoCards,
            PrevSlide: PrevSlide.bind(this),
            NextSlide: NextSlide.bind(this),
            // deleteItem: deleteItem.bind(this),
            // toggleItem: toggleItem.bind(this),
        });
        new ItemFilter($itemFilter, {
            // filterItem: filterItem.bind(this),
        });
    }

    get VideoCards() {
        const { isFilter, VideoCards } = this.state;
        return VideoCards.filter(
            ({ active }) =>
                (isFilter === 1 && active) ||
                (isFilter === 2 && !active) ||
                isFilter === 0
        );
    }

    PrevSlide(currSlide) {
        const slide = document.querySelector("#VideoCardsList");
        const slideItems = document.querySelectorAll(".main_music_card");

        currSlide--;
        if (currSlide > 0) {
            const offset = slide.clientWidth * (currSlide - 1);
            slideItems.forEach((i) => {
                i.setAttribute("style", `left: ${-offset}px`);
            });
        } else {
            currSlide++;
        }
        return currSlide;
    }
    NextSlide(currSlide) {
        const slide = document.querySelector("#VideoCardsList");
        const slideItems = document.querySelectorAll(".main_music_card");

        currSlide++;
        if (currSlide <= slideItems.length) {
            const offset = slide.clientWidth * (currSlide - 1);
            slideItems.forEach((i) => {
                i.setAttribute("style", `left: ${-offset}px`);
            });
        } else {
            currSlide--;
        }
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
