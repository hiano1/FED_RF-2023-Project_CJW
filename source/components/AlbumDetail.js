import Component from "../core/Component.js";
import Artist from "../core/API.js";

export default class AlbumDetail extends Component {
    template() {
        const { artistIndex, albumIndex } = this.props;
        const apiData = new Artist();
        const albumData = apiData.getAlbum(artistIndex).albums[albumIndex];

        let trackList = albumData.trackList
            .map(
                (item, index) => `
            <div class="track">
                <div class="tracklist_number">${index + 1}</div>
                <div class="tracklist_title">${item.name}</div>
                <div class="tracklist_artist">${item.artist}</div>
                <div class="tracklist_button">
                    <div class="tracklist_play" data-info ="${item.trackId},${albumData.albumArt},${item.name},${
                        item.artist
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 -960 960 960" >
                            <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/>
                        </svg>
                    </div>
                    <div class="tracklist_more">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 -960 960 960" >
                            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                        </svg>
                    </div>
                </div>
             </div>
            `,
            )
            .join("");

        return `
        <div class="album_header">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 512 512">
                <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/>
            </svg>
        </div>
        <div class="section_nav">
            <div class="stick active"></div>
        </div>

        <section class="s1">
            <div class="intro_stiky_video">
                <div style="">
                <iframe src="https://player.vimeo.com/video/845597890?background=1" style="position:absolute;width:100%;height:100%;" frameborder="0"></iframe>
                </div>
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
                        </div>
                        <div class="desc_text">
                            ${albumData.description}
                        </div>
                        <div class="desc_button">
                            <div class="playAllButton">Play All</div>
                            <div class="apple_music_link" onclick="window.open('https://music.apple.com/kr/browse')">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="36" height="36" viewBox="0 0 361 361" style="enable-background:new 0 0 361 361;" xml:space="preserve">
                                <style type="text/css">
                                    .st0{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_1_);}
                                    .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
                                </style>
                                <g>
                                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="180" y1="358.6047" x2="180" y2="7.7586">
                                        <stop offset="0" style="stop-color:#FA233B"/>
                                        <stop offset="1" style="stop-color:#FB5C74"/>
                                    </linearGradient>
                                    <path class="st0" d="M360,112.61c0-4.3,0-8.6-0.02-12.9c-0.02-3.62-0.06-7.24-0.16-10.86c-0.21-7.89-0.68-15.84-2.08-23.64   c-1.42-7.92-3.75-15.29-7.41-22.49c-3.6-7.07-8.3-13.53-13.91-19.14c-5.61-5.61-12.08-10.31-19.15-13.91   c-7.19-3.66-14.56-5.98-22.47-7.41c-7.8-1.4-15.76-1.87-23.65-2.08c-3.62-0.1-7.24-0.14-10.86-0.16C255.99,0,251.69,0,247.39,0   H112.61c-4.3,0-8.6,0-12.9,0.02c-3.62,0.02-7.24,0.06-10.86,0.16C80.96,0.4,73,0.86,65.2,2.27c-7.92,1.42-15.28,3.75-22.47,7.41   c-7.07,3.6-13.54,8.3-19.15,13.91c-5.61,5.61-10.31,12.07-13.91,19.14c-3.66,7.2-5.99,14.57-7.41,22.49   c-1.4,7.8-1.87,15.76-2.08,23.64c-0.1,3.62-0.14,7.24-0.16,10.86C0,104.01,0,108.31,0,112.61v134.77c0,4.3,0,8.6,0.02,12.9   c0.02,3.62,0.06,7.24,0.16,10.86c0.21,7.89,0.68,15.84,2.08,23.64c1.42,7.92,3.75,15.29,7.41,22.49c3.6,7.07,8.3,13.53,13.91,19.14   c5.61,5.61,12.08,10.31,19.15,13.91c7.19,3.66,14.56,5.98,22.47,7.41c7.8,1.4,15.76,1.87,23.65,2.08c3.62,0.1,7.24,0.14,10.86,0.16   c4.3,0.03,8.6,0.02,12.9,0.02h134.77c4.3,0,8.6,0,12.9-0.02c3.62-0.02,7.24-0.06,10.86-0.16c7.89-0.21,15.85-0.68,23.65-2.08   c7.92-1.42,15.28-3.75,22.47-7.41c7.07-3.6,13.54-8.3,19.15-13.91c5.61-5.61,10.31-12.07,13.91-19.14   c3.66-7.2,5.99-14.57,7.41-22.49c1.4-7.8,1.87-15.76,2.08-23.64c0.1-3.62,0.14-7.24,0.16-10.86c0.03-4.3,0.02-8.6,0.02-12.9V112.61   z"/>
                                </g>
                                <g id="Glyph_2_">
                                    <g>
                                        <path class="st1" d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3    c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76    c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01    c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82    c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11    c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75    c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99    c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51    c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98    c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46    C263.54,58.3,260.29,54.5,254.5,55z"/>
                                    </g>
                                </g>
                                </svg>
                            </div>
                            <div class="spotify_link" onclick="window.open('https://open.spotify.com/')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" version="1.1" viewBox="0 0 168 168">
                                    <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"/>
                                </svg>
                            </div>
                            <div class="youtube_link" onclick="window.open('https://www.youtube.com/')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" version="1.1" viewBox="0 0 461.001 461.001" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
                                    <path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
                                </svg>
                            </div>
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
                        <video src=""></video>
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
    `;
    }

