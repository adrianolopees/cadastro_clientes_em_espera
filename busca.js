class BuscarClientes {
  constructor() {
    this.campoBuscar = document.querySelector(".buscarCliente");
    this.resultados = document.querySelector(".resultadoDaBusca");

    this.eventos();
  }

  eventos() {
    this.campoBuscar.addEventListener("input", () => {
      this.filtrarClientes();
    });
  }

  filtrarClientes() {
    const valorBuscado = this.campoBuscar.value.toLowerCase();
    const clientes = this.carregarClientes();
    if (valorBuscado === "") {
      this.resultados.innerHTML = "";
      return;
    }

    const clientesFiltrados = clientes.filter((cliente) => {
      return (
        cliente.referencia.toLowerCase().trim() ===
          valorBuscado.toLowerCase().trim() ||
        cliente.modelo.toLowerCase().trim() ===
          valorBuscado.toLowerCase().trim()
      );
    });

    this.exibirResultados(clientesFiltrados);
  }

  carregarClientes() {
    const clientesArmazenados = localStorage.getItem("clientes");
    return clientesArmazenados ? JSON.parse(clientesArmazenados) : [];
  }

  exibirResultados(clientes) {
    this.resultados.innerHTML = "";

    if (clientes.length === 0) {
      this.resultados.innerHTML = "<p>REF ou MODELO não encontrados!</p>";
      return;
    }

    clientes.forEach((cliente) => {
      const div = document.createElement("div");
      div.classList.add("cliente-item");

      div.innerHTML = `
      <strong>Cliente:</strong> ${cliente.cliente} <br>
      <strong>Celular:</strong> <span class="celular">${cliente.celular}</span><br>
      <strong>Modelo:</strong> ${cliente.modelo}<br>
      <strong>Referência:</strong> ${cliente.referencia}<br>
      <strong>Numeração:</strong> ${cliente.numeracao}<br>
      <strong>Cor:</strong> ${cliente.cor}
    `;

      this.criaIconZap(cliente, div);
      this.criaIconLixo(cliente, div)
      this.resultados.appendChild(div);
    });
  }

  criaIconZap(cliente, div) {
    const iconZap = document.createElement("i");
    iconZap.classList.add("fa-brands", "fa-whatsapp");

    iconZap.addEventListener("click", (e) => {
      e.preventDefault();
      this.criaMsgZap(cliente);
    });
    const campoCelular = div.querySelector(".celular");
    campoCelular.insertAdjacentElement("afterend", iconZap); 
  }

  criaMsgZap(cliente) {
    const mensagem = `Olá, ${cliente.cliente}! Aqui é da Ferracini maxi shopping, estou entrando em contato sobre o modelo ${cliente.modelo}, que não tinha no número ${cliente.numeracao} na cor ${cliente.cor}. Acabou de chegar, quer que separe pra você ?`;
    const celularSomenteNumeros = cliente.celular.replace(/\D/g, ""); // Remove tudo que não é número
    const urlWhatsApp = `https://wa.me/55${celularSomenteNumeros}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(urlWhatsApp, "_blank");
  }

  criaIconLixo(cliente, div){
    const iconLixo = document.createElement('i')
      iconLixo.classList.add("fa-regular", "fa-trash-can");

      iconLixo.addEventListener('click', (e) => {
        e.preventDefault()
        const modal = document.querySelector('.modal')
        const btnSIM = document.querySelector('.sim')
        const btnNAO= document.querySelector('.nao')

        modal.style.display = 'block'

        btnSIM.addEventListener('click', ()=> {
          alert(`cliente ${cliente.cliente} excluido porra`)
          this.excluiCliente(cliente)
          modal.style.display = 'none'
          return
        })

        btnNAO.addEventListener('click', () => {
          alert('mande msg entao porra')
          modal.style.display = 'none'
          return
        })
        
      })
   div.appendChild(iconLixo)
  }

  excluiCliente(cliente){
    const clientes = this.carregarClientes()
    const clientesAtualizados = clientes.filter(c => JSON.stringify(c) !== JSON.stringify(cliente))

    localStorage.setItem('clientes', JSON.stringify(clientesAtualizados))

    this.exibirResultados(clientesAtualizados)
  }
}

const bucarClientes = new BuscarClientes();
