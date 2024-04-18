document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById('webcam');

  // Define constraints for the rear camera
  const constraints = {
    video: { facingMode: "environment" }  // 'environment' refers to the rear camera
  };

  // Access the webcam
  function getCamera(constraints) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        // Set the video source to the stream
        video.srcObject = stream;
        video.play();
      }).catch(function(error) {
        console.log("Error accessing the camera: ", error);
        alert('Could not access the camera. Please check device settings.');
      });
  }

  // Start the process
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');

        if (cameras.length > 0) {
          // Use the first available back camera
          getCamera(constraints);
        } else {
          alert('No camera found on this device.');
        }
      }).catch(err => {
        console.log("Error listing the devices: ", err);
      });
  } else {
    alert('getUserMedia is not supported by this browser.');
  }
});
