let searchButton = document.getElementById("searchButton")
const musicAPIKey = "0996a1c4acbf700517ecfedf926ddcde"
let searchArtist = document.getElementById('artistSearch')
let searchSong = document.getElementById('songSearch')


function fetchLyrics() {
 
let songQuery = (localStorage.getItem('songQuery'))
let artistQuery = (localStorage.getItem('artistQuery'))

$.ajax({
  type:"GET",
  data: {
    apikey: "edb60ff7bf4e024322127eafa296dd31",
    q_track: songQuery,
    q_artist: artistQuery,
    format: "jsonp",
    callback: "jsonp_callback"
  },
  url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
  dataType: "jsonp",
  jsonpCallback: "jsonp_callback",
  contentType: "application/json",
  success: function(data) {
    console.log(data)
  },
  error: function(jqHXR, textStatus, errorThrown) {
    console.log(jqHXR)
  }  

})

// Take lyrics from API and display on page
.then(function (data) {
  console.log(data)

  let lyricInput = $('#lyrics')
  lyricInput.addClass('lyricContainer');

let lyrics = data.message.body.lyrics.lyrics_body;
console.log(lyrics)
let lyricsEl = $('<p>')
lyricsEl.text(lyrics)
lyricInput.append(lyrics)
})
}

$(document).ready(function() {
  window.reload
  $("#searchButton").on('click', function() {
    let songQuery = searchSong.value;
    let artistQuery = searchArtist.value;
    localStorage.setItem('songQuery', songQuery);
    localStorage.setItem('artistQuery', artistQuery);
    // songQuery = songQuery.getItem('songQuery');
    // console.log(songQuery)
    fetchLyrics(artistQuery,songQuery)
    });
});














