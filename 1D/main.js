
/*global d3*/

let unesco;
let allPlaces = [];
d3.json('maternal_mortality.json').then(function(data){
    unesco = data;
    analyzeData();
    displayData(allPlaces);
    // console.log(unesco);
    console.log(allPlaces);
});

function analyzeData(){
    unesco.forEach(function(p) {

            allPlaces.push({
                year: "value_2000".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2000,
                // year: "value_2001".split('_')[1],
                // country: p.geoAreaName,
                // region: p.parentName,
                // mmr_2001: p.value_2001,
                // "2000": p.value_2000, 
                // "2001": p.value_2001,
                // "2002": p.value_2002,
                // "2003": p.value_2003,
                // "2004": p.value_2004,
                // "2005": p.value_2005,
                // "2006": p.value_2006,
                // "2007": p.value_2007,
                // "2008": p.value_2008,
                // "2009": p.value_2009,
                // "2010": p.value_2010,
                // "2011": p.value_2011,
                // "2012": p.value_2012,
                // "2013": p.value_2013,
                // "2014": p.value_2014,
                // "2015": p.value_2015,
                // "2016": p.value_2016,
                // "2017": p.value_2017
            });
            allPlaces.push({
                year: "value_2001".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2001,
            });
            allPlaces.push({
                year: "value_2002".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2002,
            });
            allPlaces.push({
                year: "value_2003".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2003,
            });
            allPlaces.push({
                year: "value_2004".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2004,
            });
            allPlaces.push({
                year: "value_2005".split('_')[1],
                country: p.geoAreaName,
                region: p.parentName,
                mmr: p.value_2005,
            });
    })};


function displayData(allPlaces){
    
    const margin = ({top: 100, right: 50, bottom: 100, left: 80})
    const width = window.innerWidth
    const height = window.innerHeight
    
    // console.log(width, height)
    
    // format the year
    var parseTime = d3.timeParse("%Y");

    allPlaces.forEach(function (d) {
    d.year = parseTime(d.year);
    });
    
    //scale xAxis 
    const xScale = d3.scaleTime()
    .domain(d3.extent(allPlaces, d => d.year))
    .range([margin.left, width - margin.right])

    //scale yAxis
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(allPlaces, d => parseInt(d.mmr) + 1)])
    .range([height - margin.bottom, margin.top])
    
    const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    // .style("border", "solid 8px red")
    
    var g = svg.append("g")
    .attr("transform", "translate (50, 50)")

    var line = d3.line()
    .x(function(d) {return xScale(d.year)})
    .y(function(d) {return yScale(d.mmr)})
    xScale.domain(d3.extent(allPlaces, function(d) {return d.year}))
    yScale.domain(d3.extent(allPlaces, function(d) {return d.mmr}))
    
    g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(30," + margin.left + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("x", (width)/2) //middle of the xAxis
    .attr("y", 50) // a little bit below xAxis
    .attr("text-anchor", "start")
    .text("Year")
    // .select(".domain")
    // .remove();
    
    g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(yScale).ticks(10))
    .attr("transform", "translate(" + margin.left + ",0)")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height/2)) //middle of the xAxis
    .attr("y", -75) // a little bit below xAxis
    .attr("text-anchor", "start")
    .text("Maternal Mortality Rate");
    
    var sumstat = d3.group(allPlaces, d => d.country)
    
    console.log(sumstat)
    
    //select path - three types: curveBasis,curveStep, curveCardinal
    svg.append('g')
    .attr("class", "line")
    .selectAll("line")
    .data(sumstat).join("line")
    .append("path")
    .attr("d", function (d) {
        return d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.mmr)).curve(d3.curveCardinal)
            (d.values)
    })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")

    //append circle 
        svg.append('g')
        .attr("class", "circle")
        .selectAll("circle")
        .data(allPlaces)
        .join("circle")
        .attr("r", 6)
        .attr("cx", function(d){ return xScale(d.year) })
        .attr("cy", function(d){ return yScale(d.mmr) })
        .attr("transform", "translate(50,50)")
        .attr("transform", "translate(" + margin.left + ",0)")
    
}    
    
    

    
