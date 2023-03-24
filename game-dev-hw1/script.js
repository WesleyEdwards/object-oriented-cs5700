const eventsAdded = [];
const eventsToPrint = [];

const button = document.getElementById("start-button");
const eventName = document.getElementById("name");
const interval = document.getElementById("interval");
const times = document.getElementById("times");

button.addEventListener("click", () => {
  eventsAdded.push({
    name: eventName.value,
    interval: parseInt(interval.value),
    times: parseInt(times.value),
    recentPrint: 0,
  });
});

let prevTime = 0;
let elapsedTime = 0;

function gameLoop(timeStamp) {
  // should pass elapsed time
  elapsedTime = timeStamp - prevTime;
  prevTime = timeStamp;

  update(timeStamp);
  render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function update(timeStamp) {
  eventsToPrint.length = 0;
  eventsAdded.forEach((event) => {
    if (timeStamp - event.recentPrint > event.interval && event.times >= 0) {
      event.recentPrint = timeStamp;
      eventsToPrint.push(event);
      if (event.times < 0) {
        // Remove expired events
        eventsAdded.splice(eventsAdded.indexOf(event), 1);
      }
    }
  });
}

function render() {
  eventsToPrint.forEach((event) => {
    addEventToDom(event);
    event.times -= 1;
  });
}

function addEventToDom(event) {
  const newDiv = document.createElement("div");
  newDiv.innerText = `Event: ${event.name} (${event.times} remaining)`;
  newDiv.setAttribute("class", "list-item");

  const eventsList = document.getElementById("events");
  eventsList.appendChild(newDiv);
  eventsList.scrollTop = eventsList.scrollHeight;
}
