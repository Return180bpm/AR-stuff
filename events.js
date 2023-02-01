// const preLoadErrors = [];
// window.addEventListener("error", (event) => {
//   preLoadErrors.push(`${event.type}: ${event.message}`);
// });
document.addEventListener("DOMContentLoaded", function () {
  // devtools
  const devLog = document.querySelector("#dev-log");
  let numberOfMessages = 0;
  const addMessageToDevLog = (msg) => {
    const newListNode = document.createElement("li");

    newListNode.textContent = msg;
    !(numberOfMessages % 2) && newListNode.classList.add("odd-line");
    numberOfMessages++;
    devLog.appendChild(newListNode);
    newListNode.scrollIntoView();
  };
  window.addEventListener("error", (event) => {
    addMessageToDevLog(`${event.type}: ${event.message}`);
  });

  document.querySelector("#dev-tools-toggle").addEventListener("click", () => {
    document.querySelector("#dev-tools").classList.toggle("hidden");
  });

  // Doesnt seem to work the way I want to
  // if (preLoadErrors.length > 0) {
  //   preLoadErrors.forEach((msg) => addMessageToDevLog(msg));
  // }
  // console.log(`🔥`)
  // console.log(preLoadErrors)

  // scene events
  const sceneEl = document.querySelector("a-scene");
  const arSystem = sceneEl.systems["mindar-image-system"];
  const exampleTarget = document.querySelector("#example-target");
  const examplePlane = document.querySelector("#example-plane");
  const startButton = document.querySelector("#example-start-button");
  const stopButton = document.querySelector("#example-stop-button");
  const pauseButton = document.querySelector("#example-pause-button");
  const pauseKeepVideoButton = document.querySelector(
    "#example-pause-keep-video-button"
  );
  const unpauseButton = document.querySelector("#example-unpause-button");
  startButton.addEventListener("click", () => {
    console.log("start");
    addMessageToDevLog("start");
    arSystem.start(); // start AR
  });
  stopButton.addEventListener("click", () => {
    console.log("stop");
    addMessageToDevLog("stop");
    arSystem.stop(); // stop AR
  });
  pauseButton.addEventListener("click", () => {
    console.log("pause");
    addMessageToDevLog("pause");

    arSystem.pause(); // pause AR, keep video feed
  });
  pauseKeepVideoButton.addEventListener("click", () => {
    console.log("pause and keep video");
    addMessageToDevLog("pause and keep video");

    arSystem.pause(true); // pause AR and video
  });
  unpauseButton.addEventListener("click", () => {
    console.log("unpause");
    addMessageToDevLog("unpause");

    arSystem.unpause(); // unpause AR and video
  });
  sceneEl.addEventListener("arReady", (event) => {
    console.log("🚀 arReady!");
    addMessageToDevLog("🚀 arReady!");
  });
  // arError event triggered when something went wrong. Mostly browser compatbility issue
  sceneEl.addEventListener("arError", (event) => {
    console.log("🛑 MindAR failed to start");
    addMessageToDevLog(`Something went wrong!:\n${JSON.stringify(event)}`);

    console.log(event);
  });
  // detect target found
  exampleTarget.addEventListener("targetFound", (event) => {
    addMessageToDevLog("target found");
    console.log("target found");
  });
  // detect target lost
  exampleTarget.addEventListener("targetLost", (event) => {
    addMessageToDevLog("target lost");
    console.log("target lost");

    setTimeout(() => {
      return document
        .querySelector("a-scene")
        .systems["mindar-image-system"].ui.showScanning();
    }, 1000);
  });

  const colors = ["red", "blue"];
  let currentIndex = 0;
  // detect click event
  examplePlane.addEventListener("click", (event) => {
    examplePlane.setAttribute(
      "material",
      `color: ${colors[(currentIndex++) % colors.length]}`
    );
    
    addMessageToDevLog(`color: ${colors[(currentIndex + 1) % colors.length]}`)
    addMessageToDevLog("object clicked");
    console.log("plane click");
  });
});
