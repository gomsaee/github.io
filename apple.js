let clickNumber = 0;
let title2 = document.querySelector(".title_2");
let title3 = document.querySelector(".title_3");
let mainBox = document.querySelector(".main_box");
let t0;
let t1;
let resultArray = [];

const getRandSec = () => {
  return Math.floor(Math.random() * 10) + 1;
}; //랜덤한 숫자를 뽑아주는 함수

let sec = getRandSec();

const backgroundColorPink = (e) => {
  if (e.target === document.querySelector(".start_button")) {
    title2.innerHTML = "시작";
    title2.style.textAlign = "center";
    title2.style.fontSize = "30px";
    title3.innerHTML =
      "총 기회는 5번 주어집니다. 다음준비화면애서 배경화면이 초록색이 되었을 때 클릭하시면 됩니다. 시작하시려면 현재화면을 클릭해주세요.";
    title3.style.textAlign = "center";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".start_button").style.display = "none";
    mainBox.style.backgroundColor = "lightPink";
  }
  e.stopPropagation();
  backgroundColorGreen();
};

document
  .querySelector(".start_button")
  .addEventListener("click", backgroundColorPink);

const backgroundColorGreen = () => {
  mainBox.addEventListener("click", testReady);
};

const testReady = (e) => {
  clickNumber++;
  console.log(clickNumber);
  if (clickNumber === 5 && e.currentTarget === mainBox) {
    mainBox.addEventListener("click", testResult);
  }
  if (clickNumber < 5 && e.currentTarget === mainBox) {
    mainBox.style.backgroundColor = "lightYellow";
    title2.innerHTML = "준비";
    title3.innerHTML = "배경화면이 초록색이 되면 클릭해주세요.";
    testStart();
  }
};

const testStart = () => {
  setTimeout(() => {
    resultArray.push();
    mainBox.style.backgroundColor = "lightGreen";
    title2.innerHTML = "클릭";
    title3.innerHTML = "클릭해주세요";
    t0 = performance.now();
    mainBox.addEventListener("click", testReady);
  }, sec * 200);
};

const testResult = (e) => {
  t1 = performance.now();
  let 결과값 = t1 - t0;
  if (e.target === mainBox) {
    title2.innerHTML = "테스트결과";
    title3.innerHTML = `결과 ${결과값.toFixed(2)} ms`;
    mainBox.style.backgroundColor = "white";
    mainBox.removeEventListener("click", testResult);
  }
};
