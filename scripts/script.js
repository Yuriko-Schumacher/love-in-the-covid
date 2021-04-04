// ---------- SWIPER ----------
const swiperV = new Swiper(".swiper-container-v", {
	direction: "vertical",
	spaceBetween: 50,
	navigation: {
		nextEl: ".swiper-next-v",
		prevEl: ".swiper-prev-v",
	},
	pagination: {
		el: ".swiper-pagination-v",
		clickable: true,
	},
});

const swiperH = new Swiper(".swiper-container-h", {
	spaceBetween: 50,
	pagination: {
		el: ".swiper-pagination-h",
		clickable: true,
	},
});

// ---------- STYLE VERTICAL SWIPER NAV ---------- //
const verticalSwiperNavs = [
	d3.select(".swiper-prev-v"),
	d3.select(".swiper-next-v"),
];

verticalSwiperNavs[1].style("top", `${window.innerHeight - 100}px`);
verticalSwiperNavs.forEach((div) => styleSwiperNav(div));

function styleSwiperNav(div) {
	div.on("mouseover", function () {
		let thisDiv = d3.select(this);
		if (thisDiv.classed("swiper-button-disabled") == false) {
			thisDiv.style("opacity", 0.5).style("cursor", "pointer");
		}
	}).on("mouseout", function () {
		d3.select(this).style("opacity", 0).style("cursor", "default");
	});
}

// ---------- REMOVE VERTICAL ELEMENTS WHEN SWIPING HORIZONTALLY ----------
const paginationV = d3.select(".swiper-pagination-v");
const horizontalSwiperSlides = [
	d3.select("#part-1"),
	d3.select("#part-2"),
	d3.select("#part-3"),
];

d3.selectAll(".swiper-container").on("click", function () {
	console.log(d3.select("#part-1").classed("swiper-slide-active"));
	if (d3.select("#part-1").classed("swiper-slide-active") == true) {
		console.log(paginationV);
		paginationV.style("display", "none");
	} else {
		paginationV.style("display", "block");
	}
});
