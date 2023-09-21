import Component from "../core/Component.js";

export default class MusicPlayer extends Component {
    template() {
        const { infoList } = this.props;
        const info = infoList.split(",");
        return `        
        <div class="fixedPlayer">
        <iframe id="soundCloudWidget" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" 
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${info[0]}&auto_play=true"></iframe>
        <div style="line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        </div>
        <div class="track_slider_container">
            <div class="current_time">00:00</div>
            <input
                type="range"
                min="1"
                max="100"
                value="0"
                class="track_slider slider"
            />
            <div class="total_duration">00:00</div>
        </div>
        <div class="track_info">
            <div class="track_art">
                <img src="${info[1]}" alt="" />
            </div>
            <div class="title_box">
                <div class="track_name">
                    <span>${info[2]}</span>
                </div>
                <div class="track_artist">
                    <span>${info[3]}</span>
                </div>
            </div>
        </div>
        <div class="player_buttons">
            <div class="prev_track">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="70"
                    viewBox="0 -960 960 960"
                    width="70"
                    fill="rgb(220, 220, 220)"
                >
                    <path
                        d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z"
                    />
                </svg>
            </div>
            <div class="playpause_track">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="80"
                    viewBox="0 -960 960 960"
                    width="80"
                    fill="rgb(220, 220, 220)"
                >
                    <path
                        d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                    />
                </svg>
            </div>
            <div class="next_track">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="70"
                    viewBox="0 -960 960 960"
                    width="70"
                    fill="rgb(220, 220, 220)"
                >
                    <path
                        d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z"
                    />
                </svg>
            </div>
        </div>
        <div class="etc_container">
            <div class="volume_slider_container">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    viewBox="0 -960 960 960"
                    width="30"
                    fill="rgb(220, 220, 220)"
                >
                    <path
                        d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z"
                    />
                </svg>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value="99"
                    class="volume_slider slider"
                />
            </div>
            <div class="player_close_button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    viewBox="0 -960 960 960"
                    width="40"
                    fill="rgb(220, 220, 220)"
                >
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                    />
                </svg>
            </div>
        </div>
    </div>`;
    }

    setEvent() {
        const { trackList } = this.props;
        console.log(trackList);
        ///////////////custom player ui setting//////////////////
        let track_info = document.querySelector(".track_info"),
            track_name = document.querySelector(".track_name span"),
            track_artist = document.querySelector(".track_artist span"),
            playpause_btn = document.querySelector(".playpause_track"),
            next_btn = document.querySelector(".next_track"),
            prev_btn = document.querySelector(".prev_track"),
            player_close_button = document.querySelector(".player_close_button"),
            track_slider = document.querySelector(".track_slider"),
            volume_slider = document.querySelector(".volume_slider"),
            curr_time = document.querySelector(".current_time"),
            total_duration = document.querySelector(".total_duration"),
            track_index = 0,
            isReadyPlayer = false,
            isPlaying = false,
            updateTimer;

        /////////////sound cloud setting//////////////
        let soundCloudWidget,
            widget,
            volume,
            currentTime = 0,
            isSeekUpdate = true,
            totalDuration;

        function playingCheck() {
            isReadyPlayer ? addTrack() : newTrack();
        }

        function newTrack() {
            soundCloudWidget = document.getElementById("soundCloudWidget");
            widget = SC.Widget(soundCloudWidget);
            clearInterval(updateTimer);
            resetValues();
            // track_name.textContent = props[2];
            // track_artist.textContent = props[3];

            //api setting
            widget.bind(SC.Widget.Events.READY, () => {
                widget.bind(SC.Widget.Events.PLAY, () => {
                    volume = widget.getVolume();
                    widget.getDuration((time) => {
                        seekUpdate("duration", time);
                    });
                    widget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
                        if (isSeekUpdate) {
                            isSeekUpdate = false;
                            setTimeout(() => {
                                widget.getPosition((time) => {
                                    seekUpdate("current", time);
                                    isSeekUpdate = true;
                                });
                            }, 1000);
                        }
                    });
                    togglePlayButton();
                });
                widget.bind(SC.Widget.Events.FINISH, () => {
                    togglePlayButton();
                    nextTrack();
                });
            });
        }

        function resetValues() {
            curr_time.textContent = "00:00";
            total_duration.textContent = "00:00";
            track_slider.value = 0;
        }

        function TrackplayEvent() {
            if (isPlaying) {
                widget.pause();
            } else if (!isPlaying) {
                widget.play();
            }
            togglePlayButton();
        }
        function addTrack(params) {}

        function loadTrack(params) {}

        function nextTrack() {
            track_index < track_list.length - 1 ? (track_index += 1) : (track_index = 0);

            loadTrack(track_index);
        }

        function prevTrack() {
            track_index > 0 ? (track_index -= 1) : (track_index = track_list.length - 1);

            loadTrack(track_index);
        }

        function togglePlayButton() {
            if (!isPlaying) {
                isPlaying = true;
                playpause_btn.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="rgb(220, 220, 220)"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
            } else if (isPlaying) {
                isPlaying = false;
                playpause_btn.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="rgb(220, 220, 220)"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>';
            }
        }

        function seekTo() {
            widget.seekTo(totalDuration * track_slider.value * 10);
        }

        function setVolume() {
            volume = volume_slider.value / 100;
        }

        function seekUpdate(type, time) {
            let seekPosition = 0;

            if (type == "duration") {
                totalDuration = Math.floor(time / 1000);
                let durationMinutes = Math.floor(totalDuration / 60);
                let durationSeconds = Math.floor(totalDuration - durationMinutes * 60);
                if (durationSeconds < 10) {
                    durationSeconds = "0" + durationSeconds;
                }
                if (durationMinutes < 10) {
                    durationMinutes = "0" + durationMinutes;
                }
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            } else {
                currentTime = Math.floor(time / 1000);
                if (!isNaN(totalDuration)) {
                    seekPosition = currentTime * (100 / totalDuration);
                    track_slider.value = seekPosition;

                    let currentMinutes = Math.floor(currentTime / 60);
                    let currentSeconds = Math.floor(currentTime - currentMinutes * 60);

                    if (currentSeconds < 10) {
                        currentSeconds = "0" + currentSeconds;
                    }

                    if (currentMinutes < 10) {
                        currentMinutes = "0" + currentMinutes;
                    }

                    curr_time.textContent = currentMinutes + ":" + currentSeconds;
                }
            }
        }

        playpause_btn.addEventListener("click", (e) => {
            TrackplayEvent();
        });
        next_btn.addEventListener("click", (e) => {
            nextTrack();
        });
        prev_btn.addEventListener("click", (e) => {
            prevTrack();
        });

        track_slider.addEventListener("change", (e) => {
            seekTo();
        });
        volume_slider.addEventListener("change", (e) => {
            setVolume();
        });

        track_info.addEventListener("click", (e) => {
            // 해당 곡의 앨범 페이지로 이동 (album id ,scrollpage)
            //이미 있는 페이지 load시 페이지만 이동
        });
        player_close_button.addEventListener("click", (e) => {
            document.querySelector(".fixedPlayer").remove();
        });
        // 페이지에서 곡 재생시 받아오는 부분 작업 필요
        // track_slider 개선 필요

        playingCheck();
    }
}
