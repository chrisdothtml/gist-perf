import Navigo from 'navigo'
import { mixin, mount } from 'riot'
import './tags/maintenance/maintenance.tag'
import './index.styl'

const router = new Navigo(null, true, '#!')

mixin('router', { router })
mount('maintenance')
