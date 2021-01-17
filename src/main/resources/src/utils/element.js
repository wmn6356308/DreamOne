import Vue from 'vue'
import * as _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Tabs,
  TabPane,
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Message,
  MessageBox,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  Pagination,
  Row,
  Badge,
  Col,
  Card,
  Notification
} from 'element-ui'

Vue.prototype.$msg = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification

Vue.prototype.$lodash = _

Vue.prototype.$ELEMENT = {
  zIndex: 9999
};

const elementComps = [
  Input,
  InputNumber,
  Select,
  Option,
  Button,
  Badge,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  Pagination,
  Row,
  Col,
  Card,
  Tabs,
  TabPane,
]

_.each(elementComps, elementComp => Vue.use(elementComp))
