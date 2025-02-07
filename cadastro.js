class EsperandoProduto {
  constructor() {
    this.form = document.querySelector(".form");
    this.clientes = this.carregarClientes();
    this.eventos();
  }

  eventos() {
    this.form.addEventListener("submit", (e) => {
      this.tratandoEnvio(e);
    });
  }

  tratandoEnvio(e) {
    e.preventDefault();

    const dadosDoClientes = this.camposValidos();

    if (dadosDoClientes) {
      this.clientes.push(dadosDoClientes);
      console.log(this.clientes);

      this.limparFormulario()
      this.salvarCliente(this.clientes);
    }
  }

  limparFormulario(){
    this.form.reset()
  }
  
  carregarClientes() {
    const clientesArmazenados = JSON.parse(localStorage.getItem("clientes")) || [];
    return clientesArmazenados;
  }

  salvarCliente(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert('Cliente Salvo com sucesso!')
  }


  camposValidos() {
    let valido = true;

    for (let msgErro of this.form.querySelectorAll(".msg-erro")) {
      msgErro.remove();
    }

    const celularRegex = /^\(\d{2}\)\s?9\d{4}-\d{4}$/;
    const celular = this.form.querySelector(".celular");
    const campos = this.form.querySelectorAll(".valido");

    campos.forEach((campo) => {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value.trim()) {
        this.criaErro(campo, `${label} não pode estar em branco.`);
        valido = false;
      }

      if (campo === celular && !celularRegex.test(celular.value)) {
        this.criaErro(campo, `${label} formato inválido (DD) 00000-0000`);
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
    campo.insertAdjacentElement("afterend", div);
  }
}

const cliente1 = new EsperandoProduto();
