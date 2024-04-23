import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import ColorsTheme from "../theme/colors.theme";

const CardComponent = ({ onClick, bodyText, type }) => {

  const colors = {
    "Trigger": {
      bgColor: ColorsTheme.info[500],
      color: ColorsTheme.white[500]
    },
    "Action": {
      bgColor: ColorsTheme.warning[500],
      color: ColorsTheme.black[800]
    }
  }

  return (
    <Card overflow={"hidden"} cursor={"pointer"} onClick={onClick}>
      <CardHeader pb={2} fontSize={"xl"} bgColor={colors[type].bgColor} color={colors[type].color}>{type}</CardHeader>
      <CardBody my={0} pt={3}>
        <Text>{bodyText}</Text>
      </CardBody>
    </Card>
  )
}

export default CardComponent;