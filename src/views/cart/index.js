import {
    Box,
    Flex,
    Grid,
    useColorModeValue,
    Text,
    SimpleGrid,
    useDisclosure,
    ModalOverlay,
    Modal, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Tab, TabList, Tabs, Link
} from "@chakra-ui/react";
import Banner from "./components/Banner";
import Data from "./data"
import Data2 from "./data2"
import NFT from "./components/HistoryItem";
import Navbar from "../../components/navbar/navbar";
import {Route} from "react-router-dom";
import {routes} from "../../routes";
import React, {useContext, useState} from "react";
import {Icon} from "@chakra-ui/icons";
import {MdShoppingCart} from "react-icons/md";
import {FaEuroSign} from "react-icons/fa";
import {text} from "react-table/src/filterTypes";
import {sizeof} from "stylis";
import {CartContext} from "../../contexts/cartContext";
import Card from "../../components/card/Card";

export default function CartLayout(props) {
    const {...rest} = props;
    const navbar = useDisclosure()

    let list = JSON.parse(localStorage.getItem('cart'));

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
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Navbar
                onOpen={navbar.onOpen}
                logoText={'Cart'}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
            />
            <Flex direction={'column'} mt={'40px'} w={'90%'} ml={"5%"}>
                {
                    list.map((item, index) => {
                        return (
                            <Card>
                                <Flex direction={'row'} justifyContent={'space-between'}>
                                    <Flex direction={'row'}>
                                        <Image src={process.env.PUBLIC_URL+'/img/item/'+ item.image} boxSize="100px" objectFit="cover"/>
                                        <Flex direction={'column'} ml={4}>
                                            <Text fontSize={'lg'} fontWeight={'bold'}>{item.name}</Text>
                                            <Text fontSize={'md'}>{item.price} <Icon as={FaEuroSign}/></Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Card>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}