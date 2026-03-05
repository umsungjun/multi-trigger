// Yahoo Finance를 통한 한국 주식 가격 조회
// KOSPI: {종목코드}.KS, KOSDAQ: {종목코드}.KQ
// API 키 불필요, 가입 불필요

const YF_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

// KOSDAQ 종목 코드 목록 (나머지는 KOSPI로 처리)
const KOSDAQ_CODES = new Set(["035720", "247540", "086520", "196170", "112040"]);

function toYahooSymbol(code: string): string {
  return KOSDAQ_CODES.has(code) ? `${code}.KQ` : `${code}.KS`;
}

export async function getKRStockPrice(
  stockCode: string
): Promise<number | null> {
  try {
    const symbol = toYahooSymbol(stockCode);
    const res = await fetch(`${YF_BASE}/${symbol}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return typeof price === "number" ? price : null;
  } catch {
    return null;
  }
}

export async function getKRStockPrices(
  codes: string[]
): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  await Promise.allSettled(
    codes.map(async (code) => {
      const price = await getKRStockPrice(code);
      if (price !== null) prices[code] = price;
    })
  );
  return prices;
}

// 한국 주식 검색은 정적 데이터로 처리
const POPULAR_KR_STOCKS = [
  { symbol: "005930", name: "삼성전자" },
  { symbol: "000660", name: "SK하이닉스" },
  { symbol: "373220", name: "LG에너지솔루션" },
  { symbol: "207940", name: "삼성바이오로직스" },
  { symbol: "005380", name: "현대차" },
  { symbol: "006400", name: "삼성SDI" },
  { symbol: "051910", name: "LG화학" },
  { symbol: "035420", name: "NAVER" },
  { symbol: "000270", name: "기아" },
  { symbol: "035720", name: "카카오" }, // KOSDAQ
  { symbol: "105560", name: "KB금융" },
  { symbol: "055550", name: "신한지주" },
  { symbol: "066570", name: "LG전자" },
  { symbol: "003670", name: "포스코퓨처엠" },
  { symbol: "028260", name: "삼성물산" },
  { symbol: "068270", name: "셀트리온" },
  { symbol: "096770", name: "SK이노베이션" },
  { symbol: "034730", name: "SK" },
  { symbol: "003550", name: "LG" },
  { symbol: "012330", name: "현대모비스" },
];

export function searchKRStocks(query: string) {
  return POPULAR_KR_STOCKS.filter(
    (stock) =>
      stock.name.includes(query) || stock.symbol.includes(query)
  ).map((stock) => ({
    ...stock,
    assetType: "kr_stock" as const,
  }));
}
