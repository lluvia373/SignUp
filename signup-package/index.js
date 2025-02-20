async function checkId() {
  const userId = document.querySelector("#id_input");
  const enteredId = userId.value;
  const ignoreMessage = document.querySelector("#id-ignore");
  const idCheckBox = document.querySelector("#id_check_box");

  const response = await fetch("/ids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //서버에게 요청데이터가 JSON 형식임을 알려주는 역할
    },
    body: JSON.stringify({ id: enteredId }), //프론트엔드에서 서버로 보낼 데이터를 json형식으로 변환하여 전달
  });
  const data = await response.json();
  console.log(data);
  if (data.exists) {
    ignoreMessage.textContent = "ID alreay exists";
    idCheckBox.checked = false;
  } else {
    ignoreMessage.textContent = "ID is available";
    idCheckBox.checked = true;
  }
}

async function createAccount() {
  const idCheckBox = document.querySelector("#id_check_box");

  if (!idCheckBox.checked) {
    alert("please check the ID first");
    return;
  }
  const enteredId = document.querySelector("#id_input").value;
  const enteredPassword = document.querySelector("#password_input").value;
  const enteredCheckPassword = document.querySelector(
    "#check_password_input"
  ).value;
  const ignoreMessage = document.querySelector("#confirm-message");

  if (enteredPassword !== enteredCheckPassword) {
    ignoreMessage.textContent = "Password do not match";
    return;
  }
  const response = await fetch("/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: enteredId,
      password: enteredPassword,
      check_password: enteredCheckPassword,
    }),
  });
  const data = await response.json();
  if (data.success) {
    ignoreMessage.textContent = "Account creat successfully";
    document.querySelector("#id_input").value = "";
    document.querySelector("#password_input").value = "";
    document.querySelector("#check_password_input").value = "";
    document.querySelector("#id-ignore").textContent = "";
  } else {
    ignoreMessage.textContent = "Failed to creat account";
  }
}
const confirm_btn = document.querySelector("#confirm_btn");
confirm_btn.addEventListener("click", createAccount);

const idCheckBtn = document.getElementById("id_btn");
idCheckBtn.addEventListener("click", checkId);
