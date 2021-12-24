var data = [];

// based on http://stackoverflow.com/questions/8495687/split-array-into-chunks

function chunkArray(ar,chunksize) {
    var R = [];
    if (chunksize <= 0) return ar;
    for (var i = 0; i < ar.length; i+=chunksize) {
        R.push(ar.slice(i,i+chunksize));
    }
    return R;
}


// Random data set
// 50000 was sufficiently large to block my machine 
// for several seconds
for (var i = 0; i < 50000; i++) {
    data.push({
        x: Math.floor(Math.random() * 400),
        y: Math.floor(Math.random() * 400)
    });
}

var dataPool = chunkArray(data,100);
var canvas = d3.select("svg");
var poolPosition = 0;
var iterator;
var groups = [];

function updateVisualization() {
    group = canvas.append("g").selectAll("circle")
    .data(dataPool[poolPosition])
    .enter()
    .append("circle")
    .attr({
        cx: function(d) { return d.x },
        cy: function(d) { return d.y },
        r: 2
    })
    .style({
        fill: "#666666" 
    });
    poolPosition += 1;
    if (poolPosition >= dataPool.length) {
        clearInterval(iterator);
    }
}

iterator = setInterval(updateVisualization,100);



