const d3 = require("d3");

const chart = {
  create: function(root, props, data) {

    var svg = d3.select(root).append("svg")
      .attr("class", "d3-pie-chart")
      .attr("width", props.width)
      .attr("height", props.height)
    .append("g")
      .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

    var tooltip = d3.select(root).append("div")
      .attr("class", "tooltip")
      .style("diaplay", "none");

    this.svg = svg;
    this.options = props;
    this.data = data;
    this.root = root;
    this.tooltip = tooltip;

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

    var pie = d3.pie()
      .sort(null)
      .value((d) => { return d.votes; });

    var g = this.svg.selectAll(".arc")
      .data(pie(this.data.body.options))
    .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", () => { return colors[this.cycle.increment()]; });

    g.on("mouseover", this.showToolTip.bind(this))
      .on("mouseout", this.hideToolTip.bind(this));
  },
  destroy: function() {
    d3.select("svg").remove();
  },
  update: function(newData) {
    this.drawChart(newData);
  },
  showToolTip: function(d) {
    this.tooltip.style("display", "block")
      .style("top", d3.event.pageY + "px")
      .style("left", d3.event.pageX + "px");

    this.tooltip.html("<span>" + d.data.option + "</span>");
  },
  hideToolTip: function() {
    this.tooltip.style("display", "none");
    this.tooltip.html("");
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
      this.data > (this.length - 1) ? this.data = 0 : this.data += 1;
      return curr;
    }
  }
};

module.exports = chart;
