import { useState, useRef, useEffect } from "react"

const LARGURA_LINHA = 8
const ICONES = ["brilho", "contraste", "saturacao", "temperatura", "matiz", "desfoque"]

export default function EditionMode({ filtros, setFiltros, sugestoesIA }) {
    const [filtroAtivo, setFiltroAtivo] = useState("brilho")
    const sliderRef = useRef(null)
    const posicaoAtual = useRef(0)
    const posicaoMin = useRef(0)
    const posicaoMax = useRef(0)
    const linha0 = useRef(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const startPosicao = useRef(0)

    useEffect(() => {
        const slider = sliderRef.current
        linha0.current = slider.querySelector(".editionSliderLinha[data-valor='0']")

        posicaoMin.current = -(linha0.current.offsetLeft + 100 * LARGURA_LINHA) + slider.offsetWidth / 2
        posicaoMax.current = -(linha0.current.offsetLeft + 0 * LARGURA_LINHA) + slider.offsetWidth / 2

        posicaoAtual.current = -(linha0.current.offsetLeft + 50 * LARGURA_LINHA) + slider.offsetWidth / 2
        slider.style.transform = `translateX(${posicaoAtual.current}px)`
    }, [])

    function pegarValorAtual() {
        const slider = sliderRef.current
        const valor = Math.round((-posicaoAtual.current + slider.offsetWidth / 2 - linha0.current.offsetLeft) / LARGURA_LINHA)
        return Math.max(0, Math.min(100, valor))
    }

    function moverSlider(novaPosicao) {
        const slider = sliderRef.current
        posicaoAtual.current = Math.max(posicaoMin.current, Math.min(posicaoMax.current, novaPosicao))
        slider.style.transform = `translateX(${posicaoAtual.current}px)`

        const valor = pegarValorAtual()
        setFiltros(prev => ({ ...prev, [filtroAtivo]: valor }))
    }

    function handleWheel(e) {
        e.preventDefault()
        moverSlider(posicaoAtual.current + e.deltaY * -0.03)
    }

    function handleMouseDown(e) {
        isDragging.current = true
        startX.current = e.clientX
        startPosicao.current = posicaoAtual.current
    }

    function handleMouseMove(e) {
        if (!isDragging.current) return
        moverSlider(startPosicao.current + (e.clientX - startX.current))
    }

    function handleMouseUp() {
        isDragging.current = false
    }

    function clicarIcone(filtro) {
        setFiltroAtivo(filtro)

        // move o slider para o valor do filtro ativo
        const valorAtual = filtros[filtro]
        const slider = sliderRef.current
        posicaoAtual.current = -(linha0.current.offsetLeft + valorAtual * LARGURA_LINHA) + slider.offsetWidth / 2
        slider.style.transform = `translateX(${posicaoAtual.current}px)`
    }

    const linhas = Array.from({ length: 101 }, (_, i) => {
        let className = "editionSliderLinha"
        if (i % 10 === 0) className += " linhaGrande"
        else if (i % 5 === 0) className += " linhaMedia"
        if (sugestoesIA[filtroAtivo] === i) className += " linhaDestaque"
        return <div key={i} className={className} data-valor={i} />
    })

    return (
        <div className="phoneEditionMode">
            <ul className="editionIconsContainer">
                {ICONES.map(icone => (
                    <li
                        key={icone}
                        className={`editionIcons ${filtroAtivo === icone ? "iconAtivo" : ""} ${sugestoesIA[icone] !== undefined ? "iconeDestaque" : ""}`}
                        data-filtro={icone}
                        onClick={() => clicarIcone(icone)}
                    >
                        {icone}
                    </li>
                ))}
            </ul>

            <div className="wrapper">
                <div
                    className="editionSlider"
                    ref={sliderRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {linhas}
                </div>
                <div className="editionMarcador" />
            </div>

            <div className="editionTitle">
                {filtroAtivo.toUpperCase()}
            </div>
        </div>
    )
}