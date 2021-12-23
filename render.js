var w = 960;
var h = 500;

var projection = d3.geo.orthographic()
                    .clipAngle(90)
                    .rotate([98, -60])
                    .scale(600)
                    .translate([w/2, h/2]);

var path = d3.geo.path().projection(projection);   

var svg = d3.select("body").append("svg")
                .attr({width: w, height: h});

d3.json("https://raw.githubusercontent.com/serde-rs/json-benchmark/master/data/canada.json", function(json) {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#666666");
});