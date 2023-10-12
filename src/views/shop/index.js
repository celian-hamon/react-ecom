import {
    Box,
    Flex,
    Grid,
    useColorModeValue,
    Text,
    SimpleGrid,
    useDisclosure,
    ModalOverlay,
    Modal , ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Tab, TabList, Tabs,
} from "@chakra-ui/react";
import Banner from "./components/Banner";
import Data from "./data"
import Data2 from "./data2"
import NFT from "./components/HistoryItem";
import Navbar from "../../components/navbar/navbar";
import {routes} from "../../routes";
import React, {useState} from "react";
import {Icon} from "@chakra-ui/icons";
import {MdShoppingCart} from "react-icons/md";
import {FaEuroSign} from "react-icons/fa";
import {CartContext} from "../../contexts/cartContext";


export default function ShopLayout(props) {
    const {...rest} = props;
    document.documentElement.dir = 'ltr';
    document.documentElement.dir = 'ltr';
    const navbar = useDisclosure()
    const modal = useDisclosure()
    const [item, setItem] = useState({
        "id": 1,
        "name": "Tshirt",
        "price": 10,
        "baseQuantity": 1,
        "image": "tshirt.png",
        "composition": [
            "100% cotton"
        ],
        "sizes": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "colors": [
            "red",
            "blue",
            "green",
            "yellow"
        ],
        "description": "Lorem",
        "country": "France"
    })
    const [cart, setCart] = useState({items: JSON.parse(localStorage.getItem('cart')) || []});
    const emptyCart = () => {
        setCart({items: []})
        localStorage.setItem('cart', JSON.stringify([]))
    }

    const deleteItem = (id) => {
        let list = cart.items
        list.splice(list.findIndex(item => item.localId === id), 1)
        setCart({items: list});
        localStorage.setItem('cart', JSON.stringify(list))
    }

    function openModal(item) {
        setItem(item)
        modal.onOpen()
    }

    const addToCart = () => {
        let tabs = Array.from(document.getElementById('tabs').children);
        let size = null
        tabs.forEach((tab) => {
            if (tab.getAttribute('aria-selected') === 'true') {
                size = tab.innerHTML
            }
        })
        let list = cart.items
        list.push({
            "id": item.id,
            "localId": Math.random().toString(36).substr(2, 9),
            "name": item.name,
            "price": item.price,
            "image": item.image,
            "size": size
        })
        setCart({items: list});
        localStorage.setItem('cart', JSON.stringify(list))
    }

    /*const addToCart = (productId, variantInfo) => {

        if(variantInfo) {
            cart.push(productId, 1, variantInfo)
                .then(res => {
                    setCart(res)
                })
        } else {
            window.alert('Please Select a Shirt Size')
        }
    }*/

    const [fixed] = useState(false);
    const getActiveRoute = (routes) => {
        let activeRoute = 'Default Brand Text';
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].items);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else if (routes[i].category) {
                let categoryActiveRoute = getActiveRoute(routes[i].items);
                if (categoryActiveRoute !== activeRoute) {
                    return categoryActiveRoute;
                }
            } else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveNavbar = getActiveNavbar(routes[i].items);
                if (collapseActiveNavbar !== activeNavbar) {
                    return collapseActiveNavbar;
                }
            } else if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].items);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].secondary;
                }
            }
        }
        return activeNavbar;
    };
    const getActiveNavbarText = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
                if (collapseActiveNavbar !== activeNavbar) {
                    return collapseActiveNavbar;
                }
            } else if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].messageNavbar;
                }
            }
        }
        return activeNavbar;
    };
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return getRoutes(prop.items);
            }
            if (prop.category) {
                return getRoutes(prop.items);
            } else {
                return null;
            }
        });
    };

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    return (
        <CartContext.Provider value={{cart, emptyCart, deleteItem}}>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <Navbar
                    onOpen={navbar.onOpen}
                    logoText={'Horizon UI Dashboard PRO'}
                    brandText={getActiveRoute(routes)}
                    secondary={getActiveNavbar(routes)}
                    message={getActiveNavbarText(routes)}
                    fixed={fixed}
                    cart={cart.items.length}
                    {...rest}
                />
                {/* Main Fields */}
                <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalCloseButton/>
                        <ModalBody mt={'25px'}>
                            <Flex>
                                <Image src={process.env.PUBLIC_URL + '/img/item/' + item.image} w='160px' h='160px'
                                       borderRadius='20px' me='16px'/>
                                <Box>
                                    <Text
                                        color={textColor}
                                        fontSize={{
                                            base: "2em",
                                        }}
                                        mb='3px'
                                        fontWeight='bold'
                                        me='14px'>
                                        {item.name}
                                    </Text>
                                    <Text fontSize={"0.95em"} fontWeight={500}
                                          color={textColor}>{item.description}</Text>
                                    <Text fontSize={"0.8em"} opacity={0.5} color={textColor} fontWeight={400}
                                          mb={'5px'}>Made
                                        in {item.country}</Text>
                                    {
                                        item.composition.map((composition, index) => {
                                            return (<Text fontSize={"0.8em"} opacity={0.5} color={textColor}
                                                          fontWeight={400}
                                                          mb={'10px'}>{composition}</Text>);
                                        })
                                    }
                                    <Tabs variant='soft-rounded' colorScheme='green' mb={"25px"} mt={"10px"}>
                                        <TabList diplay={"box"} id={'tabs'} w={"75%"}
                                                 overflowX={'scroll'} css={{
                                            '::-webkit-scrollbar': {
                                                // "width": "5px",
                                                // "height": "8px",
                                                "background": "unset"
                                            },
                                            "scrollbar-color": " rebeccapurple green",
                                            "scrollbar-width": "thin",
                                        }}>
                                            {item.sizes.map((size, index) => {
                                                return (<Tab>{size}</Tab>);
                                            })}
                                        </TabList>
                                    </Tabs>
                                    <Flex fontSize={"2em"} align='center'>
                                        <Icon as={FaEuroSign} color={textColor} width='15px' mr='13px'/>
                                        <Text fontWeight='700' color={textColor}>
                                            {item.price}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Flex>

                        </ModalBody>

                        <ModalFooter>
                            <Button variant='ghost' onClick={modal.onClose}>Close</Button>
                            <Button colorScheme='blue' onClick={function () {
                                addToCart()
                            }}>
                                Add to Cart <Icon as={MdShoppingCart} ml='5px' w="18px" h="18px"/>
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Grid
                    mt='45px'
                    mb='20px'
                    w={'90vw'}
                    ml={'5vw'}
                    gap={{base: "20px", xl: "20px"}}
                    display={{base: "block", xl: "grid"}}>
                    <Flex
                        flexDirection='column'
                        gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}>
                        <Banner/>
                        <Flex direction='column'>
                            <Flex
                                mt='45px'
                                mb='20px'
                                justifyContent='space-between'
                                direction={
                                    {base: "column", md: "row"}}
                                align={{base: "start", md: "center"}}>
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                    Not Trending Items
                                </Text>
                                <Flex
                                    align='center'
                                    me='20px'
                                    ms={{base: "24px", md: "0px"}}
                                    mt={{base: "20px", md: "0px"}}>
                                </Flex>
                            </Flex>
                            <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                                {Data.map((item, index) => {
                                    return (
                                        <Box
                                            onClick={function () {
                                                openModal(item)
                                            }}>
                                            <NFT
                                                name={item.name}
                                                price={item.price}
                                                composition={item.composition}
                                                image={process.env.PUBLIC_URL + '/img/item/' + item.image}
                                            />
                                        </Box>
                                    )
                                })}
                            </SimpleGrid>
                        </Flex>
                        <Flex direction='column'>
                            <Flex
                                mt='45px'
                                mb='20px'
                                justifyContent='space-between'
                                direction={
                                    {base: "column", md: "row"}}
                                align={{base: "start", md: "center"}}>
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                    Bad Clothes
                                </Text>
                                <Flex
                                    align='center'
                                    me='20px'
                                    ms={{base: "24px", md: "0px"}}
                                    mt={{base: "20px", md: "0px"}}>
                                </Flex>
                            </Flex>
                            <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                                {Data2.map((item, index) => {
                                    return (
                                        <Box
                                            onClick={function () {
                                                openModal(item)
                                            }}>
                                            <NFT
                                                name={item.name}
                                                price={item.price}
                                                composition={item.composition}
                                                image={process.env.PUBLIC_URL + '/img/item/' + item.image}
                                            />
                                        </Box>
                                    )
                                })}
                            </SimpleGrid>
                        </Flex>
                    </Flex>
                </Grid>
            </Box>
        </CartContext.Provider>
    )
}