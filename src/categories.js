import $ from 'jquery'
import { compile } from 'handlebars'
import navbar from './html/navbar.handlebars'
import template from './html/categories.handlebars'
import _ from 'lodash'
import './lib/categoryPage'

export default () => {
    $('#app').html(compile(navbar + template)({

    }))
}
