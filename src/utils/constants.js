export const constants = {
  APP_NAME: 'Task Management API',
  VERSION: '1.0.0',
};

export const QUERIES = {
  ALL_PRODUCTS: "SELECT * FROM produtos;",
  SPECIFIC_ID_PRODUCTS: "SELECT * FROM produtos WHERE produto_id = $1;",
  SPECIFIC_CATEGORY_PRODUCTS: "SELECT * FROM produtos WHERE produto_categoria_id = $1;",
  CREATE_PRODUCT: "INSERT INTO produtos (produto_nome, produto_preco, produto_descricao, produto_material, produto_categoria_id) VALUES($1, $2, $3, $4, $5);",
  DELETE_PRODUCT: "DELETE FROM produtos WHERE produto_id = $1;"
}