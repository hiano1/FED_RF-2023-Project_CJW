export default class Youtube {
    constructor(videoId) {
        let tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.defer = true;
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player("player", {
                height: "200",
                width: "200",
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }
        let done = false;
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
