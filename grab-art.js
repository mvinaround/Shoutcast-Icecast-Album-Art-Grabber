/*
	Requires JQuery.
	Requires a Last.gm API Key.
	Also requires a CentovaCast Audio Server.





*/
function findUrl(image, size) {
    var n, entry;
    try{
        for (n = 0; n < image.length; ++n) {
            entry = image[n];
            if (entry.size == size) { return entry["#text"];}
        	}
        	return "";
    	}
    catch(e){
        return "";
        console.log("Error:")
        console.log(e)
    }
}

var ImageURL = "" // Stores the grabbed song here, going to be updating soon so it gives it back in a return from the function.

function GetCurrentTrack(){

	var StreamInfoURL = "" //Stream Info from the server.
	var Artist = ""
	var Title = ""
	var LastFMAPIKey = "" //Your Last FM API Key
	
	$.getJSON(StreamInfoURL).done(function(data){

		Artist = (data.data[0].track.artist)
		Title = (data.data[0].track.title)

		if(Artist.length > 0 ){
			if(Title.length > 0){

				var LastFMURL = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + LastFMAPIKey + "&artist=" + encodeURIComponent(Artist) + "&track=" + encodeURIComponent(Title) + "&format=json"

				$.getJSON(LastFMURL).done(function(data) {
					try{
						ImageURL = findUrl(data.track.album.image,"large") 
					}
					catch(e){
						console.log("---[ Album Art Grabber ]---")
						console.log("Unable to find album art on last.fm")
						console.log("--- ------------------- ---")
					}
				})
			}	
		}

	})
}