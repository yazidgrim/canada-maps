var canvas = document.getElementById('my_dataviz');

var w = canvas.offsetWidth;
var h = canvas.offsetHeight;

var backgroundColor = "#252525";
var borderColor = "#636363";
var postalCodeColor = "#969696";

var projection = d3.geoOrthographic()
                    .clipAngle(180)
                    .rotate([98, -60])
                    .scale(1200)
                    .translate([w/2, h/2]);

var ctx = canvas.getContext('2d');

var pathGenerator = d3.geoPath(projection, ctx);

var geoGenerator = d3.geoPath()
	.projection(projection)
	.pointRadius(4)
	.context(ctx);

d3.json("georef-canada-province.geojson").then(function(data) {
    ctx.beginPath();
    pathGenerator(data);
    ctx.fillStyle = backgroundColor;
    ctx.fill();

    ctx.strokeStyle = borderColor;
    ctx.stroke();
});

var postalCodes = d3.select("#points");

function createMap(dataset) {
    console.log("entered Create Map Function");
    var dataBinding = postalCodes.selectAll("points.arc")
                                    .data(dataset)
                                    .enter()
                                    .append("points")
                                    .classed("arc", true)
                                    .attr("x", function(d) {return projection([d.Longitude, d.Latitude])[0];})
                                    .attr("y", function(d) {return projection([d.Longitude, d.Latitude])[1];})
                                    .attr("radius", 8)
                                    .attr("fillStyle", "#ff0000");
    drawCanvas();

}

function drawCanvas() {
    var elements = postalCodes.selectAll("points.arc");
    elements.each(function(d) {
        console.log(d);
        var node = d3.select(this);

        ctx.beginPath();
        ctx.arc(node.attr("x"), node.attr("y"), node.attr("radius"), 0, 2 * Math.PI);
        ctx.fillStyle = node.attr("fillStyle");
        ctx.fill();
        ctx.closePath();
    })
}

d3.csv("CanadianPostalCodes.csv", function(error, dataset) {createMap(dataset);});