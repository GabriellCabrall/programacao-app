export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
};

export const newsMock: NewsItem[] = [
  {
    id: "1",
    title: "Petroleiro cruza Estreito de Ormuz em aparente desafio ao bloqueio de Trump",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "Presidente do INSS, Gilberto Waller, é demitido após 11 meses",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Túnel Santos-Guarujá: em que fase está a obra do 1º túnel imerso do Brasil?",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
  },
];