/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(noUiSlider) {/* harmony import */ var _assets_js_nouislider_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _assets_js_nouislider_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_js_nouislider_min_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);



let bubble = {
	init: function () {
		var margin = {
				top: 25,
				right: 100,
				bottom: 20,
				left: 55
			},
			width = 1000 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;
		let dataDiv = document.getElementById('my_dataviz');
		var dynamic = {
			width: dataDiv.offsetWidth,
			height: dataDiv.offsetHeight,
			x: dataDiv.clientX,
			y: dataDiv.clientY,
			xRange: [],
			yRange: []
		}

		let eventList = ['touchstart', 'mousemove'];
		eventList.forEach(function (e) {
			dataDiv.addEventListener(e, function (event) {

				dynamic.x = event.clientX - this.offsetLeft;
				dynamic.y = event.clientY - this.offsetTop;
				//console.log(dynamic.x)
			});
		});
		dataDiv.addEventListener('touchstart', function (event) {
			dynamic.x = event.touches[0].clientX - this.offsetLeft
			dynamic.y = event.touches[0].clientY - this.offsetTop;

		});
		// append the svg object to the body of the page
		var svg = d3.select("#my_dataviz")
			.append("svg")
			.attr("viewBox", "0 0 1000 400")
			.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");
		let totalMarketcap;
		let outputData;
		let piechartData;
		d3.csv("assets/data/data-category.csv", function (data) {
			totalMarketcap = total_mc(data, 'Marketcap'); // total market cap value
			processData(data);


			let tooltip = d3.select("#my_dataviz")
				.append("div")
				.style("opacity", 0)
				.attr("class", "tooltip")

			let showTooltip = function (d) {
				tooltip.transition().duration(200);
				tooltip.classed('active', true)
				tooltip.style("opacity", 1).html(`<p>Sectors: ${d.sectors} </p><p>MC: ${d.amount} </p><p>Proportion: ${d.proportion} </p><p>Assets: ${d.assets} </p>`)
					.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}
			let moveTooltip = function (d) {
				tooltip.classed('active', true)
				tooltip.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}
			let hideTooltip = function (d) {
				tooltip.classed('active', false)
				tooltip.transition().duration(200)
					.style("opacity", 0)
			}

			let combinedOutput = millonFilter(outputData)
			totalmc_calc(outputData);


			var z = d3.scaleLinear()
				.domain([0, d3.max(max_X(outputData))])
				.range([5, 75]);

			var x = d3.scaleLinear()
				.domain([0, d3.max(max_X(outputData)) + (d3.max(max_X(outputData)) / 7)])
				.range([30, width]);
			var formatValue = d3.format("1s");
			var xAxis = svg.append("g").attr('class', 'axis-line')
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).tickFormat(function (d) {
					return fnum(d * 1000000)
				}))


			// Add Y axis
			var y = d3.scaleLinear()
				.domain([0, d3.max(maxDensity_Y(outputData)) + 100])
				.range([height - 40, 0]);

			var yAxis = svg.append("g").attr('class', 'axis-line')
				.call(d3.axisLeft(y));


			d3.select("#my_dataviz").append('div')
				.attr('class', 'rangeX')
				.attr('id', 'sliderX')

			d3.select("#my_dataviz").append('div')
				.attr('class', 'rangeY')
				.attr('id', 'sliderY')

			var sliderX = document.getElementById('sliderX');


			let onlyMc = max_X(outputData).sort((a, b) => {
				return a - b
			});
			console.log(onlyMc)

			noUiSlider.create(sliderX, {
				connect: true,
				behaviour: 'tap',
				step: 1,
				start: [1, d3.max(max_X(outputData)) + 17000],
				/* pips: {
				     mode: 'range',
				     density: 5
				 },*/
				range: {
					// Starting at 500, step the value by 500,
					// until 4000 is reached. From there, step by 1000.
					'min': [1],
					//'30%': [onlyMc[24], 0.01],
					'40%': [onlyMc[27], 0.01],
                    '60%': [onlyMc[30], 0.01],
                    '77%': [onlyMc[31], 0.5],
                    '95%': [onlyMc[32], 1],
                    'max': [d3.max(max_X(outputData)) + 17000]
				}
			});

			var sliderY = document.getElementById('sliderY');
			noUiSlider.create(sliderY, {
				connect: true,
				direction: 'rtl',
				step: 10,
				orientation: 'vertical',
				start: [0, d3.max(maxDensity_Y(outputData)) + 100],
				range: {
					// Starting at 500, step the value by 500,
					// until 4000 is reached. From there, step by 1000.
					'min': [0],
					//'10%': [500, 500],
					//'50%': [4000, 1000],
					'max': [d3.max(maxDensity_Y(outputData)) + 100]
				}
			});
			d3.select("#my_dataviz svg > g").append('line')
				.attr('x1', 0)
				.attr('y1', height - 39)
				.attr('x2', 0)
				.attr('y2', height + 1)
				.attr('stroke', '#000')
				.attr('stroke-width', 1.1);

			d3.select("#my_dataviz svg > g").append('line')
				.attr('x1', 0)
				.attr('y1', height + 1)
				.attr('x2', 30)
				.attr('y2', height + 1)
				.attr('stroke', '#000')
				.attr('stroke-width', 1.1);


			var node = svg.append("g").selectAll("dot")
				.data(outputData)
				.enter().append('g')


			node.append("circle")
				.attr("class", function (d) {
					return `circle ${stringCombine(d.sectors)}`
				}).attr("category", function (d) {
					return stringCombine(d.sectors)
				}).attr('opacity', function (d) {
					if (x(d.million) < 0) {
						return 0;
					}
				}).attr('opacity', 0)
				.attr("cx", function (d) {

					return x(d.million);
				})
				.attr("cy", function (d) {
					return y(0);
				})
				.attr("r", function (d) {
					return z(0);
				})
				.style("fill", function (d) {
					var o = Math.round,
						r = Math.random,
						s = 255;
					return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')';
				}).attr('data-value', function (d) {
					return z(d.million);
				})
				.attr("stroke", "#ddd")
				.on("mouseover", showTooltip)
				.on("mousemove", moveTooltip)
				.on("mouseleave", hideTooltip)
				.on('click', function () {})

			node.append("text")
				.attr('class', 'innerText')
				.style("text-anchor", "middle")
				.attr('opacity', 0)
				.attr('x', function (d) {

					return x(d.million);
				})
				.attr('y', function (d) {

					return y(d.assets);
				})
				.text(function (d) {
					let t = d.sectors.substring(0, z(d.million) / 4);
					let b = t.split('');
					b.push('..');

					return b.join('');
				})
				.attr("font-size", function (d) {
					return z(d.million) / 4;
				})


			d3.selectAll('.circle').data(outputData).transition().duration(2500).delay(function (d, i) {
					return i * 15
				}).ease(d3.easeBack)
				.attr("r", function (d) {
					return z(d.million);
				})
				.attr("cy", function (d) {
					return y(d.assets);
				})
				.attr('opacity', 1)

			svg.selectAll(".innerText").data(outputData).transition().duration(500).delay(function (d, i) {
					return i * 15
				})
				.attr("fill", "white").attr('opacity', function (d) {
					if (z(d.million) < 30) {
						return 0
					}
					return 1;
				})
			let tempMin;
			let tempMax;

			function updatePlot_X(value, handle, unencoded, tap, positions) {

				let value_x = document.querySelectorAll('#sliderX .noUi-origin')[0].getAttribute('style')
				let value_y = document.querySelectorAll('#sliderX .noUi-origin')[1].getAttribute('style')
				let str_x = value_x.split('translate')[1].split(',')[0].split('(')[1].split('%')[0];
				let str_y = value_y.split('translate')[1].split(',')[0].split('(')[1].split('%')[0];
				let percent_y = (parseInt(str_y) / 1000) * 100
				let percent_x = (parseInt(str_x) / 1000) * 100


				let max_x = (100 - Math.abs(percent_y))
				let min_x = (100 - Math.abs(percent_x))

				if (value[0] != value[1]) {
					x.domain([value[0], value[1]])
					xAxis.transition().duration(200).call(d3.axisBottom(x).tickFormat(function (d) {
						return fnum(d * 1000000)
					}));
					z = d3.scaleLinear()
						.domain([value[0], value[1]])
						.range([5, 50]);
					tempMin = value[0];
					tempMax = value[1];
				} else {
					z = d3.scaleLinear()
						.domain([tempMin, tempMax])
						.range([5, 50]);
					x.domain([tempMin, tempMax])
					xAxis.transition().duration(200).call(d3.axisBottom(x).tickFormat(function (d) {
						return fnum(d * 1000000)
					}));

				}

				// Update chart
				svg.selectAll(".circle")
					.data(outputData)
					.transition()
					.duration(200)
					.attr("r", function (d) {
						if (z(d.million) > 0) {
							return z(d.million);
						}

					}).attr('data-value', function (d) {
						return z(d.million);
					})
					.attr("cx", function (d) {
						return x(d.million);
					})
					.attr("cy", function (d) {
						return y(d.assets);
					})

				svg.selectAll(".innerText")
					.data(outputData)
					.transition()
					.duration(200)
					.attr('x', function (d) {

						return x(d.million);
					})
					.attr('y', function (d) {

						return y(d.assets);
					})
					.text(function (d) {
						let t = d.sectors.substring(0, z(d.million) / 4);
						let b = t.split('');
						b.push('..');

						return b.join('');
					})
					.attr("font-size", function (d) {
						return z(d.million) / 4;
					})
					.attr("fill", "white").attr('opacity', function (d) {
						if (z(d.million) < 20) {
							return 0
						}
						return 1;
					})
					.attr("fill", "white");

			}
			sliderX.noUiSlider.on('slide', updatePlot_X);

			function updatePlot_Y(value, handle, unencoded, tap, positions) {


				if (value[0] != value[1]) {
					y.domain([value[0], value[1]])
					yAxis.transition().duration(300).call(d3.axisLeft(y))
					// Update chart
					svg.selectAll(".circle")
						.data(outputData)
						.transition()
						.duration(300)
						.attr("cx", function (d) {
							return x(d.million);
						})
						.attr("cy", function (d) {
							return y(d.assets);
						})

					svg.selectAll(".innerText")
						.data(outputData)
						.transition()
						.duration(300)
						.attr('x', function (d) {

							return x(d.million);
						})
						.attr("y", function (d) {
							return y(d.assets);
						})
				}
			}
			sliderY.noUiSlider.on('slide', updatePlot_Y);

			function update() {

				let grp = d3.select(this).attr("data-attribute")
				let radius = document.querySelector(('.' + grp)).getAttribute('data-value')

				if (!d3.select(this).property("checked")) {
					svg.selectAll("." + grp).transition().duration(800).style("opacity", 0).attr("r", function (d) {
						return 0
					})
				} else {
					svg.selectAll("." + grp).transition().duration(800).style("opacity", 1).attr("r", function (d) {
						return radius;
					})
				}

			}
			d3.selectAll(".switch input").on("change", update);


			createPieChart(piechartData, outputData);

			function createPieChart(req, categoryArr) {
				d3.selectAll('.circle').on('click', function () {
					let value = d3.select(this).attr('category');
                    d3.select('.breakdown--list').classed('active', false);
                    d3.selectAll('#piechart .breakdown--list li').remove();
					d3.select('.heading p').html(`Portion of total market Cap:${categoryProportion(value)[0].proportion}`)

					function categoryProportion(value) {
						let result = outputData.filter((element) => {
							return stringCombine(value) == stringCombine(element.sectors);
						})
						return result;
					}
					let result;
					for (let i in req) {
						if (value == stringCombine(i)) {
							result = req[i];
						}
					}
					for (let i in result) {

						result[i]['price'] = covertNumber(result[i].Marketcap)

					}
					let sectorsName = filtersectorName(result, 'Sector_s');

					let temp_result = {};

					for (let i = 0; i < sectorsName.length; i++) {
						var output_1 = data.filter((element, index) => {

							return element.Sector_s.toLowerCase() == sectorsName[i];
						});
						temp_result[sectorsName[i]] = output_1;
					}
					let outp_result = [];
					for (let i in temp_result) {
						let obj = {}

						obj['category'] = temp_result[i][0].Category;
						obj['sectors'] = i;
						obj['assets'] = temp_result[i].length;
						obj['MC'] = total_mc(temp_result[i], 'Marketcap');
						obj['proportion'] = temp_result[i][0].proportion;

						outp_result.push(obj);
					}

					d3.select('#piechart svg').remove();

					let pieDiv = document.getElementById('piechart');

					if (!pieDiv.classList.contains('active')) {

						pieDiv.classList.toggle('active');
					}
					pieChart(outp_result, req);


				});


			}


		});


		function processData(data) {
			let sectorsName = filtersectorName(data, 'Category');
			var sectorsList = document.getElementById('sectorsList');
			let result = {};

			for (let i = 0; i < sectorsName.length; i++) {
				var output_1 = data.filter((element, index) => {
					return element.Category.toLowerCase() == sectorsName[i];
				});
				result[sectorsName[i]] = output_1;
			}
			piechartData = result;
			combineData(result);

			for (let i = 0; i < sectorsName.length; i++) {
				let li = document.createElement('li');

				li.innerHTML = `<p>${sectorsName[i]}</p>
        <label class="switch">
        <input type="checkbox" checked data-attribute='${stringCombine(sectorsName[i])}'>
        <span class="slider round">
        </span>
</label>
`;
				sectorsList.appendChild(li);
			}
		}


		function stringCombine(str) {
			let d = str.split(' ').join('').toLowerCase();
			return d;
		}

		function filtersectorName(data, name) {
			let nameArr = data.map((element) => {
				return element[name];
			});
			return removeDup(nameArr);
		}


		function removeDup(arr) {
			let arrLowercase = arr.map((element) => {
				return element.toLowerCase()
			});
			arrLowercase.sort();
			let result = [];
			for (let i = 0; i < arrLowercase.length; i++) {
				if (arrLowercase[i] !== arrLowercase[i + 1]) {
					result.push(arrLowercase[i]);
				}
			}

			return result;
		}

		function totalmc_calc(req, name) {
			let maxCap = req.map((element) => {
				return element[name];
			});
			return maxCap.reduce((total, num) => {
				return total + num;
			})

		}

		function maxZ(req, name) {

			let maxCap = req.map((element) => {
				return element[name];
			});
			return maxCap.reduce((total, num) => {
				return total + num;
			})

		}

		function max_X(req) {
			return req.map((element) => {
				return element.million;
			});
		}

		function maxDensity_Y(req) {
			return req.map((element) => {
				return element.assets;
			});
		}

		function combineData(data, sectorsName) {

			let result = [];
			for (let i in data) {
				let obj = {}
				obj['sectors'] = i;
				obj['assets'] = data[i].length;
				obj['MC'] = total_mc(data[i], 'Marketcap');
				obj['amount'] = fnum(total_mc(data[i], 'Marketcap'));
				obj['proportion'] = (total_mc(data[i], 'Marketcap') / totalMarketcap * 100).toFixed(3) + '%';

				result.push(obj);
			}


			outputData = result;
		}

		function total_mc(req, name) {
			let totalArr = [];
			let maxCap = req.map((element) => {
				return element[name];
			});

			for (let index = 0; index < maxCap.length; index++) {
				let splitNo = maxCap[index].split('');
				splitNo.shift();
				let wholeNumber;
				var number = []
				for (let i = 0; i < splitNo.length; i++) {
					if (!isNaN(parseInt(splitNo[i]))) {
						number.push(splitNo[i]);

						if (splitNo.indexOf(splitNo[i]) == splitNo.length - 1) {
							let no = parseFloat(number.join(''));
							wholeNumber = no;
						}
					} else {
						if (splitNo[i] == '.') {
							number.push(splitNo[i]);
						}
						var no = parseFloat(number.join(''));
						switch (splitNo[i]) {
							case 'K':
								wholeNumber = no * 1000;
								break;

							case 'M':
								wholeNumber = no * 1000000;
								break;

							case 'B':
								wholeNumber = no * 1000000000;
								break;

						}
					}
				}
				totalArr.push(wholeNumber);

			}
			totalArr = totalArr.filter((element) => {

				return element != undefined;

			})
			let totalPrice = totalArr.reduce((total, num) => {
				return total + num;
			});
			return totalPrice;
		}

		function millonFilter(req) {
			req.sort((a, b) => {
				return a.MC - b.Mc;
			})
			let arr = req.map((element) => {
				element["million"] = convertMillion(element.MC)
				return element
			})

			let result = [];
			result[0] = arr.filter((element) => {
				if (element.million < 50) {
					element['fill'] = 'rgba(255, 204,0,0.7)';
					return element
				}
			});

			result[1] = req.filter((element) => {
				if (element.million > 50 && element.million < 499) {
					element['fill'] = 'rgba(255, 153,0, 0.7)';
					return element
				}
			});
			result[2] = req.filter((element) => {
				if (element.million > 500) {
					element['fill'] = 'rgba(34, 97,236, 0.7)';
					return element
				}
			});

			return result;
		}

		function convertMillion(labelValue) {
			{
				// Nine Zeroes for Billions
				return Math.abs(Number(labelValue)) >= 1.0e+6

					?
					Math.abs(Number(labelValue)) / 1.0e+6 //  million
					// Three Zeroes for Thousands
					:
					Math.abs(Number(labelValue)) >= 1.0e+3

					?
					Math.abs(Number(labelValue)) / 1.0e+3 // k

					:
					Math.abs(Number(labelValue));
			}
		}

		function fnum(x) {
			if (isNaN(x)) return x;

			if (x < 9999) {
				return x;
			}

			if (x < 1000000) {
				return Math.round(x / 1000) + "K";
			}
			if (x < 10000000) {
				return (x / 1000000) + "M";
			}

			if (x < 1000000000) {
				return Math.round((x / 1000000)) + "M";
			}

			if (x < 1000000000000) {
				return Math.round((x / 1000000000)) + "B";
			}

			return "1T+";
		}

		function covertNumber(request) {
			request = request.toString();
			let splitNo = request.split('');

			splitNo.shift();
			let wholeNumber;
			var number = []
			for (let i = 0; i < splitNo.length; i++) {
				if (!isNaN(parseInt(splitNo[i]))) {
					number.push(splitNo[i]);

					if (splitNo.indexOf(splitNo[i]) == splitNo.length - 1) {
						let no = parseFloat(number.join(''));
						wholeNumber = no;
					}
				} else {
					if (splitNo[i] == '.') {
						number.push(splitNo[i]);
					}
					var no = parseFloat(number.join(''));
					switch (splitNo[i]) {
						case 'K':
							wholeNumber = no * 1000;
							break;

						case 'M':
							wholeNumber = no * 1000000;
							break;

						case 'B':
							wholeNumber = no * 1000000000;
							break;

					}
				}
			}
			return wholeNumber;
		}

		function domEventFun() {

			document.querySelector('.arrow--block').addEventListener('click', function (e) {
				document.querySelector('.filter--block').classList.toggle('active');
			})

			document.getElementById('close').addEventListener('click', function () {
				document.getElementById('piechart').classList.remove('active');
				d3.selectAll('#piechart .breakdown--list li').remove();
				document.getElementById('subCategory').classList.remove('active');
				d3.selectAll('#subcategory .breakdown--list li').remove();
			})
			document.querySelector('.subCate--btn').addEventListener('click', function () {
				document.getElementById('subCategory').classList.remove('active');
				d3.selectAll('#subcategory .breakdown--list li').remove();
			})

		}

		function pieChart(result, arr) {

			let width = 450
			height = 450
            margin = 40
            
			let svg = d3.select("#piechart .wrapper")
				.append("svg")
				.attr("viewBox", "0 0 450 450")
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


			if (result.length != 1) {
				generateIndustryChart(result, svg);
				let ul = document.querySelector('#piechart ul');
				for (let i = 0; i < result.length; i++) {
					let li = document.createElement('li');
					li.innerHTML = `<span class='name'>${result[i].sectors}</span>
                                <span class='no'>${fnum(result[i].MC)}</span>
                                <span class='percent'>${((result[i].MC / totalmc_calc(result,'MC') ) *100).toFixed(4) + '%'}<i></i></span>`;
					ul.appendChild(li);
				}
				svg.selectAll("#piechart path").on('click', function () {
					let value = d3.select(this).attr("data-value")
					d3.selectAll('#subCategory .breakdown--list li').remove();
					d3.select('#subcategory .breakdown--list').classed('active', true);

					function subcategoryProportion(req) {
						let result = req.filter((element) => {
							if (stringCombine(value) == stringCombine(element.sectors)) {
								return element
							}
						})
						return result;
					}
					d3.select('#subCategory .heading p').html(`Portion of total market Cap:${((subcategoryProportion(result)[0].MC / totalmc_calc(result,'MC') ) *100).toFixed(4) + '%'}`)

					let selectedSectors = [];
					for (let i in arr) {
						arr[i].filter((element) => {
							if (stringCombine(value) == stringCombine(element.Sector_s)) {
								selectedSectors.push(element);
							}

						})


					}

					let data = selectedSectors.map((element) => {
						element['MC'] = covertNumber(element.Marketcap) // total market cap value
						return element;
					})
					d3.select('#subCategory svg').remove();
					let subCategoryDiv = document.getElementById('subCategory');
					if (!subCategoryDiv.classList.contains('active')) {

						subCategoryDiv.classList.toggle('active');
					}
					subCategoryPieChart(data);
				})
			} else {
				d3.select('#piechart .breakdown--list').classed('active', true);
				d3.selectAll('#piechart .breakdown--list li').remove();
				let selectedSectors = [];
				for (let i in arr) {
					arr[i].filter((element) => {
						if (stringCombine(result[0].category) == stringCombine(element.Sector_s)) {
							selectedSectors.push(element);
						}
					})
                }
                let data = selectedSectors.map((element) => {
                    element['MC'] = covertNumber(element.Marketcap) // total market cap value
                    return element;
                })
				generateSubCategoryChart(data,svg);
				let ul = document.querySelector('#piechart .breakdown--list ul');
				for (let i = 0; i < selectedSectors.length; i++) {
					let li = document.createElement('li');
					li.innerHTML = `<span class='name'>${selectedSectors[i].Name}</span>
                                <span class='no'>${selectedSectors[i].Marketcap}</span>
                                <span class='percent'>${((selectedSectors[i].price / totalmc_calc(selectedSectors,'price') ) *100).toFixed(4) + '%'}<i></i></span>`;
					ul.appendChild(li);
				}

			}

		}

		function subCategoryPieChart(data, arr) {
			let width = 450
			height = 450
			margin = 40

			let svg = d3.select("#subCategory .wrapper")
				.append("svg")
				.attr("viewBox", "0 0 450 450")
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			generateSubCategoryChart(data, svg);

			let ul = document.querySelector('#subCategory ul');
			for (let i = 0; i < data.length; i++) {
				let li = document.createElement('li');
				li.innerHTML = `<span class='name'>${data[i].Name}</span>
                                <span class='no'>${data[i].Marketcap}</span>
                                <span class='percent'>${((data[i].price / totalmc_calc(data,'price') ) *100).toFixed(4) + '%'}<i></i></span>`;
				ul.appendChild(li);
			}
		}

		function generateIndustryChart(result, svg) {

            let radius = Math.min(width, height) / 2 - margin;
    
			var tooltip = d3.select("#my_dataviz")
				.append("div")
				.style("opacity", 0)
				.attr("class", "tooltip");

			var showTooltip = function (d) {
				tooltip.transition().duration(200);
				tooltip.classed('active', true)
				tooltip.style("opacity", 1).html(`<p>Sectors: ${d.data.value.sectors} </p><p>MC: ${fnum(d.data.value.MC)} </p>
        <p>#assets: ${d.data.value.assets} </p>
        <p>Proportion:${(d.data.value.MC / totalmc_calc(result,'MC') * 100).toFixed(2) + '%'}`)
					.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}
			var moveTooltip = function (d) {
				tooltip.classed('active', true)
				tooltip.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}
			var hideTooltip = function (d) {
				tooltip.transition().duration(200)
					.style("opacity", 0)
				tooltip.classed('active', false)
			}

			d3.select('.heading  h4').html(result[0].category)
			// append the svg object to the div called 'my_dataviz'

			// set the color scale
			let color = d3.scaleOrdinal()
				.domain(['a', 'b', 'c', 'd', 'e'])
				.range(["#4f81f0", "#6d96f3", "#7ba1f4", "#9ab6f6", "#e2eafc"]);
			let pie = d3.pie()
				.value(function (d) {
					return d.value.MC;
				})
				.sort(function (a, b) {
					return d3.ascending(a.key, b.key);
				})
			let data_ready = pie(d3.entries(result))
			// map to data
			let u = svg.selectAll("path")
				.data(data_ready)

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			u
				.enter()
				.append('path')
				.on("mouseover", showTooltip)
				.on("mousemove", moveTooltip)
				.on("mouseleave", hideTooltip)
				.attr("data-value", function (d) {
					return `${stringCombine(d.data.value.sectors)}`
				})
				.merge(u)
				.transition()
				.duration(500)
				.attr('d', d3.arc()
					.innerRadius(0)
					.outerRadius(radius)
				)
				.attr('fill', function (d) {
					return (color(d.data.key))
				})
                .style("opacity", 1)
                
			// remove the group that is not present anymore
			u
				.exit()
				.remove()

		}

		function generateSubCategoryChart(data, svg) {
            let radius = Math.min(width, height) / 2 - margin

			var tooltip = d3.select("#my_dataviz")
				.append("div")
				.style("opacity", 0)
				.attr("class", "tooltip");

			let color = d3.scaleOrdinal()
				.domain(['a', 'b', 'c', 'd', 'e'])
				.range(["#4f81f0", "#6d96f3", "#7ba1f4", "#9ab6f6", "#e2eafc"]);

			var showTooltip = function (d) {
				tooltip.transition().duration(200);
				tooltip.classed('active', true)
				tooltip.style("opacity", 1).html(`<p>Name: ${d.data.value.Name} </p><p>MC: ${fnum(d.data.value.MC)} </p>
        <p>Proportion:${(d.data.value.MC / totalmc_calc(data,'MC') * 100).toFixed(2) + '%'}`)
					.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}

			var moveTooltip = function (d) {
				tooltip.classed('active', true)
				tooltip.style("left", (dynamic.x + 30) + "px")
					.style("top", (dynamic.y + 0) + "px")
			}
			var hideTooltip = function (d) {
				tooltip.transition().duration(200)
					.style("opacity", 0)
				tooltip.classed('active', false)
			}

			d3.select('#subCategory .heading  h4').html(data[0].Sector_s)


			let pie = d3.pie()
				.value(function (d) {
					return d.value.MC;
				})
				.sort(function (a, b) {
					return d3.ascending(a.key, b.key);
				})
			let data_ready = pie(d3.entries(data))
			// map to data
			let u = svg.selectAll("path")
				.data(data_ready)

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			u
				.enter()
				.append('path')
				.on("mouseover", showTooltip)
				.on("mousemove", moveTooltip)
				.on("mouseleave", hideTooltip)
				.attr("data-value", function (d) {
					//return `${stringCombine(d.data.value.sectors)}`
				})
				.merge(u)
				.transition()
				.duration(500)
				.attr('d', d3.arc()
					.innerRadius(0)
					.outerRadius(radius)
				)
				.attr('fill', function (d) {
					return (color(d.data.key))
				})
                .style("opacity", 1);
                // remove the group that is not present anymore
                
			u
            .exit()
            .remove()

		}
		domEventFun();
	}

}

