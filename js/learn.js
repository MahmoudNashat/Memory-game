document.querySelector(".start-window span").onclick = function () {
  let user = prompt("What's your name?");
  if (user == null || user == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = user;
  }
  document.querySelector(".start-window").remove();
};
let blocksContainer = document.querySelector(".memory-container"),
  blocks = Array.from(blocksContainer.children),
  duration = 1000,
  orders = [...Array(blocks.length).keys()];
shuffle(orders);
blocks.forEach((block, index) => {
  block.style.order = orders[index];
  block.addEventListener("click", function () {
    flipping(block);
  });
});
function flipping(flipCard) {
  flipCard.classList.add("flipping");
  let allFlippedBlock = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipping")
  );
  if (allFlippedBlock.length === 2) {
    stopClicking();
    matchBlocks(allFlippedBlock[0], allFlippedBlock[1]);
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
function matchBlocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".count span");
  if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
    firstBlock.classList.remove("flipping");
    secondBlock.classList.remove("flipping");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flipping");
      secondBlock.classList.remove("flipping");
    }, duration);
    document.getElementById("fail").play();
  }
}
