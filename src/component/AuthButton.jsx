import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { trimWalletAddress } from "../utils/format"

export default function AuthButton({ setUserAddress }) {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({ connector: new InjectedConnector() })
  const { disconnect } = useDisconnect()

  const handleSearch = async () => {
    setUserAddress(address)
  }

  if (isConnected) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="teal"
          variant="outline"
        >
          {trimWalletAddress(address)}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSearch}>Search</MenuItem>
          <MenuDivider />
          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <Button onClick={connect} colorScheme="teal" variant="solid">
      Connect Wallet
    </Button>
  )
}
