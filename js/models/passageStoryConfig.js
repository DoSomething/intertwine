'use strict';

var PassageStoryConfig = Passage.extend({
  defaults: {
    type: 'storyConfig',
    name: 'Story Configuration',
    description: '',
    alpha_wait_oip: 0,
    alpha_start_ask_oip: 0,
    beta_join_ask_oip: 0,
    beta_wait_oip: 0,
    game_in_progress_oip: 0,
    game_ended_from_exit_oip: 0,
    ask_solo_play: 0,

    // Opt-in paths for games created via mobile
    mc_ask_beta_1_oip: 0,
    mc_ask_beta_2_oip: 0,
    mc_invalid_mobile_oip: 0,
    mc_not_enough_players_oip: 0,

    /* @todo Can this be automatically determined by the formatter */
    story_start_oip: 0,

    /* @todo This could be something we want to set in the end game models instead */
    endgame_config: {
        indiv_message_end_game_format: 'rankings-within-group-based',
        group_message_end_game_format: 'group-success-failure-based'
    },
  },

  template: _.template('<tw-passagedata pid="<%- id %>" ' +
    'name="<%- name %>" position="<%- left %>,<%- top %>" ' +
    'description="<%- description %>" ' +
    'alpha_wait_oip="<%- alpha_wait_oip %>" ' +
    'alpha_start_ask_oip="<%- alpha_start_ask_oip %>" ' +
    'beta_join_ask_oip="<%- beta_join_ask_oip %>" ' +
    'beta_wait_oip="<%- beta_wait_oip %>" ' +
    'game_in_progress_oip="<%- game_in_progress_oip %>" ' +
    'game_ended_from_exit_oip="<%- game_ended_from_exit_oip %>" ' +
    'ask_solo_play="<%- ask_solo_play %>" ' +
    'mc_ask_beta_1_oip="<%- mc_ask_beta_1_oip %>" ' +
    'mc_ask_beta_2_oip="<%- mc_ask_beta_2_oip %>" ' +
    'mc_invalid_mobile_oip="<%- mc_invalid_mobile_oip %>" ' +
    'mc_not_enough_players_oip="<%- mc_not_enough_players_oip %>" ' +
    '></tw-passagedata>'),

  initialize: function() {
    console.log('PassageStoryConfig.initialize()');
  },

  validate: function(attrs) {

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
      description: this.get('description'),
      alpha_wait_oip: this.get('alpha_wait_oip'),
      alpha_start_ask_oip: this.get('alpha_start_ask_oip'),
      beta_join_ask_oip: this.get('beta_join_ask_oip'),
      beta_wait_oip: this.get('beta_wait_oip'),
      game_in_progress_oip: this.get('game_in_progress_oip'),
      game_ended_from_exit_oip: this.get('game_ended_from_exit_oip'),
      ask_solo_play: this.get('ask_solo_play'),
      mc_ask_beta_1_oip: this.get('mc_ask_beta_1_oip'),
      mc_ask_beta_2_oip: this.get('mc_ask_beta_2_oip'),
      mc_invalid_mobile_oip: this.get('mc_invalid_mobile_oip'),
      mc_not_enough_players_oip: this.get('mc_not_enough_players_oip')
    });
  }

});