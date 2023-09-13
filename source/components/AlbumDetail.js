import Component from "../core/Component.js";
import Artist from "../core/API.js";

export default class AlbumDetail extends Component {
    template() {
        const { artistIndex, albumIndex } = this.props;
        const apiData = new Artist();
        const albumData = apiData.getAlbum(artistIndex).albums[albumIndex];

        console.log(albumData);
        let trackList = albumData.trackList
            .map(
                (item, index) => `
            
            <div class="track">
                <div class="track_number">${index + 1}</div>
                <div class="track_title">${item.name}</div>
                <div class="track_artist">${item.artist}</div>
                <div class="track_button">
                    <button>...</button>
                </div>
             </div>
            `,
            )
            .join("");

        return `
        <div class="section-stick">
            <div class="stick active"></div>
        </div>

        <section class="s1">
            <div class="intro_stiky_video">
                <video src="source/resource/colabs-hero.mp4" autoplay muted playsinline loop></video>
                <div class="intro_video_text">
                    <h2>${albumData.title} </br> ${albumData.titleSong}</h2>
                </div>
            </div>
        </section>

        <section class="s2">
            <div class="div_warp">
                <div class="album_info_contaier">
                    <div class="album_image">
                        <img src="${albumData.albumArt}" alt="art01" />
                    </div>
                    <div class="album_description">
                        <div class="desc_title_area">
                            <div class="desc_title">${albumData.title}</div>
                            <div class="desc_sub_title">
                                ${apiData.getAlbum(artistIndex).name}
                            </div>
                        </div>
                        <div class="desc_items">
                            <div class="desc_item">${albumData.release}</div>
                            <div class="desc_item">${albumData.genre}</div>
                            <div class="desc_item">18곡, 58분 3초</div>
                        </div>
                        <div class="desc_text">
                            ${albumData.description}
                        </div>
                        <div class="desc_button">
                            <button>전체 재생</button>
                            <button>apple</button>
                            <button>spotify</button>
                            <button>youtube</button>
                        </div>
                    </div>
                    <div class="track_list_container">
                        <div class="track_list_title">Track List</div>
                        <div class="track_list">
                            ${trackList}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="s3">
            <div class="div_warp">
                <div class="album_contents_container">
                    <div class="album_content">
                        <video src="source/resource/5s.mp4"></video>
                    </div>
                    <div class="album_content"></div>
                    <div class="album_content">
                        <img class="content_thumbnail" alt="thumbnail" />
                    </div>
                    <div class="album_content">
                        <img class="content_thumbnail" alt="thumbnail" />
                    </div>
                    <div class="album_content">
                        <img class="content_thumbnail" alt="thumbnail" />
                    </div>
                    <div class="album_content">
                        <img class="content_thumbnail" alt="thumbnail" />
                    </div>
                    <div class="album_content">
                        <img class="content_thumbnail" alt="thumbnail" />
                    </div>
                </div>
            </div>
        </section>

        <section class="s4">
            <div class="div_warp">
                <div class="recommend_container">
                    <!-- round btn mouse hover animation-->
                    <div class="recommend_items">
                        <div class="recommend_item">
                            <img src="source/resource/art01.jpg" alt="" />
                        </div>
                        <div class="recommend_item"></div>
                        <div class="recommend_item"></div>
                        <div class="recommend_item"></div>
                    </div>
                    <div class="recommend_items">
                        <div class="recommend_item"></div>
                        <div class="recommend_item"></div>
                        <div class="recommend_item"></div>
                        <div class="recommend_item"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
    }

    setEvent() {
        const TIME_OUT = 600; // It should be the same transition time of the sections
        const body = document.querySelector(".layout");
        const sectionsQty = document.querySelectorAll("section").length;
        const sectionStick = document.querySelector(".section-stick");
        let startFlag = true;
        let initialScroll = window.scrollY;
        let qty = 1,
            main = null,
            next = null;
        // Add child elements in .section-stick as number of sections exist
        Array(sectionsQty)
            .fill()
            .forEach(() => {
                sectionStick.innerHTML =
                    sectionStick.innerHTML + '<div class="stick"></div>';
            });
        // console.log("SLIDE", qty);

        function onePageScroll() {
            if (startFlag) {
                const scrollDown = window.scrollY >= initialScroll;
                const scrollLimit = qty >= 1 && qty <= sectionsQty;
                // Verify that the scroll does not exceed the number of sections
                if (scrollLimit) {
                    body.style.overflowY = "hidden"; // Lock el scroll
                    if (scrollDown && qty < sectionsQty) {
                        main = document.querySelector(`section.s${qty}`);
                        next = document.querySelector(`section.s${qty + 1}`);
                        main.style.transform = "translateY(-100vh)";
                        next.style.transform = "translateY(0)";
                        qty++;
                    } else if (!scrollDown && qty > 1) {
                        main = document.querySelector(`section.s${qty - 1}`);
                        next = document.querySelector(`section.s${qty}`);
                        main.style.transform = "translateY(0)";
                        next.style.transform = "translateY(100vh)";
                        qty--;
                    }
                    // Scroll progressbar
                    const active = document.querySelector(
                        ".section-stick .stick.active",
                    );
                    active.style.top = 11 * (qty - 1) + "vh";
                }
                // console.log("SLIDE", qty);
                // Wait for the scrolling to finish to reset the values
                setTimeout(() => {
                    initialScroll = window.scrollY;
                    startFlag = true;
                    body.style.overflowY = "scroll"; // Unlock scroll
                }, TIME_OUT);
                startFlag = false;
            }
            // Keep scrollbar in the middle of the viewport
            window.scroll(0, window.screen.height);
        }
        //refresh event block

        setTimeout(() => {
            // Listening to scroll event
            window.onscroll = () => {
                onePageScroll();
            };
        }, TIME_OUT);

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement("script");

        tag.src = "https://www.youtube.com/iframe_api";
        tag.defer = true;
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player("player", {
                height: "360",
                width: "640",
                videoId: "M7lc1UVf-VE",
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                setTimeout(stopVideo, 6000);
                done = true;
            }
        }
        function stopVideo() {
            player.stopVideo();
        }
    }
}