bubble.init();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! nouislider - 14.0.2 - 6/28/2019 */
(function(factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function() {
    "use strict";

    var VERSION = "14.0.2";

    //region Helper Methods

    function isValidFormatter(entry) {
        return typeof entry === "object" && typeof entry.to === "function" && typeof entry.from === "function";
    }

    function removeElement(el) {
        el.parentElement.removeChild(el);
    }

    function isSet(value) {
        return value !== null && value !== undefined;
    }

    // Bindable version
    function preventDefault(e) {
        e.preventDefault();
    }

    // Removes duplicates from an array.
    function unique(array) {
        return array.filter(function(a) {
            return !this[a] ? (this[a] = true) : false;
        }, {});
    }

    // Round a value to the closest 'to'.
    function closest(value, to) {
        return Math.round(value / to) * to;
    }

    // Current position of an element relative to the document.
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);

        // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
        }

        return orientation
            ? rect.top + pageOffset.y - docElem.clientTop
            : rect.left + pageOffset.x - docElem.clientLeft;
    }

    // Checks whether a value is numerical.
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }

    // Sets a class and removes it after [duration] ms.
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout(function() {
                removeClass(element, className);
            }, duration);
        }
    }

    // Limits a value to 0 - 100
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }

    // Wraps a variable as an array, if it isn't one yet.
    // Note that an input array is returned by reference!
    function asArray(a) {
        return Array.isArray(a) ? a : [a];
    }

    // Counts decimals
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }

    // http://youmightnotneedjquery.com/#add_class
    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += " " + className;
        }
    }

    // http://youmightnotneedjquery.com/#remove_class
    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(
                new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
            );
        }
    }

    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
    function hasClass(el, className) {
        return el.classList
            ? el.classList.contains(className)
            : new RegExp("\\b" + className + "\\b").test(el.className);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
                ? doc.documentElement.scrollLeft
                : doc.body.scrollLeft;
        var y = supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
                ? doc.documentElement.scrollTop
                : doc.body.scrollTop;

        return {
            x: x,
            y: y
        };
    }

    // we provide a function to compute constants instead
    // of accessing window.* as soon as the module needs it
    // so that we do not compute anything if not needed
    function getActions() {
        // Determine the events to bind. IE11 implements pointerEvents without
        // a prefix, which breaks compatibility with the IE10 implementation.
        return window.navigator.pointerEnabled
            ? {
                  start: "pointerdown",
                  move: "pointermove",
                  end: "pointerup"
              }
            : window.navigator.msPointerEnabled
                ? {
                      start: "MSPointerDown",
                      move: "MSPointerMove",
                      end: "MSPointerUp"
                  }
                : {
                      start: "mousedown touchstart",
                      move: "mousemove touchmove",
                      end: "mouseup touchend"
                  };
    }

    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // Issue #785
    function getSupportsPassive() {
        var supportsPassive = false;

        /* eslint-disable */
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });

            window.addEventListener("test", null, opts);
        } catch (e) {}
        /* eslint-enable */

        return supportsPassive;
    }

    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }

    //endregion

    //region Range Calculation

    // Determine the size of a sub-range in relation to a full range.
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }

    // (percentage) How many percent is this value of this range?
    function fromPercentage(range, value) {
        return (value * 100) / (range[1] - range[0]);
    }

    // (percentage) Where is this value on this range?
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
    }

    // (value) How much is this percentage on this range?
    function isPercentage(range, value) {
        return (value * (range[1] - range[0])) / 100 + range[0];
    }

    function getJ(value, arr) {
        var j = 1;

        while (value >= arr[j]) {
            j += 1;
        }

        return j;
    }

    // (percentage) Input a value, find where, on a scale of 0-100, it applies.
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
            return 100;
        }

        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];

        return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
    }

    // (value) Input a percentage, find where it is on the specified range.
    function fromStepping(xVal, xPct, value) {
        // There is no range group that fits 100
        if (value >= 100) {
            return xVal.slice(-1)[0];
        }

        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];

        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
    }

    // (percentage) Get the step that applies at a certain value.
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
            return value;
        }

        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];

        // If 'snap' is set, steps are used as fixed points on the slider.
        if (snap) {
            // Find the closest position, a or b.
            if (value - a > (b - a) / 2) {
                return b;
            }

            return a;
        }

        if (!xSteps[j - 1]) {
            return value;
        }

        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }

    function handleEntryPoint(index, value, that) {
        var percentage;

        // Wrap numerical input in an array.
        if (typeof value === "number") {
            value = [value];
        }

        // Reject any invalid input, by testing whether value is an array.
        if (!Array.isArray(value)) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
        }

        // Covert min/max syntax to 0 and 100.
        if (index === "min") {
            percentage = 0;
        } else if (index === "max") {
            percentage = 100;
        } else {
            percentage = parseFloat(index);
        }

        // Check for correct input.
        if (!isNumeric(percentage) || !isNumeric(value[0])) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
        }

        // Store values.
        that.xPct.push(percentage);
        that.xVal.push(value[0]);

        // NaN will evaluate to false too, but to keep
        // logging clear, set step explicitly. Make sure
        // not to override the 'step' setting with false.
        if (!percentage) {
            if (!isNaN(value[1])) {
                that.xSteps[0] = value[1];
            }
        } else {
            that.xSteps.push(isNaN(value[1]) ? false : value[1]);
        }

        that.xHighestCompleteStep.push(0);
    }

    function handleStepPoint(i, n, that) {
        // Ignore 'false' stepping.
        if (!n) {
            return;
        }

        // Step over zero-length ranges (#948);
        if (that.xVal[i] === that.xVal[i + 1]) {
            that.xSteps[i] = that.xHighestCompleteStep[i] = that.xVal[i];

            return;
        }

        // Factor to range ratio
        that.xSteps[i] =
            fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);

        var totalSteps = (that.xVal[i + 1] - that.xVal[i]) / that.xNumSteps[i];
        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
        var step = that.xVal[i] + that.xNumSteps[i] * highestStep;

        that.xHighestCompleteStep[i] = step;
    }

    //endregion

    //region Spectrum

    function Spectrum(entry, snap, singleStep) {
        this.xPct = [];
        this.xVal = [];
        this.xSteps = [singleStep || false];
        this.xNumSteps = [false];
        this.xHighestCompleteStep = [];

        this.snap = snap;

        var index;
        var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

        // Map the object keys to an array.
        for (index in entry) {
            if (entry.hasOwnProperty(index)) {
                ordered.push([entry[index], index]);
            }
        }

        // Sort all entries by value (numeric sort).
        if (ordered.length && typeof ordered[0][0] === "object") {
            ordered.sort(function(a, b) {
                return a[0][0] - b[0][0];
            });
        } else {
            ordered.sort(function(a, b) {
                return a[0] - b[0];
            });
        }

        // Convert all entries to subranges.
        for (index = 0; index < ordered.length; index++) {
            handleEntryPoint(ordered[index][1], ordered[index][0], this);
        }

        // Store the actual step values.
        // xSteps is sorted in the same order as xPct and xVal.
        this.xNumSteps = this.xSteps.slice(0);

        // Convert all numeric steps to the percentage of the subrange they represent.
        for (index = 0; index < this.xNumSteps.length; index++) {
            handleStepPoint(index, this.xNumSteps[index], this);
        }
    }

    Spectrum.prototype.getMargin = function(value) {
        var step = this.xNumSteps[0];

        if (step && (value / step) % 1 !== 0) {
            throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        }

        return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
    };

    Spectrum.prototype.toStepping = function(value) {
        value = toStepping(this.xVal, this.xPct, value);

        return value;
    };

    Spectrum.prototype.fromStepping = function(value) {
        return fromStepping(this.xVal, this.xPct, value);
    };

    Spectrum.prototype.getStep = function(value) {
        value = getStep(this.xPct, this.xSteps, this.snap, value);

        return value;
    };

    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
        var j = getJ(value, this.xPct);

        // When at the top or stepping down, look at the previous sub-range
        if (value === 100 || (isDown && value === this.xPct[j - 1])) {
            j = Math.max(j - 1, 1);
        }

        return (this.xVal[j] - this.xVal[j - 1]) / size;
    };

    Spectrum.prototype.getNearbySteps = function(value) {
        var j = getJ(value, this.xPct);

        return {
            stepBefore: {
                startValue: this.xVal[j - 2],
                step: this.xNumSteps[j - 2],
                highestStep: this.xHighestCompleteStep[j - 2]
            },
            thisStep: {
                startValue: this.xVal[j - 1],
                step: this.xNumSteps[j - 1],
                highestStep: this.xHighestCompleteStep[j - 1]
            },
            stepAfter: {
                startValue: this.xVal[j],
                step: this.xNumSteps[j],
                highestStep: this.xHighestCompleteStep[j]
            }
        };
    };

    Spectrum.prototype.countStepDecimals = function() {
        var stepDecimals = this.xNumSteps.map(countDecimals);
        return Math.max.apply(null, stepDecimals);
    };

    // Outside testing
    Spectrum.prototype.convert = function(value) {
        return this.getStep(this.toStepping(value));
    };

    //endregion

    //region Options

    /*	Every input option is tested and parsed. This'll prevent
        endless validation in internal methods. These tests are
        structured with an item for every option available. An
        option can be marked as required by setting the 'r' flag.
        The testing function is provided with three arguments:
            - The provided value for the option;
            - A reference to the options object;
            - The name for the option;

        The testing function returns false when an error is detected,
        or true when everything is OK. It can also modify the option
        object, to make sure all values can be correctly looped elsewhere. */

    var defaultFormatter = {
        to: function(value) {
            return value !== undefined && value.toFixed(2);
        },
        from: Number
    };

    function validateFormat(entry) {
        // Any object with a to and from method is supported.
        if (isValidFormatter(entry)) {
            return true;
        }

        throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
    }

    function testStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
        }

        // The step option can still be used to set stepping
        // for linear sliders. Overwritten if set in 'range'.
        parsed.singleStep = entry;
    }

    function testRange(parsed, entry) {
        // Filter incorrect input.
        if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
        }

        // Catch missing start or end.
        if (entry.min === undefined || entry.max === undefined) {
            throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
        }

        // Catch equal start or end.
        if (entry.min === entry.max) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
        }

        parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
    }

    function testStart(parsed, entry) {
        entry = asArray(entry);

        // Validate input. Values aren't tested, as the public .val method
        // will always provide a valid location.
        if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
        }

        // Store the number of handles.
        parsed.handles = entry.length;

        // When the slider is initialized, the .val method will
        // be called with the start options.
        parsed.start = entry;
    }

    function testSnap(parsed, entry) {
        // Enforce 100% stepping within subranges.
        parsed.snap = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
        }
    }

    function testAnimate(parsed, entry) {
        // Enforce 100% stepping within subranges.
        parsed.animate = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
        }
    }

    function testAnimationDuration(parsed, entry) {
        parsed.animationDuration = entry;

        if (typeof entry !== "number") {
            throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
        }
    }

    function testConnect(parsed, entry) {
        var connect = [false];
        var i;

        // Map legacy options
        if (entry === "lower") {
            entry = [true, false];
        } else if (entry === "upper") {
            entry = [false, true];
        }

        // Handle boolean options
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
                connect.push(entry);
            }

            connect.push(false);
        }

        // Reject invalid input
        else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
        } else {
            connect = entry;
        }

        parsed.connect = connect;
    }

    function testOrientation(parsed, entry) {
        // Set orientation to an a numerical value for easy
        // array selection.
        switch (entry) {
            case "horizontal":
                parsed.ort = 0;
                break;
            case "vertical":
                parsed.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
        }
    }

    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
        }

        // Issue #582
        if (entry === 0) {
            return;
        }

        parsed.margin = parsed.spectrum.getMargin(entry);

        if (!parsed.margin) {
            throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
        }
    }

    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
        }

        parsed.limit = parsed.spectrum.getMargin(entry);

        if (!parsed.limit || parsed.handles < 2) {
            throw new Error(
                "noUiSlider (" +
                    VERSION +
                    "): 'limit' option is only supported on linear sliders with 2 or more handles."
            );
        }
    }

    function testPadding(parsed, entry) {
        if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers."
            );
        }

        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers."
            );
        }

        if (entry === 0) {
            return;
        }

        if (!Array.isArray(entry)) {
            entry = [entry, entry];
        }

        // 'getMargin' returns false for invalid values.
        parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

        if (parsed.padding[0] === false || parsed.padding[1] === false) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
        }

        if (parsed.padding[0] < 0 || parsed.padding[1] < 0) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
        }

        if (parsed.padding[0] + parsed.padding[1] > 100) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
        }
    }

    function testDirection(parsed, entry) {
        // Set direction as a numerical value for easy parsing.
        // Invert connection for RTL sliders, so that the proper
        // handles get the connect/background classes.
        switch (entry) {
            case "ltr":
                parsed.dir = 0;
                break;
            case "rtl":
                parsed.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
        }
    }

    function testBehaviour(parsed, entry) {
        // Make sure the input is a string.
        if (typeof entry !== "string") {
            throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
        }

        // Check if the string contains any keywords.
        // None are required.
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;

        if (fixed) {
            if (parsed.handles !== 2) {
                throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
            }

            // Use margin to enforce fixed state
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }

        if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'unconstrained' behaviour cannot be used with margin or limit"
            );
        }

        parsed.events = {
            tap: tap || snap,
            drag: drag,
            fixed: fixed,
            snap: snap,
            hover: hover,
            unconstrained: unconstrained
        };
    }

    function testTooltips(parsed, entry) {
        if (entry === false) {
            return;
        }

        if (entry === true) {
            parsed.tooltips = [];

            for (var i = 0; i < parsed.handles; i++) {
                parsed.tooltips.push(true);
            }
        } else {
            parsed.tooltips = asArray(entry);

            if (parsed.tooltips.length !== parsed.handles) {
                throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
            }

            parsed.tooltips.forEach(function(formatter) {
                if (
                    typeof formatter !== "boolean" &&
                    (typeof formatter !== "object" || typeof formatter.to !== "function")
                ) {
                    throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
                }
            });
        }
    }

    function testAriaFormat(parsed, entry) {
        parsed.ariaFormat = entry;
        validateFormat(entry);
    }

    function testFormat(parsed, entry) {
        parsed.format = entry;
        validateFormat(entry);
    }

    function testKeyboardSupport(parsed, entry) {
        parsed.keyboardSupport = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'keyboardSupport' option must be a boolean.");
        }
    }

    function testDocumentElement(parsed, entry) {
        // This is an advanced option. Passed values are used without validation.
        parsed.documentElement = entry;
    }

    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
        }

        parsed.cssPrefix = entry;
    }

    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") {
            throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
        }

        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};

            for (var key in entry) {
                if (!entry.hasOwnProperty(key)) {
                    continue;
                }

                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            }
        } else {
            parsed.cssClasses = entry;
        }
    }

    // Test all developer settings and parse to assumption-safe values.
    function testOptions(options) {
        // To prove a fix for #537, freeze options here.
        // If the object is modified, an error will be thrown.
        // Object.freeze(options);

        var parsed = {
            margin: 0,
            limit: 0,
            padding: 0,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };

        // Tests are executed in the order they are presented here.
        var tests = {
            step: { r: false, t: testStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses }
        };

        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses: {
                target: "target",
                base: "base",
                origin: "origin",
                handle: "handle",
                handleLower: "handle-lower",
                handleUpper: "handle-upper",
                touchArea: "touch-area",
                horizontal: "horizontal",
                vertical: "vertical",
                background: "background",
                connect: "connect",
                connects: "connects",
                ltr: "ltr",
                rtl: "rtl",
                draggable: "draggable",
                drag: "state-drag",
                tap: "state-tap",
                active: "active",
                tooltip: "tooltip",
                pips: "pips",
                pipsHorizontal: "pips-horizontal",
                pipsVertical: "pips-vertical",
                marker: "marker",
                markerHorizontal: "marker-horizontal",
                markerVertical: "marker-vertical",
                markerNormal: "marker-normal",
                markerLarge: "marker-large",
                markerSub: "marker-sub",
                value: "value",
                valueHorizontal: "value-horizontal",
                valueVertical: "value-vertical",
                valueNormal: "value-normal",
                valueLarge: "value-large",
                valueSub: "value-sub"
            }
        };

        // AriaFormat defaults to regular format, if any.
        if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
        }

        // Run all options through a testing mechanism to ensure correct
        // input. It should be noted that options might get modified to
        // be handled properly. E.g. wrapping integers in arrays.
        Object.keys(tests).forEach(function(name) {
            // If the option isn't set, but it is required, throw an error.
            if (!isSet(options[name]) && defaults[name] === undefined) {
                if (tests[name].r) {
                    throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
                }

                return true;
            }

            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        });

        // Forward pips options
        parsed.pips = options.pips;

        // All recent browsers accept unprefixed transform.
        // We need -ms- for IE9 and -webkit- for older Android;
        // Assume use of -webkit- if unprefixed and -ms- are not supported.
        // https://caniuse.com/#feat=transforms2d
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== undefined;
        var noPrefix = d.style.transform !== undefined;

        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";

        // Pips don't move, so we can place them using left/top.
        var styles = [["left", "top"], ["right", "bottom"]];

        parsed.style = styles[parsed.dir][parsed.ort];

        return parsed;
    }

    //endregion

    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();

        // All variables local to 'scope' are prefixed with 'scope_'

        // Slider DOM Nodes
        var scope_Target = target;
        var scope_Base;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;

        // Slider state values
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};

        // Exposed API
        var scope_Self;

        // Document Nodes
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;

        // Pips constants
        var PIPS_NONE = -1;
        var PIPS_NO_VALUE = 0;
        var PIPS_LARGE_VALUE = 1;
        var PIPS_SMALL_VALUE = 2;

        // For horizontal sliders in standard ltr documents,
        // make .noUi-origin overflow to the left so the document doesn't scroll.
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;

        // Creates a node, adds it to target, returns the new node.
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");

            if (className) {
                addClass(div, className);
            }

            addTarget.appendChild(div);

            return div;
        }

        // Append a origin to the base
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);

            addNodeTo(handle, options.cssClasses.touchArea);

            handle.setAttribute("data-handle", handleNumber);

            if (options.keyboardSupport) {
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                // 0 = focusable and reachable
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", function(event) {
                    return eventKeydown(event, handleNumber);
                });
            }

            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");

            if (handleNumber === 0) {
                addClass(handle, options.cssClasses.handleLower);
            } else if (handleNumber === options.handles - 1) {
                addClass(handle, options.cssClasses.handleUpper);
            }

            return origin;
        }

        // Insert nodes for connect elements
        function addConnect(base, add) {
            if (!add) {
                return false;
            }

            return addNodeTo(base, options.cssClasses.connect);
        }

        // Add handles to the slider base.
        function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);

            scope_Handles = [];
            scope_Connects = [];

            scope_Connects.push(addConnect(connectBase, connectOptions[0]));

            // [::::O====O====O====]
            // connectOptions = [0, 1, 1, 1]

            for (var i = 0; i < options.handles; i++) {
                // Keep a list of all added handles.
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
        }

        // Initialize a single slider.
        function addSlider(addTarget) {
            // Apply classes and data to the target.
            addClass(addTarget, options.cssClasses.target);

            if (options.dir === 0) {
                addClass(addTarget, options.cssClasses.ltr);
            } else {
                addClass(addTarget, options.cssClasses.rtl);
            }

            if (options.ort === 0) {
                addClass(addTarget, options.cssClasses.horizontal);
            } else {
                addClass(addTarget, options.cssClasses.vertical);
            }

            return addNodeTo(addTarget, options.cssClasses.base);
        }

        function addTooltip(handle, handleNumber) {
            if (!options.tooltips[handleNumber]) {
                return false;
            }

            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }

        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }

        // Disable the slider dragging if any handle is disabled
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }

        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update.tooltips");
                scope_Tooltips.forEach(function(tooltip) {
                    if (tooltip) {
                        removeElement(tooltip);
                    }
                });
                scope_Tooltips = null;
            }
        }

        // The tooltips option is a shorthand for using the 'update' event.
        function tooltips() {
            removeTooltips();

            // Tooltips are added with options.tooltips in original order.
            scope_Tooltips = scope_Handles.map(addTooltip);

            bindEvent("update.tooltips", function(values, handleNumber, unencoded) {
                if (!scope_Tooltips[handleNumber]) {
                    return;
                }

                var formattedValue = values[handleNumber];

                if (options.tooltips[handleNumber] !== true) {
                    formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                }

                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
        }

        function aria() {
            bindEvent("update", function(values, handleNumber, unencoded, tap, positions) {
                // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                scope_HandleNumbers.forEach(function(index) {
                    var handle = scope_Handles[index];

                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

                    var now = positions[index];

                    // Formatted value for display
                    var text = options.ariaFormat.to(unencoded[index]);

                    // Map to slider range values
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);

                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                });
            });
        }

        function getGroup(mode, values, stepped) {
            // Use the range.
            if (mode === "range" || mode === "steps") {
                return scope_Spectrum.xVal;
            }

            if (mode === "count") {
                if (values < 2) {
                    throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
                }

                // Divide 0 - 100 in 'count' parts.
                var interval = values - 1;
                var spread = 100 / interval;

                values = [];

                // List these parts and have them handled as 'positions'.
                while (interval--) {
                    values[interval] = interval * spread;
                }

                values.push(100);

                mode = "positions";
            }

            if (mode === "positions") {
                // Map all percentages to on-range values.
                return values.map(function(value) {
                    return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                });
            }

            if (mode === "values") {
                // If the value must be stepped, it needs to be converted to a percentage first.
                if (stepped) {
                    return values.map(function(value) {
                        // Convert to percentage, apply step, return to value.
                        return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                    });
                }

                // Otherwise, we can simply use the values.
                return values;
            }
        }

        function generateSpread(density, mode, group) {
            function safeIncrement(value, increment) {
                // Avoid floating point variance by dropping the smallest decimal places.
                return (value + increment).toFixed(7) / 1;
            }

            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;

            // Create a copy of the group, sort it and filter away all duplicates.
            group = unique(
                group.slice().sort(function(a, b) {
                    return a - b;
                })
            );

            // Make sure the range starts with the first element.
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }

            // Likewise for the last one.
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }

            group.forEach(function(current, index) {
                // Get the current step and the lower + upper positions.
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = mode === "steps";

                // When using 'steps' mode, use the provided steps.
                // Otherwise, we'll step on to the next subrange.
                if (isSteps) {
                    step = scope_Spectrum.xNumSteps[index];
                }

                // Default to a 'full' step.
                if (!step) {
                    step = high - low;
                }

                // Low can be 0, so test for false. If high is undefined,
                // we are at the last subrange. Index 0 is already handled.
                if (low === false || high === undefined) {
                    return;
                }

                // Make sure step isn't 0, which would cause an infinite loop (#654)
                step = Math.max(step, 0.0000001);

                // Find all steps in the subrange.
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    // Get the percentage value for the current step,
                    // calculate the size for the subrange.
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;

                    steps = pctDifference / density;
                    realSteps = Math.round(steps);

                    // This ratio represents the amount of percentage-space a point indicates.
                    // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                    // Round the percentage offset to an even number, then divide by two
                    // to spread the offset on both sides of the range.
                    stepSize = pctDifference / realSteps;

                    // Divide all points evenly, adding the correct number to this subrange.
                    // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                    for (q = 1; q <= realSteps; q += 1) {
                        // The ratio between the rounded value and the actual size might be ~1% off.
                        // Correct the percentage offset by the number of points
                        // per subrange. density = 1 will result in 100 points on the
                        // full range, 2 for 50, 4 for 25, etc.
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                    }

                    // Determine the point type.
                    type = group.indexOf(i) > -1 ? PIPS_LARGE_VALUE : isSteps ? PIPS_SMALL_VALUE : PIPS_NO_VALUE;

                    // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                    if (!index && ignoreFirst) {
                        type = 0;
                    }

                    if (!(i === high && ignoreLast)) {
                        // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                        indexes[newPct.toFixed(5)] = [i, type];
                    }

                    // Update the percentage count.
                    prevPct = newPct;
                }
            });

            return indexes;
        }

        function addMarking(spread, filterFunc, formatter) {
            var element = scope_Document.createElement("div");

            var valueSizeClasses = [];
            valueSizeClasses[PIPS_NO_VALUE] = options.cssClasses.valueNormal;
            valueSizeClasses[PIPS_LARGE_VALUE] = options.cssClasses.valueLarge;
            valueSizeClasses[PIPS_SMALL_VALUE] = options.cssClasses.valueSub;

            var markerSizeClasses = [];
            markerSizeClasses[PIPS_NO_VALUE] = options.cssClasses.markerNormal;
            markerSizeClasses[PIPS_LARGE_VALUE] = options.cssClasses.markerLarge;
            markerSizeClasses[PIPS_SMALL_VALUE] = options.cssClasses.markerSub;

            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];

            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }

            function addSpread(offset, value, type) {
                // Apply the filter function, if it is set.
                type = filterFunc ? filterFunc(value, type) : type;

                if (type === PIPS_NONE) {
                    return;
                }

                // Add a marker for every point
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";

                // Values are only appended for points marked '1' or '2'.
                if (type > PIPS_NO_VALUE) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", value);
                    node.style[options.style] = offset + "%";
                    node.innerHTML = formatter.to(value);
                }
            }

            // Append all points.
            Object.keys(spread).forEach(function(offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            });

            return element;
        }

        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }

        function pips(grid) {
            // Fix #669
            removePips();

            var mode = grid.mode;
            var density = grid.density || 1;
            var filter = grid.filter || false;
            var values = grid.values || false;
            var stepped = grid.stepped || false;
            var group = getGroup(mode, values, stepped);
            var spread = generateSpread(density, mode, group);
            var format = grid.format || {
                to: Math.round
            };

            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));

            return scope_Pips;
        }

        // Shorthand for base dimensions.
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + ["Width", "Height"][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }

        // Handler for attaching events trough a proxy.
        function attachEvent(events, element, callback, data) {
            // This function can be used to 'filter' events to the slider.
            // element is a node, not a nodeList

            var method = function(e) {
                e = fixEvent(e, data.pageOffset, data.target || element);

                // fixEvent returns false if this event has a different target
                // when handling (multi-) touch events;
                if (!e) {
                    return false;
                }

                // doNotReject is passed by all end events to make sure released touches
                // are not rejected, leaving the slider "stuck" to the cursor;
                if (isSliderDisabled() && !data.doNotReject) {
                    return false;
                }

                // Stop if an active 'tap' transition is taking place.
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                    return false;
                }

                // Ignore right or middle clicks on start #454
                if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                    return false;
                }

                // Ignore right or middle clicks on start #454
                if (data.hover && e.buttons) {
                    return false;
                }

                // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                // touch-action: manipulation, but that allows panning, which breaks
                // sliders after zooming/on non-responsive pages.
                // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                if (!supportsPassive) {
                    e.preventDefault();
                }

                e.calcPoint = e.points[options.ort];

                // Call the event handler with the event [ and additional data ].
                callback(e, data);
            };

            var methods = [];

            // Bind a closure on the target for every event type.
            events.split(" ").forEach(function(eventName) {
                element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                methods.push([eventName, method]);
            });

            return methods;
        }

        // Provide a clean event with standardized offset values.
        function fixEvent(e, pageOffset, eventTarget) {
            // Filter the event to register the type, which can be
            // touch, mouse or pointer. Offset changes need to be
            // made on an event specific basis.
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;

            var x;
            var y;

            // IE10 implemented pointer events with a prefix;
            if (e.type.indexOf("MSPointer") === 0) {
                pointer = true;
            }

            // The only thing one handle should be concerned about is the touches that originated on top of it.
            if (touch) {
                // Returns true if a touch originated on the target.
                var isTouchOnTarget = function(checkTouch) {
                    return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
                };

                // In the case of touchstart events, we need to make sure there is still no more than one
                // touch on the target so we look amongst all touches.
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

                    // Do not support more than one touch per handle.
                    if (targetTouches.length > 1) {
                        return false;
                    }

                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                } else {
                    // In the other cases, find on changedTouches is enough.
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

                    // Cancel if the target touch has not moved.
                    if (!targetTouch) {
                        return false;
                    }

                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }

            pageOffset = pageOffset || getPageOffset(scope_Document);

            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }

            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer; // Fix #435

            return e;
        }

        // Translate a coordinate in the document to a percentage on the slider
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = (location * 100) / baseSize();

            // Clamp proposal between 0% and 100%
            // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
            // are used (e.g. contained handles feature)
            proposal = limit(proposal);

            return options.dir ? 100 - proposal : proposal;
        }

        // Find handle closest to a certain percentage on the slider
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;

            scope_Handles.forEach(function(handle, index) {
                // Disabled handles are ignored
                if (isHandleDisabled(index)) {
                    return;
                }

                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);

                // Initial state
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;

                // Difference with this handle is smaller than the previously checked handle
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;

                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            });

            return handleNumber;
        }

        // Fire 'end' when a mouse or pen leaves the document.
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
                eventEnd(event, data);
            }
        }

        // Handle movement on document for handle and range drag.
        function eventMove(event, data) {
            // Fix #498
            // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
            // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
            // IE9 has .buttons and .which zero on mousemove.
            // Firefox breaks the spec MDN defines.
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                return eventEnd(event, data);
            }

            // Check if we are moving up or down
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

            // Convert the movement into a percentage of the slider width/height
            var proposal = (movement * 100) / data.baseSize;

            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
        }

        // Unbind move events on document, call callbacks.
        function eventEnd(event, data) {
            // The handle is no longer active, so remove the class.
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }

            // Unbind the move and end events, which are added on 'start'.
            data.listeners.forEach(function(c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            });

            if (scope_ActiveHandlesCount === 0) {
                // Remove dragging class.
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();

                // Remove cursor styles and text-selection events bound to the body.
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }

            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            });
        }

        // Bind move events on document.
        function eventStart(event, data) {
            // Ignore event if any handle is disabled
            if (data.handleNumbers.some(isHandleDisabled)) {
                return false;
            }

            var handle;

            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];

                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;

                // Mark the handle as 'active' so it can be styled.
                addClass(handle, options.cssClasses.active);
            }

            // A drag should never propagate up to the 'tap' event.
            event.stopPropagation();

            // Record the event listeners.
            var listeners = [];

            // Attach the move and end events.
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                // The event target has changed so we need to propagate the original one so that we keep
                // relying on it to extract target touches.
                target: event.target,
                handle: handle,
                listeners: listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });

            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });

            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });

            // We want to make sure we pushed the listeners in the listener list rather than creating
            // a new one as it has already been passed to the event handlers.
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

            // Text selection isn't an issue on touch devices,
            // so adding cursor styles can be skipped.
            if (event.cursor) {
                // Prevent the 'I' cursor and extend the range-drag cursor.
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;

                // Mark the target with a dragging state.
                if (scope_Handles.length > 1) {
                    addClass(scope_Target, options.cssClasses.drag);
                }

                // Prevent text selection when dragging the handles.
                // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                // The 'cursor' flag is false.
                // See: http://caniuse.com/#search=selectstart
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }

            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("start", handleNumber);
            });
        }

        // Move closest handle to tapped location.
        function eventTap(event) {
            // The tap event shouldn't propagate up
            event.stopPropagation();

            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);

            // Tackle the case that all handles are 'disabled'.
            if (handleNumber === false) {
                return false;
            }

            // Flag the slider as it is now in a transitional state.
            // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
            if (!options.events.snap) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }

            setHandle(handleNumber, proposal, true, true);

            setZindex();

            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            fireEvent("change", handleNumber, true);
            fireEvent("set", handleNumber, true);

            if (options.events.snap) {
                eventStart(event, { handleNumbers: [handleNumber] });
            }
        }

        // Fires a 'hover' event for a hovered mouse/pen position.
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);

            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);

            Object.keys(scope_Events).forEach(function(targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) {
                    scope_Events[targetEvent].forEach(function(callback) {
                        callback.call(scope_Self, value);
                    });
                }
            });
        }

        // Handles keydown on focused handles
        // Don't move the document when pressing arrow keys on focused handles
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
                return false;
            }

            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];

            if (options.dir && !options.ort) {
                // On an right-to-left slider, the left and right keys act inverted
                horizontalKeys.reverse();
            } else if (options.ort && !options.dir) {
                // On a top-to-bottom slider, the up and down keys act inverted
                verticalKeys.reverse();
            }

            // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            var key = event.key.replace("Arrow", "");
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0];
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1];

            if (!isDown && !isUp) {
                return true;
            }

            event.preventDefault();

            var direction = isDown ? 0 : 1;
            var steps = getNextStepsForHandle(handleNumber);
            var step = steps[direction];

            // At the edge of a slider, do nothing
            if (step === null) {
                return false;
            }

            // No step set, use the default of 10% of the sub-range
            if (step === false) {
                step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, 10);
            }

            // Step over zero-length ranges (#948);
            step = Math.max(step, 0.0000001);

            // Decrement for down steps
            step = (isDown ? -1 : 1) * step;

            setHandle(handleNumber, scope_Spectrum.toStepping(scope_Values[handleNumber] + step), true, true);

            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);

            return false;
        }

        // Attach events to several slider parts.
        function bindSliderEvents(behaviour) {
            // Attach the standard drag event to the handles.
            if (!behaviour.fixed) {
                scope_Handles.forEach(function(handle, index) {
                    // These events are only bound to the visual handle
                    // element, not the 'real' origin element.
                    attachEvent(actions.start, handle.children[0], eventStart, {
                        handleNumbers: [index]
                    });
                });
            }

            // Attach the tap event to the slider base.
            if (behaviour.tap) {
                attachEvent(actions.start, scope_Base, eventTap, {});
            }

            // Fire hover events
            if (behaviour.hover) {
                attachEvent(actions.move, scope_Base, eventHover, {
                    hover: true
                });
            }

            // Make the range draggable.
            if (behaviour.drag) {
                scope_Connects.forEach(function(connect, index) {
                    if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                        return;
                    }

                    var handleBefore = scope_Handles[index - 1];
                    var handleAfter = scope_Handles[index];
                    var eventHolders = [connect];

                    addClass(connect, options.cssClasses.draggable);

                    // When the range is fixed, the entire range can
                    // be dragged by the handles. The handle in the first
                    // origin will propagate the start event upward,
                    // but it needs to be bound manually on the other.
                    if (behaviour.fixed) {
                        eventHolders.push(handleBefore.children[0]);
                        eventHolders.push(handleAfter.children[0]);
                    }

                    eventHolders.forEach(function(eventHolder) {
                        attachEvent(actions.start, eventHolder, eventStart, {
                            handles: [handleBefore, handleAfter],
                            handleNumbers: [index - 1, index]
                        });
                    });
                });
            }
        }

        // Attach an event to this slider, possibly including a namespace
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);

            // If the event bound is 'update,' fire it immediately for all handles.
            if (namespacedEvent.split(".")[0] === "update") {
                scope_Handles.forEach(function(a, index) {
                    fireEvent("update", index);
                });
            }
        }

        // Undo attachment of event
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event && namespacedEvent.substring(event.length);

            Object.keys(scope_Events).forEach(function(bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);

                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                    delete scope_Events[bind];
                }
            });
        }

        // External event handling
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function(targetEvent) {
                var eventType = targetEvent.split(".")[0];

                if (eventName === eventType) {
                    scope_Events[targetEvent].forEach(function(callback) {
                        callback.call(
                            // Use the slider public API as the scope ('this')
                            scope_Self,
                            // Return values as array, so arg_1[arg_2] is always valid.
                            scope_Values.map(options.format.to),
                            // Handle index, 0 or 1
                            handleNumber,
                            // Un-formatted slider values
                            scope_Values.slice(),
                            // Event is fired by tap, true or false
                            tap || false,
                            // Left offset of the handle, in relation to the slider
                            scope_Locations.slice()
                        );
                    });
                }
            });
        }

        // Split out the handle positioning logic so the Move event can use it, too
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
            // For sliders with multiple handles, limit movement to the other handle.
            // Apply the margin option by adding it to the handle positions.
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    to = Math.max(to, reference[handleNumber - 1] + options.margin);
                }

                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    to = Math.min(to, reference[handleNumber + 1] - options.margin);
                }
            }

            // The limit option has the opposite effect, limiting handles to a
            // maximum distance from another. Limit must be > 0, as otherwise
            // handles would be unmovable.
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    to = Math.min(to, reference[handleNumber - 1] + options.limit);
                }

                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    to = Math.max(to, reference[handleNumber + 1] - options.limit);
                }
            }

            // The padding option keeps the handles a certain distance from the
            // edges of the slider. Padding must be > 0.
            if (options.padding) {
                if (handleNumber === 0) {
                    to = Math.max(to, options.padding[0]);
                }

                if (handleNumber === scope_Handles.length - 1) {
                    to = Math.min(to, 100 - options.padding[1]);
                }
            }

            to = scope_Spectrum.getStep(to);

            // Limit percentage to the 0 - 100 range
            to = limit(to);

            // Return false if handle can't move
            if (to === reference[handleNumber] && !getValue) {
                return false;
            }

            return to;
        }

        // Uses slider orientation to create CSS rules. a = base value;
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }

        // Moves handle(s) by a percentage
        // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
        function moveHandles(upward, proposal, locations, handleNumbers) {
            var proposals = locations.slice();

            var b = [!upward, upward];
            var f = [upward, !upward];

            // Copy handleNumbers so we don't change the dataset
            handleNumbers = handleNumbers.slice();

            // Check to see which handle is 'leading'.
            // If that one can't move the second can't either.
            if (upward) {
                handleNumbers.reverse();
            }

            // Step 1: get the maximum percentage that any of the handles can move
            if (handleNumbers.length > 1) {
                handleNumbers.forEach(function(handleNumber, o) {
                    var to = checkHandlePosition(
                        proposals,
                        handleNumber,
                        proposals[handleNumber] + proposal,
                        b[o],
                        f[o],
                        false
                    );

                    // Stop if one of the handles can't move.
                    if (to === false) {
                        proposal = 0;
                    } else {
                        proposal = to - proposals[handleNumber];
                        proposals[handleNumber] = to;
                    }
                });
            }

            // If using one handle, check backward AND forward
            else {
                b = f = [true];
            }

            var state = false;

            // Step 2: Try to set the handles with the found percentage
            handleNumbers.forEach(function(handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
            });

            // Step 3: If a handle moved, fire events
            if (state) {
                handleNumbers.forEach(function(handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                });
            }
        }

        // Takes a base value and an offset. This offset is used for the connect bar size.
        // In the initial design for this feature, the origin element was 1% wide.
        // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
        // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }

        // Updates scope_Locations and scope_Values, updates visual state
        function updateHandlePosition(handleNumber, to) {
            // Update locations.
            scope_Locations[handleNumber] = to;

            // Convert the value to the slider stepping/range.
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

            var translation = 10 * (transformDirection(to, 0) - scope_DirOffset);
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";

            scope_Handles[handleNumber].style[options.transformRule] = translateRule;

            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
        }

        // Handles before the slider middle are stacked later = higher,
        // Handles after the middle later is lower
        // [[7] [8] .......... | .......... [5] [4]
        function setZindex() {
            scope_HandleNumbers.forEach(function(handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = zIndex;
            });
        }

        // Test suggested values and apply margin, step.
        function setHandle(handleNumber, to, lookBackward, lookForward) {
            to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

            if (to === false) {
                return false;
            }

            updateHandlePosition(handleNumber, to);

            return true;
        }

        // Updates style attribute for connect nodes
        function updateConnect(index) {
            // Skip connects set to false
            if (!scope_Connects[index]) {
                return;
            }

            var l = 0;
            var h = 100;

            if (index !== 0) {
                l = scope_Locations[index - 1];
            }

            if (index !== scope_Connects.length - 1) {
                h = scope_Locations[index];
            }

            // We use two rules:
            // 'translate' to change the left/top offset;
            // 'scale' to change the width of the element;
            // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";

            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
        }

        // Parses value passed to .set method. Returns current value if not parse-able.
        function resolveToValue(to, handleNumber) {
            // Setting with null indicates an 'ignore'.
            // Inputting 'false' is invalid.
            if (to === null || to === false || to === undefined) {
                return scope_Locations[handleNumber];
            }

            // If a formatted number was passed, attempt to decode it.
            if (typeof to === "number") {
                to = String(to);
            }

            to = options.format.from(to);
            to = scope_Spectrum.toStepping(to);

            // If parsing the number failed, use the current value.
            if (to === false || isNaN(to)) {
                return scope_Locations[handleNumber];
            }

            return to;
        }

        // Set the slider value.
        function valueSet(input, fireSetEvent) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === undefined;

            // Event fires by default
            fireSetEvent = fireSetEvent === undefined ? true : !!fireSetEvent;

            // Animation is optional.
            // Make sure the initial values were set before using animated placement.
            if (options.animate && !isInit) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }

            // First pass, without lookAhead but with lookBackward. Values are set from left to right.
            scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
            });

            // Second pass. Now that all base values are set, apply constraints
            scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true);
            });

            setZindex();

            scope_HandleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);

                // Fire the event only for handles that received a new value, as per #579
                if (values[handleNumber] !== null && fireSetEvent) {
                    fireEvent("set", handleNumber);
                }
            });
        }

        // Reset slider to initial values
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }

        // Set value for a single handle
        function valueSetHandle(handleNumber, value, fireSetEvent) {
            // Ensure numeric input
            handleNumber = Number(handleNumber);

            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
                throw new Error("noUiSlider (" + VERSION + "): invalid handle number, got: " + handleNumber);
            }

            // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true);

            fireEvent("update", handleNumber);

            if (fireSetEvent) {
                fireEvent("set", handleNumber);
            }
        }

        // Get the slider value.
        function valueGet() {
            var values = scope_Values.map(options.format.to);

            // If only one handle is used, return a single value.
            if (values.length === 1) {
                return values[0];
            }

            return values;
        }

        // Removes classes from the root and empties it.
        function destroy() {
            for (var key in options.cssClasses) {
                if (!options.cssClasses.hasOwnProperty(key)) {
                    continue;
                }
                removeClass(scope_Target, options.cssClasses[key]);
            }

            while (scope_Target.firstChild) {
                scope_Target.removeChild(scope_Target.firstChild);
            }

            delete scope_Target.noUiSlider;
        }

        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;

            // If snapped, directly use defined step value
            if (options.snap) {
                return [
                    value - nearbySteps.stepBefore.startValue || null,
                    nearbySteps.stepAfter.startValue - value || null
                ];
            }

            // If the next value in this step moves into the next step,
            // the increment is the start of the next step - the current value
            if (increment !== false) {
                if (value + increment > nearbySteps.stepAfter.startValue) {
                    increment = nearbySteps.stepAfter.startValue - value;
                }
            }

            // If the value is beyond the starting point
            if (value > nearbySteps.thisStep.startValue) {
                decrement = nearbySteps.thisStep.step;
            } else if (nearbySteps.stepBefore.step === false) {
                decrement = false;
            }

            // If a handle is at the start of a step, it always steps back into the previous step first
            else {
                decrement = value - nearbySteps.stepBefore.highestStep;
            }

            // Now, if at the slider edges, there is no in/decrement
            if (location === 100) {
                increment = null;
            } else if (location === 0) {
                decrement = null;
            }

            // As per #391, the comparison for the decrement step can have some rounding issues.
            var stepDecimals = scope_Spectrum.countStepDecimals();

            // Round per #391
            if (increment !== null && increment !== false) {
                increment = Number(increment.toFixed(stepDecimals));
            }

            if (decrement !== null && decrement !== false) {
                decrement = Number(decrement.toFixed(stepDecimals));
            }

            return [decrement, increment];
        }

        // Get the current step size for the slider.
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }

        // Updateable: margin, limit, padding, step, range, animate, snap
        function updateOptions(optionsToUpdate, fireSetEvent) {
            // Spectrum is created using the range, snap, direction and step options.
            // 'snap' and 'step' can be updated.
            // If 'snap' and 'step' are not passed, they should remain unchanged.
            var v = valueGet();

            var updateAble = [
                "margin",
                "limit",
                "padding",
                "range",
                "animate",
                "snap",
                "step",
                "format",
                "pips",
                "tooltips"
            ];

            // Only change options that we're actually passed to update.
            updateAble.forEach(function(name) {
                // Check for undefined. null removes the value.
                if (optionsToUpdate[name] !== undefined) {
                    originalOptions[name] = optionsToUpdate[name];
                }
            });

            var newOptions = testOptions(originalOptions);

            // Load new options into the slider state
            updateAble.forEach(function(name) {
                if (optionsToUpdate[name] !== undefined) {
                    options[name] = newOptions[name];
                }
            });

            scope_Spectrum = newOptions.spectrum;

            // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;

            // Update pips, removes existing.
            if (options.pips) {
                pips(options.pips);
            } else {
                removePips();
            }

            // Update tooltips, removes existing.
            if (options.tooltips) {
                tooltips();
            } else {
                removeTooltips();
            }

            // Invalidate the current positioning so valueSet forces an update.
            scope_Locations = [];
            valueSet(optionsToUpdate.start || v, fireSetEvent);
        }

        // Initialization steps
        function setupSlider() {
            // Create the base element, initialize HTML and set classes.
            // Add handles and connect elements.
            scope_Base = addSlider(scope_Target);

            addElements(options.connect, scope_Base);

            // Attach user events.
            bindSliderEvents(options.events);

            // Use the public value method to set the start values.
            valueSet(options.start);

            if (options.pips) {
                pips(options.pips);
            }

            if (options.tooltips) {
                tooltips();
            }

            aria();
        }

        setupSlider();

        // noinspection JSUnusedGlobalSymbols
        scope_Self = {
            destroy: destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            // Exposed for unit testing, don't use this in your application.
            __moveHandles: function(a, b, c) {
                moveHandles(a, b, scope_Locations, c);
            },
            options: originalOptions, // Issue #600, #678
            updateOptions: updateOptions,
            target: scope_Target, // Issue #597
            removePips: removePips,
            removeTooltips: removeTooltips,
            pips: pips // Issue #594
        };

        return scope_Self;
    }

    // Run the standard initializer
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) {
            throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
        }

        // Throw an error if the slider was already initialized.
        if (target.noUiSlider) {
            throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
        }

        // Test the options and create the slider environment;
        var options = testOptions(originalOptions, target);
        var api = scope(target, options, originalOptions);

        target.noUiSlider = api;

        return api;
    }

    // Use an object instead of a function for future expandability;
    return {
        // Exposed for unit testing, don't use this in your application.
        __spectrum: Spectrum,
        version: VERSION,
        create: initialize
    };
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(3);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// Module
exports.push([module.i, "/*! nouislider - 14.0.2 - 6/28/2019 */\n.noUi-target, .noUi-target * {\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -ms-touch-action: none;\n  touch-action: none;\n  -ms-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.noUi-target {\n  position: relative;\n  direction: ltr; }\n\n.noUi-base, .noUi-connects {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  z-index: 1; }\n\n.noUi-connects {\n  overflow: hidden;\n  z-index: 0; }\n\n.noUi-connect, .noUi-origin {\n  will-change: transform;\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  -ms-transform-origin: 0 0;\n  -webkit-transform-origin: 0 0;\n  -webkit-transform-style: preserve-3d;\n  transform-origin: 0 0;\n  transform-style: flat; }\n\n.noUi-connect {\n  height: 100%;\n  width: 100%; }\n\n.noUi-origin {\n  height: 10%;\n  width: 10%; }\n\nhtml:not([dir=rtl]) .noUi-horizontal .noUi-origin {\n  left: auto;\n  right: 0; }\n\n.noUi-vertical .noUi-origin {\n  width: 0; }\n\n.noUi-horizontal .noUi-origin {\n  height: 0; }\n\n.noUi-handle {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  position: absolute; }\n\n.noUi-touch-area {\n  height: 100%;\n  width: 100%; }\n\n.noUi-state-tap .noUi-connect, .noUi-state-tap .noUi-origin {\n  -webkit-transition: transform .3s;\n  transition: transform .3s; }\n\n.noUi-state-drag * {\n  cursor: inherit !important; }\n\n.noUi-horizontal {\n  height: 18px; }\n\n.noUi-horizontal .noUi-handle {\n  width: 34px;\n  height: 28px;\n  left: -17px;\n  top: -6px; }\n\n.noUi-vertical {\n  width: 18px; }\n\n.noUi-vertical .noUi-handle {\n  width: 28px;\n  height: 34px;\n  left: -6px;\n  top: -17px; }\n\nhtml:not([dir=rtl]) .noUi-horizontal .noUi-handle {\n  right: -17px;\n  left: auto; }\n\n.noUi-target {\n  background: #FAFAFA;\n  border-radius: 4px;\n  border: 1px solid #D3D3D3;\n  box-shadow: inset 0 1px 1px #F0F0F0,0 3px 6px -5px #BBB; }\n\n.noUi-connects {\n  border-radius: 3px; }\n\n.noUi-connect {\n  background: #3FB8AF; }\n\n.noUi-draggable {\n  cursor: ew-resize; }\n\n.noUi-vertical .noUi-draggable {\n  cursor: ns-resize; }\n\n.noUi-handle {\n  border: 1px solid #D9D9D9;\n  border-radius: 3px;\n  background: #FFF;\n  cursor: default;\n  box-shadow: inset 0 0 1px #FFF,inset 0 1px 7px #EBEBEB,0 3px 6px -3px #BBB; }\n\n.noUi-active {\n  box-shadow: inset 0 0 1px #FFF,inset 0 1px 7px #DDD,0 3px 6px -3px #BBB; }\n\n.noUi-handle:after, .noUi-handle:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  height: 14px;\n  width: 1px;\n  background: #E8E7E6;\n  left: 14px;\n  top: 6px; }\n\n.noUi-handle:after {\n  left: 17px; }\n\n.noUi-vertical .noUi-handle:after, .noUi-vertical .noUi-handle:before {\n  width: 14px;\n  height: 1px;\n  left: 6px;\n  top: 14px; }\n\n.noUi-vertical .noUi-handle:after {\n  top: 17px; }\n\n[disabled] .noUi-connect {\n  background: #B8B8B8; }\n\n[disabled] .noUi-handle, [disabled].noUi-handle, [disabled].noUi-target {\n  cursor: not-allowed; }\n\n.noUi-pips, .noUi-pips * {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.noUi-pips {\n  position: absolute;\n  color: #999; }\n\n.noUi-value {\n  position: absolute;\n  white-space: nowrap;\n  text-align: center; }\n\n.noUi-value-sub {\n  color: #ccc;\n  font-size: 10px; }\n\n.noUi-marker {\n  position: absolute;\n  background: #CCC; }\n\n.noUi-marker-sub {\n  background: #AAA; }\n\n.noUi-marker-large {\n  background: #AAA; }\n\n.noUi-pips-horizontal {\n  padding: 10px 0;\n  height: 80px;\n  top: 100%;\n  left: 0;\n  width: 100%; }\n\n.noUi-value-horizontal {\n  -webkit-transform: translate(-50%, 50%);\n  transform: translate(-50%, 50%); }\n\n.noUi-rtl .noUi-value-horizontal {\n  -webkit-transform: translate(50%, 50%);\n  transform: translate(50%, 50%); }\n\n.noUi-marker-horizontal.noUi-marker {\n  margin-left: -1px;\n  width: 2px;\n  height: 5px; }\n\n.noUi-marker-horizontal.noUi-marker-sub {\n  height: 10px; }\n\n.noUi-marker-horizontal.noUi-marker-large {\n  height: 15px; }\n\n.noUi-pips-vertical {\n  padding: 0 10px;\n  height: 100%;\n  top: 0;\n  left: 100%; }\n\n.noUi-value-vertical {\n  -webkit-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n  padding-left: 25px; }\n\n.noUi-rtl .noUi-value-vertical {\n  -webkit-transform: translate(0, 50%);\n  transform: translate(0, 50%); }\n\n.noUi-marker-vertical.noUi-marker {\n  width: 5px;\n  height: 2px;\n  margin-top: -1px; }\n\n.noUi-marker-vertical.noUi-marker-sub {\n  width: 10px; }\n\n.noUi-marker-vertical.noUi-marker-large {\n  width: 15px; }\n\n.noUi-tooltip {\n  display: block;\n  position: absolute;\n  border: 1px solid #D9D9D9;\n  border-radius: 3px;\n  background: #fff;\n  color: #000;\n  padding: 5px;\n  text-align: center;\n  white-space: nowrap; }\n\n.noUi-horizontal .noUi-tooltip {\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n  left: 50%;\n  bottom: 120%; }\n\n.noUi-vertical .noUi-tooltip {\n  -webkit-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n  top: 50%;\n  right: 120%; }\n", ""]);



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(8);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// Imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);", ""]);
var urlEscape = __webpack_require__(9);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(10));

