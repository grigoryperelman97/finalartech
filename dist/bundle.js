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
/******/ ({

/***/ "./src/render-bar.js":
/*!***************************!*\
  !*** ./src/render-bar.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction clickRect() {\n    const index = $(this).index() - 1;\n    $('.range input').val(index * 5 + 2015).trigger('input');\n}\n\nfunction mouseoverRect() {\n    $(this).addClass('active-year');\n}\n\nfunction mouseoutRect() {\n    $(this).removeClass('active-year');\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (yearValue, barSvg) {\n    var format = d3.format(\",.1f\");\n    const barWidth = 30;\n    const height=window.innerHeight>925?280:200;\n    $(\"#bar\").css(\"height\",height);\n    $(\"#map\").css(\"margin-top\",window.innerHeight>925?'-150px':'-180px');\n    var data = [];\n    var min = Number.MAX_VALUE;\n    var max = Number.MIN_VALUE;\n    const kiloToMillion = $(\"#type-input\").val() === 'Population (million)' ? 1000 : 1;\n    for (var i = 2015; i <= 2070; i += 5) {\n        const value = yearValue[i] / kiloToMillion;\n        data.push({year: String(i), value: value});\n        min = min < value ? min : value;\n        max = max > value ? max : value;\n    }\n    min = parseInt(min / 5) * 5;\n    max = parseInt(max / 5 + 1) * 5;\n    const xValue = function (data) {\n        return data.year;\n    };\n    const yValue = function (data) {\n        return data.value;\n    };\n    const xScale = d3.scale.linear()\n        .domain(d3.extent(data, xValue))\n        .range([0, 915]);\n    const yScale = d3.scale.linear()\n        .domain([min, max])\n        .range([10, height-20]);\n    const yAxisScale = d3.scale.linear()\n        .domain([max, min])\n        .range([height - yScale(max), height - yScale(min)]);\n\n\n    const rects = barSvg.selectAll('rect').data(data)\n        .attr('x', function (data) {\n            return xScale(xValue(data)) + 12;\n        })\n        .attr('y', function (data) {\n            return height - yScale(yValue(data));\n        })\n        .attr('width', barWidth)\n        .attr('height', function (data) {\n            return yScale(yValue(data));\n        });\n    barSvg.selectAll('title').data(data)\n        .text(function (data) {\n            return format(yValue(data));\n        });\n    rects.enter().append('rect')\n        .attr('class', 'year')\n        .attr('id', function (data) {\n            return 'year-' + data.year;\n        })\n        .attr('x', function (data) {\n            return xScale(xValue(data)) + 12;\n        })\n        .attr('y', function (data) {\n            return height - yScale(yValue(data));\n        })\n        .attr('width', barWidth)\n        .attr('height', function (data) {\n            return yScale(yValue(data));\n        })\n        .on('click', clickRect)\n        .on('mouseover', mouseoverRect)\n        .on('mouseout', mouseoutRect)\n        .append('title')\n        .attr('class', 'rect-popup')\n        .text(function (data) {\n            return format(yValue(data));\n        });\n\n    const yAxis = d3.svg.axis().scale(yAxisScale).orient(\"right\").ticks(8).innerTickSize(-1000);\n    barSvg.select('.grid').remove();\n    barSvg.insert(\"g\", \":first-child\")\n        .attr(\"transform\", \"translate(972,0)\")\n        .attr(\"class\", \"grid\")\n        .call(yAxis);\n\n    barSvg.selectAll('.bar-line').remove();\n    barSvg.selectAll('.bar-text').remove();\n    barSvg.selectAll('.bar-point').remove();\n\n    for (var i = 0; i < data.length; i++) {\n        barSvg.append('text')\n            .attr('class', 'bar-text')\n            .attr('x', xScale(xValue(data[i]))+10-yValue(data[i])/1000)\n            .attr('y', height - yScale(yValue(data[i])) - 8)\n            .text(format(yValue(data[i])));\n\n        barSvg.append('circle')\n            .attr('class', 'bar-point')\n            .attr('cx', xScale(xValue(data[i]))+12+ barWidth / 2)\n            .attr('cy', height - yScale(yValue(data[i])))\n            .attr('r', 3);\n\n        if (i === data.length - 1)\n            break;\n        barSvg.append(\"line\")\n            .attr('class', 'bar-line')\n            .attr('x1', xScale(xValue(data[i])) + 12 + barWidth / 2)\n            .attr('y1', height - yScale(yValue(data[i])))\n            .attr('x2', xScale(xValue(data[i + 1])) + 12 + barWidth / 2)\n            .attr('y2', height - yScale(yValue(data[i + 1])));\n    }\n});\n\n\n//# sourceURL=webpack:///./src/render-bar.js?");

/***/ }),

