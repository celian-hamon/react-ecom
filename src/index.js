import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import './assets/css/App.css';

import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

import ShopLayout from "./views/shop";

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <ThemeEditorProvider>
                <HashRouter>
                    <Switch>
                        <Route path={'/'} component={ShopLayout}/>

                    </Switch>
                </HashRouter>
            </ThemeEditorProvider>
        </React.StrictMode>
    </ChakraProvider>,
    document.getElementById('root')
);

//<Route path={`/auth`} component={AuthLayout} />
//<Route path={`/admin`} component={AdminLayout} />
//<Route path={`/rtl`} component={RtlLayout} />
//<Redirect from='/' to='/admin' />
