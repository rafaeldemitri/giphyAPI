var giphys = ["Cars", "Football", "Dogs"];

var pullGiphy =  function(){

	event.preventDefault();

    var giphy = $(this).attr("data-name");

    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=e0dbbd7747254ab4a57fc7fccd063e49&q=" + giphy + "&limit=10&offset=0&rating=g&lang=en";
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);

    	for (var i= 0; i < response.data.length; i++) {

        var newImage = $("<img>").attr("src", response.data[i].images.original_still.url);

        $(newImage).attr("style", "height: 100px;");

        $(newImage).attr("data-state", "still");

        $(newImage).val(response.data[i].images);


        //$("<img>").attr("src", response.data[0].images.original.url);

        $("#gif").append(newImage);

    }

    });
    
   
};

	function animate() {

		event.preventDefault();

		if ($(this).attr("data-state") === "still") {

			$(this).attr("src", $(this).val().original.url);

			$(this).attr("data-state", "moving");

		}	else {

			$(this).attr("src", $(this).val().original_still.url);

			$(this).attr("data-state", "still");
		}




	}

 $(document).on("click", "img", animate);

 $(document).on("click", "button", pullGiphy);


function renderButton() {

	$("#giphys").empty()


	for (var i = 0; i < giphys.length; i++) {

		var butt = $("<button>");

		butt.addClass("giphy");
		butt.addClass("booty")

		butt.attr("data-name", giphys[i]);

		butt.text(giphys[i]);

		$("#giphys").append(butt);
	}
};

renderButton()

function addButton() {

	$("#formButton").on("click", function(event) {

		event.preventDefault();

		var newButt = $("#formText").val().trim();

		giphys.push(newButt);

		renderButton()
	});

}


addButton()
