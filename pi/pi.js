var data = [
    {
      Title: "1",
      Amount: 100,
      Description:
        "d1"
    },
    {
      Title: "2",
      Amount: 1000,
      Description:
        "d2"
    },
    {
      Title: "3",
      Amount: 1750,
      Description:
        "d3"
    },
    {
      Title: "4",
      Amount: 600,
      Description:
        "d4"
    },
    {
      Title: "5",
      Amount: 2000,
      Description:
        "d5"
    },
    {
      Title: "6",
      Amount: 100,
      Description:
        "d6"
    },
    {
      Title: "7",
      Amount: 750,
      Description:
        "d7"
    },
    {
      Title: "8",
      Amount: 400,
      Description:
        "d8"
    },
    {
      Title: "9",
      Amount: 800,
      Description:
        "d9"
    },
    {
      Title: "10",
      Amount: 450,
      Description:
        "d10"
    },
    {
      Title: "11",
      Amount: 450,
      Description:
        "d11"
    }
  ];
  
  var width = parseInt(d3.select("#piechart").style("width"), 10);
  var height = width;
  var radius = (Math.min(width, height) - 15) / 2;
  
  var total = 0;
  data.forEach(d => {
    total += d.Amount;
  });
  
  var title = function getObject(obj) {
    titles = [];
    for (var i = 0; i < obj.length; i++) {
      titles.push(obj[i].Title);
    }
    return titles;
  };
  
  let innerRadius = $("#piechart")
    .css("counter-reset")
    .split(" ")[1];
  
  var arcOver = d3
    .arc()
    .outerRadius(radius + 10)
    .innerRadius(innerRadius);
  
  var color = d3.scaleOrdinal();
  color
    .domain(title(data))
    .range(["#2BDFBB", "#DF2B4F", "#EE6617", "#FFBF00", "#423E6E", "#E24161"]);
  
  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(innerRadius);
  
  var pie = d3
    .pie()
    .sort(null)
    .value(function(d) {
      return +d.Amount;
    });
  
  let sliceDirection = 90;
  if (window.matchMedia("(max-width: 767px)").matches) {
    sliceDirection = 180;
  }
  
  var prevSegment = null;
  var change = function(d, i) {
    var angle =
      sliceDirection -
      (d.startAngle * (180 / Math.PI) +
        (d.endAngle - d.startAngle) * (180 / Math.PI) / 2);
  
    svg
      .transition()
      .duration(1000)
      .attr(
        "transform",
        "translate(" + radius + "," + height / 2 + ") rotate(" + angle + ")"
      );
    d3
      .select(prevSegment)
      .transition()
      .attr("d", arc)
      .style("filter", "");
    prevSegment = i;
  
    d3
      .select(i)
      .transition()
      .duration(1000)
      .attr("d", arcOver)
      .style("filter", "url(#drop-shadow)");
  };
  
  var svg = d3
    .select("#piechart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr(
      "viewBox",
      "0 0 " + Math.min(width, height) + " " + Math.min(width, height)
    )
    .attr("preserveAspectRatio", "xMinYMin")
    .append("g")
    .attr("transform", "translate(" + radius + "," + height / 2 + ")")
    .style("filter", "url(#drop-shadow)");
  
  var defs = svg.append("defs");
  var filter = defs
    .append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");
  
  filter
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5.5)
    .attr("result", "blur");
  
  filter
    .append("feOffset")
    .attr("in", "blur")
    .attr("dx", 0)
    .attr("dy", 0)
    .attr("result", "offsetBlur");
  
  var feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "offsetBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  
  var buttonToggle = true;
  var switchToggle = () => {
    setTimeout(() => {
      buttonToggle = true;
    }, 1500);
  };
  
  var timeline = new TimelineLite();
  
  var g = svg
    .selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .style("fill", function(d) {
      return color(d.data.Title);
    })
    .attr("d", arc)
    .style("fill", function(d) {
      return color(d.data.Title);
    })
    .on("click", function(d) {
      if (buttonToggle) {
        buttonToggle = false;
        switchToggle();
  
        change(d, this);
  
        var timeline = new TimelineLite();
  
        timeline
          .to(".contentwrapper", 0.5, {
            rotationX: "90deg",
            opacity: 0,
            ease: Linear.easeNone,
            onComplete: () => {
              $(".contentwrapper").hide();
            }
          })
          .to(".panel", 0.5, {
            width: "0%",
            opacity: 0.05,
            ease: Linear.easeNone,
            onComplete: () => {
              $("#segmenttitle").replaceWith(
                `<h1 id="segmenttitle">${d.data.Title} - ${Math.round(
                  d.data.Amount / total * 1000
                ) / 10}%</h1>`
              );
              $("#segmenttext").replaceWith(
                '<p id="segmenttext">' + d.data.Description + "</p>"
              );
              $(".panel").css(
                "background-color",
                `${ColorLuminance(color(d.data.Title), -0.3)}`
              );
            }
          });
  
        timeline
          .to(".panel", 0.5, {
            width: "100%",
            opacity: 1,
            ease: Linear.easeNone,
            onComplete: () => {
              $(".contentwrapper").show();
            }
          })
          .to(".contentwrapper", 0.5, {
            rotationX: "0deg",
            opacity: 1,
            ease: Linear.easeNone
          });
      }
    });
  
  timeline
    .from("#piechart", 0.5, {
      rotation: "-120deg",
      scale: 0.1,
      opacity: 0,
      ease: Power3.easeOut
    })
    .from(
      ".panel",
      0.75,
      {
        width: "0%",
        opacity: 0,
        ease: Linear.easeNone,
        onComplete: () => {
          $(".contentwrapper").show();
        }
      },
      "+=.55"
    )
    .from(".contentwrapper", 0.75, {
      rotationX: "-90deg",
      opacity: 0,
      ease: Linear.easeNone
    });
  
  function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
  
    var rgb = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
  
    return rgb;
  }
