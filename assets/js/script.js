let searchButton = document.getElementById("searchButton")
const musicAPIKey = "0996a1c4acbf700517ecfedf926ddcde"
let searchArtist = document.getElementById('artistSearch')
let searchSong = document.getElementById('songSearch')

function fetchLyrics() {
 
let songQuery = JSON.parse(localStorage.getItem('songQuery'))
let artistQuery = JSON.parse(localStorage.getItem('artistQuery'))

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
// Display History using Local Storage
function displayHistory() {
  
  let storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
  let history = document.getElementById('history')
  history.innetHTML = ''

  for (i = 0; i < storedSongs.length; i++) {
    let historyBtn = document.createElement('button');
    historyBtn.textContent = `${storedSongs[i]}`
    history.appendChild(historyBtn)
  }
  return
}

$(document).ready(function () {
  $("searchButton").on('click', function() {
    let songQuery = searchSong.val();
    let artistQuery = searchArtist.val()
    localStorage.setItem(artistQuery, songQuery);
    });
});


const localStorageKey = localStorage.getItem('searchSongsValue')



displayHistory()
fetchLyrics()


