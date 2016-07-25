function loadQuote() {
    var output = $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {
            //
            //Change data.source to data.something , where something is whichever part of the object you want returned.
            //To see the whole object you can output it to your browser console using:
            //console.log(data);
            var replaced = "";
            if (data.author == "unknown") {
              replaced = "https://onetoday.google.com/home/projects?utm_source=ifg";
            } else {
              replaced = "https://www.google.com/#q=" + data.author.replace(/ /g, '+');
            }

            var tweet = 'https://twitter.com/intent/tweet?hashtags=quotes&text="' + data.quote + '" ' + data.author;

            document.getElementById("quote").innerHTML = data.quote;
            document.getElementById("author").innerHTML = data.author;
            document.getElementById("authorLink").href = replaced;
            document.getElementById("tweetLink").href = tweet;

        },
        error: function(err) {
            alert(err);
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "EVjRipoPLsmshoLBwCpgOeVgrFdEp1yYRXdjsnZp9eyIr5xV53"); // Enter here your Mashape key
        }
    });
}
