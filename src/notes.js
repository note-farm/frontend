import $ from 'jquery'
import { compile } from 'handlebars'
import navbar from './html/navbar.handlebars'
import template from './html/notes.handlebars'
import _ from 'lodash'
import activateNotesPage from './lib/notesPage';

activateNotesPage()

export default () => {
    $('#app').html(compile(navbar + template)({
        
    }))
}
