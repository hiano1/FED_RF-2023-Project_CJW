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
                    index == 0
                        ? "active"
                        : index == 1
                        ? "next"
                        : index == artistList[0].albums.length - 1
                        ? "prev"
                        : ""
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
                <div class="goMain2">22</div>
        <div class="carousel_prev">
                <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
            </div>
            <div class="carousel_next">
                <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80" fill="#F9F8F6"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
            </div>
        </div>
    `;
    }
    setEvent() {
        const { goAlbumPage, getMusicPlayer } = this.props;
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
            rotateCarousel(-1);
            setAlbumList(currSlide);
        });
        this.addEvent("click", ".carousel_next", () => {
            rotateCarousel(1);
            setAlbumList(currSlide);
        });
        this.addEvent("click", ".goMain2", () => {
            getMusicPlayer();
        });

        ///////////////////CIRCLE PART////////////////////////////

        function setCircleSize() {
            let radius = window.innerHeight;
            let itemsAngle = (2 * Math.PI) / 6;

            circle_slider.style.transform = `translateX(-${radius * 0.6}px)`;

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
                circle_items[currentSlide].removeEventListener(
                    e,
                    mouseEventActiveCircle,
                );
            });

            currentSlide = lengthCheck(currentSlide, index);
            nextSlide = lengthCheck(nextSlide, index);
            previousSlide = lengthCheck(previousSlide, index);

            currentAngle += stepAngle * -index;
            circle_warper.style.transform = `rotate(${currentAngle}deg)`;

            circle_items[currentSlide].style.transform =
                rotatePositionList[positionCheck(0, currentAngle)];
            circle_items[nextSlide].style.transform =
                rotatePositionList[positionCheck(1, currentAngle)];
            circle_items[previousSlide].style.transform =
                rotatePositionList[positionCheck(5, currentAngle)];

            circle_items[currentSlide].classList.add("active");
            circle_items[nextSlide].classList.add("next");
            circle_items[previousSlide].classList.add("prev");
            circle_info_items[currentSlide].classList.add("active");
            ["mouseenter", "mouseleave", "click"].forEach((e) => {
                circle_items[currentSlide].addEventListener(
                    e,
                    mouseEventActiveCircle,
                );
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
                    index == 0
                        ? "active"
                        : index == 1
                        ? "next"
                        : index == artistList[0].albums.length - 1
                        ? "prev"
                        : ""
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

        function mouseEventActiveCircle(e) {
            if (e.type == "mouseenter") {
                let width =
                    circle_items[currentSlide].getBoundingClientRect().width;
                circle_info.style.right = `-${width + 20}px`;
            } else if (e.type == "mouseleave") {
                circle_info.style.right = `-10vh`;
            } else if (e.type == "click") {
                //enter 상태로 click 시 enter, leave 값이 더해짐
                // circle_info.style.right = ``;
                if (e.target.parentNode.classList.contains("circle_next")) {
                    slideRotate(1);
                } else if (
                    e.target.parentNode.classList.contains("circle_prev")
                ) {
                    slideRotate(-1);
                } else if (
                    e.target.parentNode.classList.contains("circle_item")
                ) {
                    goAlbumPage(e, selectedIndex, currentSlide);
                }
            }
        }

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
