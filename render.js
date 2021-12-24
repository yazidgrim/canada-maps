var canvas = document.getElementById('my_dataviz');

var w = canvas.offsetWidth;
var h = canvas.offsetHeight;

var backgroundColor = "#252525";
var borderColor = "#636363";
var postalCodeColor = "#969696"

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

d3.csv("CanadianPostalCodes.csv").then(function(data) {
    ctx.beginPath();
    geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: [106.3468,56.1304]}});
    //pathGenerator(data);
    ctx.fillStyle = postalCodeColor;
    ctx.fill();

});