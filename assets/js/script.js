const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.getElementById("lyricsContainer");
const localStorageKey = "selectedSong";
const searchQuery = document.getElementById("searchInput");
const query = searchQuery.value;
const searchButton = document.getElementById("searchButton")
const musicAPIKey = "0996a1c4acbf700517ecfedf926ddcde"
const lyricsAPIKey = "edb60ff7bf4e024322127eafa296dd31"

// Define your API endpoints for retrieving lyrics and songs
const lyricsAPI = "https://api.musixmatch.com/ws/1.1/artist.search?q_artist=prodigy&page_size=5&apikey=" + lyricsAPIKey;
//const songsAPI = "https://ws.audioscrobbler.com//2.0/?method=artist.gettoptracks&artist=" + searchQuery +"&api_key=" + musicAPIKey + "&format=json";
//const songsAPI = `https://ws.audioscrobbler.com//2.0/?method=artist.gettoptracks&artist=${query}&api_key=${musicAPIKey}&format=json`;

;

// Fetch lyrics for a given song and display them
// function fetchLyrics() {
// $.ajax({
//   type:"GET",
//   data: {
//     apikey: "edb60ff7bf4e024322127eafa296dd31",
//     q_artist: "Nickelback",
//     format: "jsonp",
//     callback: "jsonp_callback"
//   },
//   url: "https://api.musixmatch.com/ws/1.1/artist.search",
//   dataType: "jsonp",
//   jsonpCallback: "jsonp_callback",
//   contentType: "application/json",
//   success: function(data) {
//     
//   },
//   error: function(jqHXR, textStatus, errorThrown) {
//     // console.log(jqHXR)
//   }
// })
//   // fetch(lyricsAPI)
//   //   .then((response) => response.json())
//   //   .then((data) => {
//   //     console.log(data)
//   //     if (data.lyrics) {
//   //       lyricsContainer.innerText = data.lyrics;
//   //     } else {
//   //       lyricsContainer.innerText = "Lyrics not found for this song.";
//   //     }
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error:", error);
//   //     lyricsContainer.innerText = "Failed to fetch lyrics.";
//   //   });
// }
// fetchLyrics()
// Fetch a list of songs from your music API and populate the player



  
function fetchSongs() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value;

  const songsAPI = `https://ws.audioscrobbler.com//2.0/?method=artist.gettoptracks&artist=${query}&api_key=${musicAPIKey}&format=json`;


  fetch(songsAPI)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
          const track = data[key];
          const option = document.createElement("option");
          option.text = `${track.artist} - ${track.name}`;
          option.value = track.fileURL;
          audioPlayer.appendChild(option);
        });
      } else {
        console.error("Error: Data is not an object");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      lyricsContainer.innerText = "Failed to fetch songs.";
    });
}











     //Retrieve the selected song from local storage and set it as the default selection
      // const selectedSong = localStorage.getItem(localStorageKey);
      // if (selectedSong) {
      //   audioPlayer.value = selectedSong;
      //   const [artist, title] = selectedSong.split(" - ");
      //   fetchLyrics(artist, title);
      // }

  // .catch((error) => {
  //     console.error("Error:", error);
  //     lyricsContainer.innerText = "Failed to fetch songs.";
  // })
// }

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  // Get the search query from the input field
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value;

console.log(query)
  // Call the fetchSongs function with the search query
 fetchSongs(query);
});

// Event listener for when a song is selected from the dropdown
audioPlayer.addEventListener("change", (event) => {
  const selectedSong = event.target.value;
  // Load the selected song
  audioPlayer.src = selectedSong;

  // Extract the artist and title from the selected song
  const [artist, title] = selectedSong.split(" - ");
  // Fetch the lyrics for the selected song
  fetchLyrics(artist, title);

  // Save the selected song to local storage
  localStorage.setItem(localStorageKey, selectedSong);
});

// Fetch songs when the page loads
// fetchSongs();
