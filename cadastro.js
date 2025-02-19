class EsperandoProduto {
  constructor() {
    this.form = document.querySelector(".form");
    this.clientes = this.carregarClientes();
    this.inputCelular = this.form.querySelector(".celular");

    this.aplicarMascaraCelular();
    this.eventos();
  }

  eventos() {
    this.form.addEventListener("submit", (e) => {
      this.tratandoEnvio(e);
    });

    const campos = document.querySelectorAll('input')

    campos.forEach((campo, index) => {
      campo.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
          event.preventDefault()
          const proximoCampo = campos[index + 1]
          if(proximoCampo){
            proximoCampo.focus()
          }
        }
      })
    })
  }

  tratandoEnvio(e) {
    e.preventDefault();

    const dadosDoClientes = this.camposValidos();

    if (dadosDoClientes) {
      this.clientes.push(dadosDoClientes);
      console.log(this.clientes);

      this.limparFormulario();
      this.salvarCliente(this.clientes);
    }
  }

  limparFormulario() {
    this.form.reset();
  }

  carregarClientes() {
    const clientesArmazenados =
      JSON.parse(localStorage.getItem("clientes")) || [];
    return clientesArmazenados;
  }

  salvarCliente(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert("Cliente Salvo com sucesso!");
  }

  aplicarMascaraCelular() {
    IMask(this.inputCelular, {
      mask: "(00) 00000-0000",
    });
  }

  camposValidos() {
    let valido = true;

    for (let msgErro of this.form.querySelectorAll(".msg-erro")) {
      msgErro.remove();
    }
    for (let input of this.form.querySelectorAll(".valido")) {
      input.classList.remove("input-erro");
    }

    const campos = this.form.querySelectorAll(".valido");
    campos.forEach((campo) => {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value.trim()) {
        this.criaErro(campo, `${label} não pode estar em branco!`);
        valido = false;
      }

      if ((campo.classList.contains("celular") && campo.value.length < 15 && campo.value.length > 0) ) {
        this.criaErro(campo, "Número incompleto!");
        valido = false;
      }

      if ((campo.classList.contains("cor") || campo.classList.contains('modelo')) && campo.value.trim() !== '' && !isNaN(campo.value)) {
        this.criaErro(campo, `Somente letras!`);
        valido = false;
      }

    
    });

    if (valido) {
      return (valido = {
        cliente: this.form.querySelector(".cliente").value,
        celular: this.form.querySelector(".celular").value,
        modelo: this.form.querySelector(".modelo").value,
        referencia: this.form.querySelector(".referencia").value,
        numeracao: this.form.querySelector(".numero").value,
        cor: this.form.querySelector(".cor").value,
      });
    }
    return valido;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerText = msg;
    div.classList.add("msg-erro");

    const icon = document.createElement("span");
    icon.classList.add("bi", "bi-exclamation-triangle-fill");
    campo.classList.add("input-erro");

    div.insertAdjacentElement("afterbegin", icon);
    campo.insertAdjacentElement("afterend", div);
  }

}

const cliente1 = new EsperandoProduto();
