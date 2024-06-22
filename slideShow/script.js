// imgs slide show playback - next - play - stop

// var img = document.images[0];
// function execute() {
// 	img.setAttribute("src", "./imgs/work2.webp");
// 	console.log(img.getAttribute("src"));
// }
// var images = [".\work1.webp", ".\work2.webp", ".\work3.webp"];
// var img = document.images[i];
// function nextPicture() 
// {
//     for (var i = 0 ; i<4 ; i++){
//         img[i].setAttribute("src", "./imgs/work"+i+".webp");
//     }
    // img.setAttribute("src", "./imgs/work2.webp");
// }

var images = ["./imgs/work2.webp", "./imgs/work3.webp", "./imgs/work4.webp"];
var currentIndex = 0;
var slideshowInterval;

var slideImage = document.getElementById('slide');
var prevButton = document.getElementById('prev');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var nextButton = document.getElementById('next');

function showImage(index) {
    slideImage.src = images[index];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

function startSlideshow() {
    slideshowInterval = setInterval(nextImage, 2000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}
document.addEventListener('DOMContentLoaded', () => {
    startSlideshow();
});
showImage(currentIndex);
stopButton.disabled = true;