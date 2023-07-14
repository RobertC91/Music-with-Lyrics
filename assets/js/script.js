const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.getElementById("lyricsContainer");
const searchedSongs = document.getElementById("storedSongText");
const searchInput = document.getElementById('searchInput')
const artistQuery = "Immortal Technique"
const searchButton = document.getElementById("searchButton")
const musicAPIKey = "0996a1c4acbf700517ecfedf926ddcde"
const lyricsAPIKey = "edb60ff7bf4e024322127eafa296dd31"




// Fetch lyrics for a given song and display them
function fetchLyrics() {
  const songQuery = searchInput.value
  console.log(songQuery)
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
.then(function(data) {
  // grab lyrics and append them to the page
  let lyricData = data.message.body.lyrics.lyrics_body;
  lyricsContainer.append(lyricData)
})
}



// Event listener for when a song is selected from the dropdown
audioPlayer.addEventListener("change", (event) => {
const selectedSong = event.target.value;
// Load the selected song
audioPlayer.src = selectedSong;

// Save the selected song to local storage
localStorage.setItem(localStorageKey, selectedSong);
});
 
searchButton.addEventListener('click', function() {
    // take input information and send it to API
    const inputValue = searchInput.value    
    localStorage.setItem('searchInputValue', inputValue)
    console.log(inputValue)
 })

 const savedValue = localStorage.getItem('searchInputValue');
 
 searchedSongs.textContent = savedValue;

 fetchLyrics()


