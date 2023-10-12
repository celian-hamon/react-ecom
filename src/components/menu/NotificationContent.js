// chakra imports
import {Icon, Flex, Text, useColorModeValue, Image, Button} from "@chakra-ui/react";
import React, {useContext} from "react";
import {FaEuroSign, FaTrash} from "react-icons/fa";
import {CartContext} from "../../contexts/cartContext";

export function CartContent(props) {
    const cart = useContext(CartContext);
    const textColor = useColorModeValue("navy.700", "white");
    const dangerTextColor = useColorModeValue("red.500", "red.500");
    const dangerBgColor = useColorModeValue("red.50", "red.900");
    const dangerHoverColor = useColorModeValue("red.100", "red.800");
    return (
        <>
            <Flex
                justify='center'
                align='center'
                minH={{base: "60px", md: "70px"}}
                h={{base: "60px", md: "70px"}}
                minW={{base: "60px", md: "70px"}}
                w={{base: "60px", md: "70px"}}
                me='14px'
            >
                <Image src={process.env.PUBLIC_URL + '/img/item/' + props.image} color='white' borderRadius='16px'
                />
            </Flex>
            <Flex flexDirection='column' w={"100%"}>
                <Text
                    mb='5px'
                    fontWeight='bold'
                    color={textColor}
                    fontSize={{base: "md", md: "md"}}>
                    {props.info}
                </Text>
                <Flex flexDirection='row' justifyContent={'space-between'}>
                    <Text
                        fontSize={{base: "sm", md: "sm"}}
                        lineHeight='100%'
                        color={textColor}>
                        Size: {props.size}
                    </Text>
                    <Text
                        lineHeight='100%'
                        fontWeight='bold'
                        fontSize="1.8em"
                        color={textColor}>
                        <Flex>
                            {props.price} <Icon as={FaEuroSign} color={textColor} width='14px' mr='10px'/>
                        </Flex>
                    </Text>
                </Flex>
            </Flex>
            <Button bgColor={dangerBgColor} _hover={{bg: dangerHoverColor}} aria-label={'delete-cart-item'} onClick={function () {
                cart.deleteItem(props.localId)
            }}
                    h={{base: "60px", md: "70px"}}
                    minW={{base: "60px", md: "70px"}}
                    w={{base: "60px", md: "70px"}}>
                <Icon as={FaTrash} color={dangerTextColor}/>
            </Button>
        </>
    );
}
