import $ from 'jquery'
import { compile } from 'handlebars'
import navbar from './html/navbar.handlebars'
import template from './html/home.handlebars'
import _ from 'lodash'
import './lib/notesPage'

export default () => {
    $('#app').html(compile(navbar + template)({

    }))
}
