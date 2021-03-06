// ---------- DATA VIZ ----------
let windowSize = {
	w: window.innerWidth,
	h: window.innterHeight,
};
const size = {
	w: document.querySelector(".chart__figure").clientWidth,
	// h: document.querySelector(".chart__figure").clientHeight - 26,
	h: 274,
};
const margin = { top: 0, right: 0, bottom: 75, left: 0 };
const svg = [];
const group = [];

const questions = [
	"Have you experienced increased loneliness during the pandemic?",
	"How much has the pandemic impacted your desire to connect with other people?",
	"Before the pandemic, how important was it to know that your match was healthy? (STI Free, etc.)",
	"How likely are you to trust a match who assures healthy without providing proof of a negative COVID test result?",
	"When you feel lonely, how important is it that people acknowledge that feeling?",
	"How has the pandemic impacted your ability to be happy while alone?",
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
};
const colorDef = {
	hotPink: "#FC0594",
	lightPink: "#ffc7e8",
	white: "#f7f7f7",
	gray: "#aaa",
};
const colors = {
	increasedLoneliness: [colorDef.hotPink, colorDef.lightPink, "black"],
	desireToConnect: [
		colorDef.hotPink,
		colorDef.hotPink,
		colorDef.white,
		"black",
		"black",
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
};

d3.csv("data/survey-cleaned.csv").then(function (d) {
	const data = d;
	// let idx = 0;
	// while (idx < 4) {
	// 	svg[idx] = d3
	// 		.select(`#survey__${idx}`)
	// 		.append("svg")
	// 		.attr("id", `chart__svg__${idx}`)
	// 		.attr("width", size.w)
	// 		.attr("height", size.h);
	// 	group[idx] = svg[idx]
	// 		.append("g")
	// 		.classed(`chart__container__${idx}`, true);
	// 	idx++;
	// }
	svg[0] = d3
		.select(`#survey__0`)
		.append("svg")
		.attr("id", `chart__svg__0`)
		.attr("width", size.w)
		.attr("height", size.h);
	group[0] = svg[0].append("g").classed(`chart__container__0`, true);
	enterViewDrawChart(0, 0, data);
});

function enterViewDrawChart(index, partNum, data) {
	enterView({
		selector: `#survey__${index}`,
		enter: (el) => {
			let bubbleChart = new BubbleChart();
			bubbleChart
				.index(index)
				.selection(group[index])
				.size(size)
				.margins(margin)
				.data(data);
			bubbleChart.setOptions().changeQuestion();
			bubbleChart.draw();
		},
		once: true,
		offset: 0.5,
	});
}

// colorScale = d3
// 	.scaleOrdinal()
// 	.domain(selectQuestion(data, 0).map((el) => el[0]))
// 	.range(colors.increasedLoneliness);

// function enterViewChangeViz(data, selector, partIndex, indexOffset) {
// 	enterView({
// 		selector: selector,
// 		enter: (el) => {
// 			if (isActive[partIndex]) {
// 				el.classList.add("step-active");
// 				let index = el.getAttribute("data-index");

// 				changeViz(data, index);
// 			}
// 		},
// 		exit: (el) => {
// 			if (isActive[partIndex]) {
// 				el.classList.remove("step-active");
// 				let index = el.getAttribute("data-index");
// 				if (index > indexOffset) {
// 					changeViz(data, index - 1);
// 				}
// 			}
// 		},
// 		offset: 0.75,
// 	});
// }

// function changeViz(data, index) {
// 	if (xAxis) {
// 		xAxis.remove();
// 		xAxis2.remove();
// 	}
// 	changeQuestion(index);
// 	let options = selectQuestion(data, index);
// 	let group =
// 		index < 2
// 			? surveyLonelinessG
// 			: index < 4
// 			? surveyRelationshipG
// 			: surveyRiskG;
// 	drawNodes(data, index, options, group);
// }

// function changeQuestion(index) {
// 	let id = index < 2 ? "loneliness" : index < 4 ? "relationship" : "risk";
// 	questionSel = d3.select(`#question__${id}`).select("p");
// 	questionSel.text(questions[index]);
// }

// function selectQuestion(data, index) {
// 	let thisQ = Object.keys(QandA)[index];
// 	options = d3.group(data, (d) => d[thisQ]);
// 	options = Array.from(options);
// 	let choices = QandA[thisQ];
// 	options.sort((a, b) => {
// 		return choices.indexOf(a[0]) > choices.indexOf(b[0]) ? 1 : -1;
// 	});

// 	return options;
// }

// function drawNodes(data, index, options, group) {
// 	let thisQ = Object.keys(QandA)[index];
// 	let thisOption = options.map((el) => el[0]);

// 	// create scale
// 	xScale = d3
// 		.scaleBand()
// 		.domain(thisOption)
// 		.range([margin.left, size.w - margin.right]);

// 	if (index != -1) {
// 		colorScale = d3
// 			.scaleOrdinal()
// 			.domain(selectQuestion(data, index).map((el) => el[0]))
// 			.range(colors[thisQ]);
// 	}

// 	xAxis = group
// 		.append("g")
// 		.classed("x-axis", true)
// 		.call(d3.axisBottom(xScale))
// 		.attr("transform", `translate(0, ${size.h - 35})`);

// 	xAxis2 = group
// 		.append("g")
// 		.classed("x-axis", true)
// 		.call(
// 			d3.axisBottom(xScale).tickFormat((d, i) => {
// 				let num = options[i][1].length;
// 				let percentage = Math.round((num / 204) * 100 * 10) / 10;
// 				return `${num} (${percentage}%)`;
// 			})
// 		)
// 		.attr("transform", `translate(0, ${size.h - 20})`);

// 	let simulation = d3
// 		.forceSimulation(data)
// 		.force("collide", d3.forceCollide().radius(5.5))
// 		.force("charge", d3.forceManyBody().strength(0.3))
// 		.force(
// 			"x",
// 			d3
// 				.forceX()
// 				.x((d) => xScale(d[thisQ]) + size.w / thisOption.length / 2)
// 		)
// 		.force("y", d3.forceY().y(size.h / 2));

// 	let circles = group.selectAll("circle");

// 	if (circles.nodes().length === 0) {
// 		node = group
// 			.append("g")
// 			.classed("circles", true)
// 			.attr("stroke", "lightgray")
// 			.attr("stroke-width", 1)
// 			.selectAll("circle")
// 			.data(data, (d) => d.index)
// 			.enter()
// 			.append("circle")
// 			.attr("yy", (d) => d[thisQ])
// 			.attr("r", 5)
// 			.attr("fill", (d) => colorScale(d[thisQ]));

// 		simulation.on("tick", () => {
// 			node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
// 		});
// 	} else {
// 		node.attr("fill", (d) => colorScale(d[thisQ]));
// 		simulation.on("tick", () => {
// 			node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
// 		});
// 	}
// }
