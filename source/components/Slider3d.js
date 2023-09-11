import Component from "../core/Component.js";
import App from "../App.js";
import MusicPlayer from "./MusicPlayer.js";
import Artist from "../core/API.js";

export default class Slider3D extends Component {
    template() {
        //artist list , album list , track list
        //ari, been, dpr, bruno, newj,
        const apiData = new Artist();
        const artistList = apiData.getArtistList();
        const list = [1, 2, 3, 4, 5];
        const listMap = list
            .map(
                (item, index) => `
                <div class="carousel_cell ${index == 0 ? "active" : ""}">
                    <div class="album_list">${item}</div>
                    <div class="artist_img"></div>
                </div>
                `,
            )
            .join("");

        const listCircle = [1, 2, 3, 4, 5, 6];
        const CircleMap = listCircle
            .map(
                (item, index) => `
                <div class="circle_item ${
                    index == 0
                        ? "active"
                        : index == 1
                        ? "next"
                        : index == listCircle.length - 1
                        ? "prev"
                        : ""
                }">
                    <img src="./source/resource/art01.jpg"/>
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
        const listCircleInfo = [1, 2, 3, 4, 5, 6];
        const CircleInfoMap = listCircleInfo
            .map(
                (item, index) => `
                <div class="circle_info_item ${index == 0 ? "active" : ""}">
                    <p class="circle_info_title">Desc ${item}</p>
                </div>
                    `,
            )
            .join("");

        return `
            <div class="circle_slider">
                <div class="circle_warper">
                    ${CircleMap}
                </div>
                <div class="circle_info">
                    ${CircleInfoMap}
                </div>
            </div>
        <div class="scene">
            <div class="carousel">
                ${listMap}
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
        /////////////3D SLIDER//////////////
        let cellWidth,
            radius,
            theta,
            timer,
            selectedIndex = 0,
            currSlide = 0,
            prevSlide = 0;

        let cells = document.querySelectorAll(".carousel_cell");
        let carousel = document.querySelector(".carousel");

        ///////////////////CIRCLE PART////////////////////////////

        let circle_slider = document.querySelector(".circle_slider");
        let circle_warper = document.querySelector(".circle_warper");
        let circle_items = document.querySelectorAll(".circle_item");
        let circle_info_item = document.querySelectorAll(".circle_info_item");

        let stepAngle = 60,
            currentAngle = 0,
            currentSlide = 0,
            nextSlide = 1,
            previousSlide = circle_items.length - 1;
        /////////////3D SLIDER//////////////
        function setCells() {
            cellWidth = carousel.offsetWidth;
        }

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
            rotateAlreadyTransform(circle_slider);
        });
        this.addEvent("click", ".carousel_next", () => {
            rotateCarousel(1);
            rotateAlreadyTransform(circle_slider);
        });
        this.addEvent("click", ".goMain", () => {
            new App(document.querySelector("#app"));
        });
        this.addEvent("click", ".goMain2", () => {
            new MusicPlayer(document.querySelector("#fixed"), cellWidth);
        });

        ///////////////////CIRCLE PART////////////////////////////

        function setCircleSize() {
            //circle item direction setting
            //60도 세팅후 3개만 가져오기

            let radius = window.innerHeight;
            let itemsAngle = (2 * Math.PI) / 6;

            circle_slider.style.transform = `translateX(-${radius * 0.6}px)`;

            for (let i = 0; i < circle_items.length; i++) {
                let x = (radius / 2) * Math.cos(itemsAngle * i - Math.PI / 2),
                    y = (radius / 2) * Math.sin(itemsAngle * i - Math.PI / 2);
                circle_items[
                    i
                ].style.transform = `translate(${x}px,${y}px) rotate(${
                    ((itemsAngle * 180) / Math.PI) * i - 90
                }deg)`;
            }
        }

        function slideRotate(index) {
            circle_items[currentSlide].classList.remove("active");
            circle_items[nextSlide].classList.remove("next");
            circle_items[previousSlide].classList.remove("prev");
            circle_info_item[currentSlide].classList.remove("active");

            currentSlide = lengthCheck(currentSlide, index);
            nextSlide = lengthCheck(nextSlide, index);
            previousSlide = lengthCheck(previousSlide, index);

            currentAngle += stepAngle * -index;
            circle_warper.style.transform = `rotate(${currentAngle}deg)`;

            circle_items[currentSlide].classList.add("active");
            circle_items[nextSlide].classList.add("next");
            circle_items[previousSlide].classList.add("prev");
            circle_info_item[currentSlide].classList.add("active");
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

        this.addEvent("click", ".circle_prev", () => {
            slideRotate(-1);
        });
        this.addEvent("click", ".circle_next", () => {
            slideRotate(1);
        });
        this.addEvent("mouseover", ".circle_item img", (e) => {
            // console.log(this.$target);
            // console.log("a");
            // this.$target.style.animation = "rotate 3s infinite";
        });

        function rotateAlreadyTransform(object) {
            // getComputedStyle(object).getPropertyValue("transform");
            let transform = object.style.transform;
            if (transform != null) {
                object.style.transition = "all 1s";
                object.style.transform = `${transform} rotateY(360deg)`;
                setTimeout(() => {
                    object.style.transition = "";
                    object.style.transform = `${transform}`;
                }, 1000);
            }
        }

        //default setting
        setCarousel();
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
