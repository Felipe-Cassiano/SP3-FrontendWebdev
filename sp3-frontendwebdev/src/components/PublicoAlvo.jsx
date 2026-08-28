export default function PublicoAlvo() {
    const perfis = [
        {
            titulo: "Entusiastas de Fotografia",
            descricao: "Usuários que desejam ir além do modo automático e entender de forma prática os parâmetros manuais da câmera.",
            tag: "Avançado"
        },
        {
            titulo: "Usuários dos Celulares JOVI",
            descricao: "Proprietários de dispositivos JOVI que buscam extrair a melhor qualidade de imagem do seu hardware.",
            tag: "Nativo"
        },
        {
            titulo: "Criadores de Conteúdo",
            descricao: "Pessoas que precisam de edições rápidas e precisas diretamente na galeria antes de publicar.",
            tag: "Prático"
        }
    ]

    return (
        <section className="w-full bg-neutral-950 py-12 md:py-20 px-4 sm:px-6 md:px-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
                
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">
                        Público-Alvo
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-2">
                        Para Quem Projetamos
                    </h2>
                </div>

                {/* Grid Responsivo: 1 col no Mobile, 2 cols em Tablet e 3 cols em Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {perfis.map((item, index) => (
                        <div 
                            key={index} 
                            className={`bg-neutral-900/60 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-neutral-800 flex flex-col items-start text-left gap-3 sm:gap-4 hover:border-blue-500/50 transition-colors ${
                                index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                            }`}
                        >
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {item.tag}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white">{item.titulo}</h3>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.descricao}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}