import {
    Box,
    Flex,
    Grid,
    useColorModeValue,
    Text,
    SimpleGrid,
    useDisclosure,
    ModalOverlay,
    Modal, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Tab, TabList, Tabs
} from "@chakra-ui/react";
import Banner from "./components/Banner";
import Data from "./data"
import NFT from "./components/HistoryItem";
import Navbar from "../../components/navbar/navbar";
import {Route} from "react-router-dom";
import {routes} from "../../routes";
import React, {useState} from "react";
import {Icon} from "@chakra-ui/icons";
import {MdShoppingCart} from "react-icons/md";
import {FaEuroSign} from "react-icons/fa";
import {text} from "react-table/src/filterTypes";


export default function ShopLayout(props) {
    const {...rest} = props;
    const [cart, setCart] = useState()
    document.documentElement.dir = 'ltr';
    document.documentElement.dir = 'ltr';
    const navbar = useDisclosure()
    const modal = useDisclosure()
    const [item, setItem] = useState({
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
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, nec aliquam nisl nunc eu nisl. Sed vitae nisl euismod, aliquam nis",
        "country": "France"
    })

    function openModal(item) {
        setItem(item)
        modal.onOpen()
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
            if (prop.layout === '/admin') {
                return <Route path={prop.layout + prop.path} component={prop.component} key={key}/>;
            }
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
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Navbar
                onOpen={navbar.onOpen}
                logoText={'Horizon UI Dashboard PRO'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
            />
            {/* Main Fields */}
            <Button onClick={modal.onOpen}></Button>
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
                                <Text fontSize={"0.95em"} fontWeight={500} color={textColor}>{item.description}</Text>
                                <Text fontSize={"0.8em"} opacity={0.5} color={textColor} fontWeight={400} mb={'10px'}>Made
                                    in {item.country}</Text>
                                <Tabs variant='soft-rounded' colorScheme='green' mb={"25px"}>
                                    <TabList>
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
                        <Button colorScheme='blue'>
                            Add to Cart <Icon as={MdShoppingCart} ml='5px' w="18px" h="18px"/>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid
                mb='20px'
                w={'90vw'}
                ml={'5vw'}
                gridTemplateColumns={{xl: "repeat(2, 1fr)", "2xl": "1fr 0.46fr"}}
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
                                Trending NFTs
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
    )
}