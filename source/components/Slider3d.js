import Component from "../core/Component.js";
import MusicPlayer from "./MusicPlayer.js";
import Artist from "../core/API.js";

export default class Slider3D extends Component {
    listMap;
    albumList;
    setup() {
        const apiData = new Artist();
        const artistList = apiData.getArtistList();

        this.listMap = artistList
            .map(
                (item, index) => `
                <div class="carousel_cell ${index == 0 ? "active" : ""}">
                    <div class="album_list"></div>
                    <div class="artist_img"><img src="${item.image}"></div>
                    <div class="artist_name">${item.name}</div>
                </div>
                `,
            )
            .join("");

        this.albumList = artistList[0].albums
            .map(
                (item, index) => `
                <div class="circle_item ${
                    index == 0 ? "active" : index == 1 ? "next" : index == artistList[0].albums.length - 1 ? "prev" : ""
                }">
                    <img src="${item.albumArt}"/>
                    <div class="circle_prev">
                        <svg style="width: 80px; height: 80px;fill: currentColor;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M511.768733 434.512185c4.173043 5.278213 6.15007 8.363482 8.677637 10.893094 79.849606 79.888492 159.791309 159.678746 239.588727 239.614309 11.828396 11.847839 25.365714 18.319228 42.275849 16.040325 18.47477-2.488681 31.322379-12.634762 38.1069-29.892821 6.692423-17.008372 3.479241-32.766264-7.623631-47.004547-2.40477-3.079128-5.321192-5.776563-8.098445-8.552793-91.454922-91.429339-182.91803-182.852538-274.392394-274.268574-25.4046-25.38618-51.420113-25.326828-76.93523 0.169869-91.939969 91.873454-183.820586 183.808306-275.845489 275.590686-13.739932 13.70207-20.760836 29.182646-15.848966 48.687886 8.715499 34.593889 50.548256 47.517223 77.216639 23.74889 7.080256-6.306636 13.543458-13.301957 20.264533-20.007683 74.80573-74.747401 149.613506-149.489686 224.361931-224.296439 2.521426-2.521426 4.406356-5.678326 8.250918-10.721179l0 0L511.768733 434.512185 511.768733 434.512185z"  /></svg>
                    </div>
                    <div class="circle_next">
                        <svg style="width: 80px; height: 80px;fill: currentColor;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M511.768733 589.487815c4.173043-5.278213 6.15007-8.363482 8.677637-10.893094 79.849606-79.888492 159.791309-159.678746 239.588727-239.614309 11.828396-11.847839 25.365714-18.319228 42.275849-16.040325 18.47477 2.488681 31.322379 12.634762 38.1069 29.892821 6.692423 17.008372 3.479241 32.766264-7.623631 47.004547-2.40477 3.079128-5.321192 5.776563-8.098445 8.552793-91.454922 91.429339-182.91803 182.852538-274.392394 274.268574-25.4046 25.38618-51.420113 25.326828-76.93523-0.169869C381.428176 590.615499 289.547559 498.680647 197.522656 406.898267c-13.739932-13.70207-20.760836-29.182646-15.848966-48.687886 8.715499-34.593889 50.548256-47.517223 77.216639-23.74889 7.080256 6.306636 13.543458 13.301957 20.264533 20.007683 74.80573 74.747401 149.613506 149.489686 224.361931 224.296439 2.521426 2.521426 4.406356 5.678326 8.250918 10.721179l0 0L511.768733 589.487815 511.768733 589.487815z"  /></svg>
                    </div>
                </div>
                `,
            )
            .join("");
        this.albumInfoList = artistList[0].albums
            .map(
                (item, index) => `
                <div class="circle_info_item ${index == 0 ? "active" : ""}">
                    <p class="circle_info_title">${item.title}</p>
                </div>
                    `,
            )
            .join("");
    }
    template() {
        return `
        <header class= "header_logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
        </header>
        <div class="circle_slider">
            <div class="circle_warper">
                ${this.albumList}
            </div>
            <div class="circle_info">
                ${this.albumInfoList}
            </div>
        </div>
        <div class="scene">
            <div class="carousel">
                ${this.listMap}
            </div>
        </div>
        <div class="carousel_control">
            <div class="carousel_prev">
                <svg style="width:80px; height:80px; fill:currentColor;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M402.7392 877.2608l-320-320c-24.9856-24.9856-24.9856-65.51552 0-90.50112l320-320c24.9856-24.9856 65.51552-24.9856 90.50112 0s24.9856 65.51552 0 90.50112l-210.7392 210.7392 613.49888 0c35.34848 0 64 28.65152 64 64s-28.65152 64-64 64l-613.49888 0 210.7392 210.7392c12.4928 12.4928 18.7392 28.8768 18.7392 45.2608s-6.2464 32.768-18.7392 45.2608c-24.9856 24.9856-65.51552 24.9856-90.50112 0z"  /></svg>
            </div>
            <div class="carousel_next">
                <svg style="width:80px; height:80px; fill:currentColor;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M621.2608 877.2608l320-320c24.9856-24.9856 24.9856-65.51552 0-90.50112l-320-320c-24.9856-24.9856-65.51552-24.9856-90.50112 0s-24.9856 65.51552 0 90.50112l210.7392 210.7392-613.49888 0c-35.34848 0-64 28.65152-64 64s28.65152 64 64 64l613.49888 0-210.7392 210.7392c-12.4928 12.4928-18.7392 28.8768-18.7392 45.2608s6.2464 32.768 18.7392 45.2608c24.9856 24.9856 65.51552 24.9856 90.50112 0z"  /></svg>
            </div>
        </div>
    `;
    }
    setEvent() {
        const { goAlbumPage, getMusicPlayer } = this.props;
        let eventFlag = true;
        /////////////3D SLIDER//////////////
        let cellWidth,
            radius,
            theta,
            timer,
            selectedIndex = 0,
            currSlide = 0,
            prevSlide = 0;

        const cells = document.querySelectorAll(".carousel_cell");
        const carousel = document.querySelector(".carousel");

        ///////////////////CIRCLE PART////////////////////////////
        const apiData = new Artist();
        const artistList = apiData.getArtistList();

        let circle_slider,
            circle_warper,
            circle_items,
            circle_info,
            circle_info_items,
            circle_width,
            currentAngle,
            currentSlide,
            nextSlide,
            previousSlide,
            stepAngle = 60;

        let rotatePositionList = [];

        function setCells() {
            cellWidth = carousel.offsetWidth;
        }

        function setCircleSlider() {
            circle_slider = document.querySelector(".circle_slider");
            circle_warper = document.querySelector(".circle_warper");
            circle_items = document.querySelectorAll(".circle_item");
            circle_info = document.querySelector(".circle_info");
            circle_info_items = document.querySelectorAll(".circle_info_item");

            currentAngle = 0;
            currentSlide = 0;
            nextSlide = 1;
            previousSlide = circle_items.length - 1;
        }

        /////////////3D SLIDER//////////////

        function rotateCarousel(index) {
            let l = cells.length - 1;
            prevSlide = currSlide;
            cells[prevSlide].classList.remove("active");
            if (currSlide == 0 && index == -1) {
                currSlide = l;
            } else if (currSlide == l && index == 1) {
                currSlide = 0;
            } else {
                currSlide += index;
            }
            cells[currSlide].classList.add("active");

            selectedIndex += index;

            let angle = theta * selectedIndex * -1;
            carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
        }

        function setCarousel() {
            setCells();
            let cellCount = cells.length;
            theta = 360 / cellCount;
            radius = Math.round(cellWidth / 2 / Math.tan(Math.PI / cellCount));
            for (var i = 0; i < cellCount; i++) {
                var cell = cells[i];
                var cellAngle = theta * i;
                cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
                if (i == 0) {
                    cell.classList.add("active");
                }
            }
            rotateCarousel(0);
        }

        this.addEvent("click", ".carousel_prev", () => {
            if (eventFlag) {
                eventFlag = false;
                rotateCarousel(-1);
                setAlbumList(currSlide);
                setTimeout(() => {
                    eventFlag = true;
                }, 1000);
            }
        });
        this.addEvent("click", ".carousel_next", () => {
            if (eventFlag) {
                eventFlag = false;
                rotateCarousel(1);
                setAlbumList(currSlide);
                setTimeout(() => {
                    eventFlag = true;
                }, 1000);
            }
        });

        ///////////////////CIRCLE PART////////////////////////////

        function setCircleSize() {
            let radius = window.innerHeight;
            let itemsAngle = (2 * Math.PI) / 6;
            let mediaQueryScale = window.innerHeight / window.innerWidth;
            if (mediaQueryScale > 0.8) {
                mediaQueryScale = 0.8;
            } else if (mediaQueryScale < 0.55) {
                mediaQueryScale = 0.55;
            }
            circle_width = circle_items[currentSlide].getBoundingClientRect().width;
            circle_slider.style.transform = `translateX(-${radius * mediaQueryScale}px)`;

            for (let i = 0; i < 6; i++) {
                let x = (radius / 2) * Math.cos(itemsAngle * i - Math.PI / 2),
                    y = (radius / 2) * Math.sin(itemsAngle * i - Math.PI / 2);

                rotatePositionList[i] = `translate(${x}px,${y}px) rotate(${
                    ((itemsAngle * 180) / Math.PI) * i - 90
                }deg)`;
            }
            slideRotate(0);
        }

        function slideRotate(index) {
            circle_items[currentSlide].classList.remove("active");
            circle_items[nextSlide].classList.remove("next");
            circle_items[previousSlide].classList.remove("prev");
            circle_info_items[currentSlide].classList.remove("active");
            ["mouseenter", "mouseleave", "click"].forEach((e) => {
                circle_items[currentSlide].removeEventListener(e, eventActiveCircle);
            });

            currentSlide = lengthCheck(currentSlide, index);
            nextSlide = lengthCheck(nextSlide, index);
            previousSlide = lengthCheck(previousSlide, index);

            currentAngle += stepAngle * -index;
            circle_warper.style.transform = `rotate(${currentAngle}deg)`;

            circle_items[currentSlide].style.transform = rotatePositionList[positionCheck(0, currentAngle)];
            circle_items[nextSlide].style.transform = rotatePositionList[positionCheck(1, currentAngle)];
            circle_items[previousSlide].style.transform = rotatePositionList[positionCheck(5, currentAngle)];

            circle_items[currentSlide].classList.add("active");
            circle_items[nextSlide].classList.add("next");
            circle_items[previousSlide].classList.add("prev");
            circle_info_items[currentSlide].classList.add("active");
            ["mouseenter", "mouseleave", "click"].forEach((e) => {
                circle_items[currentSlide].addEventListener(e, eventActiveCircle);
            });
        }

        function lengthCheck(slideIndex, index) {
            if (slideIndex == circle_items.length - 1 && index == 1) {
                slideIndex = 0;
            } else if (slideIndex == 0 && index == -1) {
                slideIndex = circle_items.length - 1;
            } else {
                slideIndex += index;
            }
            return slideIndex;
        }

        function positionCheck(index, angle) {
            let result = (index - angle / 60) % 6;
            return Math.sign(result) == -1 ? result + 6 : result;
        }

        function setAlbumList(index) {
            let albumList = artistList[index].albums
                .map(
                    (item, index) => `
                <div class="circle_item ${
                    index == 0 ? "active" : index == 1 ? "next" : index == artistList[0].albums.length - 1 ? "prev" : ""
                }">
                    <img src="${item.albumArt}"/>
                    <div class="circle_prev">
                        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
                    </div>
                    <div class="circle_next">
                        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </div>
                </div>
                `,
                )
                .join("");

            let albumInfoList = artistList[index].albums
                .map(
                    (item, index) => `
                <div class="circle_info_item ${index == 0 ? "active" : ""}">
                    <div class="circle_info_title">${item.title}</div>
                </div>
                    `,
                )
                .join("");

            let transform = circle_slider.style.transform;
            if (transform != null) {
                circle_warper.style.transform = "";
                circle_slider.style.transition = "all 1s";
                circle_slider.style.transform = `${transform} rotateY(360deg)`;
                circle_items.forEach((el) => {
                    el.style.opacity = 0;
                });
                circle_info.style.opacity = 0;
                setTimeout(() => {
                    circle_slider.style.transition = "";
                    circle_slider.style.transform = `${transform}`;
                    circle_info.style.opacity = 1;
                    circle_warper.innerHTML = albumList;
                    circle_info.innerHTML = albumInfoList;
                    setCircleSlider();
                    setCircleSize();
                }, 1000);
            }
        }

        function eventActiveCircle(e) {
            if (e.type == "mouseenter") {
                circle_info.style.right = `-${circle_width + 25}px`;
            } else if (e.type == "mouseleave") {
                circle_info.style.right = ``;
            } else if (e.type == "click") {
                if (e.target.parentNode.classList.contains("circle_next")) {
                    slideRotate(1);
                } else if (e.target.parentNode.classList.contains("circle_prev")) {
                    slideRotate(-1);
                } else if (e.target.parentNode.classList.contains("circle_item")) {
                    goAlbumPage(e, currSlide, currentSlide);
                }
            }
        }

        window.addEventListener("keydown", (e) => {
            if (eventFlag) {
                eventFlag = false;
                if (e.key === "ArrowUp") {
                    slideRotate(-1);
                } else if (e.key === "ArrowDown") {
                    slideRotate(1);
                } else if (e.key === "ArrowRight") {
                    rotateCarousel(1);
                    setAlbumList(currSlide);
                } else if (e.key === "ArrowLeft") {
                    rotateCarousel(-1);
                    setAlbumList(currSlide);
                } else if (e.key === "Enter") {
                    goAlbumPage(e, currSlide, currentSlide);
                }
                setTimeout(() => {
                    eventFlag = true;
                }, 1000);
            }
        });

        //default setting
        setCarousel();
        setCircleSlider();
        setCircleSize();

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCarousel();
                setCircleSize();
            }, 200);
        };
    }
}
