  const answers = ["Yes", "No", "Maybe", "Definitely", "Uncertain"];

    Object.assign(document.body.style, {
      margin: "0",
      background: "#121212",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    });

  const container = document.createElement("div");
  const inputField = document.createElement("input");
  const magicBall = document.createElement("div");
  const prompt = document.createElement("div");
  const warning = document.createElement("div");

  document.body.appendChild(container);
  container.appendChild(inputField);
  container.appendChild(magicBall);
  magicBall.appendChild(prompt);
  container.appendChild(warning);

  Object.assign(container.style, {
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
    });

    Object.assign(inputField.style, {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #888",
      background: "#1e1e1e",
      color: "#fff",
      marginBottom: "20px",
      outline: "none"
    });
    inputField.placeholder = "Введіть запитання...";

    Object.assign(magicBall.style, {
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: "#4b0082",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      margin: "0 auto 15px",
      cursor: "pointer",
      boxShadow: "0 0 20px #4b0082"
    });

    Object.assign(prompt.style, {
      padding: "10px",
      textAlign: "center",
    });

    Object.assign(warning.style, {
      color: "red",
      fontSize: "14px",
      height: "20px"
    });

  function isValidQuestion(text) {
    return text.trim().length > 0 && /^[А-Яа-яA-Za-z\s\?]+$/.test(text);
  }

  magicBall.addEventListener("click", () => {
    const question = inputField.value;
    if (!isValidQuestion(question)) {
      warning.textContent = "Будь ласка, введіть коректне запитання!";
      prompt.textContent = "";
      return;
    }
    warning.textContent = "";
    const randomIndex = Math.floor(Math.random() * answers.length);
    prompt.textContent = answers[randomIndex];
  });