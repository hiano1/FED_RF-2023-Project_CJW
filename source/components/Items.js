import Component from "../core/Component.js";

export default class Items extends Component {
    template() {
        //   const { filteredItems } = this.props;
        //   return `
        //   <ul>
        //     ${filteredItems
        //         .map(
        //             ({ contents, active, seq }) => `
        //       <li data-seq="${seq}">
        //         ${contents}
        //         <button class="toggleBtn" style="color: ${
        //             active ? "#09F" : "#F09"
        //         }">
        //           ${active ? "활성" : "비활성"}
        //         </button>
        //         <button class="deleteBtn">삭제</button>
        //       </li>
        //     `
        //         )
        //         .join("")}
        //   </ul>
        // `;

        return `
          <section class="main_music_card">
            <div class="container">
                <div class="inner">
                    <div class="warp_video">
                      <video
                        playsinline
                        autoplay
                        muted
                        loop
                        src="./source/resource/colabs-hero.mp4"
                        type="video/mp4"
                      ></video>
                      <div class="video_title">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                        >
                          <path
                              d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                              fill="#F9F8F6"
                          ></path>
                        </svg>
                        <h1>
                          Making<br />
                          space for transformative innovation
                        </h1>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                        >
                          <path
                              d="m100,0H0v100C0,44.77,44.77,0,100,0Z"
                              fill="#F9F8F6"
                          ></path>
                        </svg>
                      </div>
                    </div>
                </div>
            </div>
          </section>
        `;
    }

    setEvent() {
        const { deleteItem, toggleItem } = this.props;

        this.addEvent("click", ".deleteBtn", ({ target }) => {
            deleteItem(Number(target.closest("[data-seq]").dataset.seq));
        });

        this.addEvent("click", ".toggleBtn", ({ target }) => {
            toggleItem(Number(target.closest("[data-seq]").dataset.seq));
        });
    }
}
