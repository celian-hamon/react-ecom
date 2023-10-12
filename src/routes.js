import {Icon} from "@chakra-ui/icons";
import ShopLayout from "./views/shop";
import {MdHome, MdShoppingCart} from "react-icons/md";

export const routes = [
    {
        name: "Shop page",
        layout: "/shop",
        path: "",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        component: ShopLayout,
    },
    {
        name: "Cart page",
        layout: "/cart",
        path: "",
        icon: <Icon as={MdShoppingCart()} width='20px' height='20px' color='inherit' />,
        component: ShopLayout,
    },
]