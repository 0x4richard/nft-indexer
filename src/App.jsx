import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { Alchemy, Network } from "alchemy-sdk"
import { useState } from "react"
import AuthButton from "./component/AuthButton"
import NftCard from "./component/NftCard"

function App() {
  const [userAddress, setUserAddress] = useState("")
  const [results, setResults] = useState([])
  const [hasQueried, setHasQueried] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tokenDataObjects, setTokenDataObjects] = useState([])

  async function getNFTsForOwner() {
    setIsLoading(true)

    const config = {
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(config)
    const data = await alchemy.nft.getNftsForOwner(userAddress)
    setResults(data)

    const tokenDataPromises = []

    for (let i = 0; i < data.ownedNfts.length; i++) {
      const tokenData = alchemy.nft.getNftMetadata(
        data.ownedNfts[i].contract.address,
        data.ownedNfts[i].tokenId
      )
      tokenDataPromises.push(tokenData)
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises))
    setHasQueried(true)
    setIsLoading(false)
  }

  return (
    <Box w="100vw">
      <AuthButton setUserAddress={setUserAddress} />
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading mb={0} fontSize={36}>
            NFT Indexer 🖼
          </Heading>
          <Text>
            Plug in an address and this website will return all of its NFTs!
          </Text>
        </Flex>
      </Center>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Heading mt={42}>Get all the ERC-721 tokens of this address:</Heading>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          value={userAddress}
          textAlign="center"
          p={4}
          width="auto"
          fontSize={20}
          placeholder="Wallet address or ENS name..."
        />
        <Button
          fontSize={20}
          onClick={getNFTsForOwner}
          mt={5}
          colorScheme="teal"
        >
          Fetch NFTs
        </Button>

        <Heading my={10}>Here are your NFTs:</Heading>

        {isLoading && <Spinner />}
        {hasQueried && !isLoading && (
          <SimpleGrid w={"90vw"} columns={4} spacing={10}>
            {results.ownedNfts.map((_, i) => {
              return <NftCard key={i} data={tokenDataObjects[i]} />
            })}
          </SimpleGrid>
        )}
      </Flex>
    </Box>
  )
}

export default App
