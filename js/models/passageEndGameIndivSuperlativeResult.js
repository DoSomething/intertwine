'use strict';

var PassageEndGameIndivSuperlativeResult = Passage.extend({
  defaults: {
    type: 'passageEndGameIndivSuperlativeResult',
    top: 0,
    left: 0,
    name: 'Endgame Individual Superlative Result',
    description: 'individual endgame superlative result message, based on a unique path of OIPs that player has traversed',
    text: '',
    optinpath: 0,
    // flag(s) which mark path(s) that correspond to this result
    pathFlag: ''
  },

  template: _.template('<tw-passagedata pid="<%- id %>" name="<%- name %>" ' +
             'type="<%- type %>" ' +
             'position="<%- left %>,<%- top %>" ' +
             'optinpath="<%- optinpath %>" ' +
             'pathFlag="<%- pathFlag %>" ' +
             '>' +
             '<%- text %></tw-passagedata>'),

  initialize: function() {
    Passage.prototype.initialize.apply(this);
  },

  hasValidOptinPath: function() {
    return PassageDS.prototype.hasValidOptinPath.apply(this);
  },

  validate: function(attrs) {
    return PassageDS.prototype.validate.call(this, attrs);
  },

  publish: function(id) {
    return this.template({
      id: id,
      name: this.get('name'),
      left: this.get('left'),
      top: this.get('top'),
      text: this.get('text'),
      type: this.get('type'),
      optinpath: this.get('optinpath'),
      pathFlag: this.get('pathFlag')
    });
  }

});