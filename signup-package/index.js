async function checkId() {
  const userId = document.querySelector("#id_input");
  const enteredId = userId.value;
  const ignoreMessage = document.querySelector("#id-ignore");

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
  } else {
    ignoreMessage.textContent = "ID is available";
  }
}
/*
async fucntion displayAccount() {
    
}
*/

async function creatAccount() {
  const enteredId = document.querySelector("#id_input").value;
  const enteredPassword = document.querySelector("#password_input").value;
  const ignoreMessage = document.querySelector("#confirm-message");

  const response = await fetch("/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: enteredId, password: enteredPassword }),
  });
  const data = await response.json();
  console.log(data);
  if (data.success) {
    ignoreMessage.textContent = "Account creat successfully";
  } else {
    ignoreMessage.textContent = "Failed to creat account";
  }
}
const confrim_btn = document.querySelector("#confirm_btn");
confrim_btn.addEventListener("click", creatAccount);
const idCheckBtn = document.getElementById("id_btn");
idCheckBtn.addEventListener("click", checkId);