    setEvent() {
        const { goMainPage, getMusicPlayer } = this.props,
            TIME_OUT = 600,
            sections = document.querySelectorAll("section"),
            sectionStick = document.querySelector(".section_nav");
        let startFlag = true,
            initialScroll = window.scrollY,
            index = 1,
            main,
            next;

        sections.forEach(() => {
            sectionStick.innerHTML += `<div class="stick"></div>`;
        });

        function onePageScroll() {
            if (startFlag) {
                const scrollDown = window.scrollY >= initialScroll;
                if (index >= 1 && index <= sections.length) {
                    if (scrollDown && index < sections.length) {
                        main = document.querySelector(`section.s${index}`);
                        next = document.querySelector(`section.s${index + 1}`);
                        main.style.transform = "translateY(-100vh)";
                        next.style.transform = "translateY(0)";
                        index++;
                    } else if (!scrollDown && index > 1) {
                        main = document.querySelector(`section.s${index - 1}`);
                        next = document.querySelector(`section.s${index}`);
                        main.style.transform = "translateY(0)";
                        next.style.transform = "translateY(100vh)";
                        index--;
                    }
                    const active = document.querySelector(".section_nav .stick.active");
                    active.style.top = 11 * (index - 1) + "vh";
                }
                setTimeout(() => {
                    initialScroll = window.scrollY;
                    startFlag = true;
                }, TIME_OUT);
                startFlag = false;
            }
            // Keep scrollbar in the middle of the viewport
        }

        function clickPageNav(e) {
            let p = e.target.parentElement;
            let nav = Array.prototype.indexOf.call(p.children, e.target);
            if (startFlag) {
                if (nav > index) {
                    main = document.querySelector(`section.s${index}`);
                    next = document.querySelector(`section.s${nav}`);
                    main.style.transform = "translateY(-100vh)";
                    // main.style.transform = `translateY(-${
                    //     100 * (nav - index)
                    // }vh)`;
                    next.style.transform = "translateY(0)";
                    index = nav;
                } else if (nav < index) {
                    main = document.querySelector(`section.s${nav}`);
                    next = document.querySelector(`section.s${index}`);
                    main.style.transform = "translateY(0)";
                    // next.style.transform = `translateY(${
                    //     100 * (index - nav)
                    // }vh)`;
                    next.style.transform = "translateY(100vh)";
                    index = nav;
                }

                const active = document.querySelector(".section_nav .stick.active");
                active.style.top = 11 * (index - 1) + "vh";

                setTimeout(() => {
                    initialScroll = window.scrollY;
                    startFlag = true;
                }, TIME_OUT);
                startFlag = false;
            }
            window.scroll(0, window.screen.height);
        }

        window.onscroll = () => {
            onePageScroll();
        };

        this.addEvent("click", ".stick", (e) => {
            clickPageNav(e);
        });
        this.addEvent("click", ".album_header", (e) => {
            goMainPage(e);
        });
        this.addEvent("click", ".tracklist_play", (e) => {
            let props = e.target.parentNode.dataset.info;

            getMusicPlayer(props);
        });
        this.addEvent("mouseover", ".album_content", (e) => {
            e.target.style.transform = "scale(1.2)";
        });
        this.addEvent("mouseout", ".album_content", (e) => {
            e.target.style.transform = "";
        });
    }
}
