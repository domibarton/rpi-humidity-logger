function makeChart(number)
{
    var id            = 'chart' + number;

    var temperature   = '<span class="temperature">' + RECENT['temperature' + number] + '</span>';
    var humidity      = '<span class="humidity">' + RECENT['humidity' + number] + '</span>';
    var heading       = '<h2>Sensor ' + number + temperature + humidity + '</h2>';
    var chart         = '<div id="' + id + '" class="chart"></div>';

    $('#chart-container').append(heading + chart);

    AmCharts.makeChart(id, {
        'type': 'serial',
        'dataProvider': DATA_PROVIDER,
        'synchronizeGrid': true,
        'categoryField': 'date',
        'categoryAxis': {
            'minPeriod': 'ss',
            'parseDates': true,
            'minorGridAlpha': 0.1,
            'minorGridEnabled': true
        },
        'valueAxes': [
            {
                'id':'temperature-axis',
                'axisColor': '#c06060',
                'axisThickness': 2,
                'axisAlpha': 1,
                'position': 'left'
            },
            {
                'id':'humidity-axis',
                'axisColor': '#6080c0',
                'axisThickness': 2,
                'axisAlpha': 1,
                'position': 'right'
            }
        ],
        'graphs': [
            {
                'id': 'temperature' + number,
                'title': 'Temperature',
                'valueField': 'temperature' + number,
                'valueAxis': 'temperature-axis',
                'type': 'smoothedLine',
                'lineThickness': 2,
                'lineColor': '#c06060',
                'bullet': 'round',
                'bulletSize': 6,
                'balloonText': '[[value]] ºC',
                'balloon': {
                    'drop': true,
                    'adjustBorderColor': false,
                    'color': '#ffffff'
                }
            },
            {
                'id': 'humidity' + number,
                'title': 'Humidity',
                'valueField': 'humidity' + number,
                'valueAxis': 'humidity-axis',
                'type': 'smoothedLine',
                'lineThickness': 2,
                'lineColor': '#6080c0',
                'fillAlphas': 0.25,
                'bullet': 'round',
                'bulletSize': 6,
                'balloonText': '[[value]] %',
                'balloon': {
                    'drop': true,
                    'adjustBorderColor': false,
                    'color': '#ffffff'
                }
            },
        ],
        'legend': {
            'useGraphSettings': true,
        },
        'chartCursor': {
            'pan': true,
            'categoryBalloonDateFormat': 'D. MMMM, JJ:NN:SS',
            'valueLineEnabled': true,
            'valueLineBalloonEnabled': true,
            'cursorAlpha': 1,
            'cursorColor': '#909090',
            'valueLineAlpha': 0.25,
            'valueZoomable': true
        },
        'chartScrollbar': {
            'graph': 'humidity' + number,
            'oppositeAxis': false,
            'offset': 30,
            'scrollbarHeight': 50,
            'backgroundAlpha': 0,
            'graphFillAlpha': 0.25,
            'graphLineAlpha': 0.25,
            'selectedGraphFillAlpha': 0.5,
            'selectedGraphLineAlpha': 0.5,
            'selectedBackgroundAlpha': 0.5,
            'selectedBackgroundColor': '#e7ecf1',
            'autoGridCount': true,
            'color':'#909090'
        },
    });

}

$(document).ready(function()
{
    for(i=1; i<=SENSORS; i++)
    {
        makeChart(i);
    }
});