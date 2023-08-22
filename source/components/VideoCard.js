import Component from "../core/Component.js";

export default class VideoCard extends Component {
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

        // 카드 번호 찍을 인덱스 / 설명글에 적을 데이터/ 영상 경로
        // src="./source/resource/colabs-hero.mp4"

        const { CardsInfo } = this.props;

        return `
        ${CardsInfo.map(
            ({ contents, src }) => `
        
          <div class="main_music_card">
            <div class="container">
                <div class="inner">
                    <div class="warp_video">
                      <video
                        playsinline
                        autoplay
                        muted
                        loop
                        src="${src}"
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
                          ${contents}
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
                      <div class="on_video_mute">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            width="800px"
                            height="800px"
                            viewBox="-1 0 19 19"
                            class="cf-icon-svg"
                          >
                            <path
                              d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zM7.84 6.05c0-.435-.252-.54-.56-.232L5.16 7.94H3.704a.794.794 0 0 0-.791.793v1.686a.794.794 0 0 0 .791.792h1.457l2.12 2.12c.308.308.56.204.56-.232zm3.84 3.524 1.49-1.49a.396.396 0 0 0-.56-.56l-1.49 1.49-1.49-1.49a.396.396 0 0 0-.56.56l1.49 1.49-1.49 1.49a.396.396 0 1 0 .56.56l1.49-1.49 1.49 1.49a.396.396 0 0 0 .56-.56z"
                              fill="#F9F8F6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
          </div>
          `
        ).join("")}
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
