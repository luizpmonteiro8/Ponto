enum Environments { DEVELOPER, TEST, PRODUCTION }

class EnvironmentConfig {
  static Environments? environmentBuild;

  static String urlsConfig() {
    switch (environmentBuild) {
      case Environments.DEVELOPER:
        return "http://192.168.1.10:8080";

      case Environments.TEST:
        return "http://192.168.1.10:8080";

      case Environments.PRODUCTION:
        return "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

      default:
        return "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    }
  }
}
