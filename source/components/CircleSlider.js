import Component from "../core/Component";

export default class CircleSlider extends Component {
    template() {
        return `
        <div class="slider">
        <div class="wrapper">
            <div class="controls">
                <div class="controls__left">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#F9F8F6"><path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/></svg>
                </div>
                <div class="controls__right">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#F9F8F6"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </div>
            </div>
            <div class="circle_warper">
                <div class="circle_item slides-holder__item_active">
                    1
                </div>
                <div class="circle_item">a</div>
                <div class="circle_item">b</div>
                <div class="circle_item">c</div>
                <div class="circle_item">d</div>
                <div class="circle_item">e</div>
            </div>
            <div class="circle_info_item">
                <div class="circle_info_item active">
                    <h1>Slide 1</h1>
                    <p class="circle_info_title">Desc 1</p>
                </div>
                <div class="circle_info_item">
                    <h1>Slide 2</h1>
                    <p class="circle_info_title">Desc 2</p>
                </div>
                <div class="circle_info_item">
                    <h1>Slide 3</h1>
                    <p class="circle_info_title">Desc 3</p>
                </div>
                <div class="circle_info_item">
                    <h1>Slide 4</h1>
                    <p class="circle_info_title">Desc 4</p>
                </div>
                <div class="circle_info_item">
                    <h1>Slide 5</h1>
                    <p class="circle_info_title">Desc 1</p>
                </div>
                <div class="circle_info_item">
                    <h1>Slide 6</h1>
                    <p class="circle_info_title">Desc 1</p>
                </div>
            </div>
        </div>
    </div>
        `;
    }

    setEvents() {
        let circle_slider = document.querySelector(".circle_slider");
        let slider = document.querySelector(".slider");
        let slideSize = 0.2;
        let slidesSize;
        let animationDuration = parseFloat(600);
        let currentAngle = 0;
        let currentSlide = 0;
        let timer;

        let slides = document.querySelectorAll(".circle_item");
        let circle_info = document.querySelector(".circle_info_item");
        let circle_info_item = document.querySelectorAll(".circle_info_item");
        let circle_warper = document.querySelector(".circle_warper");
        let btnLeft = document.querySelector(".controls__left");
        let btnRight = document.querySelector(".controls__right");

        let stepAngle = (2 * Math.PI) / slides.length;

        circle_warper.style.transitionDuration = `${animationDuration}ms`;

        function circleResize() {
            let radius,
                w = circle_slider.getBoundingClientRect().width,
                h = circle_slider.getBoundingClientRect().height;

            w > h ? (radius = w / 2) : (radius = h / 1.6);

            setCircleSize(Math.round(radius));
        }
        function setCircleSize(radius) {
            circle_warper.style.width = `${radius * 2}px`;
            circle_warper.style.height = `${radius * 2}px`;

            let r = 2 * radius * (1 - slideSize);
            circle_warper.style.width = `${r}px`;
            circle_warper.style.height = `${r}px`;
            slidesRepositioning(r / 2);

            circle_info.style.width = (r / 2 - r * slideSize) * 2 + "px";
            circle_info.style.height = r / 2 - r * slideSize + "px";

            slidesSize = Math.max(stepAngle * radius * (1 - slideSize) - 200);

            circle_info.style.fontSize =
                window.innerHeight < window.innerWidth ? "1.2vh" : "1.2vw";
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.width = slides[i].style.height =
                    slidesSize + "px";
            }
        }
        function slidesRepositioning(radius) {
            for (let i = 0; i < slides.length; i++) {
                let x = radius * Math.cos(stepAngle * i - Math.PI / 2),
                    y = radius * Math.sin(stepAngle * i - Math.PI / 2);
                slides[i].style.transform = `translate(${x}px,${y}px) rotate(${
                    ((stepAngle * 180) / Math.PI) * i - 90
                }deg)`;
            }
        }
        function slideRotate(multiplier) {
            removeStyle();

            if (currentSlide === slides.length - 1 && multiplier === -1) {
                circle_warper.style.transform = "rotate( -360deg )";
                currentSlide = 0;
                currentAngle = 0;
                addActiveStyle();

                setTimeout(() => {
                    circle_warper.style.transitionDuration = 0 + "s";
                    circle_warper.style.transform = `rotate(${currentAngle}deg)`;
                    setTimeout(function () {
                        circle_warper.style.transitionDuration =
                            animationDuration + "ms";
                    }, 20);
                }, animationDuration);
            } else if (currentSlide === 0 && multiplier === 1) {
                circle_warper.style.transform = `rotate(${
                    (stepAngle * 180) / Math.PI
                }deg )`;
                currentSlide = slides.length - 1;
                currentAngle = (-(2 * Math.PI - stepAngle) * 180) / Math.PI;
                addActiveStyle();

                setTimeout(function () {
                    circle_warper.style.transitionDuration = 0 + "s";
                    circle_warper.style.transform = `rotate(${currentAngle}deg)`;
                    setTimeout(function () {
                        circle_warper.style.transitionDuration =
                            animationDuration + "ms";
                    }, 20);
                }, animationDuration);
            } else {
                currentSlide -= multiplier;
                currentAngle += ((stepAngle * 180) / Math.PI) * multiplier;
                circle_warper.style.transform = `rotate(${currentAngle}deg)`;
                addActiveStyle();
            }
        }

        function removeStyle() {
            let x = currentSlide;

            circle_info_item[x].classList.remove("active");
            slides[x].classList.remove("slides-holder__item_active");
            slides[x].style.height = slides[x].style.width = slidesSize + "px";
        }
        function addActiveStyle() {
            let x = currentSlide;

            circle_info_item[x].classList.add("active");
            slides[x].classList.add("slides-holder__item_active");
            slides[x].style.height = slides[x].style.width =
                slidesSize + 40 + "px";
        }

        setTimeout(() => {
            btnRight.addEventListener("click", () => {
                slideRotate(-1);
            });
        }, animationDuration);
        setTimeout(() => {
            btnLeft.addEventListener("click", () => {
                slideRotate(1);
            });
        }, animationDuration);
        circleResize();

        window.onresize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                circleResize();
            }, 200);
        };
    }
}
