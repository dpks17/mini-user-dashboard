

function PriceChange({ val }) {
  if (val == null || Number.isNaN(val)) return <span>-</span>
  const positive = val >= 0
  return <span className={positive ? 'positive' : 'negative'}>{val.toFixed(2)}%</span>
}


export default function CoinTable({ coins }) {
  if (!coins || coins.length === 0) return <div className="center">No coins to show</div>


  return (
    <div className="table-container">
      <table className="coin-table" border={1} >
        <thead>
          <tr>
            <th>Coin logo</th>
            <th>Coin name and symbol </th>
            <th>Current price </th>
            <th>24h</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody >
          {coins.map((c) => (
            <tr key={c.symbol + c.name}>
              <td><img src={c.img} alt={c.name} className="logo" /></td>
              <td>
                <div className="coin-cell">
                  <span className="coin-name">{c.name}</span>
                  <span className="coin-symbol">{c.symbol.toUpperCase()}</span>
                </div>
              </td>
              <td>$ {Number(c.current_price).toLocaleString()}</td>
              <td><PriceChange val={c.price_change_percentage_24h} /></td>
              <td>$ {Number(c.market_cap).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}