import { getDefaultProvider } from "ethers"
import React from "react"
import ReactDOM from "react-dom/client"
import { createClient, WagmiConfig } from "wagmi"
import App from "./App"
import "./index.css"

const etherClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={etherClient}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
