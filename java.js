// array of gifs
var gifArray = [];
//on click event for text input submit button
$("#add-gif").on("click", function(event) {
  // setting var gif to the trimmed input value of the text box
  var gif = $("#gif-input")
    .val()
    .trim();
  // setting the url for the api with our gif var inside
  var queryURL =
    "https://api.giphy.com//v1/gifs/search?q=" +
    gif +
    "&limit=10&api_key=dc6zaTOxFJmzC";
  //ajax, not the stuff you clean the floor with
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //setting the initial response as an array
    var gifResponse = response.data;
    //for loop to dynamically create a div for each word entered into the text box
    for (let i = 0; i < gifResponse.length; i++) {
      //create the div, give it a class
      var gifDiv = $("<div class='gifDiv'>"),
        //create div for images, set attributes, url, etc
        gifImg = $("<img>")
          .attr("src", gifResponse[i].images.fixed_height.url)
          .attr("data-still", gifResponse[i].images.downsized_still.url)
          .attr("data-animate", gifResponse[i].images.downsized.url)
          .attr("class", "gif")
          .attr("data-state", "animate"),
        //give class equal to the rating
        gifRating = $("<div class='gifRating'>").text(
          "Rating: " + gifResponse[i].rating
        );
      // add all that biz to the end of the div
      gifDiv.append(gifImg);
      gifDiv.append(gifRating);
      //add the gif div to the beginning of the gif container
      $("#gif-container").prepend(gifDiv);
    }
  });
});
//function to render the buttons
function renderButtons() {
  // empty it first
  $("#button-dump").empty();
  // loop to generate a button for each word that is entered into the text area
  for (let i = 0; i < gifArray.length; i++) {
    // create the div for the button
    var gifButton = $("<button>");
    // add attributes, inner text
    gifButton.addClass("gif-name");
    gifButton.attr("data-name", gifArray[i]);
    gifButton.text(gifArray[i]);
    // add the button to the end of the button dump div
    $("#button-dump").append(gifButton);
  }
}
// on click event for adding the value of the text box to the render button function
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  //variable for the text itself, trims it
  var gif = $("#gif-input")
    .val()
    .trim();
  // pushes it to the array to be looped
  gifArray.push(gif);
  // runs the button render
  renderButtons();
});

// THIS DOES NOT WORK AND IT SHOULD?! VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

$("div").delegate("img", "click", function() {
  var state = $("img").attr("data-state");
  if (state === "still") {
    console.log(this);
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$("#button-dump").on("click", function() {
  alert(this + "clicked!"); // damn things wont even spit out a console logs
});

// THIS DOES NOT WORK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
