// array of gifs
      var gifArray = [];


      $("#add-gif").on("click", function (event) {

        var gif = $("#gif-input").val().trim();

        var queryURL = "https://api.giphy.com//v1/gifs/search?q=" + gif + "&limit=10&api_key=dc6zaTOxFJmzC"

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {

          var gifResponse = response.data

          for (let i = 0; i < gifResponse.length; i++) {

            var gifDiv = $("<div class='gifDiv'>")

            var gifImg = $("<img>").attr("src", gifResponse[i].images.fixed_height.url).attr("data-still", gifResponse[i].images.downsized_still.url).attr("data-animate", gifResponse[i].images.downsized.url).attr("class", "gif").attr("data-state", "still")

            var gifRating = $("<div class='gifRating'>").text("Rating: " + gifResponse[i].rating)

            gifDiv.append(gifImg)

            gifDiv.append(gifRating)

            $("#gif-container").prepend(gifDiv)
          }

        })
      })

      function renderButtons() {

        $("#button-dump").empty()

        for (let i = 0; i < gifArray.length; i++) {

          var gifButton = $("<button>");

          gifButton.addClass("gif-name")
          gifButton.attr("data-name", gifArray[i])
          gifButton.text(gifArray[i])


          $("#button-dump").append(gifButton)
        }
      }

      $("#add-gif").on("click", function (event) {

        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        gifArray.push(gif)

        renderButtons();

      });

// THIS DOES NOT WORK AND IT SHOULD?! VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

      $(".gif").on("click", function () {
        console.log(this + "clicked")
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

   $("#gif-name").on("click",function() {
        console.log(this + "clicked!")
      });

// THIS DOES NOT WORK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^