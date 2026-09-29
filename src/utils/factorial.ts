export const MAX_INPUT = 500;

export type ValidationResult =
  | { ok: true; value: number }
  | { ok: false; message: string };

export function validate(raw: string): ValidationResult {
  const text = raw.trim();

  if (!text) {
    return { ok: false, message: 'Ingresa un número' };
  }

  if (!/^[+-]?\d+$/.test(text)) {
    return { ok: false, message: 'Solo se permiten números enteros' };
  }

  const value = Number(text);

  if (!Number.isFinite(value)) {
    return { ok: false, message: 'El número es demasiado grande' };
  }

  if (value < 0) {
    return { ok: false, message: 'El número debe ser positivo' };
  }

  if (value > MAX_INPUT) {
    return { ok: false, message: `El máximo permitido es ${MAX_INPUT}` };
  }

  return { ok: true, value };
}

export function factorial(n: number): bigint {
  if (n <= 1) {
    return 1n;
  }

  let result = 1n;

  for (let i = 2n; i <= BigInt(n); i += 1n) {
    result *= i;
  }

  return result;
}

/**
 * Agrupa los miles con coma y conserva el punto como separador decimal.
 * Ej.: '1234567' -> '1,234,567' y '1234.5678' -> '1,234.5678'.
 *
 * El factorial siempre produce enteros, pero se separa la parte decimal para
 * que el agrupado no invierta cifras después del punto si se llegara a usar
 * con valores fraccionarios.
 */
export function withThousandsSeparator(value: string): string {
  const [integerPart, decimalPart] = value.split('.');

  const grouped = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart === undefined ? grouped : `${grouped}.${decimalPart}`;
}
