import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)
    
    useEffect(() => {
        fetchCategories()
    }, [])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        // Consultar las recestas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'header' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img 
                            className="w-32"
                            src="/logo.svg" 
                            alt="Logotipo" 
                        />
                    </div>
                    
                    <nav className='flex gap-4'>
                        <NavLink 
                            to="/"
                            className={({isActive}) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({isActive}) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
                        onSubmit={handleSubmit}
                    >
                        <div className='space-y-4'>
                            <label 
                                className='block text-white uppercase font-extrabold text-lg'
                                htmlFor="ingredient"
                            >Nombre o Ingredientes</label>

                            <input 
                                className='p-3 w-full rounded-lg focus:outline-none bg-white'
                                placeholder='Nombre o ingrediente. Ej. Vodka, Tequiila, Café'
                                type="text" 
                                id='ingredient'
                                name='ingredient'
                                onChange={handleChange}
                            />
                        </div>

                        <div className='space-y-4'>
                            <label 
                                className='block text-white uppercase font-extrabold text-lg'
                                htmlFor="category"
                            >Categoría</label>

                            <select 
                                className='p-3 w-full rounded-lg focus:outline-none bg-white' 
                                id='category'
                                name='category'
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option 
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                            type="submit" 
                            value='Buscar recetas'
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
