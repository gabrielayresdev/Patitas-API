import { body } from "express-validator";

function validatorCliente(method: string) {
  switch (method) {
    case "createCliente": {
      return [
        body("email")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 3 })
          .withMessage("O email deve conter pelo menos 3 caracteres")
          .isEmail()
          .withMessage("Precisa ser como exemplo@exemplo"),

        body("nome")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 3 })
          .withMessage("O nome deve conter pelo menos 3 caracteres")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("cpf")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 11, max: 11 })
          .withMessage("CPF deve conter exatamente 11 digitos")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("senha")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 6 })
          .withMessage("A senha deve conter pelo menos 6 caracteres")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("telefone")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 8 })
          .withMessage("O telefone deve conter pelo menos 8 numeros")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("adm")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isBoolean()
          .withMessage("Valor deve ser um valor booleano"),
      ];
    }
  }
}

function validatorProduto(method: string) {
  switch (method) {
    case "createProduto": {
      return [
        body("nome")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 3 })
          .withMessage("O nome deve conter pelo menos 3 caracteres")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("preco")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isNumeric()
          .withMessage("Valor deve ser um valor numérico"),

        body("categoria")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .equals("racao" || "brinquedo" || "remedio" || "acessorio")
          .withMessage(
            "Categoria inválida. Categorias disponíveis: 'racao', 'brinquedo', 'remedio', 'acessorio'"
          ),

        body("foto_path")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isLength({ min: 2 })
          .withMessage("O caminho deve conter pelo menos 2 caracteres")
          .isString()
          .withMessage("Valor deve ser uma string"),

        body("desconto")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isNumeric()
          .withMessage("O Valor deve ser um valor numérico"),

        body("quantidade")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isNumeric()
          .withMessage("O Valor deve ser um valor numérico"),
      ];
    }
  }
}

function validatorCompra(method: string) {
  switch (method) {
    case "createCompra": {
      return [
        body("produtoId")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isNumeric()
          .withMessage("Valor deve ser numérico"),

        body("quantidade")
          .exists()
          .withMessage("O campo não pode ser nulo")
          .isNumeric()
          .withMessage("Valor deve ser numérico"),
      ];
    }
  }
}

export { validatorCliente, validatorProduto, validatorCompra };
