function Initializeinfobite() {
    getRandomVideo();
    console.log("infobite initialized")
}

        function getRandomVideo() {
            const videos = [
                // "https://drive.google.com/file/d/1ycYnGDpJgBS66WWQfeXkOf_9k0kblciU/preview",
                // "https://drive.google.com/file/d/1SnJlXe6oYPkOjfSVFjndEk7Vuc5R-sQe/preview",
                // "https://drive.google.com/file/d/1zrrESVeCDOJY3B3Bo2VB1emblW3AIy1R/preview",
                // "https://drive.google.com/file/d/1dPxdQU33VyrfYvewFJCmF00PWRTO8PxY/preview",
                // "https://drive.google.com/file/d/1T2806o56mjU6y7yOM_qronfNc2mPYjfx/preview",
                // "https://drive.google.com/file/d/1X62-_JJCSR5Wic-rKWyGeHFJQ17H-ejV/preview"
        "1ycYnGDpJgBS66WWQfeXkOf_9k0kblciU", // Google Drive file IDs
        "1SnJlXe6oYPkOjfSVFjndEk7Vuc5R-sQe",
        "1zrrESVeCDOJY3B3Bo2VB1emblW3AIy1R",
        "1dPxdQU33VyrfYvewFJCmF00PWRTO8PxY",
        "1T2806o56mjU6y7yOM_qronfNc2mPYjfx",
        "1X62-_JJCSR5Wic-rKWyGeHFJQ17H-ejV"

            ];
            // const randomIndex = Math.floor(Math.random() * videos.length);
            // const selectedVideo = videos[randomIndex];
            // console.log(`Selected video URL: ${selectedVideo}`); // Debugging line
            // const videoSource = document.getElementById('videoFrame');
            // if (videoSource) {
            //     videoSource.src = selectedVideo; // Set the video source
            //     const videoPlayer = document.getElementById('videoFrame');
            //     if (videoPlayer) {
            //         videoPlayer.load(); // Load the new video
            //     } else {
            //         console.error("Video player not found");
            //     }
            // } else {
            //     console.error("Video source element not found");
            // }
            //Last

    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideoId = videos[randomIndex];
    const selectedVideoUrl = `/proxy_video/${selectedVideoId}/`;
    console.log(`Selected video URL: ${selectedVideoUrl}`); // Debugging line

    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoFrame');

    if (videoSource) {
        videoSource.src = selectedVideoUrl; // Set the video source
        console.log("Video source set to:", videoSource.src); // Debugging line
        videoPlayer.load(); // Load the new video
        console.log("Video player loaded"); // Debugging line
    } else {
        console.error("Video source element not found");
    }
        }

        function downloadVideo() {
            const videoSrc = document.getElementById('videoSource').src;
            // Replace the local proxy URL with the Google Drive URL
            const googleDriveUrl = videoSrc.replace("http://127.0.0.1:8000/proxy_video/", "https://drive.google.com/uc?id=");
            const trimmedUrl = googleDriveUrl.replace(/\/$/, ''); // Removes the last '/' if it exists
            // Create the download link
            const downloadLink = trimmedUrl.replace("/uc?id=", "/uc?export=download&id=");
            window.open(downloadLink, '_blank');
        }

        function shareOnTelegram() {
            const videoSrc = document.getElementById('videoSource').src;
            // Replace the local proxy URL with the Google Drive URL
            const googleDriveUrl = videoSrc.replace("http://127.0.0.1:8000/proxy_video/", "https://drive.google.com/uc?id=");
            // Extract the file ID from the Google Drive URL
            const fileIdMatch = googleDriveUrl.match(/id=([^&]+)/);
            const fileId = fileIdMatch ? fileIdMatch[1] : null;

            if (!fileId) {
                console.error("File ID not found in the video source URL.");
                return;
            }

            // Construct the correct share link
            const shareLink = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}`;

            // Open the Telegram share link in a new tab
            window.open(telegramUrl, '_blank');
            }

        // window.onload = getRandomVideo;
        // Call Initializeinfobite on page load
        window.onload = Initializeinfobite;
