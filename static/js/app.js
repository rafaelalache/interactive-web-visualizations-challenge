console.log('This is app.js');


function DrawBargraph(sampleId)
{
    console.log('DrawBargraph(${sampleId})');
}

function DrawBubblechart(sampleId)
{
    console.log('DrawBubblechart(${sampleId})');
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

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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