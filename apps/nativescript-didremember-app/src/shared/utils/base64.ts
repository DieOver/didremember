import * as base64 from 'base-64';
import * as utf8 from 'utf8';

/**
 * Utilitário para trabalhar com Base64
 */
export class Base64 {
  /**
   * Codificar base64
   */
  public static encode(text: string): string {
    const bytes = utf8.encode(text);
    return base64.encode(bytes);
  }

  /**
   * Decodificar base64
   */
  public static decode(text: string): string {
    return base64.decode(text);
  }
}
