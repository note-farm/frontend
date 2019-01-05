import $ from 'jquery'
import './lib/categoryPage'
import { compile } from 'handlebars'
import navbar from './html/navbar.handlebars'
import template from './html/categories.handlebars'
import _ from 'lodash'

export default () => {
    $('#app').html(compile(navbar + template)({

    }))
}
