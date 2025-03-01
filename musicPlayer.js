window.onload = () => {
  const song = [];
  song["01. Title"] = "music/01. Title.mp3";
  song["87. I Just Love The 50s!!!"] = "music/87.I Just Love The 50s!!!.mp3";
  song["100. Not So Empty House"] = "music/100. Not-So-Empty-House.mp3";
  song["124. Flouring With You"] = "music/124. Flouring With You.mp3";
  song["127. Rembering To Be Patient"] =
    "music/127. Remember To Be Patient.mp3";
  song["172. DUET"] = "music/172. DUET.mp3";
  song["175. Good Morning"] = "music/177. Good Morning.mp3";
  song["178. My Time"] = "music/178. My Time.mp3";

  const songTitles = Object.keys(song);
  let currentSongIndex = 0;

  const playPauseButton = document.getElementById("playPause");
  const forward = document.getElementById("forward");
  const backward = document.getElementById("back");
  const record = document.getElementById("record");
  const needle = document.getElementById("needle");
  const title = document.getElementById("Musictitle");
  const progressBar = document.getElementById("progressBar");

  const audio = new Audio();

  const updateSongTitle = () => {
    title.innerHTML = songTitles[currentSongIndex];
    audio.src = song[songTitles[currentSongIndex]];
    audio.load();
  };

  updateSongTitle();

  const updateProgressBar = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  };

  audio.addEventListener("timeupdate", updateProgressBar);

  progressBar.addEventListener("input", (event) => {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  playPauseButton.addEventListener("click", () => {
    if (playPauseButton.src.includes("play.png")) {
      playPauseButton.src = "images/pause.png";
      record.classList.add("record-rotate");
      audio.play();
    } else {
      playPauseButton.src = "images/play.png";
      record.classList.remove("record-rotate");
      audio.pause();
    }
  });

  forward.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songTitles.length;
    updateSongTitle();
    if (playPauseButton.src.includes("pause.png")) {
      audio.play();
    }
  });

  backward.addEventListener("click", () => {
    currentSongIndex =
      (currentSongIndex - 1 + songTitles.length) % songTitles.length;
    updateSongTitle();
    if (playPauseButton.src.includes("pause.png")) {
      audio.play();
    }
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play();
  });
};
