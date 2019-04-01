'use strict';

window.addEventListener("resize", function () {
  const height = window.innerHeight / 3;

  $('.grid.x').attr('transform', `translate(40, ${height - 30})`);
  $('.axis.x').attr('transform', `translate(40, ${height - 30})`);
});

// Initialize Madgwick filter at 100Hz.
Madgwick.init(100);

// Populate the serial ports dropdown
Serial.getDevices(function (ports) {
  $('#port').html(''); // clear list
  var isConnected=false;
  for (var i = 0; i < ports.length; i++) {
    if (!isConnected) {
      Serial.connect(ports[i], {bitrate: 115200}, onReceiveCallback); // in serial.js
      isConnected=true;
    }
    $('#port').append($("<option/>", {value: ports[i], text: ports[i]}));
  }
});


// THREE renderer
Scene.init("canvas");
function animate () {
  requestAnimationFrame(animate);
  Scene.renderer.render(Scene.scene, Scene.camera);
}
animate();


// Update Cube from Madgwick Quaternion
setInterval(function () {
//    Scene.cube.quaternion.set(Madgwick.q1, Madgwick.q2, Madgwick.q3, Madgwick.q0);
    Scene.cube.quaternion.set(imuQuat.q[1], imuQuat.q[2], imuQuat.q[3], imuQuat.q[0]);
}, 1000/Madgwick.sampleFreq);
