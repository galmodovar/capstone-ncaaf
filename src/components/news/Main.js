import { MainNews } from "./MainNews"
import { MainScores } from "./MainScores"
import "./News.css"

export const MainFeed = () => {
    return (
        <>
            <main className="main">
                <MainScores />
                <MainNews />
            </main>
            
        </>
    )
}