document.addEventListener("DOMContentLoaded", function() {
    const radioButtons = document.querySelectorAll('.radioButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const overlay = document.getElementById('overlay');
    const romanticImage = document.getElementById('romanticImage');
    const closeOverlay = document.getElementById('closeOverlay');

    let imageInterval;

    const stations = [
        { name: "BBC World Service", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service" },
        { name: "NPR", url: "https://npr-ice.streamguys1.com/live.mp3" },
        { name: "181.FM - The Mix", url: "http://listen.181fm.com/181-themix_128k.mp3" }
    ];

    const romanticImages = [
        () => `https://picsum.photos/600/400?random&t=${new Date().getTime()}`,
        () => `https://picsum.photos/600/400?random&t=${new Date().getTime()}`,
        () => `https://picsum.photos/600/400?random&t=${new Date().getTime()}`,
        () => `https://picsum.photos/600/400?random&t=${new Date().getTime()}`,
        () => `https://picsum.photos/600/400?random&t=${new Date().getTime()}`
    ];

    function startImageChange() {
        imageInterval = setInterval(() => {
            const randomImage = romanticImages[Math.floor(Math.random() * romanticImages.length)]();
            romanticImage.src = randomImage;
        }, 5000);
    }

    function stopImageChange() {
        clearInterval(imageInterval);
    }

    function playStation(stationIndex) {
        const station = stations[stationIndex];
        audioPlayer.src = station.url;
        audioPlayer.play();

        startImageChange();

        const randomImage = romanticImages[Math.floor(Math.random() * romanticImages.length)]();
        romanticImage.src = randomImage;

        // Hide buttons and show overlay
        radioButtons.forEach(button => button.style.display = 'none');
        overlay.style.display = 'flex';
        
        // Reset and add slide-in class for animation
        romanticImage.classList.remove('slide-in'); // Remove class to reset
        void romanticImage.offsetWidth; // Trigger reflow
        romanticImage.classList.add('slide-in'); // Add class to slide in
    }

    function stopStation() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        stopImageChange();
        overlay.style.display = 'none';

        // Show buttons again
        radioButtons.forEach(button => button.style.display = 'block');
    }

    radioButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 3) {
                stopStation();
            } else {
                playStation(index);
            }
        });
    });

    closeOverlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        stopStation();
    });
});
