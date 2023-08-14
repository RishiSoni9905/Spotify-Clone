let index = 1;
let masterPlay = document.getElementById("masterPlay");
let playicon = document.getElementById("playicon");
let songItem = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  { songName: "Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  {
    songName: "Tokyo Drift",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "Rap God", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Power", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  {
    songName: "Heat Waves",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  { songName: "Believer", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Thunder", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Godzilla", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Venom", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "Cowbell Warrior",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];
songItem.forEach((element, i) => {
  element.getElementsByClassName("title")[0].innerText = songs[i].songName;
});
// audioElement.play();
var audioElement = new Audio("songs/1.mp3");
document.getElementById("playicon").style.display = "none";

//Volume bar

let volumeControl = document.getElementById("volumeControl");

audioElement.volume = volumeControl.value;

volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value;
});

//Handle music state

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    document.getElementById("masterPlay").style.display = "none";
    document.getElementById("playicon").style.display = "";
    document.getElementById("gif").style.opacity = 1;
  }
});

playicon.addEventListener("click", () => {
  if (audioElement.play) {
    audioElement.pause();
    document.getElementById("playicon").style.display = "none";
    document.getElementById("masterPlay").style.display = "";
    document.getElementById("gif").style.opacity = 0;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      document.getElementById("masterPlay").style.display = "none";
      document.getElementById("playicon").style.display = "";
      document.getElementById("gif").style.opacity = 1;
    } else {
      audioElement.pause();
      document.getElementById("playicon").style.display = "none";
      document.getElementById("masterPlay").style.display = "";
      document.getElementById("gif").style.opacity = 0;
    }
  }
});

//Song Play
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("listicon")).forEach((element) => {
    element.classList.add("fa-play");
    element.classList.remove("fa-pause");
    audioElement.pause();
  });
};

Array.from(document.getElementsByClassName("listicon")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    index = parseInt(e.target.id);
    audioElement = new Audio(`songs/${index}.mp3`);

    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    audioElement.currentTime = 0;

    masterSongName.innerText = songs[index - 1].songName;

    progress = parseInt(
      Number((audioElement.currentTime / audioElement.duration) * 1000)
    );
    audioElement.addEventListener("timeupdate", () => {
      progress = parseInt(
        Number((audioElement.currentTime / audioElement.duration) * 1000)
      );
      document.getElementById("myProgressBar").value = progress;
    });

    audioElement.volume = volumeControl.value;

    volumeControl.addEventListener("input", () => {
      audioElement.volume = volumeControl.value;
    });

    audioElement.play();
    document.getElementById("playicon").style.display = "";
    document.getElementById("masterPlay").style.display = "none";
    document.getElementById("gif").style.opacity = 1;
  });
});
//Forward and backward

let nextSong = document.getElementById("forward").addEventListener("click", () => {
  if (index >= 9) {
    index = 1;
  } else {
    index += 1;
  }
  makeAllPlays();
  audioElement = new Audio(`songs/${index}.mp3`);
  masterSongName.innerText = songs[index - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  document.getElementById("playicon").style.display = "";
  document.getElementById("masterPlay").style.display = "none";

  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt(
      Number((audioElement.currentTime / audioElement.duration) * 1000)
    );
    document.getElementById("myProgressBar").value = progress;
  });
  audioElement.volume = volumeControl.value;

  volumeControl.addEventListener("input", () => {
    audioElement.volume = volumeControl.value;
  });
});


let lastSong = document.getElementById("backward").addEventListener("click", () => {
  if (index <= 1) {
    index = 10;
  } else {
    index -= 1;
  }
  makeAllPlays();
  audioElement = new Audio(`songs/${index}.mp3`);
  masterSongName.innerText = songs[index - 1].songName;
  audioElement.currentTime = 0;

  audioElement.play();
  document.getElementById("playicon").style.display = "";
  document.getElementById("masterPlay").style.display = "none";
  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt(
      Number((audioElement.currentTime / audioElement.duration) * 1000)
    );
    document.getElementById("myProgressBar").value = progress;
  });

  audioElement.volume = volumeControl.value;

  volumeControl.addEventListener("input", () => {
    audioElement.volume = volumeControl.value;
  });
});

//Listen to events
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt(
    Number((audioElement.currentTime / audioElement.duration) * 1000)
  );
  document.getElementById("myProgressBar").value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 1000;
});

