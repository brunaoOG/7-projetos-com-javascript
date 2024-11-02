let areas = {
  a: null,
  b: null,
  c: null,
};

//Handle Functions

const query = (el) => document.querySelector(el);
const queryAll = (el) => document.querySelectorAll(el);

//Events

queryAll(".item").forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

queryAll(".area").forEach((item) => {
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragleave", dragLeave);
  item.addEventListener("drop", drop);
});

query(".neutralArea").addEventListener("dragover", dragOverNeutral);
query(".neutralArea").addEventListener("dragleave", dragLeaveNeutral);
query(".neutralArea").addEventListener("drop", dropNeutral);

//Functions Item

function dragStart(e) {
  e.currentTarget.classList.add("dragging");
}

function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
}

//Functions Area

function dragOver(e) {
  if (e.currentTarget.querySelector(".item") === null) {
    e.preventDefault();
    e.currentTarget.classList.add("hover");
  }
}

function dragLeave(e) {
  e.currentTarget.classList.remove("hover");
}

function drop(e) {
  e.currentTarget.classList.remove("hover");

  let dragItem = query(".item.dragging");
  e.currentTarget.appendChild(dragItem);
  updateAreas();
}

//Functions Neutral

function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add("hover");
}

function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove("hover");
}

function dropNeutral(e) {
  e.currentTarget.classList.remove("hover");

  let dragItem = query(".item.dragging");
  e.currentTarget.appendChild(dragItem);
  updateAreas();
}

//Logic Functions

function updateAreas() {
  queryAll(".area").forEach((area) => {
    let name = area.getAttribute("data-name");

    if (area.querySelector(".item") !== null) {
      areas[name] = area.querySelector(".item").innerHTML;
    } else {
      areas[name] = null;
    }

    if (areas["a"] == 1 && areas["b"] == 2 && areas["c"] == 3) {
      query(".areas").classList.add("correct");
    } else {
      query(".areas").classList.remove("correct");
    }
  });
}
