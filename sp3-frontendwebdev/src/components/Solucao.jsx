export default function Solucao() {
    return (
        <section className="w-full bg-black py-12 md:py-20 px-4 sm:px-6 md:px-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Coluna Principal de Texto (Em mobile ocupa full; em desktop ocupa 7 colunas) */}
                <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 text-left">
                    <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">
                        A Solução
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                        Exploração Guiada para Câmeras JOVI
                    </h2>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        A funcionalidade <strong>Live Suggestions</strong> foi desenvolvida para os dispositivos da linha JOVI com o objetivo de transformar a experiência de fotografia mobile.
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        Em vez de apenas aplicar ajustes automáticos invisíveis, a interface orienta o usuário em tempo real. Através de marcadores na régua de edição, ela ensina como cada parâmetro afeta a imagem, incentivando o aprendizado prático e a exploração de todo o potencial da câmera.
                    </p>
                </div>

                {/* Card de Objetivos (Em mobile/tablet ocupa full; em desktop 5 colunas) */}
                <div className="lg:col-span-5 bg-neutral-900/80 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-neutral-800 flex flex-col gap-4 text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-white border-b border-neutral-800 pb-3">
                        Objetivos Principais
                    </h3>
                    <ul className="space-y-3 text-neutral-300 text-xs sm:text-sm">
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                            <span><strong>Educação Prática:</strong> Demonstrar o impacto de cada parâmetro visual em tempo real.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                            <span><strong>Engajamento:</strong> Estimular o usuário a testar e dominar configurações manuais.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                            <span><strong>Valorização JOVI:</strong> Destacar a capacidade técnica das câmeras da linha.</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    )
}