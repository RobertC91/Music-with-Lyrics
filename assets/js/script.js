const audioPlayer = document.getElementById("audioPlayer");
const lyricsContainer = document.getElementById("lyrics");
const localStorageKey = "selectedSong";

// Define your API endpoints for retrieving lyrics and songs
const lyricsAPI = "";
const songsAPI = "";

// Fetch lyrics for a given song and display them
function fetchLyrics(artist, title) {
  fetch(`${lyricsAPI}/${artist}/${title}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.lyrics) {
        lyricsContainer.innerText = data.lyrics;
      } else {
        lyricsContainer.innerText = "Lyrics not found for this song.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      lyricsContainer.innerText = "Failed to fetch lyrics.";
    });
}

// Fetch a list of songs from your music API and populate the player
function fetchSongs() {
  fetch(songsAPI)
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of song objects with properties like artist and title
      data.forEach((song) => {
        const option = document.createElement("option");
        option.text = `${song.artist} - ${song.title}`;
        option.value = song.fileUrl;
        audioPlayer.appendChild(option);
      });

      // Retrieve the selected song from local storage and set it as the default selection
      const selectedSong = localStorage.getItem(localStorageKey);
      if (selectedSong) {
        audioPlayer.value = selectedSong;
        const [artist, title] = selectedSong.split(" - ");
        fetchLyrics(artist, title);
      }
    })

    .catch((error) => {
      console.error("Error:", error);
      lyricsContainer.innerText = "Failed to fetch songs.";
    });
}

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
  localStorage.setItem(localStorageKey, selectedSong)
});

// Fetch songs when the page loads
fetchSongs();
