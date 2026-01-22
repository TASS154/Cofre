export interface PoemData {
  content: string
  answer: string
  type: 'highlighted_words' | 'recurring_word' | 'acrostic'
}

export const poems: Record<'file1' | 'file2' | 'file3', PoemData> = {
  file1: {
    content: `Já fazem três,
talvez seis,
ou mais que 10 vezes
que imagino como tudo poderia ter sido diferente.
Como teria sido trágico
se não a tivesse conhecido.
Como tudo poderia mudar
se tudo tivesse começado de outra forma.
Muito tempo atrás começaria uma história
que só muito depois viria a conhecer,
e que se tornaria sua favorita —
a escutar enquanto viaja em um navio,
velejando em busca do melhor dos 7 mares.
Mas, ainda assim,
não haveria nada melhor do que o que já existe.
Entre mil tesouros,
2009 lugares,
inumeras pessoas conhecidas,
o único lugar onde seu coração se sentiria inteiro
seria ao lado de sua amada.`,
    answer: '10/07/2009',
    type: 'highlighted_words',
  },
  file2: {
    content: `Pois sempre olhara para frente,

nem para cima, para ver as estrelas,
nem aos lados, para ver os horizontes,
nem para trás, para ver o caminho percorrido.
Pois Sempre sentia o dever de caminhar,
mas não a razão.
Sempre sentia a falta de algo,
Sempre se perguntava o quê.
Então sentiu uma cutucada no ombro.
Virou-se, e não tinha nada.
Mas maravilhou-se com o horizonte.
Sentiu um toque nas costas.
Virou-se, e nada.
Mas percebeu o próprio caminho.
Sentiu algo acima.
Olhou, e viu as estrelas.
Não as do céu,
mas aquelas que Sempre procurava.
As que Sempre brilhavam mais,
as que poderia Sempre olhar,
as que surgem no olhar de quem ama,
junto de um sorriso impossível de ignorar.
De quem ele vai amar.
Pra sempre.`,
    answer: 'Sempre ou para sempre',
    type: 'recurring_word',
  },
  file3: {
    content: `2 razões pra continuar
4 motivos pra sorrir

Desde que conheceu a paz,
Ele nunca pensou em nada além.

Desde que viu a luz que ilumina a alma,
E acalma, protege e permanece.
Zela por seu bem,
E deseja que brilhe ainda mais.
Mesmo que ainda não perceba,
Beleza sem espelho,
Romance sem medida,
O amor que nasce da ternura.`,


    answer: '24 de dezembro',
    type: 'acrostic',
  },
}

