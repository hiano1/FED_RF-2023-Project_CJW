import Component from "./core/Component.js";
import VideoCards from "./components/VideoCards.js";
import Header from "./components/Header.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
    setup() {
        this.state = {
            isFilter: 0,
            CardsInfo: [
                {
                    // seq: 1,
                    // contents: "item1",
                    // active: false,
                    contents: "asdf",
                    src: "./source/resource/colabs-hero.mp4",
                },
            ],
        };
    }

    template() {
        return `
      <header data-component="item-appender"></header>
      <main data-component="VideoCards"></main>  
      <footer data-component="item-filter"></footer>
    `;
    }

    // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
    mounted() {
        const { CardsInfo, addItem, deleteItem, toggleItem, filterItem } = this;
        const $Header = this.$target.querySelector(
            '[data-component="item-appender"]'
        );
        const $VideoCards = this.$target.querySelector(
            '[data-component="VideoCards"]'
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
        console.log(this);

        new VideoCards($VideoCards, {
            CardsInfo,
            // deleteItem: deleteItem.bind(this),
            // toggleItem: toggleItem.bind(this),
        });
        new ItemFilter($itemFilter, {
            // filterItem: filterItem.bind(this),
        });
    }

    get CardsInfo() {
        const { isFilter, CardsInfo } = this.state;
        return CardsInfo.filter(
            ({ active }) =>
                (isFilter === 1 && active) ||
                (isFilter === 2 && !active) ||
                isFilter === 0
        );
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
