import PostgresRelatorio from "./PostgresRelatorio";

export default class Relatorios {

  async getClientesComCompras() {
    const database = new PostgresRelatorio();
    return await database.getClientesComCompras();
  }

  async getProdutosAbaixoEstoqueMinimo() {
    const database = new PostgresRelatorio();
    return await database.getProdutosAbaixoEstoqueMinimo();
  }

  async getFolhaPagamento() {
    const database = new PostgresRelatorio();
    return await database.getFolhaPagamento();
  }

  async getComprasPorPeriodo(de: string, ate: string) {
    const database = new PostgresRelatorio();
    return await database.getComprasPorPeriodo(de, ate);
  }
}
