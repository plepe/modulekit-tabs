/**
 * add a new tab pane to the tabs
 * @param {Object} options
 * @param {String} options.id ID of the tab
 * @property {DOMNode} content
 * @property {DOMNode} header
 * @property {Tabs} master
 */
function Tab (options) {
  this.options = options || {}
  this.master = null

  this.header = document.createElement('li')
  this.header.onclick = function () {
    this.toggle()
  }.bind(this)

  this.content = document.createElement('div')
  this.content.className = 'tabs-section'
}

/**
 * select this tab
 */
Tab.prototype.select = function () {
  this.master.select(this)
}

/**
 * toggle this tab (if selected, unselect)
 */
Tab.prototype.toggle = function () {
  if (this.master.selected === this) {
    this.master.unselect()
  } else {
    this.master.select(this)
  }
}

Tab.prototype._select = function () {
  this.header.classList.add('selected')
  this.content.classList.add('selected')
}

/**
 * unselect this tab
 */
Tab.prototype.unselect = function () {
  if (this.master.selected === this) {
    this.master.unselect()
  }
}

Tab.prototype._unselect = function () {
  this.header.classList.remove('selected')
  this.content.classList.remove('selected')
}

module.exports = Tab
