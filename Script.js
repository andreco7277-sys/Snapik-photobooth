const coinBtn = document.getElementById("coin");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapBtn = document.getElementById("snap");
const downloadBtn = document.getElementById("download");
const ctx = canvas.getContext("2d");

let cameraStream = null;
let coinInserted = false;

coinBtn.addEventListener("click", () => {
  if (coinInserted) return;
  coinInserted = true;

  alert("Coin Inserted! Camera ON");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      cameraStream = stream;
      video.srcObject = stream;
      video.style.display = "block";
      snapBtn.disabled = false;
    });
});

snapBtn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  canvas.style.display = "block";
  downloadBtn.disabled = false;
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "snopik-photo.png";
  link.href = canvas.toDataURL();
  link.click();

  cameraStream.getTracks().forEach(track => track.stop());
  video.style.display = "none";
  snapBtn.disabled = true;
  downloadBtn.disabled = true;
  coinInserted = false;

  alert("Thank you! Insert coin again");
});
