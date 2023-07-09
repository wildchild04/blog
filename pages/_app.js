import { useState } from 'react';
import '../styles/global.css';

export default function App({Component, pageProps}) {
    const [theme, setTheme] = useState('dark');

    return <Component {...pageProps} />;
}