async function checkId() {
  const userId = document.querySelector("#id_input");
  const enteredId = userId.value;
  const ignoreMessage = document.querySelector("#id-ignore");

  const response = await fetch("http://127.0.0.1:8002/ids", {
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

const idCheckBtn = document.getElementById("id_btn");
idCheckBtn.addEventListener("click", checkId);


