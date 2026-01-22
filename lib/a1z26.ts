/**
 * Normaliza uma string para comparação (remove acentos, lowercase, trim)
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Valida se a resposta do A1Z26 está correta
 * Aceita "26 de novembro" ou "26/11" com variações de case e acentos
 */
export function validateA1Z26Answer(answer: string): boolean {
  const normalized = normalizeString(answer)
  const expectedFull = normalizeString('26 de novembro')
  const expectedShort = normalizeString('26/11')
  
  // Remove espaços e barras para comparação flexível
  const normalizedClean = normalized.replace(/\s+/g, '').replace(/\//g, '')
  const expectedFullClean = expectedFull.replace(/\s+/g, '')
  const expectedShortClean = expectedShort.replace(/\//g, '')
  
  // Aceita "26 de novembro" ou "26/11" ou variações
  return normalized === expectedFull || 
         normalized === expectedShort ||
         normalizedClean === expectedFullClean ||
         normalizedClean === expectedShortClean ||
         (normalized.includes('26') && normalized.includes('novembro')) ||
         normalized.includes('26/11') ||
         normalized.includes('2611')
}

