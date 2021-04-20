// ---------- AUDIO PLAYER FOR QUOTES ----------
// audio autoplay on
const audioMute = document.querySelector("#audio__mute");
const audioMuteText = document.querySelector("#audio__mute__text");

const quoteCam = document.querySelector("#quote__cam");
const audioCam = quoteCam.querySelector("#audio__cam");
const audioCamMute = quoteCam.querySelector("#audio__cam__mute");
const audioCamText = [
	{ el: quoteCam.querySelector("#audio__cam__1"), delay: 1250 },
	{
		el: quoteCam.querySelector("#audio__cam__2"),
		delay: 3500,
	},
	{
		el: quoteCam.querySelector("#audio__cam__3"),
		delay: 10000,
	},
	{
		el: quoteCam.querySelector("#audio__cam__4"),
		delay: 15200,
	},
	{
		el: quoteCam.querySelector("#audio__cam__5"),
		delay: 20000,
	},
	{
		el: quoteCam.querySelector("#audio__cam__6"),
		delay: 22500,
	},
];

const quoteEmma = document.querySelector("#quote__emma");
const audioEmma = quoteEmma.querySelector("#audio__emma");
const audioEmmaMute = quoteEmma.querySelector("#audio__emma__mute");
const audioEmmaText = [
	{ el: quoteEmma.querySelector("#audio__emma__1"), delay: 1250 },
	{
		el: quoteEmma.querySelector("#audio__emma__2"),
		delay: 4000,
	},
	{
		el: quoteEmma.querySelector("#audio__emma__3"),
		delay: 5800,
	},
	{
		el: quoteEmma.querySelector("#audio__emma__4"),
		delay: 7490,
	},
];

const quoteThao = document.querySelector("#quote__thao");
const audioThao = quoteThao.querySelector("#audio__thao");
const audioThaoMute = quoteThao.querySelector("#audio__thao__mute");
const audioThaoText = [
	{ el: quoteThao.querySelector("#audio__thao__1"), delay: 1250 },
	{
		el: quoteThao.querySelector("#audio__thao__2"),
		delay: 4500,
	},
	{
		el: quoteThao.querySelector("#audio__thao__3"),
		delay: 7300,
	},
	{
		el: quoteThao.querySelector("#audio__thao__4"),
		delay: 8700,
	},
	{
		el: quoteThao.querySelector("#audio__thao__5"),
		delay: 11210,
	},
];

// click to activate audio autoplay
let isMuted = false;
audioMute.onclick = () => {
	if (!isMuted) {
		audioMute.src = "audio/speaker-button.png";
		audioCamMute.src = "audio/speaker-button.png";
		audioEmmaMute.src = "audio/speaker-button.png";
		audioThaoMute.src = "audio/speaker-button.png";
		audioMuteText.innerText = "Click to deactivate audio autoplay";
		audioCam.muted = true;
		audioEmma.muted = true;
		audioThao.muted = true;
		isMuted = true;
	} else {
		audioMute.src = "audio/mute-button.svg";
		audioCamMute.src = "audio/mute-button.svg";
		audioEmmaMute.src = "audio/mute-button.svg";
		audioThaoMute.src = "audio/mute-button.svg";
		audioMuteText.innerText = "Click to activate audio autoplay";
		audioCam.muted = true;
		audioEmma.muted = true;
		audioThao.muted = true;
		isMuted = false;
	}
};

toggleAudioAndQuote("cam", "1", audioCam, audioCamText, audioCamMute);
toggleAudioAndQuote("emma", "2", audioEmma, audioEmmaText, audioEmmaMute);
toggleAudioAndQuote("thao", "3", audioThao, audioThaoText, audioThaoMute);

function toggleAudioAndQuote(name, partNum, audioEl, textEl, muteEl) {
	enterView({
		selector: `#quote__${name}`,
		enter: function () {
			let thisPart = document.querySelector(`#part-${partNum}`);
			let thisPartClassList = Array.from(thisPart.classList);
			let isThisPartActive = thisPartClassList.includes(
				"swiper-slide-active"
			);

			if (isThisPartActive) {
				if (isMuted) {
					audioEl.muted = false;
					audioEl.play();
				}
				textEl.forEach((el) => {
					setTimeout(function () {
						el.el.classList.add("quote__text__active");
					}, el.delay);
				});
			}
		},
		exit: function () {
			audioEl.muted = true;
			textEl.forEach((el) => {
				el.el.classList.remove("quote__text__active");
			});
		},
		offset: 0.4,
	});

	muteEl.onclick = () => {
		if (!isMuted) {
			audioEl.muted = true;
			muteEl.src = "audio/mute-button.svg";
			isMuted = true;
		} else {
			audioEl.muted = false;
			muteEl.src = "audio/speaker-button.png";
			isMuted = false;
		}
	};

	enterView({
		selector: `#audio__${name}__mute`,
		enter: function () {
			let thisPart = document.querySelector(`#part-${partNum}`);
			let thisPartClassList = Array.from(thisPart.classList);
			let isThisPartActive = thisPartClassList.includes(
				"swiper-slide-active"
			);
			if (isThisPartActive) {
				audioEl.muted = true;
				muteEl.src = "audio/mute-button.svg";
				textEl.forEach((el) => {
					el.el.classList.add("quote__text__active");
				});
			}
		},
		offset: 0.8,
	});
}
