let clickNumber = 0;
let title2 = document.querySelector(".title_2");
let title3 = document.querySelector(".title_3");
let mainBox = document.querySelector(".main_box");
let t0;
let t1;
let falseOrTrue = false;
let resultArray = [];
let setTimeoutTest;

const getRandSec = () => {
  return Math.floor(Math.random() * 10) + 1;
};

let sec = getRandSec();

const testReadyToWay = () => {
  mainBox.addEventListener("click", testReady);
};

const backgroundColorPink = () => {
  title2.innerHTML = "시작";
  title2.style.textAlign = "center";
  title2.style.fontSize = "30px";
  title3.innerHTML =
    "총 기회는 5번 주어집니다. 다음준비화면애서 배경화면이 초록색이 되었을 때 클릭하시면 됩니다. 시작하시려면 현재화면을 클릭해주세요.";
  title3.style.textAlign = "center";
  document.querySelector(".title").style.display = "none";
  document.querySelector(".start_button").style.display = "none";
  mainBox.style.backgroundColor = "lightPink";

  testReadyToWay();
};

document
  .querySelector(".start_button")
  .addEventListener("click", backgroundColorPink);

const testStart = () => {
  falseOrTrue = true;
  mainBox.style.backgroundColor = "lightGreen";
  title2.innerHTML = "클릭";
  title3.innerHTML = "클릭해주세요";
  t0 = performance.now();
  testReadyToWay();
  mainBox.addEventListener("click", timeAttack);
  mainBox.removeEventListener("click", isFailClick);
};

const testReady = (e) => {
  clickNumber++;

  if (clickNumber > 5) {
    testResult(e);
    return;
  }
  if (clickNumber > 0) {
    mainBox.style.backgroundColor = "lightYellow";
    title2.innerHTML = "준비";
    title3.innerHTML = "배경화면이 초록색이 되면 클릭해주세요.";
    mainBox.removeEventListener("click", testReady);
    mainBox.addEventListener("click", isFailClick);
    setTimeoutTest = setTimeout(testStart, sec * 200);
    mainBox.removeEventListener("click", backTest);
  }
};

const backTest = () => {
  clickNumber = 1;
  testReady();
};

const isFailClick = () => {
  clearTimeout(setTimeoutTest);
  mainBox.style.backgroundColor = "darkGray";
  title2.innerHTML = "준비 화면에서는 클릭이 불가합니다.";
  title3.innerHTML =
    "준비 화면에서는 클릭이 불가합니다.화면이 초록색으로 바뀌면 클릭 해 주시길 바랍니다. 처음부터 시작하려면 화면을 클릭해주세요.";

  mainBox.addEventListener("click", backTest);
};

const timeAttack = () => {
  t1 = performance.now();
  let 결과값 = t1 - t0;
  resultArray.push(결과값);
};

const testResult = (e) => {
  let sum = 0;

  for (i = 0; i < resultArray.length; i++) {
    sum += resultArray[i];
  }

  let result = sum / resultArray.length;

  if (e.target === mainBox) {
    console.log(resultArray);
    title2.innerHTML = "테스트결과";
    title3.innerHTML = `다섯번의 평균값은 ${result.toFixed(2)} ms`;
    mainBox.style.backgroundColor = "white";
    mainBox.removeEventListener("click", testResult);
    mainBox.removeEventListener("click", timeAttack);
  }
};
