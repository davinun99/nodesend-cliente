import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link'
const Header = () => {
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img src="logo.svg" className="w-64 mb-8 md:mb-0 cursor-pointer" alt="Logo"/>
            </Link>
            <div>
                <Link href="/login">
                    <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                </Link>
                <Link href="/crearcuenta">
                    <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear cuenta</a>
                </Link>
            </div>
        </header>
    )
}

export default Header;