// Module
exports.push([module.i, "html {\n  font-size: 12px;\n  height: 100%; }\n\nbody {\n  background: #fff;\n  margin: 0;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-tap-highlight-color: transparent;\n  overflow-x: hidden;\n  height: 100%; }\n\n/* width */\n::-webkit-scrollbar {\n  width: 5px; }\n\n/* Track */\n::-webkit-scrollbar-track {\n  background: #f1f1f1; }\n\n/* Handle */\n::-webkit-scrollbar-thumb {\n  background: #888; }\n\n/* Handle on hover */\n::-webkit-scrollbar-thumb:hover {\n  background: #555; }\n\n.container {\n  max-width: 1600px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  padding: 0 0%;\n  box-sizing: border-box;\n  padding-bottom: 15px;\n  min-height: 100%; }\n\nheader {\n  padding: 2% 0; }\n  header .logo {\n    background: url(" + ___CSS_LOADER_URL___0___ + ");\n    padding-bottom: 48px;\n    display: inline-block;\n    background-size: contain;\n    width: 220px; }\n\n/*Svg Block*/\n#my_dataviz {\n  font-size: 14px;\n  position: relative;\n  width: 100%; }\n  #my_dataviz:after {\n    content: '';\n    position: absolute;\n    height: 100%;\n    width: 8%;\n    top: 0;\n    background: #fff;\n    right: 0; }\n  #my_dataviz:before {\n    content: '';\n    position: absolute;\n    height: 100%;\n    width: 2%;\n    left: 0;\n    bottom: 0;\n    background: #fff;\n    top: 0; }\n  #my_dataviz g.tick line {\n    stroke: #000;\n    stroke-width: 2px; }\n  #my_dataviz .axis--text {\n    font-size: 0.8em;\n    color: #B8B8B8;\n    font-weight: bold; }\n    #my_dataviz .axis--text.tx {\n      transform: translate(0em, 1.5em); }\n    #my_dataviz .axis--text.ty {\n      transform: rotate(-90deg) translate(-9em, -7.8em); }\n  #my_dataviz .axis-line path {\n    stroke: #000; }\n  #my_dataviz circle {\n    cursor: pointer; }\n    #my_dataviz circle + text {\n      text-transform: capitalize;\n      pointer-events: none; }\n    #my_dataviz circle.monetarystructures + text {\n      font-size: 1em; }\n  #my_dataviz .scaleColor {\n    position: absolute;\n    width: 100%;\n    bottom: 0;\n    display: flex;\n    padding-left: 5%;\n    box-sizing: border-box;\n    justify-content: space-around; }\n    #my_dataviz .scaleColor p {\n      margin: 0;\n      color: #7c7c7c;\n      font-size: 1em;\n      font-weight: bold; }\n      #my_dataviz .scaleColor p:before {\n        content: '';\n        display: inline-block;\n        width: 2em;\n        height: 1em;\n        margin-right: 0.5rem; }\n      #my_dataviz .scaleColor p:nth-of-type(1)::before {\n        background: #ffcc00; }\n      #my_dataviz .scaleColor p:nth-of-type(2)::before {\n        background: #FF9900; }\n      #my_dataviz .scaleColor p:nth-of-type(3)::before {\n        background: #2261ec; }\n\n/*Filter Block*/\n.filter--block {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  position: absolute;\n  right: 10%;\n  bottom: 8.1%;\n  font-size: 14px;\n  top: 4%;\n  padding: 1% 0 20px;\n  background: transparent;\n  padding-left: 10px;\n  text-align: center;\n  overflow: hidden;\n  pointer-events: none;\n  z-index: 10; }\n  .filter--block.active {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    pointer-events: visible;\n    background: rgba(255, 255, 255, 0.8);\n    background: -webkit-linear-gradient(left, #ffffff69 0%, rgba(255, 255, 255, 0.89) 4%, #ffffff 28%, rgba(242, 242, 242, 0.7) 100%);\n    background: linear-gradient(to right, #ffffff69 0%, rgba(255, 255, 255, 0.89) 4%, #ffffff 28%, rgba(242, 242, 242, 0.7) 100%); }\n    .filter--block.active ul {\n      -webkit-animation: fadeInUp 0.45s  both;\n      animation: fadeInUp 0.45s  both; }\n    .filter--block.active .arrow--block {\n      opacity: 0;\n      -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n      bottom: 0;\n      -webkit-animation: arrowMoveDown 0.3s linear forwards;\n      animation: arrowMoveDown 0.3s linear forwards; }\n  .filter--block h3 {\n    margin: 0;\n    color: #7c7c7c;\n    cursor: pointer; }\n  .filter--block ul {\n    height: 92%;\n    overflow-y: scroll;\n    list-style-position: inside;\n    margin: 0;\n    padding: 0;\n    padding-right: 10px;\n    -webkit-transform: translateY(100px);\n    transform: translateY(100px);\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -webkit-animation: fadeOutDown 0.3s linear forwards;\n    animation: fadeOutDown 0.3s linear forwards; }\n    .filter--block ul li {\n      list-style: none;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: 0.5em 0; }\n      .filter--block ul li p {\n        font-size: 1em;\n        text-transform: capitalize;\n        color: #7c7c7c;\n        margin: 0; }\n    .filter--block ul h3:hover {\n      color: #2196F3; }\n      .filter--block ul h3:hover + .arrow--block .arrow {\n        -webkit-animation: bouncearrow 1s infinite linear;\n        animation: bouncearrow 1s infinite linear; }\n        .filter--block ul h3:hover + .arrow--block .arrow:after, .filter--block ul h3:hover + .arrow--block .arrow:before {\n          background: #2196F3; }\n  .filter--block .arrow--block {\n    position: absolute;\n    display: inline-block;\n    width: 100%;\n    left: 0;\n    z-index: 10;\n    cursor: pointer;\n    pointer-events: visible; }\n    .filter--block .arrow--block:hover .arrow {\n      -webkit-animation: bouncearrow 1s infinite linear;\n      animation: bouncearrow 1s infinite linear; }\n      .filter--block .arrow--block:hover .arrow:after, .filter--block .arrow--block:hover .arrow:before {\n        background: #2196F3; }\n    .filter--block .arrow--block .arrow {\n      width: 3em;\n      height: 0.1em;\n      box-sizing: border-box;\n      position: relative;\n      display: inline-block; }\n      .filter--block .arrow--block .arrow:before {\n        content: '';\n        width: 50%;\n        height: 100%;\n        position: absolute;\n        -webkit-transition: .2s ease;\n        transition: .2s ease;\n        display: block;\n        left: 0;\n        -webkit-transform: rotate(28deg);\n        transform: rotate(28deg);\n        background: #7c7c7c;\n        -webkit-transform-origin: right bottom;\n        transform-origin: right bottom; }\n      .filter--block .arrow--block .arrow:after {\n        content: '';\n        width: 50%;\n        height: 100%;\n        position: absolute;\n        -webkit-transition: .2s ease;\n        transition: .2s ease;\n        display: block;\n        right: 0;\n        background: #7c7c7c;\n        -webkit-transform: rotate(-28deg);\n        transform: rotate(-28deg);\n        -webkit-transform-origin: left bottom;\n        transform-origin: left bottom; }\n\n.show--Xvalue {\n  text-align: center;\n  position: absolute;\n  bottom: -9%;\n  width: 100%;\n  font-size: 1em;\n  font-weight: bold; }\n\n.show--Yvalue {\n  position: absolute;\n  z-index: 1;\n  transform: rotate(-90deg) translateY(-200%) scaleX(1);\n  top: 50%;\n  font-size: 1em;\n  font-weight: bold;\n  margin: 0; }\n\n/*ToolTip*/\n.tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.75);\n  padding: 0.8em;\n  z-index: 13;\n  display: none; }\n  .tooltip p {\n    margin: 0;\n    font-size: 0.9em;\n    text-transform: capitalize;\n    color: #fff; }\n  .tooltip:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: -1em;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 0 1em 1em 0;\n    border-color: transparent rgba(0, 0, 0, 0.75) transparent transparent; }\n  .tooltip.active {\n    display: block; }\n\n/*Switch button*/\n.switch {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  position: relative;\n  display: inline-block;\n  width: 2.8em;\n  height: 1.4em; }\n  .switch input {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    width: 0;\n    height: 0; }\n    .switch input:checked + .slider {\n      background-color: #2196F3; }\n      .switch input:checked + .slider:before {\n        -webkit-transition: .4s;\n        transition: .4s;\n        -webkit-transform: translateX(1.6em);\n        transform: translateX(1.6em); }\n    .switch input:focus + .slider {\n      box-shadow: 0 0 1px #2196F3; }\n  .switch .slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #5ec2e6;\n    -webkit-transition: .4s;\n    transition: .4s; }\n    .switch .slider:before {\n      position: absolute;\n      content: \"\";\n      height: 1em;\n      width: 1em;\n      left: 0.1em;\n      top: 0.2em;\n      background-color: white;\n      -webkit-transition: .4s;\n      transition: .4s; }\n    .switch .slider.round {\n      border-radius: 1em; }\n      .switch .slider.round:before {\n        border-radius: 50%; }\n\n#piechart, #subCategory {\n  opacity: 0;\n  transform: translateX(-100%);\n  position: absolute;\n  width: 35%;\n  top: -1%;\n  left: 0%;\n  padding-left: 1%;\n  height: 100%;\n  min-width: 250px;\n  z-index: 12;\n  box-sizing: border-box;\n  padding-top: 2%;\n  border: 1px solid #d5d5d5;\n  transition: 0.3s ease-in-out; }\n  #piechart:after, #subCategory:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(253, 253, 253, 0.97);\n    filter: blur(2px);\n    -webkit-filter: blur(2px);\n    z-index: -1;\n    border: 1px solid #fcfcfc;\n    z-index: -1; }\n  #piechart .wrapper, #subCategory .wrapper {\n    display: flex;\n    flex-direction: column-reverse;\n    align-items: flex-start;\n    height: 93%; }\n  #piechart svg, #subCategory svg {\n    width: 58%;\n    margin: auto;\n    display: block;\n    min-height: 41%; }\n    #piechart svg path, #subCategory svg path {\n      cursor: pointer; }\n  #piechart .heading h4, #subCategory .heading h4 {\n    margin: 0;\n    font-size: 1em;\n    color: #7c7c7c;\n    text-transform: capitalize; }\n  #piechart .heading p, #subCategory .heading p {\n    margin: 0;\n    font-size: 0.9em;\n    color: #7c7c7c; }\n  #piechart #close, #subCategory #close {\n    position: absolute;\n    right: 0;\n    height: 2em;\n    width: 2em;\n    padding: 1em;\n    opacity: 0;\n    top: 0;\n    transform: scale(0.7);\n    transition: 0.25s ease-in-out;\n    cursor: pointer; }\n    #piechart #close:after, #subCategory #close:after {\n      content: '';\n      display: block;\n      height: 0.25em;\n      background: #7c7c7c;\n      margin: 0.5rem 0;\n      transform: rotate(-45deg); }\n    #piechart #close:before, #subCategory #close:before {\n      content: '';\n      display: block;\n      height: 0.25em;\n      transform: rotate(45deg) translate(0.5em, 0.5em);\n      background: #7c7c7c; }\n    #piechart #close:hover, #subCategory #close:hover {\n      transform: rotate(180deg) scale(1); }\n      #piechart #close:hover:after, #piechart #close:hover:before, #subCategory #close:hover:after, #subCategory #close:hover:before {\n        background: #2196F3; }\n  #piechart.active, #subCategory.active {\n    display: block;\n    transform: translateX(0%);\n    opacity: 1; }\n    #piechart.active #close, #subCategory.active #close {\n      opacity: 1; }\n    #piechart.active .breakdown--list, #subCategory.active .breakdown--list {\n      opacity: 1; }\n  #piechart .breakdown--list, #subCategory .breakdown--list {\n    position: absolute;\n    width: 98%;\n    border: 1px solid #ddd;\n    opacity: 0;\n    font-size: 12px;\n    overflow: hidden;\n    position: relative; }\n    #piechart .breakdown--list.active, #subCategory .breakdown--list.active {\n      opacity: 1; }\n    #piechart .breakdown--list h4, #subCategory .breakdown--list h4 {\n      color: #7c7c7c;\n      font-size: 1.2em;\n      display: block;\n      /* margin: 1em 0.5em; */\n      border-bottom: 1px solid #7c7c7c;\n      padding: 0.5em 0;\n      width: 100%;\n      margin: 0; }\n    #piechart .breakdown--list ul, #subCategory .breakdown--list ul {\n      margin: 0;\n      padding: 0 0.5em;\n      padding-bottom: 2.5em;\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: space-between;\n      box-sizing: border-box;\n      height: 100%;\n      overflow: hidden;\n      overflow-y: scroll;\n      align-items: flex-start; }\n    #piechart .breakdown--list li, #subCategory .breakdown--list li {\n      list-style-type: none;\n      width: 100%;\n      display: flex;\n      justify-content: space-between;\n      margin: 0.25em 0; }\n      #piechart .breakdown--list li span, #subCategory .breakdown--list li span {\n        font-size: 1em;\n        color: #7c7c7c; }\n        #piechart .breakdown--list li span.name, #subCategory .breakdown--list li span.name {\n          font-weight: bold;\n          text-align: left;\n          width: 45%;\n          line-height: 1rem;\n          text-transform: capitalize; }\n        #piechart .breakdown--list li span.no, #subCategory .breakdown--list li span.no {\n          text-align: left;\n          width: 25%;\n          padding: 0 0.5em; }\n        #piechart .breakdown--list li span.percent, #subCategory .breakdown--list li span.percent {\n          color: #ffa667;\n          font-weight: bold;\n          text-align: left;\n          width: 40%;\n          position: relative;\n          padding-right: 0.5em; }\n          #piechart .breakdown--list li span.percent i, #subCategory .breakdown--list li span.percent i {\n            position: absolute;\n            right: 0;\n            height: 2em;\n            width: 2em;\n            transform: scale(0.5);\n            transition: 0.25s ease-in-out;\n            cursor: not-allowed;\n            top: -3px;\n            right: 0; }\n            #piechart .breakdown--list li span.percent i:after, #subCategory .breakdown--list li span.percent i:after {\n              content: '';\n              display: block;\n              height: 0.25em;\n              background: #464646;\n              margin: 0.5rem 0;\n              transform: rotate(-45deg); }\n            #piechart .breakdown--list li span.percent i:before, #subCategory .breakdown--list li span.percent i:before {\n              content: '';\n              display: block;\n              height: 0.25em;\n              transform: rotate(45deg) translate(0.6em, 0.6em);\n              background: #464646; }\n    #piechart .breakdown--list .btn--block, #subCategory .breakdown--list .btn--block {\n      position: absolute;\n      bottom: 0;\n      width: 97%;\n      padding: 0.5em 0;\n      background: #fff;\n      left: 0;\n      margin-left: 0.5em;\n      z-index: 1; }\n      #piechart .breakdown--list .btn--block button, #subCategory .breakdown--list .btn--block button {\n        font-size: 0.75em;\n        color: #7c7c7c;\n        background: #d9d9d9;\n        border: 1px solid #ddd;\n        padding: 0.25em 0.5em;\n        font-weight: bold;\n        border: 1px solid #7c7c7c;\n        border-radius: 0.3em;\n        margin-right: 0.5em;\n        cursor: not-allowed; }\n        #piechart .breakdown--list .btn--block button.coinBtn, #subCategory .breakdown--list .btn--block button.coinBtn {\n          background: #fff; }\n\n#subCategory {\n  left: 38%;\n  z-index: 11;\n  transform: translateX(-200%); }\n  #subCategory.active {\n    transition: 0.35s ease-in-out; }\n\n#sliderY {\n  height: 85%;\n  position: absolute;\n  top: 4%;\n  right: 8%; }\n\n#sliderX {\n  left: 6%;\n  width: 83%;\n  position: absolute;\n  /* bottom: -8%; */\n  top: 0; }\n\nhtml:not([dir=rtl]) .noUi-horizontal .noUi-handle {\n  right: 0; }\n\n.noUi-horizontal {\n  height: 1.5em; }\n\n.noUi-vertical .noUi-handle:after, .noUi-vertical .noUi-handle:before {\n  display: none; }\n\n.noUi-horizontal .noUi-handle {\n  width: 1.417em;\n  height: 2.333em;\n  left: -1.417em;\n  top: -0.500em; }\n  .noUi-horizontal .noUi-handle:after, .noUi-horizontal .noUi-handle:before {\n    display: none; }\n  .noUi-horizontal .noUi-handle .noUi-touch-area {\n    cursor: col-resize; }\n    .noUi-horizontal .noUi-handle .noUi-touch-area:hover {\n      background: #2196F3; }\n    .noUi-horizontal .noUi-handle .noUi-touch-area:focus {\n      background: #2196F3; }\n\n.noUi-vertical .noUi-handle:after, .noUi-vertical .noUi-handle:before {\n  width: 1.167em;\n  height: 0.083em;\n  left: 0.5em;\n  top: 1.167em; }\n\n.noUi-connects {\n  border-radius: 0px; }\n\n.noUi-vertical .noUi-handle:after {\n  top: 1.417em; }\n\n.noUi-vertical {\n  width: 1.5em; }\n\n.noUi-target {\n  background: rbga(255, 255, 255, 0.5);\n  border-radius: 0px;\n  border: 0px solid #4f81f0; }\n\n.noUi-connect {\n  background: #d2d2d2; }\n\n.noUi-vertical .noUi-handle {\n  width: 2.333em;\n  height: 1.500em;\n  left: -0.500em;\n  top: -0.500em; }\n  .noUi-vertical .noUi-handle .noUi-touch-area {\n    cursor: row-resize; }\n    .noUi-vertical .noUi-handle .noUi-touch-area:hover {\n      background: #2196F3; }\n\n/*Keyframe animations*/\n@-webkit-keyframes movetop {\n  100% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@keyframes movetop {\n  100% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@-webkit-keyframes bouncearrow {\n  0% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -webkit-transform: translateY(0px) scale(1);\n    transform: translateY(0px) scale(1); }\n  25% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -webkit-transform: translateY(10px) scale(0.9);\n    transform: translateY(10px) scale(0.9); }\n  26% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -webkit-transform: translateY(-10px) scale(0.9);\n    transform: translateY(-10px) scale(0.9); }\n  55% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -webkit-transform: translateY(0px) scale(1);\n    transform: translateY(0px) scale(1); } }\n\n@keyframes bouncearrow {\n  0% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -webkit-transform: translateY(0px) scale(1);\n    transform: translateY(0px) scale(1); }\n  25% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -webkit-transform: translateY(10px) scale(0.9);\n    transform: translateY(10px) scale(0.9); }\n  26% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -webkit-transform: translateY(-10px) scale(0.9);\n    transform: translateY(-10px) scale(0.9); }\n  55% {\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -webkit-transform: translateY(0px) scale(1);\n    transform: translateY(0px) scale(1); } }\n\n@-webkit-keyframes fadeInUp {\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@keyframes fadeInUp {\n  100% {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@-webkit-keyframes fadeOutDown {\n  100% {\n    -webkit-transform: translate3d(0, 100px, 0);\n    transform: translate3d(0, 100px, 0);\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; } }\n\n@keyframes fadeOutDown {\n  100% {\n    -webkit-transform: translate3d(0, 100px, 0);\n    transform: translate3d(0, 100px, 0);\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; } }\n\n@-webkit-keyframes arrowMoveDown {\n  70% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    bottom: 0;\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  100% {\n    bottom: 0;\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg);\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@keyframes arrowMoveDown {\n  70% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    bottom: 0;\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  100% {\n    bottom: 0;\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg);\n    opacity: 1;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; } }\n\n@media (max-width: 1200px) {\n  .filter--block, #my_dataviz {\n    font-size: 12px; }\n  #piechart .breakdown--list {\n    font-size: 12px; }\n    #piechart .breakdown--list ul {\n      justify-content: center; }\n    #piechart .breakdown--list li {\n      width: 100%; } }\n\n@media (max-width: 1024) {\n  html {\n    font-size: 11px; }\n  .filter--block {\n    font-size: 11px; } }\n", ""]);



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aabda86e7e1a1280652de7bcaa902a47.png";

/***/ })
/******/ ]);