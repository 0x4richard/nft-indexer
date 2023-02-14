import { Heading, Image, Stack, Card, CardBody } from "@chakra-ui/react"

export default function NftCard({ data }) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={data.rawMetadata.image}
          width="200px"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data.title}</Heading>
        </Stack>
      </CardBody>
    </Card>
  )
}
