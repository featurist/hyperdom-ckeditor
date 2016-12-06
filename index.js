var h = require('hyperdom').html;

module.exports = function (options) {
  var inline = options.inline;

  var vdomOptions = {};

  Object.keys(options).forEach(function (key) {
    if (key !== 'binding' && key !== 'config' && key != 'inline') {
      vdomOptions[key] = options[key];
    }
  });

  if (inline) {
    vdomOptions.contentEditable = true;
  }

  return h.component(
    {
      binding: h.binding(options.binding),

      onadd: function (element) {
        var self = this;

        if (inline) {
          this.editor = CKEDITOR.inline(element, options.config);
        } else {
          this.editor = CKEDITOR.replace(element, options.config);
        }

        this.editor.on('change', function (e) {
          if (!self.settingData) {
            self.html = e.editor.getData();
            self.binding.set(self.html);
          }
        });

        this.setHtml(this.binding.get());
      },

      setHtml: function (html) {
        var self = this;
        if (html != this.html) {
          this.settingData = true;
          this.html = html;
          this.editor.setData(html, function() {
            self.settingData = false;
          });
        }
      },

      onupdate: function (element) {
        this.setHtml(this.binding.get());
      }
    },
    inline
      ? h('div', vdomOptions)
      : h('textarea', vdomOptions)
  );
};
