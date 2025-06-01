  const inputSenha = document.getElementById("input_senha");

  const regras = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number")
  };

  inputSenha.addEventListener("input", function () {
    const senha = inputSenha.value;

    // Verificações
    if (senha.length >= 8) {
      regras.length.classList.add("ok");
    } else {
      regras.length.classList.remove("ok");
    }

    if (/[A-Z]/.test(senha)) {
      regras.uppercase.classList.add("ok");
    } else {
      regras.uppercase.classList.remove("ok");
    }

    if (/[a-z]/.test(senha)) {
      regras.lowercase.classList.add("ok");
    } else {
      regras.lowercase.classList.remove("ok");
    }

    if (/[0-9]/.test(senha)) {
      regras.number.classList.add("ok");
    } else {
      regras.number.classList.remove("ok");
    }
  });

