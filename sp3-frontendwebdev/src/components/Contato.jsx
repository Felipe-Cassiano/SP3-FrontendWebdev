import { useState } from "react"

export default function Contato() {
    const [copiado, setCopiado] = useState(false)
    const email = "rm569238@fiap.com.br"

    function handleCopy() {
        navigator.clipboard.writeText(email)
        setCopiado(true)
        setTimeout(() => setCopiado(false), 2000)
    }

    return (
        <section className="w-full bg-neutral-950 py-12 md:py-20 px-4 sm:px-6 md:px-12 border-t border-neutral-800">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
                
                {/* Header da Seção */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">
                        Fale Conosco
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Entre em Contato
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-md mt-1 leading-relaxed">
                        Dúvidas, sugestões ou feedback sobre a aplicação? Envie uma mensagem para a nossa equipe.
                    </p>
                </div>

                {/* Card de E-mail */}
                <div className="w-full max-w-lg bg-neutral-900/60 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-800 flex flex-col items-center gap-5 hover:border-blue-500/40 transition-colors">
                    
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                        ✉️
                    </div>

                    <div className="flex flex-col items-center gap-1 w-full">
                        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                            E-mail Oficial
                        </span>
                        <span className="text-base sm:text-lg font-mono font-semibold text-white break-all">
                            {email}
                        </span>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                        <a 
                            href={`mailto:${email}`}
                            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-colors text-center"
                        >
                            Enviar E-mail
                        </a>

                        <button 
                            onClick={handleCopy}
                            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-neutral-700 text-neutral-300 font-medium text-xs sm:text-sm transition-colors"
                        >
                            {copiado ? "✓ Copiado!" : "Copiar Endereço"}
                        </button>
                    </div>

                </div>

            </div>
        </section>
    )
}