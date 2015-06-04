var h = require('plastiq').html;

module.exports = function (options) {
  return h.component(
    {
      binding: h.binding(options.binding),

      onadd: function (element) {
        var self = this;

        this.editor = CKEDITOR.replace(element, options.config);
        this.editor.on('change', function (e) {
          if (!self.settingData) {
            console.log('on change');
            self.html = e.editor.getData();
            self.binding.set(self.html);
          }
        });
      },

      onupdate: function (element) {
        var self = this;
        var html = this.binding.get();

        if (html != this.html) {
          this.settingData = true;
          this.html = html;
          this.editor.setData(html, function() {
            self.settingData = false;
          });
        }
      }
    },
    h('textarea')
  );
};
