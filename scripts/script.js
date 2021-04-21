// ---------- TITLE SWIPER AUTOPLAY ----------
const swiperAutoplay = new Swiper("div.swiper-container-autoplay", {
	spaceBetween: 20,
	centeredSlides: true,
	loop: true,
	speed: 500,
	autoplay: {
		delay: 3000,
		disableOnInteraction: true,
	},
	autoplayStop: d3.select("p#stop-auto-swipe").on("click", function () {
		swiperAutoplay.autoplay.stop();
		d3.select(this).style("opacity", 0).style("cursor", "default");
	}),
});

// ---------- TITLE ANIMATION ----------
let i = 1;
while (i < 3) {
	d3.select(`.title-text__${i}`)
		.transition()
		.duration(500)
		.delay(i * 1000 + 250)
		.style("opacity", 1);
	i++;
}

enterView({
	selector: ".title-text__3",
	enter: (el) => {
		el.classList.add("active");
	},
	offset: 0.3,
});

const swiperPartSwitch = new Swiper(".swiper-container-partSwitch", {
	navigation: {
		nextEl: ".swiper-next-h",
		prevEl: ".swiper-prev-h",
	},
});
const partSwitchEl = document.querySelector(".swiper-container-partSwitch");
const partsEl = partSwitchEl.querySelectorAll(".swiper-slide");
const part1El = partSwitchEl.querySelector("#part-1");
const part2El = partSwitchEl.querySelector("#part-2");
const part3El = partSwitchEl.querySelector("#part-3");
let currentPartEl = partSwitchEl.querySelector(".swiper-slide-active");
let isActive = [true, false, false];
let activeIndex = 0;
const audioEl = partSwitchEl.querySelectorAll("audio");

swiperPartSwitch.on("slideChangeTransitionEnd", () => {
	currentPartEl = partSwitchEl.querySelector(".swiper-slide-active");
	isActive[0] = part1El === currentPartEl ? true : false;
	isActive[1] = part2El === currentPartEl ? true : false;
	isActive[2] = part3El === currentPartEl ? true : false;
	activeIndex = isActive.findIndex((el) => el === true);
	Array.from(partsEl)[activeIndex].classList.remove("swiper-slide-hidden");
	Array.from(audioEl).forEach((el) => el.pause());
	window.location.href = "#part-1";
});

// ---------- SMOOTH SCROLLING ----------
enterView({
	selector: "#part-1",
	enter: () => {
		window.location.href = "#part-1";
	},
	offset: 0.7,
});
