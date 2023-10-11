import {Icon} from "@chakra-ui/icons";
import ShopLayout from "./views/shop";
import {MdHome} from "react-icons/md";

export const routes = [
    {
        name: "Shop page",
        layout: "/",
        path: "/",
        icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
        component: ShopLayout,
    },
]