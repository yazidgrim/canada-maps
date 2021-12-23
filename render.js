var w = 1500;
var h = 1000;

var backgroundColor = "#252525";
var borderColor = "#636363";
var postalCodeColor = "#969696"

var projection = d3.geo.orthographic()
                    .clipAngle(180)
                    .rotate([98, -60])
                    .scale(1200)
                    .translate([w/2, h/2]);

var path = d3.geo.path().projection(projection);   

var svg = d3.select("body").append("svg")
                .attr({
                        width: w, 
                        height: h
                    });

var background = svg.append("rect")
                        .attr({
                            width: "100%",
                            height: "100%",
                            fill: backgroundColor
                        })

d3.json("georef-canada-province.geojson", function(json) {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", backgroundColor)
        .attr("stroke", borderColor);
    d3.csv("CanadianPostalCodes.csv", function(data) {
        console.log(data);
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
                .attr({
                    cx: function(d) {return projection([d.Longitude, d.Latitude])[0];},
                    cy: function(d) {return projection([d.Longitude, d.Latitude])[1];},
                    r: 0.5,
                    fill: postalCodeColor,
                    opacity: 0.8
                })
    })
});