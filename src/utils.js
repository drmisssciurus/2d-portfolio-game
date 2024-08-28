export function displayDialogue(text, onDisplayEnd) {
    const dialodueUI = document.getElementById("textbox-contaiter"),
          dialogue = document.getElementById("dialogue"),
          closeBtn = document.getElementById("close");

    dialodueUI.style.display = 'block';

    let index = 0;
    let currentText = '';

    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }

        clearInterval(intervalRef);
    }, 1);

    function onClosrBtnClick() {
        onDisplayEnd();
        dialodueUI.style.display = 'none';
        dialogue.innerHTML = '';
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onClosrBtnClick);
    }

    closeBtn.addEventListener("click", onClosrBtnClick);

    addEventListener("keypress", (key) => {
        if(key.code === "Enter") {
            closeBtn.click();
        }
    });
}