const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElm = document.getElementById('current-time');
const durationElm = document.getElementById('duration');


// Music
const songs = [
  {
    name: 'scorpions-send-me-an-angel',
    displayName: 'Send Me An Angel',
    artist: 'Scorpions'
  },

  {
    name: 'scorpions-still-loving-you',
    displayName: 'Still Loving You',
    artist: 'Scorpions'
  },
  
  {
    name: 'scorpions-wind-of-change',
    displayName: 'Wind Of Change',
    artist: 'Scorpions'
  }
];

// Current Song
let songIndex = 0;

// Check if playing
let isPlaying = false;

// Play/Pause music
function playPause() {

  if (!isPlaying) {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play();
  } else {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause();
  }

}

// Update Music
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

// Switch to the next song
function nextSong() {
  songIndex = songIndex === songs.length - 1 ? 0 : ++songIndex;
  let song = songs[songIndex];
  loadSong(song);
  music.play();
}

// Switch to previous song
function prevSong() {
  songIndex = songIndex === 0 ? songs.length - 1 : --songIndex;
  let song = songs[songIndex];
  loadSong(song);
  music.play();
}

// Update Progress bar and time
function updateProgressBar(e) {

  if (isPlaying) {

    const { currentTime, duration } = e.srcElement;  

    // Get percentage to update progress bar 
    const progressPercent = currentTime / duration * 100;
    progress.style.width = `${progressPercent}%`;

    // Convert duration into min:sec
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    // Delay switching duration to avoid NaN
    if (durationSeconds) {
      durationElm.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Comvert currentTime into min:sec
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    currentTimeElm.textContent = `${currentMinutes}:${currentSeconds}`;

  }

}

// Set progress bar and seek music
function seekMusic(e) {

  const width = this.clientWidth;
  const clickPos = e.offsetX;
  const { duration } = music;
  const seekToSecond = Math.floor(clickPos / width * duration);
  music.currentTime = seekToSecond;
  progress.style.width = `${Math.floor(clickPos / width * 100)}%`;
}

// Event Listeners
playBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', seekMusic);
music.addEventListener('ended', nextSong);

// On Load - Select first song
loadSong(songs[songIndex]);