class App {
  constructor() {
    this.init();
    
    this.x = 0;
    this.y = 0;
  }

  init() {
    const canvas = $("#canvas")[0];
    const ctx = canvas.getContext("2d");

    const video = document.createElement("video");
    video.src = "video.mp4";
    video.loop = true;
    
    const videoWidth = 200;
    const videoHeight = 150;

    video.width = videoWidth;
    video.height = videoHeight;

    let interval = null;
    let flag = false;

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
     
    $(canvas).click((e) => {
      console.log(video)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(interval);

      this.x = e.offsetX;
      this.y = e.offsetY;

      video.play();

      interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(video, this.x - videoWidth / 2, this.y - videoHeight / 2, videoWidth, videoHeight);
        ctx.restore();

        this.x += 1;
        if (this.x-50 > canvas.width) {
          clearInterval(interval);
          video.pause();
        }
      }, 20);
    });

    $("#stopBtn").click(() => {
      clearInterval(interval);
      video.pause();
      video.currentTime = 0;
    });
  }
}

$(document).ready(() => {
    new App();
});