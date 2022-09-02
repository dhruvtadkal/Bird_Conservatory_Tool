class mainnav extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand text-black" href="index.html">Home</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu<i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link text-black" href="select.html">Select</a></li>
                        <li class="nav-item"><a class="nav-link text-black" href="summary_report.html">Summary</a></li>
                        <li class="nav-item"><a class="nav-link text-black" href="detailed_report.html">Detailed</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        `
    }
}
customElements.define('main-nav',mainnav)


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

let url1 = 'https://raw.githubusercontent.com/dhruvtadkal/plotly/main/response_1661253641153.json'

//fetching values
fetch(url1).then(res => res.json()).then(json => {
    let value1 = json["No of species:"];
    //document.getElementById("value1").innerHTML = value1;
    let value2 = json["No of Observers:"];
    //document.getElementById("value2").innerHTML = value2;

    //table
    var values = [
        ['No of species', 'No of observers'],
        [value1, value2]
    ];

    var headerColor = "#64a19d";
    var rowEvenColor = "lightgrey";
    var rowOddColor = "white";

    var data = [{
    type: 'table',
    header: {
    values: [["<b>Summary</b>"]],
    align: "center",
    line: {width: 1, color: 'black'},
    fill: {color: headerColor},
    font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
    values: values,
    align: "center",
    line: {color: "black", width: 1},
    fill: {color: [[rowOddColor,rowEvenColor,rowOddColor,
                            rowEvenColor,rowOddColor]]},
    font: {family: "Arial", size: 11, color: ["black"]}
    }
    }]

    Plotly.newPlot('myTable', data);
})

//fetching json data (IUCN Count)
Plotly.d3.json(url1, function(figure){
    let x1 = [];
    let y1 = [];
    let data = figure["IUCN Count:"];
   
    var count = Object.keys(data["iucnstatus"]).length;
    //console.log(count);
    
    for (var i=0; i<count; i++){
        x1.push(data["iucnstatus"][i])
        y1.push(data["No of Species by IUCN"][i]) 
    }

    let trace = {
        x: x1,
        y: y1,
        type: "bar"
    }
    Plotly.plot(document.getElementById('graph1'), [trace]);
})

//fetching json data (SOIB Count)
Plotly.d3.json(url1, function(figure){
    
    let data = figure["SOIB Count:"];
   
    var count = Object.keys(data["longtermstatus"]).length;
  
    let z = new Set();
    let k=0;
    for(var i=0; i<count; i++){
        z.add(data["longtermstatus"][i])
    }
    z = Array.from(z);
    
    let p = values(z[k])
    let trace1 = {
        x: p.x2,
        y: p.y2,
        name: 'Data Deficient',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace2 = {
        x: p.x2,
        y: p.y2,
        name: 'Moderate Decline',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace3 = {
        x: p.x2,
        y: p.y2,
        name: 'Moderate Increase',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace4 = {
        x: p.x2,
        y: p.y2,
        name: 'NA',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace5 = {
        x: p.x2,
        y: p.y2,
        name: 'Stable',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace6 = {
        x: p.x2,
        y: p.y2,
        name: 'Strong Decline',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace7 = {
        x: p.x2,
        y: p.y2,
        name: 'Strong Increase',
        type: 'bar'
    }
    
    p = values(z[k])
    let trace8 = {
        x: p.x2,
        y: p.y2,
        name: 'Uncertain',
        type: 'bar'
    }
    
    
    function values(value){
      let x2 = [];
      let y2 = [];
      for (var i=0; i<count; i++){
          if(data["longtermstatus"][i] == value){
              x2.push(data["currentstatus"][i])
              y2.push(data["No of Species by SoIB"][i]) 
          }
      }
      k=k+1;
      return {x2,y2};
    }
    
    var trace = [trace1,trace2,trace3,trace4,trace5,trace6,trace7,trace8];
  
    var layout = {
      xaxis: {title: 'Long term status'},
      yaxis: {title: 'No of species by SOIB'},
      barmode: 'relative',
      title: 'No of species according to SOIB status'
    };
  
    Plotly.newPlot('graph2', trace, layout);
})

//fetching json data (WLPA Count)
Plotly.d3.json(url1, function(figure){
    let x1 = [];
    let y1 = [];
    let data = figure["WLPA Count:"];
   
    var count = Object.keys(data["wlpaschedule"]).length;
    
    for (var i=0; i<count; i++){
        x1.push(data["wlpaschedule"][i])
        y1.push(data["No of Species by WLPA"][i]) 
    }

    let trace = {
        x: x1,
        y: y1,
        type: "bar"
    }
    Plotly.plot(document.getElementById('graph3'), [trace]);
})

//fetching json data (year Count)
Plotly.d3.json(url1, function(figure){
    let x1 = [];
    let y1 = [];
    let data = figure["Spread Across Years:"];
   
    var count = Object.keys(data["observationyear"]).length;
    
    for (var i=0; i<count; i++){
        x1.push(data["observationyear"][i])
        y1.push(data["No of Species"][i]) 
    }

    let trace = {
        x: x1,
        y: y1,
        // type: "bar"
    }
    Plotly.plot(document.getElementById('graph4'), [trace]);
})

//fetching json data (month Count)
Plotly.d3.json(url1, function(figure){
    let x1 = [];
    let y1 = [];
    let data = figure["Spread Across Months:"];
   
    var count = Object.keys(data["observationmonth"]).length;
    
    for (var i=0; i<count; i++){
        x1.push(data["observationmonth"][i])
        y1.push(data["No of Species"][i]) 
    }

    let trace = {
        x: x1,
        y: y1,
        // type: "bar"
    }
    Plotly.plot(document.getElementById('graph5'), [trace]);
})