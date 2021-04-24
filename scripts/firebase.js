const database = firebase.database();
const dbRef = database.ref();

const feedbackButton = d3.selectAll("i.feedback__button");
feedbackButton.on("click", function () {
	let time = Date.now();
	let section = d3.select(this).attr("data-section");
	let answer = d3.select(this).attr("data-answer");
	writeFeedbackData(time, section, answer);
	getGroupedData(section);
});

function writeFeedbackData(time, section, answer) {
	database.ref(`feedback/${time}`).set({
		section,
		answer,
	});
}

function getGroupedData(section) {
	database
		.ref("/feedback/")
		.once("value")
		.then((snapshot) => {
			let dataAll = snapshot.val();
			dataAll = Object.values(dataAll);
			let groupedBySection = d3.group(dataAll, (d) => d.section);
			groupedBySection = Array.from(groupedBySection);
			let groupedDataForThisSection = groupedBySection.filter(
				(d) => d[0] === section
			);
			groupedByAnswer = d3.group(
				groupedDataForThisSection[0][1],
				(d) => d.answer
			);
			groupedByAnswer = Array.from(groupedByAnswer);
			changeInnerBarWidth(section, groupedByAnswer);
		});
}

function changeInnerBarWidth(section, data) {
	d3.select(`#feedback__explanation__${section}`)
		.select("p")
		.text("Thank you!");
	d3.select(`#feedback__${section}__button__no`).style(
		"pointer-events",
		"none"
	);
	d3.select(`#feedback__${section}__button__yes`).style(
		"pointer-events",
		"none"
	);
	if (data.length === 1) {
		let answer = data[0][0];
		let yesNum = answer == "yes" ? data[0][1].length : 0;
		let noNum = answer == "no" ? data[0][1].length : 0;
		let elementToChange = {};
		elementToChange.bar = d3.select(
			`#feedback__${section}__bar__${answer}`
		);
		elementToChange.yesText = d3.select(`#feedback__${section}__text__yes`);
		elementToChange.noText = d3.select(`#feedback__${section}__text__no`);
		elementToChange.bar.style("width", "100%");
		elementToChange.yesText.text(`${yesNum}  (Yes)`);
		elementToChange.noText.text(`(No)  ${noNum}`);
	} else {
		let totalNum = data[0][1].length + data[1][1].length;
		let yesNum = data.filter((d) => d[0] === "yes");
		yesNum = yesNum[0][1].length;
		let noNum = totalNum - yesNum;
		let higherNum = yesNum >= noNum ? yesNum : noNum;
		let elementToChange = {};
		elementToChange.yesBar = d3.select(`#feedback__${section}__bar__yes`);
		elementToChange.noBar = d3.select(`#feedback__${section}__bar__no`);
		elementToChange.yesText = d3.select(`#feedback__${section}__text__yes`);
		elementToChange.noText = d3.select(`#feedback__${section}__text__no`);
		elementToChange.yesBar.style("width", `${(yesNum / higherNum) * 100}%`);
		elementToChange.noBar.style("width", `${(noNum / higherNum) * 100}%`);
		elementToChange.yesText.text(`${yesNum}  (Yes)`);
		elementToChange.noText.text(`(No)  ${noNum}`);
	}
}
