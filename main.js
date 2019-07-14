import './assets/js/nouislider.min.css';
import './main.scss';

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