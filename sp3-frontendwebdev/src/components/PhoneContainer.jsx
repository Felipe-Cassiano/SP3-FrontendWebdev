import { useState, useRef } from "react"
import EditionMode from "./EditionMode"

export default function PhoneContainer() {
    const [bgImage, setBgImage] = useState(null)
    const [sugestoesIA, setSugestoesIA] = useState({})
    const [filtros, setFiltros] = useState({
        brilho: 50,
        contraste: 50,
        saturacao: 50,
        temperatura: 50,
        matiz: 50,
        desfoque: 0
    })

    const inputRef = useRef(null)

    // Monta a string do filtro CSS dinamicamente
    const filtroCSS = `
        brightness(${filtros.brilho * 2}%) 
        contrast(${filtros.contraste * 2}%) 
        saturate(${filtros.saturacao * 2}%) 
        hue-rotate(${(filtros.matiz - 50) * 3.6}deg) 
        blur(${filtros.desfoque * 0.1}px)
    `

    function carregarImagem(file) {
        if (!file) return
        const url = URL.createObjectURL(file)
        setBgImage(url)
        processarImagemComIA(file)
    }

    async function processarImagemComIA(file) {
        const formData = new FormData()
        formData.append("arquivo", file)

        try {
            const resposta = await fetch("http://localhost:5000/api/analisar", {
                method: "POST",
                body: formData
            })

            if (!resposta.ok) return

            const retornoIA = await resposta.json()
            const alteracoes = retornoIA?.alteracoes || {}
            const novosFiltros = { ...filtros }
            const novasSugestoes = {}

            Object.entries(alteracoes).forEach(([chave, info]) => {
                if (info?.precisa === true || info?.precisa === "true") {
                    novosFiltros[chave] = Number(info.valor)
                    novasSugestoes[chave] = Number(info.valor)
                }
            })

            setFiltros(novosFiltros)
            setSugestoesIA(novasSugestoes)
        } catch (error) {
            console.error("Erro ao processar imagem:", error)
        }
    }

    function handleDrop(e) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        carregarImagem(file)
    }

    function handleDragOver(e) {
        e.preventDefault()
    }

    function handleInputChange(e) {
        const file = e.target.files[0]
        carregarImagem(file)
    }

    return (
        <section className="w-full min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 md:px-12">

            {/* Gradientes Suaves de Fundo (Header e Footer) */}
            <div 
                className="fixed top-0 left-0 w-full h-28 pointer-events-none z-0"
                style={{ background: "linear-gradient(180deg, rgba(30, 64, 175, 0.2) 0%, transparent 100%)" }}
            />
            <div 
                className="fixed bottom-0 left-0 w-full h-28 pointer-events-none z-0"
                style={{ background: "linear-gradient(0deg, rgba(30, 64, 175, 0.2) 0%, transparent 100%)" }}
            />

            {/* Container Principal Organizado Empilhado (Logo -> Celular -> Texto) */}
            <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12 z-10">

                {/* 1. Logo TuxLabs no Topo */}
                <div className="flex justify-center items-center">
                    <img 
                        src="/icones/tuxlabs.png" 
                        alt="TuxLabs Logo" 
                        className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
                    />
                </div>

                {/* 2. Mockup do Celular no Centro */}
                <div className="flex justify-center items-center w-full">
                    <div
                        className="relative w-[300px] sm:w-[340px] h-[600px] sm:h-[680px] rounded-[40px] sm:rounded-[44px] bg-neutral-900 border-[5px] sm:border-[6px] border-neutral-800 shadow-2xl overflow-hidden flex flex-col justify-end"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {/* Imagem de Fundo dentro do Celular */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-75 cursor-pointer z-0"
                            style={{
                                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                                filter: filtroCSS
                            }}
                            onClick={() => inputRef.current?.click()}
                        >
                            {!bgImage && (
                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-neutral-500 gap-2">
                                    <span className="text-3xl">📷</span>
                                    <p className="text-xs sm:text-sm font-medium">Clique ou solte uma imagem aqui</p>
                                </div>
                            )}
                        </div>

                        {/* Input invisível para arquivo */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            className="hidden"
                            onChange={handleInputChange}
                        />

                        {/* Controles da Régua e Filtros (EditionMode Mantido Intacto) */}
                        <div className="relative w-full z-10">
                            <EditionMode
                                filtros={filtros}
                                setFiltros={setFiltros}
                                sugestoesIA={sugestoesIA}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Bloco do Texto Live Suggestions Embaixo */}
                <div className="w-full max-w-2xl bg-neutral-900/60 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-800 flex flex-col items-center text-center gap-4">
                    <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase">
                        Nossa Criação
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Live Suggestions
                    </h2>

                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        Ao dropar a imagem, as sugestões em tempo real serão exibidas na interface do celular, indicadas por marcadores azuis. Com isso, o usuário pode, de forma dinâmica, alterar e compreender as configurações de filtro.
                    </p>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        Para começar a experiência interativa, selecione uma foto abaixo ou arraste-a diretamente para a tela do smartphone! (caso não apareça a sugestão, aguarde alguns segundos para que a IA processe a imagem. Caso isso não ocorra, tente novamente mais tarde, a API do Gemini está sobrecarregada!)
                    </p>

                    <button
                        className="mt-2 px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                    >
                        Selecionar Imagem
                    </button>
                </div>

            </div>

        </section>
    )
}