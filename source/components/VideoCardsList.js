import Component from "../core/Component.js";

export default class VideoCard extends Component {
    template() {
        // todo : nav bar 추가, muted 시 버튼 전환, 텍스트,영상 채우기

        const { VideoCards } = this.props;
        const index = 0;

        return `
        ${VideoCards.map(
            ({ contents, src }, i) => `
                <div class="main_music_card  ${index == i ? "active" : ""}">
                  <div class="container">
                    <div class="warp_video">
                      <video
                      class="video"
                        playsinline
                        muted
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
                      </div>
                    </div>
                  </div>
                </div>
                `
        ).join("")}
              <div class="slide_prev_button slide_button">◀</div>
              <div class="slide_next_button slide_button">▶</div>
              `;
    }

    setEvent() {
        const { PrevSlide, NextSlide } = this.props;

        let currSlide = 0;
        let startPoint = 0;
        let endPoint = 0;

        // 버튼 클릭 이벤트
        this.addEvent("click", ".slide_prev_button", () => {
            currSlide = PrevSlide(currSlide);
        });
        this.addEvent("click", ".slide_next_button", () => {
            currSlide = NextSlide(currSlide);
        });

        // PC 드래그 이벤트
        this.addEvent("mousedown", "#VideoCardsList", (e) => {
            startPoint = e.pageX;
        });
        this.addEvent("mouseup", "#VideoCardsList", (e) => {
            endPoint = e.pageX;
            if (startPoint < endPoint) {
                currSlide = PrevSlide(currSlide);
            } else if (startPoint > endPoint) {
                currSlide = NextSlide(currSlide);
            }
        });

        // 모바일 터치 이벤트
        this.addEvent("touchstart", "#VideoCardsList", (e) => {
            startPoint = e.touches[0].pageX;
        });
        this.addEvent("touchend", "#VideoCardsList", (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (startPoint < endPoint) {
                currSlide = PrevSlide(currSlide);
            } else if (startPoint > endPoint) {
                currSlide = NextSlide(currSlide);
            }
        });

        //음소거 버튼
        this.addEvent("click", ".on_video_mute", ({ target }) => {
            const video = target.closest(".warp_video").childNodes[1];
            video.muted ? (video.muted = false) : (video.muted = true);
            console.log(video.muted);
        });

        //비디오 자동 넘기기(ended 때문에 컴포넌트 미사용)
        document.querySelectorAll(".video").forEach((video, index) => {
            // 맨처음 영상 플레이
            if (index == 0) {
                video.play();
            }
            video.addEventListener("ended", () => {
                currSlide = NextSlide(currSlide);
            });
        });
    }
}
