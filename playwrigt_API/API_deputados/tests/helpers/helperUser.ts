
package br.com.seuProjeto.helpers;

import com.microsoft.playwright.APIRequest;
import com.microsoft.playwright.APIRequestContext;
import com.microsoft.playwright.APIResponse;
import com.microsoft.playwright.Playwright;
import br.com.seuProjeto.config.Config;
import br.com.seuProjeto.data.DeputadosData;
import org.junit.jupiter.api.Assertions;
import java.util.Map;

public class HelperUser {

  public static class HeloWordResult {
    public final APIRequestContext apiRequestContext;
    public final String nome;

    public HeloWordResult(APIRequestContext apiRequestContext, String nome) {
      this.apiRequestContext = apiRequestContext;
      this.nome = nome;
    }
  }

  public static HeloWordResult heloWord() {
    Playwright playwright = Playwright.create();
    APIRequest request = playwright.request();
    APIRequestContext context = request.newContext();
    try {vx
      String url = Config.BASE_URL + Config.Endpoints.DEPUTADOS;

      APIResponse res = context.get(url, APIRequestContext.GetOptions.create()
          .setParams(Map.of("nome", DeputadosData.nome))
      );

      Assertions.assertEquals(200, res.status(), "Status diferente de 200");

      // Parse simples do JSON (sem classes POJO), só pega o primeiro nome
      String body = res.text();
      // Forma simples com regex/substring para evitar dependências extras
      // Melhor: usar Jackson e mapear (ver exemplo comentado abaixo)
      String nomeEncontrado = extrairPrimeiroNome(body);

      return new HeloWordResult(context, nomeEncontrado);
    } finally {
      // Não fechamos o context aqui pois é retornado (o chamador pode fechar).
      // playwright.close(); // Fechar no final do teste
    }
  }

  // Método simples para extrair "dados[0].nome" do JSON.
  // Em produção, prefira Jackson para robustez.
  private static String extrairPrimeiroNome(String json) {
    // Muito simplificado: procure por "nome":"XYZ"
    int idx = json.indexOf("\"nome\"");
    if (idx == -1) return "";
    int start = json.indexOf(":", idx) + 1;
    int firstQuote = json.indexOf("\"", start);
    int secondQuote = json.indexOf("\"", firstQuote + 1);
    if (firstQuote == -1 || secondQuote == -1) return "";
    return json.substring(firstQuote + 1, secondQuote);
  }

  /* Exemplo usando Jackson (recomendado):
  private static String extrairPrimeiroNomeJackson(String json) {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode root = mapper.readTree(json);
    JsonNode dados = root.path("dados");
    if (dados.isArray() && dados.size() > 0) {
      return dados.get(0).path("nome").asText("");
    }
    return "";
  }
  */
}
