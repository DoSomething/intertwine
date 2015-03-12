'use strict';

var PassageDS = Passage.extend(
{
  defaults: {
    type: 'ds',
    top: 0,
    left: 0,
    name: 'Untitled DS Passage',
    text: '',
    optinpath: 0
  },

  template: _.template('<tw-passagedata pid="<%- id %>" name="<%- name %>" ' +
             'type="<%- type %>" ' +
             'position="<%- left %>,<%- top %>" ' +
             'optinpath="<%- optinpath %>" ' +
             '>' +
             '<%- text %></tw-passagedata>'),

  initialize: function() {
    Passage.prototype.initialize.apply(this);
  },

  // Checks for presence of non-duplicated optin path. 
  hasValidOptinPath: function() {
    var oip, 
        id
        ;

    oip = this.get('optinpath');
    id = this.get('id');

    if (! oip || oip == '' || oip == 0) {
      return false;
    }

    // Checks for duplicate opt in paths. 
    var hasDuplicate = this.fetchStory().fetchPassages().find(
      function(passage){
        if (id != passage.id && oip == passage.get('optinpath')) {
          return true;
        }
      }
    )
    return !hasDuplicate;
  },

  validate: function(attrs) {
    return Passage.prototype.validate.call(this, attrs);
  },

  /**
   * Returns an array of all links in this passage's text.
   *
   * @param internalOnly
   *   Only return internal links (ie - not http://twinery.org)
   * @return Array of string names
   */
  links: function(internalOnly) {
    var matches,
        link,
        invalidLinks,
        result,
        i;

    matches = this.get('text').match(/\[\[.*?\]\]/g);
    result = [];

    if (matches) {
      invalidLinks = 0;

      for (i = 0; i < matches.length; i++) {
        // Link format: [[display text|link]]

        link = matches[i].replace(/\[\[([^\|\]]*?)\|([^\|\]]*)?\]\]/g, "$2");

        if (link != matches[i] && link.length > 0) {
          result.push(link);
        }
        else {
          // Link format is invalid
          invalidLinks++;
        }
      }

      if (invalidLinks > 0) {
        ui.notify('There are ' + invalidLinks + ' invalid link(s) detected in passage: ' + this.get('name'));
      }
    }

    if (internalOnly) {
      return _.filter(result, function(link) {
        return ! /^\w+:\/\/\/?\w/i.test(link);
      });
    }
    else {
      return result;
    }
  },

  /**
   * Publishes the passage to an HTML fragment.
   *
   * @param id
   *   Numeric id to assign to the passage, NOT this one's DB id
   * @return HTML fragment
   */
  publish: function(id) {
    return this.template({
      id: id,
      name: this.get('name'),
      left: this.get('left'),
      top: this.get('top'),
      text: this.get('text'),
      type: this.get('type'),
      optinpath: this.get('optinpath')
    });
  }

},
{
  NO_OIP_ERROR: 'You must give this passage an opt-in-path.',
  DUPE_OIP_ERROR: 'There is already a passage--"%s"--with this opt-in-path. Please give this one a unique opt-in-path.'
});