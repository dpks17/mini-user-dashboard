import { useEffect, useState } from 'react'
import CoinTable from './CoinTable'
import SearchBar from './SearchBar'
import ToggleTheme from './ToggleTheme'


export default function CoinApp() {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')


    async function fetchCoinsData() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/coins')
            if (!res.ok) {  // Handle non-successful responses (e.g., rate limits, server errors)
                throw new Error(`${res.statusText}`)
            }
            const data = await res.json()
            setCoins(data)
        } catch (err) { // Handle fetch or parsing errors by showing the error message and clearing the coin list
            setError(err.message)
            setCoins([])
        } finally {
            setLoading(false)
        }
    }

    // Run fetchCoinsData once on component mount to load the initial coin data
    useEffect(() => {
        fetchCoinsData()
    }, [])

    // Filter the coins list to only include those whose names match the search query (case-insensitive)

    const filtered = coins.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

    return (
        <div>
            <header className="topbar">
                <h1>Mini User Dashboard</h1>
                <div className="controls">
                    <SearchBar value={query} onChange={(v) => setQuery(v)} />
                    <button onClick={fetchCoinsData} className="btn">Refresh</button>
                    <ToggleTheme />
                </div>
            </header>
            <main>
                {loading && <div className="center">Loading...</div>}
                {error && <div className="center error">Error: {error}</div>}
                {!loading && !error && <CoinTable coins={filtered} />}
            </main>
        </div>
    )
}