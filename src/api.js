const getData = async (cep) => {
  const api = await fetch(`https://viacep.com.br/ws/${cep}/json`);
  return await api.json();
};
const fillInput = async (cep) => {
  $(".endereco").children().fadeOut(2);
  const data = await getData(cep);
  if (data.hasOwnProperty("erro")) {
    alert("CEP não encontrado");
  } else {
    $(".endereco").fadeIn(1000);
    for (campo in data) {
      const field = document.querySelector(`#${campo}`);
      if (field) {
        $(`.${campo}`).show(1450);
        $(`#${campo}`).show(1450);
        field.value = data[campo];
      }
    }
  }
};
const erro = () => {
  alert("CEP inválido");
  return;
};

document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault();

  const cep = document.querySelector("#cep").value.replace("-", "");
  if (cep.length === 8) {
    const str = /^[0-9]+$/;
    str.test(cep) ? fillInput(cep) : erro();
  } else {
    erro();
  }
});
