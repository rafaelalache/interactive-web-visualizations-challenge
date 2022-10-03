console.log('This is app.js');


const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function DrawBargraph(sampleId)
{
    console.log('DrawBargraph(${sampleId})');

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId); 
        let result = resultArray[0]

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuId => 'OTU ${otuId}').reverse();

        //Create a trace object
        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0, 10).reverse(),
            orientation: 'h'
        }

        //Put the trace object into an array
        let barArray = [barData];

        // Create a layout object
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found"
        }
        //Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);


    });
}

function DrawBubblechart(sampleId)
{
    console.log('DrawBubblechart(${sampleId})');

    d3.json(url).then(data => {
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels
        let sample_values = result.sample_values;

        //Create a trace
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                // colorscale: "Earth"
            }
        };
        //Put the trace into an array
        let bubbleArray = [bubbleData];

        //Create a layout object
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: { title: "OTU ID"}
        };
        //Call Plotly
        Plotly.newPlot("bubble".bubbleArray, bubbleLayout);
    })




}

function DrawGauge(sampleId)
{
    console.log('DrawGauge(${sampleId})');
}

function ShowMetadata(sampleId)
{
    console.log('ShowMetadata(${sampleId})');
}

function optionChanged(sampleId)
{
    console.log('optionChanged, new value: ${sampleId}');

    DrawBargraph(sampleId);
    DrawBubblechart(sampleId);
    ShowMetadata(sampleId);
    DrawGauge(sampleId);
}

function InitDashboard()
{
    console.log('InitDashboard()');

    // Get a handle to the dropdown
    let selector =d3.select("#selDataset");

    d3.json(url).then(data => {
        console.log("Here's the data:", data);

        let sampleNames = data.names; 
        console.log("Here are the sample names:", sampleNames);

        // Populate the dropdown box
        for (let i = 0; i < sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            selector.append("option").text(sampleId).property("value", sampleId);
        
        };

        // Read the current value form the dropdown
        let initialId = selector.property("value");
        console.log('initialId = ${initialId}');

        //Draw the bargraph for the selected sample ID
        DrawBargraph(initialId);

        // Draw the bubblechart for the selected sample ID
        DrawBubblechart(initialId);

        // Show me the metadata the selected sample ID
        ShowMetadata(initialId);

        //Show the gauge
        DrawGauge(initialId);




    });






}

InitDashboard();