class BuscarClientes {
  constructor() {
    this.campoBuscar = document.querySelector('.buscarCliente')
    this.resultados = document.querySelector('.resultadoDaBusca')
    this.eventos()
  }

  eventos(){
    this.campoBuscar.addEventListener('input', () => {
      this.filtrarClientes()
    })
  }

  filtrarClientes() {
    const valorBuscado = this.campoBuscar.value.toLowerCase();
    const clientes = this.carregarClientes();

    const clientesFiltrados = clientes.filter(cliente => { 
      return (
        cliente.cliente.toLowerCase().includes(valorBuscado) || 
        cliente.modelo.toLowerCase().includes(valorBuscado)
    )
      
    })

    this.exibirResultados(clientesFiltrados)
  }

  carregarClientes() {
    const clientesArmazenados = localStorage.getItem("clientes");
    return clientesArmazenados ? JSON.parse(clientesArmazenados) : [];
  }

  exibirResultados(clientes){
    this.resultados.innerHTML = ''

    if (clientes.length === 0) {
      this.resultados.innerHTML = '<p> Nenhum cliente encontrado </p>'
      return;
    }

    clientes.forEach(cliente => {
      const div = document.createElement('div')
      div.classList.add('cliente-item')
      div.innerHTML = `
      <p><strong>Cliente:</strong> ${cliente.cliente}</p>
      <p><strong>Celular:</strong> ${cliente.celular}</p>
      <p><strong>Modelo:</strong> ${cliente.modelo}</p>
      <p><strong>Referência:</strong> ${cliente.referencia}</p>
      <p><strong>Numeração:</strong> ${cliente.numeracao}</p>
      <p><strong>Cor:</strong> ${cliente.cor}</p>
      `
      this.resultados.appendChild(div)
    });
  }
}

const bucarClientes = new BuscarClientes()