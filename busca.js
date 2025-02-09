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
      <strong>Celular:</strong> ${cliente.celular}<br>
      <strong>Modelo:</strong> ${cliente.modelo}<br>
      <strong>Referência:</strong> ${cliente.referencia}<br>
      <strong>Numeração:</strong> ${cliente.numeracao}<br>
      <strong>Cor:</strong> ${cliente.cor}
      `;
      this.resultados.appendChild(div);
    });
  }
}

const bucarClientes = new BuscarClientes();
