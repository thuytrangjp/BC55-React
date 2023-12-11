import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./modules/home/pages/Home";
import NotFound from "./components/NotFound/NotFound";
import Purchase from "./modules/purchase/pages/Purchase";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from "react-redux";
import store from "./store/store";

let theme = createTheme({});
theme = createTheme(theme, {
    palette: {
        ochre: {
            main: '#E3D026'
        },
        orange: {
            main: '#FFA500'
        },
        gray: {
            main: '#cbcbcb'
        },
        darkGray: {
            main: '#7c7c7c'
        },
        lightGray: {
            main: '#cecece'
        },
        green: {
            main: '#108f3e'
        }
    }
});

function App() {
  return (
    <>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="purchase" />} />
                        <Route element={<MainLayout />}>
                            <Route path="home" element={<Home />} />
                            <Route path="purchase/*" element={<Purchase />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </>
  );
}

export default App;
