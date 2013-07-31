// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Download Model
  // ----------

  // Our basic **Download** model has `title`, `order`, and `done` attributes.
  var Download = Backbone.Model.extend({

    // Default attributes for the download item.
    defaults: function() {
      return {
        title: "empty download...",
        order: Downloads.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this download item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Download Collection
  // ---------------

  // The collection of downloads is backed by *localStorage* instead of a remote
  // server.
  var DownloadList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Download,

    // Save all of the download items under the `"downloads-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("downloads-backbone"),

    // Filter down the list of all download items that are finished.
    done: function() {
      return this.where({done: true});
    },

    // Filter down the list to only download items that are still not finished.
    remaining: function() {
      return this.where({done: false});
    },

    // We keep the Downloads in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Downloads are sorted by their original insertion order.
    comparator: 'order'

  });

  // Create our global collection of **Downloads**.
  var Downloads = new DownloadList;

  // Download Item View
  // --------------

  // The DOM element for a download item...
  var DownloadView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The DownloadView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Download** and a **DownloadView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the titles of the download item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
      this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the download.
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#downloadapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing downloaded ones.
    events: {
      "keypress #new-download":  "createOnEnter",
      "click #clear-downloaded": "clearDownloaded",
      "click #toggle-all": "toggleAllDownloaded"
    },

    // At initialization we bind to the relevant events on the `Downloads`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting downloads that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$("#new-download");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(Downloads, 'add', this.addOne);
      this.listenTo(Downloads, 'reset', this.addAll);
      this.listenTo(Downloads, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      Downloads.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Downloads.done().length;
      var remaining = Downloads.remaining().length;

      if (Downloads.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single download item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(download) {
      var view = new DownloadView({model: download});
      this.$("#download-list").append(view.render().el);
    },

    // Add all items in the **Downloads** collection at once.
    addAll: function() {
      Downloads.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Download** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Downloads.create({title: this.input.val()});
      this.input.val('');
    },

    // Clear all done download items, destroying their models.
    clearDownloaded: function() {
      _.invoke(Downloads.done(), 'destroy');
      return false;
    },

    toggleAllDownloaded: function () {
      var done = this.allCheckbox.checked;
      Downloads.each(function (download) { download.save({'done': done}); });
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
