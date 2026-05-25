Feature: Login

  @login-sucesso
  Scenario: Login com sucesso
    Given que acesso o sistema
    When preencho o usuario
    And preencho a senha
    And clico em login
    Then devo ver a tela de produtos