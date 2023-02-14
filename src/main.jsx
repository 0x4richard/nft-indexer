import { getDefaultProvider } from "ethers"
import React from "react"
import ReactDOM from "react-dom/client"
import { createClient, WagmiConfig } from "wagmi"
import { ChakraProvider } from "@chakra-ui/react"
import App from "./App"

const etherClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={etherClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
)
