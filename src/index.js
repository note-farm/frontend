import './styles/main.css'
import './styles/theme.scss'

if (process.env.NODE_ENV === 'production') {
    console.log('Production ready!')
}

import $ from 'jquery'
import 'bootstrap'
import 'propellerkit'
import Navigo from 'navigo'

const router = new Navigo()

const HomePage = () => System.import('./home').then(module => module.default())
const NotesPage = () => System.import('./notes').then(module => module.default())
const CategoriesPage = () => System.import('./categories').then(module => module.default())

router
    .on('/', HomePage)
    .on('/notes', NotesPage)
    .on('/categories', CategoriesPage)
    .resolve()
