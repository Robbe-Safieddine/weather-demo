$(function () {
  // React to hitting enter in the text box instead of clicking submit.
  $("#search-weather").submit(function (e) {
    $('#forecast').empty();
    e.preventDefault();
    clearResult('');

    // Get the weather info for the selected search location.
    $.get("/weather.php?query=" + $("#search").val(), function (data) {
      // Show weather results.
      data = JSON.parse(data)
      if (data.temp_f) {
        showResult(data);
      } else {
        clearResult('No valid data for your location.');
      }
    });
  });



  function clearResult($msg = 'Sorry Charlie! Not a valid input.') {
    $(".weather_icon").attr("src", "images/trans.png");
    $("#location").hide();
    $("#city").text();
    $("#state").text();
    $(".result .description").html($msg);
    $(".forecast").html()

  }

  function clearSearch() {

    let numb = document.getElementById("forecast").childElementCount;


    if (numb > 3) {
      document.getElementById("forecast").innerHTML = "";
    }
  }

  function showResult(data) {

    let selectBox = document.getElementById("weatherDisplay")
    if (weatherDisplay.checked) {
      var numDays = 3;
    } else {
      var numDays = 1;
    }
    for (let i = 0; i < numDays; i++) {
      let dayContainer = $('<div></div>')
        .attr('id', 'forecast-${i}')
        .addClass('forecast-day-box')
        .addClass('weather-box');
      let imageData = $('<img/>').attr(
        'src',
        data.forecast[i].day.condition.icon
      );
      let dateData = $('<p></p>').text(data.forecast[i].date);
      let forecastDesc =
        data.forecast[i].day.condition.text +
        ' and an average of ' +
        data.forecast[i].day.avgtemp_f +
        '&deg; F';
      let descriptionData = $('<p></p>').html(forecastDesc);
      $(dayContainer).append(dateData);
      $(dayContainer).append(imageData);
      $(dayContainer).append(descriptionData);
      $('.forecast').append(dayContainer);
    }
  }


  //Clear results when Submit button is clicked
  var clearButton = document.getElementById("submit")

  //Clears results from other days, only shows data for day 1

  //$('#currentButton').on('click', currentWeather)

  // function currentWeather() {
  //   $('.forecast').hide();
  //   $('#location').text('Current weather in')
  //   $('.current').show();
  //   $('forecastDesc').append()


  // const list = document.getElementById("forecast")
  // if (list.hasChildNodes()) {
  //   list.removeChild(list.children[1]);
  //   list.removeChild(list.children[2]);
  //   list.removeChild(list.children[3]);
  // }
  // console.log('currentWeather')
})