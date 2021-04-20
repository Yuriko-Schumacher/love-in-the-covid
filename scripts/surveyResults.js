// ---------- DATA VIZ ----------
let windowSize = {
	w: window.innerWidth,
	h: window.innterHeight,
};
const size = {
	w: document.querySelector(".scrolly__sticky").clientWidth,
	h: document.querySelector(".scrolly__sticky").clientHeight - 26,
};
const margin = { top: 0, right: 0, bottom: 75, left: 0 };
const surveyLonelinessSvg = d3
	.select("#survey__loneliness")
	.append("svg")
	.attr("id", "surveyLonelinessSvg")
	.attr("width", size.w)
	.attr("height", size.h);
const surveyRiskSvg = d3
	.select("#survey__risk")
	.append("svg")
	.attr("id", "surveyRiskSvg")
	.attr("width", size.w)
	.attr("height", size.h);
const surveyRelationshipSvg = d3
	.select("#survey__relationship")
	.append("svg")
	.attr("id", "surveyRelationshipSvg")
	.attr("width", size.w)
	.attr("height", size.h);

const surveyLonelinessG = surveyLonelinessSvg
	.append("g")
	.classed("surveyLonelinessContainer", true);
const surveyRiskG = surveyRiskSvg
	.append("g")
	.classed("surveyRiskContainer", true);
const surveyRelationshipG = surveyRelationshipSvg
	.append("g")
	.classed("surveyRelationshipContainer", true);

let node, xAxis, xAxis2, questionSel;

const questions = [
	"Have you experienced increased loneliness during the pandemic?",
	"How much has the pandemic impacted your desire to connect with other people?",
	"When you feel lonely, how important is it that people acknowledge that feeling?",
	"How has the pandemic impacted your ability to be happy while alone?",
	"Before the pandemic, how important was it to know that your match was healthy? (STI Free, etc.)",
	"How likely are you to trust a match who assures healthy without providing proof of a negative COVID test result?",
];

const QandA = {
	increasedLoneliness: ["Yes, often", "Yes, sometimes", "No noticed change"],
	desireToConnect: [
		"Heavily increased",
		"Moderately increased",
		"Not at all",
		"Moderately decreased",
		"Heavily decreased",
		"No Answer",
	],
	recognizeLoneliness: [
		"Very Important",
		"Somewhat Important",
		"Generally Welcome",
		"Somewhat Unimportant",
		"Very Unimportant",
	],
	abilityToBeHappy: [
		"Significantly decreased",
		"Somewhat decreased",
		"No noted difference",
		"Somewhat increased",
		"Significantly increased",
		"No Answer",
	],
	healthConfirmationPrePandemic: [
		"Very Important",
		"Somewhat Important",
		"Important",
		"Somewhat Unimportant",
		"Very Unimportant",
		"No Answer",
	],
	withoutProof: [
		"Very Likely",
		"Somewhat Likely",
		"Likely",
		"Somewhat Unlikely",
		"Very Unlikely",
		"No Answer",
	],
};
const colorDef = {
	hotPink: "#FC0594",
	lightPink: "#ffc7e8",
	white: "#f7f7f7",
	gray: "#aaa",
};
const colors = {
	increasedLoneliness: [colorDef.hotPink, colorDef.lightPink, colorDef.black],
	desireToConnect: [
		colorDef.hotPink,
		colorDef.hotPink,
		colorDef.white,
		"black",
		"black",
		colorDef.gray,
	],
	recognizeLoneliness: [
		colorDef.hotPink,
		colorDef.hotPink,
		colorDef.white,
		"black",
		"black",
	],
	abilityToBeHappy: [
		"black",
		"black",
		"#f7f7f7",
		colorDef.hotPink,
		colorDef.hotPink,
		colorDef.gray,
	],
	healthConfirmationPrePandemic: [
		colorDef.hotPink,
		colorDef.lightPink,
		colorDef.lightPink,
		"black",
		colorDef.gray,
	],
	withoutProof: [
		colorDef.hotPink,
		colorDef.hotPink,
		colorDef.hotPink,
		"black",
		"black",
		colorDef.gray,
	],
};

