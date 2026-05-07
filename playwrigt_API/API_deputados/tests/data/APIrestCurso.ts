
public class DeputadosData {
  private static String gerarEmailAleatorio() {
    String prefixo = "mj";
    int numero = ThreadLocalRandom.current().nextInt(0, 100);
    return prefixo + numero + "@qa.com.br";
  }

  public static final String nome = "Eduardo da Fonte";
  public static final String nome2 = "";
  public static final String email = gerarEmailAleatorio();
  //public static final String email2 = geraailAleatorio();
  public static final String estado = "PE";
  public static final String partido = "PT";
}