/***/ "./src/render-map.js":
/*!***************************!*\
  !*** ./src/render-map.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-bar */ \"./src/render-bar.js\");\n\nconst format = d3.format(\",.1f\");\nconst specials = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];\nconst ageGroups = ['EXO', 'BTS', 'RED VELVET', 'BIGBANG', 'MAMAMOO', 'BIGBANG', 'GOT7', '2NE1', 'AOA', 'SEVENTEEN', 'ITZY',\n    'SUPER JUNIOR', 'SISTAR', 'WINNER', 'GIRLS GENERATION', 'STRAY KIDS', 'MOMOLAND', '', ''];\nvar ageData = {};\nvar codeToName = {};// {alpha 3 code : country name}\nvar nameToCode = {};// {country name : alpha 3 code}\nvar codeToValues = []; // [[alpha 3 code, {year: value}]]\nvar nameToValues = {};//{country name: {values}}\nvar countriesNames = [];\nvar maxValue = Number.MIN_VALUE;//max value including 'World'\nvar maxValue2 = Number.MIN_VALUE;//max value of a country\nvar minValue = Number.MAX_VALUE;\nvar barSvg = d3.select(\"#bar\").append(\"svg\").attr('id', 'bar-svg').attr('width', '100%').attr('height', '100%');\n\nconst properties = {\n    'Population (million)': {file: 'Population.json', color: d3.interpolateBlues, class: 'Population'},\n    'Median Age': {file: 'MedianAge.json', color: d3.interpolateBuGn, class: 'Median Age'},\n    'hello': {\n        file: 'DR1564.json',\n        color: d3.interpolateReds,\n        class: 'Total Dependency Ratio'\n    },\n    'youtube 조회수': {\n        file: 'DR2069.json',\n        color: d3.interpolateReds,\n        class: '조회수'\n    },\n    'mnet': {\n        file: 'DR2564.json',\n        color: d3.interpolateReds,\n        class: 'Total Dependency Ratio'\n    },\n    'Total Dependency Ratio ((Age 0-24 + Age 70+) / Age 25-69)': {\n        file: 'DR2569.json',\n        color: d3.interpolateReds,\n        class: 'Total Dependency Ratio'\n    },\n    'Old-Age Dependency Ratio (Age 65+ / Age 15-64)': {\n        file: 'ODR1564.json',\n        color: d3.interpolateRdPu,\n        class: 'Old-Age Dependency Ratio'\n    },\n    'Old-Age Dependency Ratio (Age 65+ / Age 20-64)': {\n        file: 'ODR2064.json',\n        color: d3.interpolateRdPu,\n        class: 'Old-Age Dependency Ratio'\n    },\n    'Old-Age Dependency Ratio (Age 70+ / Age 20-69)': {\n        file: 'ODR2069.json',\n        color: d3.interpolateRdPu,\n        class: 'Old-Age Dependency Ratio'\n    },\n    'Old-Age Dependency Ratio (Age 65+ / Age 25-64)': {\n        file: 'ODR2564.json',\n        color: d3.interpolateRdPu,\n        class: 'Old-Age Dependency Ratio'\n    },\n    'Old-Age Dependency Ratio (Age 70+ / Age 25-69)': {\n        file: 'ODR2569.json',\n        color: d3.interpolateRdPu,\n        class: 'Old-Age Dependency Ratio'\n    }\n};\n\n//for IE not supporting Array.includes()\nif (!Array.prototype.includes) {\n    Object.defineProperty(Array.prototype, \"includes\", {\n        enumerable: false,\n        value: function (obj) {\n            var newArr = this.filter(function (el) {\n                return el == obj;\n            });\n            return newArr.length > 0;\n        }\n    });\n}\n\nfunction dataInput() {\n    codeToName = {};\n    nameToCode = {};\n    codeToValues = [];\n    nameToValues = {};\n    countriesNames = [];\n    d3.json(\"data/\" + properties[$(\"#type-input\").val()].file, function (data) {\n        for (var code in data) {\n            if (code === 'min' || code === 'max' || code === 'max2')\n                continue;\n            if (data.hasOwnProperty(code)) {\n                const name = data[code].name;\n                const values = data[code].data;\n                nameToValues[name] = values;\n                codeToName[code] = name;\n                nameToCode[name] = code;\n\n                if (specials.includes(code))\n                    continue;\n                codeToValues.push([code, values]);\n                countriesNames.push(name);\n            }\n        }\n        minValue = parseInt(data['min'] / 10) * 10;\n        maxValue = parseInt(data['max'] / 10 + 1) * 10;\n        maxValue2 = parseInt(data['max2'] / 10 + 1) * 10;\n        countriesNames = specials.concat(countriesNames.sort());\n        renderMap();\n        Object(_render_bar__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nameToValues[$(\"#country-input\").val()], barSvg);\n        $(\"#year-2015\").addClass('selected-year');\n        d3.json(\"data/AgeComposition.json\", function (data) {\n            ageData = data;\n            renderPyramid();\n        });\n    });\n}\n\nfunction renderMap() {\n    $('#map').empty();\n    if (document.getElementById(\"country-input\").childElementCount !== countriesNames.length) {\n        const previousCountry = $(\"#country-input\").val();\n        const countryList = d3.select('#country-input');\n        countryList.selectAll('*').remove();\n\n        countriesNames.forEach(function (value) {\n            countryList.append('option').text(value);\n        });\n\n        if (countriesNames.includes(previousCountry))\n            $(\"#country-input\").val(previousCountry);\n        else\n            $(\"#country-input\").val(\"World\");\n    }\n    const dataset = {};\n    // create color palette function\n    const type = $(\"#type-input\").val();\n    const max_value = type === 'Population (million)' ? maxValue2 : maxValue;\n    const colorIndex = type === 'Population (million)' ? 3 : 1;\n    const colorValue = d3.scale.linear().range([0, 1]).domain([minValue, max_value / colorIndex]);\n    // const paletteScale = value => properties[type].color(colorValue(value));\n    // fill dataset in appropriate format\n    codeToValues.forEach(function (item) { //item example value [\"USA\", 70]\n        const value = item[1][$(\"#year-input\").val()];\n        dataset[item[0]] = {numberOfThings: value, fillColor: properties[type].color(colorValue(value))};\n    });\n    // renderMap map\n    const datamap = new Datamap({\n        element: document.getElementById('map'),\n        projection: 'mercator',\n\n        fills: {defaultFill: '#e0e1d7'},\n        data: dataset,\n        geographyConfig: {\n            borderColor: '#717171',\n            highlightBorderWidth: 2,\n\n            highlightFillColor: function (geo) {\n                return geo['fillColor'] || '#F5F5F5';\n            },\n\n            popupTemplate: function (geo, data) {\n\n                if (!data) {\n                    const popupInfo = ['<div class=\"hoverinfo\">', '<strong>', geo.properties.name, '</strong>'];\n                    popupInfo.push('<br><strong>No Data</strong>');\n                    return popupInfo.join('');\n                }\n                else {\n                    if (type === 'Population (million)') {\n                        var number = data.numberOfThings;\n                        number = number > 1000 ? format(number / 1000) + ' million' : format(number) + ' thousand';\n                        const popupInfo = ['<div class=\"hoverinfo\">', '<strong>', codeToName[geo.id], '</strong>'];\n                        return popupInfo.concat(['<br/>', properties[$(\"#type-input\").val()].class, ': <strong>',\n                            number, '</strong>', '</div>']).join('');\n                    } else {\n                        const popupInfo = ['<div class=\"hoverinfo\">', '<strong>', codeToName[geo.id], '</strong>'];\n                        return popupInfo.concat(['<br/>', properties[$(\"#type-input\").val()].class, ': <strong>',\n                            format(data.numberOfThings), '</strong>', '</div>']).join('');\n                    }\n                }\n\n            },\n\n            highlightBorderColor: '#ff5a04'\n        },\n        done: function (datamap) {\n            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {\n                if (codeToName.hasOwnProperty(geography.id)) {\n                    const country = $(\"#country-input\");\n                    country.val(codeToName[geography.id]);\n                    Object(_render_bar__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nameToValues[country.val()], barSvg);\n                    renderPyramid();\n                }\n            });\n        }\n    });\n    const kiloToMillion = type === 'Population (million)' ? 1000 : 1;\n    const svg = d3.select('.datamap');\n    svg.select('#map-legend').remove();\n    svg.select('#map-legend-axis').remove();\n    const legend = svg.append(\"defs\").append(\"svg:linearGradient\").attr(\"id\", \"gradient\")\n        .attr(\"x1\", \"0%\").attr(\"y1\", \"100%\").attr(\"x2\", \"100%\").attr(\"y2\", \"100%\").attr(\"spreadMethod\", \"pad\");\n    for (var i = 0; i <= 90; i += 10) {\n        legend.append(\"stop\").attr(\"offset\", i + '%').attr(\"stop-color\", properties[$(\"#type-input\").val()].color(i / 100))\n    }\n    svg.append(\"rect\").attr(\"width\", 150).attr(\"height\", 15).style(\"fill\", \"url(#gradient)\")\n        .attr('id', 'map-legend')\n        .attr(\"transform\", \"translate(460,625)\");\n    const axisScale = d3.scale.linear().range([0, 150]).domain([minValue, max_value / kiloToMillion / colorIndex]);\n    const axis = d3.svg.axis().scale(axisScale).orient(\"bottom\").ticks(5);\n    svg.append(\"g\")\n        .attr(\"transform\", \"translate(460,640)\")\n        .attr(\"id\", \"map-legend-axis\")\n        .call(axis);\n    if (type === 'Population (million)')\n        svg.append('text').attr('x', 620).attr('y', 658).text('+ (million)');\n}\n\nfunction renderPyramid() {\n    const height = 10;\n    d3.select('#pyramid').remove();\n    const g = d3.select('.datamap').append('g').attr('id', 'pyramid').attr(\"transform\", \"translate(0,400)\");\n    const index = ($(\"#year-input\").val() - 2015) / 5;\n    const country = ageData[nameToCode[$(\"#country-input\").val()]];\n    if (country === undefined)\n        return;\n    var maxValue = Number.MIN_VALUE;\n\n    const maleData = country['male'][index];\n    const femaleData = country['female'][index];\n    for (var i = 0; i < 21; i++) {\n        maxValue = maxValue > maleData[i] ? maxValue : maleData[i];\n        maxValue = maxValue > femaleData[i] ? maxValue : femaleData[i];\n    }\n\n    const xScale = d3.scale.linear()\n        .domain([0, maxValue])\n        .range([0, 100]);\n    const maleRects = g.selectAll('.male-age-rect').data(country['male'][index])\n        .attr('x', function (data) {\n            return 140 - xScale(data);\n        })\n        .attr('width', function (data) {\n            return xScale(data);\n        });\n    maleRects.enter().append('rect').attr('class', 'age-rect male-age-rect')\n        .attr('x', function (data) {\n            return 140 - xScale(data);\n        })\n        .attr('y', function (data, index) {\n            return 240 - index * height;\n        })\n        .attr('width', function (data) {\n            return xScale(data);\n        })\n        .attr('height', height)\n        .append('title')\n        .text(function (data) {\n            return d3.format(\",.d\")(data) + ',000';\n        });\n    const femaleRects = g.selectAll('.female-age-rect').data(country['female'][index])\n        .attr('width', function (data) {\n            return xScale(data[1]);\n        });\n    femaleRects.enter().append('rect').attr('class', 'age-rect female-age-rect')\n        .attr('x', 140)\n        .attr('y', function (data, index) {\n            return 240 - index * height;\n        })\n        .attr('width', function (data) {\n            return xScale(data);\n        })\n        .attr('height', height)\n        .append('title')\n        .text(function (data) {\n            return d3.format(\",.d\")(data) + ',000';\n        });\n    g.selectAll('text').data(ageGroups).enter()\n        .append('text').attr('x', function (data, index) {\n        return index > 1 ? 1 : 7;\n    }).attr('y', function (data, index) {\n        return 250 - index * height;\n    })\n        .text(function (data) {\n            return data;\n        })\n        .style('font-size', '11px');\n    g.append('text').attr('x', 30).attr('y', 45).text('Male Viewer').style('font-size', '20px');\n    g.append('text').attr('x', 150).attr('y', 45).text('Female Viewer').style('font-size', '20px');\n\n    const MalexScale = d3.scale.linear()\n        .domain([maxValue / 1000, 0])\n        .range([0, 100]);\n    const FemalexScale = d3.scale.linear()\n        .domain([0, maxValue / 1000])\n        .range([0, 100]);\n    const axisMale = d3.svg.axis().scale(MalexScale).orient(\"bottom\").ticks(3);\n    const axisFemale = d3.svg.axis().scale(FemalexScale).orient(\"bottom\").ticks(3);\n    g.append(\"g\")\n        .attr(\"transform\", \"translate(40,250)\")\n        .attr(\"id\", \"map-legend-axis\")\n        .call(axisMale);\n    g.append(\"g\")\n        .attr(\"transform\", \"translate(140,250)\")\n        .attr(\"id\", \"map-legend-axis\")\n        .call(axisFemale);\n\n    g.append('text').attr('x', 75).attr('y', 280).text('man and female ratio');\n}\n\nconst sheet = document.createElement('style'),\n    $rangeInput = $('.range input'),\n    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];\ndocument.head.appendChild(sheet);\nconst getTrackStyle = function (el) {\n    const curVal = el.value;\n    const val = (curVal - 2015) * 1.176470588;\n    var style = '';\n    $('.range-labels li').removeClass('active selected');\n    $('.year').removeClass('active-year selected-year');\n    const curLabel = $('.range-labels').find('li:nth-child(' + (curVal - 2010) / 5 + ')');\n    curLabel.addClass('active selected');\n    curLabel.prevAll().addClass('active selected');\n    const curYear = $(\"#bar-svg\").find('rect:nth-child(' + (curVal - 2005) / 5 + ')');\n    curYear.addClass('active-year selected-year');\n    curYear.prevAll().addClass('selected-year');\n    for (var i = 0; i < prefs.length; i++) {\n        style += '.range {background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #fff ' + val + '%, #fff 100%)}';\n        style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #0099cb ' + val + '%, #0099cb 100%)}';\n    }\n    return style;\n};\n$rangeInput.on('input', function () {\n    sheet.textContent = getTrackStyle(this);\n    renderMap();\n    renderPyramid();\n});\n$('.range-labels li').on('click', function () {\n    const index = $(this).index();\n    $rangeInput.val(index * 5 + 2015).trigger('input');\n}); //여기는 밑에 숫자 클릭시 커지는 년도\n$(\"#country-input\").change(function () {\n    const name = $(\"#country-input\").val();\n    Object(_render_bar__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nameToValues[name], barSvg);\n    renderPyramid();\n});\n\n$('#type-input').change(function () {\n    dataInput();\n});\ndataInput();\n\n\n//# sourceURL=webpack:///./src/render-map.js?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./src/render-map.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/render-map.js */\"./src/render-map.js\");\n\n\n//# sourceURL=webpack:///multi_./src/render-map.js?");

/***/ })

/******/ });