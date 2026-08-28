import { useState, useRef, useEffect } from "react"

const LARGURA_PASSO = 8 // Cada linha ocupa exatamente 8px no DOM
const TOTAL_LINHAS = 101
const ICONES = ["brilho", "contraste", "saturacao", "temperatura", "matiz", "desfoque"]

export default function EditionMode({ filtros, setFiltros, sugestoesIA }) {
    const [filtroAtivo, setFiltroAtivo] = useState("temperatura")
    const containerRef = useRef(null)
    const sliderRef = useRef(null)
    const posicaoAtual = useRef(0)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const startPosicao = useRef(0)

    // Calcula a posição em pixels para um determinado valor de 0 a 100
    function calcularPosicaoParaValor(valor) {
        const slider = sliderRef.current
        if (!slider) return 0
        const containerWidth = slider.parentElement.offsetWidth
        // Ponto zero está no centro (containerWidth / 2)
        // Cada unidade anda LARGURA_PASSO para a esquerda
        return (containerWidth / 2) - (valor * LARGURA_PASSO)
    }

    function aplicarTransform(posicao) {
        const slider = sliderRef.current
        if (!slider) return

        const containerWidth = slider.parentElement.offsetWidth
        // Limite mínimo: valor 100 no centro
        const minPos = (containerWidth / 2) - ((TOTAL_LINHAS - 1) * LARGURA_PASSO)
        // Limite máximo: valor 0 no centro
        const maxPos = containerWidth / 2

        posicaoAtual.current = Math.max(minPos, Math.min(maxPos, posicao))
        slider.style.transform = `translateX(${posicaoAtual.current}px)`

        // Calcula valor de 0 a 100
        const valorCalculado = Math.round(((containerWidth / 2) - posicaoAtual.current) / LARGURA_PASSO)
        const valorClamped = Math.max(0, Math.min(100, valorCalculado))

        setFiltros(prev => ({ ...prev, [filtroAtivo]: valorClamped }))
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Reposiciona o slider ao mudar o filtro ativo ou ao carregar
        const valorAtual = filtros[filtroAtivo] ?? 50
        const novaPos = calcularPosicaoParaValor(valorAtual)
        aplicarTransform(novaPos)

        const handleWheel = (e) => {
            e.preventDefault()
            e.stopPropagation()
            const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX
            aplicarTransform(posicaoAtual.current - delta * 0.4)
        }

        const handleMouseMoveGlobal = (e) => {
            if (!isDragging.current) return
            aplicarTransform(startPosicao.current + (e.clientX - startX.current))
        }

        const handleMouseUpGlobal = () => {
            isDragging.current = false
        }

        container.addEventListener("wheel", handleWheel, { passive: false })
        window.addEventListener("mousemove", handleMouseMoveGlobal)
        window.addEventListener("mouseup", handleMouseUpGlobal)

        return () => {
            container.removeEventListener("wheel", handleWheel)
            window.removeEventListener("mousemove", handleMouseMoveGlobal)
            window.removeEventListener("mouseup", handleMouseUpGlobal)
        }
    }, [filtroAtivo])

    function handleMouseDown(e) {
        isDragging.current = true
        startX.current = e.clientX
        startPosicao.current = posicaoAtual.current
    }

    function clicarIcone(filtro) {
        setFiltroAtivo(filtro)
    }

    return (
        <div 
            ref={containerRef}
            className="pt-4 w-full flex flex-col items-center select-none relative"
            style={{ background: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(12px)" }}
        >
            {/* Ícones */}
            <ul className="z-[2] p-0 w-full list-none flex justify-evenly items-center">
                {ICONES.map(icone => {
                    const temSugestao = sugestoesIA[icone] !== undefined
                    return (
                        <li
                            key={icone}
                            className="relative flex flex-col justify-center items-center cursor-pointer"
                            onClick={() => clicarIcone(icone)}
                        >
                            {temSugestao && (
                                <span className="absolute -top-1.5 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15]" />
                            )}

                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-all
                                ${filtroAtivo === icone ? "bg-white/20 scale-110" : "opacity-60 hover:opacity-100"}
                            `}>
                                <img 
                                    src={`/icones/${icone}.png`} 
                                    alt={icone} 
                                    className="w-5 h-5 object-contain" 
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>

            {/* Area da Régua */}
            <div 
                className="relative w-full overflow-hidden my-2 cursor-grab active:cursor-grabbing h-16 flex items-center"
                onMouseDown={handleMouseDown}
            >
                {/* Trilho que se move em X */}
                <div
                    ref={sliderRef}
                    className="absolute left-0 flex items-center h-full transition-none will-change-transform"
                    style={{ width: `${TOTAL_LINHAS * LARGURA_PASSO}px` }}
                >
                    {Array.from({ length: TOTAL_LINHAS }, (_, i) => {
                        const isDestaqueIA = sugestoesIA[filtroAtivo] === i
                        let estiloBarra = "h-4 bg-white/40 w-[2px]"
                        if (i % 10 === 0) estiloBarra = "h-8 bg-white w-[2px]"
                        else if (i % 5 === 0) estiloBarra = "h-6 bg-white/70 w-[2px]"

                        return (
                            <div
                                key={i}
                                className="w-[8px] shrink-0 flex items-center justify-center h-full"
                            >
                                <div
                                    className={`rounded-full transition-colors ${
                                        isDestaqueIA ? "bg-yellow-400 shadow-[0_0_6px_#facc15] h-9 w-[2px] z-10" : estiloBarra
                                    }`}
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Marcador Fixo Amarelo do Centro */}
                <div className="absolute w-[2px] top-0 left-1/2 -translate-x-1/2 z-20 h-full bg-yellow-400 pointer-events-none shadow-[0_0_8px_#facc15]" />
            </div>

            {/* Nome do Filtro */}
            <div className="relative text-white text-[11px] tracking-widest font-bold z-10 pb-2 flex items-center justify-center pointer-events-none">
                {filtroAtivo.toUpperCase()}
            </div>
        </div>
    )
}