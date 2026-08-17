import { useState, useRef } from "react"
import EditionMode from "./EditionMode"

const filtrosInicial = {
    brilho:      50,
    contraste:   50,
    saturacao:   50,
    temperatura: 50,
    matiz:       50,
    desfoque:     0,
}

export default function PhoneContainer() {
    const [bgImage, setBgImage] = useState(null)
    const [filtros, setFiltros] = useState(filtrosInicial)
    const [sugestoesIA, setSugestoesIA] = useState({})
    const inputRef = useRef(null)

    async function processarImagem(arquivo) {
        const url = URL.createObjectURL(arquivo)
        setBgImage(url)

        const formData = new FormData()
        formData.append("arquivo", arquivo)

        const resposta = await fetch("/api/analisar", {
            method: "POST",
            body: formData
        })
        const retornoIA = await resposta.json()
        const alteracoes = retornoIA.alteracoes

        const novosFiltros = { ...filtros }
        const novasSugestoes = {}

        Object.entries(alteracoes).forEach(([chave, info]) => {
            if (info.precisa) {
                novosFiltros[chave] = info.valor
                novasSugestoes[chave] = info.valor
            }
        })

        setFiltros(novosFiltros)
        setSugestoesIA(novasSugestoes)
    }

    function handleDrop(e) {
        e.preventDefault()
        processarImagem(e.dataTransfer.files[0])
    }

    function handleDragOver(e) {
        e.preventDefault()
    }

    function handleInputChange(e) {
        if (!e.target.files[0]) return
        processarImagem(e.target.files[0])
    }

    const filtroCSS = `
        brightness(${filtros.brilho / 50})
        contrast(${filtros.contraste / 50})
        saturate(${filtros.saturacao / 50})
        hue-rotate(${(filtros.matiz - 50) * 3.6}deg)
        blur(${filtros.desfoque / 10}px)
    `

    return (
        <div
            className="phoneContainer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {/* Background com filtros */}
            <div
                className="phoneBg"
                style={{
                    backgroundImage: bgImage ? `url(${bgImage})` : "none",
                    filter: filtroCSS
                }}
                onClick={() => inputRef.current.click()}
            />

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleInputChange}
            />

            <div className="phoneScreen">
                <EditionMode
                    filtros={filtros}
                    setFiltros={setFiltros}
                    sugestoesIA={sugestoesIA}
                />
            </div>
        </div>
    )
}