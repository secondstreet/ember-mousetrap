import Ember from 'ember';

export default Ember.Mixin.create({
  mergedProperties: ['shortcuts'],

  mousetrapBindKeys: Ember.on('willInsertElement', function() {
    if (!this.shortcuts) { return; }

    Object.keys(this.shortcuts).forEach(function(key) {
      var callback = this.shortcuts[key];

      if (!callback.__ember_mousetrap__) { return; }

      var keys   = callback.__ember_mousetrap__.keys;
      var action = callback.__ember_mousetrap__.action;

      Mousetrap.bind(keys, callback.bind(this), action);
    }, this);
  }),

  mousetrapUnbindKeys: Ember.on('willDestroyElement', function() {
    if (!this.shortcuts) { return; }

    Object.keys(this.shortcuts).forEach(function(key) {
      var callback = this.shortcuts[key];

      if (!callback.__ember_mousetrap__) { return; }

      var keys = callback.__ember_mousetrap__.keys;

      Mousetrap.unbind(keys);
    }, this);
  })
});

