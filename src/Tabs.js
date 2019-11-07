var ee = require('event-emitter')

/**
 * @param {DOMNode} dom - Parent dom node where the tab environment will be added
 * @param {Object} options
 * @property {DOMNode} node the DOMNode which can be added to a parent
 * @property {Tab|null} selected The selected tab
 * @property {Tab[]} list List of available tabs
 */
function Tabs (dom, options) {
  this.options = options || {}
  this.node = document.createElement('div')
  this.node.className = 'tabs'
  dom.appendChild(this.node)

  this.headers = document.createElement('ul')
  this.headers.className = 'tabs-list'
  this.node.appendChild(this.headers)

  this.selected = null
  this.list = []
}
ee(Tabs.prototype)

/**
 * add a tab
 * @param {Tab} tab
 */
Tabs.prototype.add = function (tab) {
  this.list.push(tab)
  this.headers.appendChild(tab.header)
  this.node.appendChild(tab.content)
  tab.master = this
  this.reorder()
}

/**
 * remove a tab
 * @param {Tab} tab
 */
Tabs.prototype.remove = function (tab) {
  const i = this.list.indexOf(tab)

  if (i === -1) {
    return
  }

  this.list.splice(i, 1)
  this.headers.removeChild(tab.header)
  this.node.removeChild(tab.content)
  this.reorder()
}

/**
 * reorder tabs (by weight)
 */
Tabs.prototype.reorder = function () {
  this.list.sort((a, b) => {
    return (a.options.weight || 0) - (b.options.weight || 0)
  })
  this.list.forEach(tab => this.headers.appendChild(tab.header))
}

/**
 * return a tab
 * @param {Tab|number|id} tab
 */
Tabs.prototype.get = function (tab) {
  if (typeof tab === 'object') {
    return tab
  }

  if (typeof tab === 'number') {
    return this.list[tab]
  }

  for (var i = 0; i < this.list.length; i++) {
    if (this.list[i].options.id === tab) {
      return this.list[i]
    }
  }
}

/**
 * select the specified tab
 * @param {Tab|number|id} tab
 */
Tabs.prototype.select = function (tab) {
  if (this.selected) {
    this.unselect()
  }

  tab = this.get(tab)
  this.selected = tab

  this.node.classList.add('has-selected')

  tab._select()
}

/**
 * unselect the currently selected tab
 */
Tabs.prototype.unselect = function () {
  if (this.selected) {
    this.selected._unselect()
    this.selected = null
  }

  this.node.classList.remove('has-selected')
}

module.exports = Tabs
