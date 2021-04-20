// ---------- TITLE SWIPER AUTOPLAY ----------
const swiperAutoplay = new Swiper("div.swiper-container-autoplay", {
	spaceBetween: 20,
	centeredSlides: true,
	loop: true,
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
	enter: function (el) {
		el.classList.add("active");
	},
	offset: 0.3,
});

const swiperIntro = new Swiper(".swiper-container-v", {
	direction: "vertical",
	slidesPerView: "auto",
	pagination: {
		el: ".swiper-pagination-v",
		clickable: true,
	},
});

const swiperPartSwitch = new Swiper(".swiper-container-partSwitch", {
	navigation: {
		nextEl: ".swiper-next-h",
		prevEl: ".swiper-prev-h",
	},
});

// ---------- SMOOTH SCROLLING ----------
enterView({
	selector: "#part-1",
	enter: function (el) {
		window.location.href = "#part-1";
	},
	offset: 0.6,
});

// // ---------- STYLE HORIZONTAL SWIPER NAV ---------- //
// const horizontalSwiperNavs = [
// 	d3.select(".swiper-prev-h"),
// 	d3.select(".swiper-next-h"),
// ];

// horizontalSwiperNavs.forEach((div) => styleSwiperNav(div));

// function styleSwiperNav(div) {
// 	div.on("mouseover", function () {
// 		let thisDiv = d3.select(this);
// 		if (thisDiv.classed("swiper-button-disabled") == false) {
// 			thisDiv.style("opacity", 1).style("cursor", "pointer");
// 		}
// 	}).on("mouseout", function () {
// 		d3.select(this).style("opacity", 0.5).style("cursor", "default");
// 	});
// }

// // ---------- REMOVE VERTICAL ELEMENTS WHEN SWIPING HORIZONTALLY ----------
// const paginationV = d3.select(".swiper-pagination-v");
// const horizontalSwiperSlides = [
// 	d3.select("#part-1"),
// 	d3.select("#part-2"),
// 	d3.select("#part-3"),
// ];

// d3.selectAll(".swiper-container").on("click", function () {
// 	if (d3.select("#part-1").classed("swiper-slide-active") == true) {
// 		paginationV.style("display", "none");
// 	} else {
// 		paginationV.style("display", "block");
// 	}
// });
