import Navigo from 'navigo'
import { mixin, mount } from 'riot'
import './tags/app/app.tag'
import './index.styl'

// add router to all tags
mixin({ router: new Navigo(null, true, '#!') })
mount('app')
