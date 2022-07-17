function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildGChart(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGChart(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samplesData = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesData.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var sampleValues = result.sample_values;
    var otuLabels = result.otu_labels;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // var yticks = 
    var sortedOTUids = otuIds.slice(0, 10).map(otuIdValues => `OTU ${otuIdValues}`).reverse()
    var sortedSampleValues = sampleValues.slice(0, 10).reverse()

   console.log(sortedOTUids, "Sorted OTU IDs");
   console.log(data, "data");

 
  //  var sortedOTUids = otuIds.slice(0, 10).map(x => `OTU ${x}`).reverse();
    // 8. Create the trace for the bar chart. 
    var barData = {
      y: sortedOTUids,
      x: sortedSampleValues,
      type: "bar",
      orientation: "h",
      text: otuLabels
    };
 // 9. Create the layout for the bar chart. 
    var data = [barData];
    var layout = {
      title: "Top Ten Bacteria Cultures Found"   
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("barPlot", data, layout);

// DELIVERABLE II

    var bubbleData = {
       
        x: otuIds,
        y: sampleValues,
        mode: 'markers',
        text: otuLabels,
        marker: {
          color: otuIds,
          size: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 150],
          // size: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
          colorscale: [1,2,3,4,5,6,7,8,9,10],
          
          //'rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'
        }
      };
        // 2. Create the layout for the bubble chart.
      var data = [bubbleData],
      bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        type: "scatter",
        showlegend: false,
        height: 600,
        width: 1200        
      }
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", data, bubbleLayout);

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var metadata = data.metadata;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var washdata = result.wfreq

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    
// Create variables that hold the otu_ids, otu_labels, and sample_values.
 
    // 3. Create a variable that holds the washing frequency.

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
   
  });
}

  });
}

function buildGChart(sample) {
  d3.json("samples.json").then((data) => {
  var metadata = data.metadata;
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var washResults = resultArray[0];
  var washingFrequency = parseFloat (washResults.wfreq);
  

  
  //MOVE GAUGE CODE HERE 
  var data = [
    {
      // domain: {0, 10,
      value: washingFrequency,
      title: { text: "Wash" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 10] },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "yellowgreen" },
          { range: [8, 10], color: "green" },
        ],
        threshold: {
          line: { color: "black", width: 4 },
          thickness: 0.75,
          value: 10
        }

        
      }
    }
  ];
  Plotly.newPlot("gauge", data);
});
}