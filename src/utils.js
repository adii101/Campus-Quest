import { codingChallenges } from "./constants";
import { submitCode } from "./compilerService.js";

export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");

  dialogueUI.style.display = "block";
  let index = 0;
  let currentText = "";
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, 1);

  const closeBtn = document.getElementById("close");

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
}

export function openCodeEditor(challengeKey) {
  const editorUI = document.getElementById("editor-container");
  const challengeText = document.getElementById("challenge-text");
  const submitBtn = document.getElementById("submit-code");

  import("./constants.js").then(({ codingChallenges }) => {
    const challenge = codingChallenges[challengeKey];
    if (challenge) {
      challengeText.innerText = challenge.question + "\n\n" + challenge.example;
      submitBtn.onclick = async () => {
        const code = document.getElementById("code-input").value;
        const language = document.getElementById("language-select").value;

        // Pass all test cases
        const result = await submitCode(code, language, challenge.testCases);

        // Show results
        if (result.success) {
          document.getElementById("code-output").innerText = "✅ All test cases passed!";
        } else {
          document.getElementById("code-output").innerText =
            `❌ Some test cases failed. Details:\n` +
            result.results.map((r, i) =>
              `Test ${i + 1}: Input: ${r.input} | Expected: ${r.expected} | Got: ${r.actual} | ${r.passed ? "✅" : "❌"}`
            ).join("\n");
        }
      };
    }
  });

  editorUI.style.display = "block";
}


// 🛠️ Ensure setCamScale remains
export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  k.camScale(k.vec2(resizeFactor < 1 ? 1 : 1.5));
}
