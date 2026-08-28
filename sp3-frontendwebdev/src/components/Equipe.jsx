export default function Equipe() {
    const membros = [
        { nome: "Felipe Roberto Cassiano", rm: "569238" },
        { nome: "Paulo Henrique Moreira Angueira", rm: "573245" },
        { nome: "Raphael Martins Manfredi", rm: "570500" },
        { nome: "Eduardo de Abreu Gouvêa", rm: "573414" },
        { nome: "Vinícius Mansur Magalhães", rm: "571518" }
    ]

    return (
        <section className="w-full bg-black py-12 md:py-20 px-4 sm:px-6 md:px-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
                
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">
                        Time de Desenvolvimento
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-2">
                        Nossa Equipe
                    </h2>
                </div>

                {/* Grid Responsivo: 1 col no Mobile, 2 em Tablet pequeno, 3 em Tablet grande e 5 em Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {membros.map((membro) => (
                        <div 
                            key={membro.rm}
                            className="bg-neutral-900/60 p-4 sm:p-5 md:p-6 rounded-2xl border border-neutral-800 flex flex-col items-center text-center gap-3 hover:border-blue-500/50 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-base sm:text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {membro.nome.charAt(0)}
                            </div>
                            <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug min-h-[2.25rem] flex items-center justify-center">
                                {membro.nome}
                            </h3>
                            <span className="text-[11px] sm:text-xs text-neutral-400 font-mono bg-black/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-neutral-800">
                                RM {membro.rm}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}