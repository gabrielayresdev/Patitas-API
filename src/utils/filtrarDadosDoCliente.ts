interface clienteI {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  hash: string;
  salt: string;
  telefone: string;
}

export default function filtrarDadosDoCliente(cliente: clienteI) {
  return {
    id: cliente.id,
    email: cliente.email,
    nome: cliente.nome,
    cpf: cliente.cpf,
    telefone: cliente.telefone,
  };
}