d3.csv("data/survey-cleaned.csv").then(function (data) {
	console.log(data);

	colorScale = d3
		.scaleOrdinal()
		.domain(selectQuestion(data, 0).map((el) => el[0]))
		.range(colors.increasedLoneliness);

	// PART-1 DATA VIZ
	enterViewChangeViz(data, ".survey__loneliness__step", 0, -1);

	// PART-2 DATA VIZ
	enterViewChangeViz(data, ".survey__risk__step", 1, 4);

	// PART-3 DATA VIZ
	enterViewChangeViz(data, ".survey__relationship__step", 2, 2);
});

function enterViewChangeViz(data, selector, partIndex, indexOffset) {
	enterView({
		selector: selector,
		enter: (el) => {
			if (isActive[partIndex]) {
				el.classList.add("step-active");
				let index = el.getAttribute("data-index");

				changeViz(data, index);
			}
		},
		exit: (el) => {
			if (isActive[partIndex]) {
				el.classList.remove("step-active");
				let index = el.getAttribute("data-index");
				if (index > indexOffset) {
					changeViz(data, index - 1);
				}
			}
		},
		offset: 0.75,
	});
}

function changeViz(data, index) {
	if (xAxis) {
		xAxis.remove();
		xAxis2.remove();
	}
	changeQuestion(index);
	let options = selectQuestion(data, index);
	let group =
		index < 2
			? surveyLonelinessG
			: index < 4
			? surveyRelationshipG
			: surveyRiskG;
	drawNodes(data, index, options, group);
}

function changeQuestion(index) {
	let id = index < 2 ? "loneliness" : index < 4 ? "relationship" : "risk";
	questionSel = d3.select(`#question__${id}`).select("p");
	questionSel.text(questions[index]);
}

function selectQuestion(data, index) {
	let thisQ = Object.keys(QandA)[index];
	options = d3.group(data, (d) => d[thisQ]);
	options = Array.from(options);
	let choices = QandA[thisQ];
	options.sort((a, b) => {
		return choices.indexOf(a[0]) > choices.indexOf(b[0]) ? 1 : -1;
	});

	return options;
}

function drawNodes(data, index, options, group) {
	let thisQ = Object.keys(QandA)[index];
	let thisOption = options.map((el) => el[0]);

	// create scale
	xScale = d3
		.scaleBand()
		.domain(thisOption)
		.range([margin.left, size.w - margin.right]);

	if (index != -1) {
		colorScale = d3
			.scaleOrdinal()
			.domain(selectQuestion(data, index).map((el) => el[0]))
			.range(colors[thisQ]);
	}

	xAxis = group
		.append("g")
		.classed("x-axis", true)
		.call(d3.axisBottom(xScale))
		.attr("transform", `translate(0, ${size.h - 35})`);

	xAxis2 = group
		.append("g")
		.classed("x-axis", true)
		.call(
			d3.axisBottom(xScale).tickFormat((d, i) => {
				let num = options[i][1].length;
				let percentage = Math.round((num / 204) * 100 * 10) / 10;
				return `${num} (${percentage}%)`;
			})
		)
		.attr("transform", `translate(0, ${size.h - 20})`);

	let simulation = d3
		.forceSimulation(data)
		.force("collide", d3.forceCollide().radius(5.5))
		.force("charge", d3.forceManyBody().strength(0.3))
		.force(
			"x",
			d3
				.forceX()
				.x((d) => xScale(d[thisQ]) + size.w / thisOption.length / 2)
		)
		.force("y", d3.forceY().y(size.h / 2));

	let circles = group.selectAll("circle");

	if (circles.nodes().length === 0) {
		node = group
			.append("g")
			.classed("circles", true)
			.attr("stroke", "lightgray")
			.attr("stroke-width", 1)
			.selectAll("circle")
			.data(data, (d) => d.index)
			.enter()
			.append("circle")
			.attr("yy", (d) => d[thisQ])
			.attr("r", 5)
			.attr("fill", (d) => colorScale(d[thisQ]));

		simulation.on("tick", () => {
			node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
		});
	} else {
		node.attr("fill", (d) => colorScale(d[thisQ]));
		simulation.on("tick", () => {
			node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
		});
	}
}
