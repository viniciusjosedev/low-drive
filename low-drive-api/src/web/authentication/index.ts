import jwt from "jsonwebtoken";
import { Sign } from "../../interfaces/web/authentication/authentication";

class Authentication {
  public static sign(data: Sign) {
    return jwt.sign(data, "teste", { algorithm: "HS256", expiresIn: "365d" });
  }

  public static verify(token: string): Sign | "invalid" {
    try {
      return jwt.verify(token, "teste") as Sign;
    } catch (error) {
      return "invalid";
    }
  }
}

export default Authentication;
