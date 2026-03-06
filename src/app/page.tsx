import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center relative">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-linear-to-r from-accent/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-linear-to-l from-accent/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light border border-accent/20 text-accent text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          실시간 가격 모니터링
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          나만의{" "}
          <span className="bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            투자 알림
          </span>
          <br />
          한 곳에서 관리하세요
        </h1>

        <p className="text-lg text-muted mb-12 max-w-lg mx-auto leading-relaxed">
          미국 주식, 한국 주식, 암호화폐까지
          <br />
          목표가에 도달하면 즉시 알림을 받으세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-2xl w-full mb-12">
          <div className="group p-6 rounded-2xl bg-card border border-card-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold mb-1.5">미국/한국 주식</h3>
            <p className="text-sm text-muted leading-relaxed">
              NASDAQ, NYSE, KOSPI, KOSDAQ 실시간 추적
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-card border border-card-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white mb-4">
              {/* Bitcoin 아이콘 */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.25 14.5H13v1a.75.75 0 01-1.5 0v-1h-.75v1a.75.75 0 01-1.5 0v-1H8a.75.75 0 010-1.5h.5V9H8a.75.75 0 010-1.5h1.25v-1a.75.75 0 011.5 0v1H11v-1a.75.75 0 011.5 0v1h.75c1.24 0 2.25 1.01 2.25 2.25 0 .61-.24 1.16-.63 1.57.6.44.98 1.14.98 1.93 0 1.38-1.12 2.25-2.6 2.25zm-.5-4.5h-.75v2h.75c.55 0 1-.45 1-1s-.45-1-1-1zm.25-3h-.75v-1.5h.75c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            </div>
            <h3 className="font-bold mb-1.5">암호화폐</h3>
            <p className="text-sm text-muted leading-relaxed">
              BTC, ETH 등 Binance 상장 코인 지원
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-card border border-card-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white text-xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold mb-1.5">즉시 알림</h3>
            <p className="text-sm text-muted leading-relaxed">
              목표가 도달 시 브라우저 푸시 알림
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-gradient-start to-gradient-end text-white font-semibold text-lg shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            {session ? "대시보드 바로가기" : "무료로 시작하기"}
          </Link>
          {!session && (
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-2xl border border-card-border text-muted hover:text-foreground hover:border-accent/30 font-medium transition-all duration-300"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
