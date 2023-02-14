import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

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
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {address}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleSearch}>Search</MenuItem>
          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return <Button onClick={connect}>Connect Wallet</Button>
}
