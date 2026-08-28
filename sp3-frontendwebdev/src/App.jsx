import PhoneContainer from "./components/PhoneContainer"
import Solucao from "./components/Solucao"
import PublicoAlvo from "./components/PublicoAlvo"
import Equipe from "./components/Equipe"
import "./App.css"

export default function App() {
    return (
        <main className="w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center">
            {/* Seção Hero (PhoneContainer) */}
            <div className="w-full flex justify-center items-center py-12">
                <PhoneContainer />
            </div>

            {/* Novas Seções (Cada uma ocupa a largura total com background próprio) */}
            <Solucao />
            <PublicoAlvo />
            <Equipe />
        </main>
    )
}