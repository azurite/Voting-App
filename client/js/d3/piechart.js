/*
 * chart design inspired by by: https://bl.ocks.org/mbostock/3887235
*/

const d3 = require("d3");

const chart = {
  create: function(root, props, data) {

    var svg = d3.select(root).append("svg")
      .attr("class", "d3-pie-chart")
      .attr("width", props.width)
      .attr("height", props.height)
    .append("g")
      .attr("transform", "translate(" + props.width / 2 + "," + (props.height - 20) / 2 + ")");

    var tip = d3.select("svg").append("text")
      .attr("transform", "translate(" + (props.width / 2) + "," + (props.height - 15) + ")")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em");

    this.svg = svg;
    this.options = props;
    this.data = data;
    this.root = root;
    this.tip = tip;

    this.drawChart();
  },
  drawChart: function(newData) {

    if(newData) {
      this.data = newData;
    }

    var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
    this.cycle.config({ length: colors.length });

    var arc = d3.arc()
      .outerRadius(this.options.radius - 10)
      .innerRadius(0);

    var labelArc = d3.arc()
      .outerRadius(this.options.radius - 40)
      .innerRadius(this.options.radius - 40);

    var pie = d3.pie()
      .sort(null)
      .value((d) => { return d.votes; });

    var g = this.svg.selectAll(".arc")
      .data(pie(this.data.body.options.filter((d) => { return d.votes > 0; })))
    .enter().append("g")
      .attr("class", "arc");

    g
      .append("path")
      .attr("d", arc)
      .style("fill", () => { return colors[this.cycle.increment()]; });

    g.append("text")
      .attr("transform", (d) => { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => { return Math.round(100 * d.data.votes / this.data.body.totalVotes) + "%"; });

    g
      .on("mouseover", this.updateTip.bind(this))
      .on("mouseout", this.hideTip.bind(this))
      .on("click", this.updateTip.bind(this));
  },
  destroy: function() {
    d3.select("svg").remove();
  },
  update: function(newData) {
    this.drawChart(newData);
  },
  hideTip: function() {
    this.tip.text("");
  },
  updateTip: function(d) {
    this.tip.text(d.data.option);
  },
  cycle: {
    data: 0,
    config: function(opt) {

      for(var prop in opt) {
        if(opt.hasOwnProperty(prop)) {
          this[prop] = opt[prop];
        }
      }
    },
    increment: function() {

      var curr = this.data;
      this.data >= (this.length - 1) ? this.data = 0 : this.data += 1;
      return curr;
    }
  }
};

module.exports = chart;
