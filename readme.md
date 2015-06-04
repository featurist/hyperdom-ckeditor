# plastiq-ckeditor

```bash
npm install plastiq-ckeditor
```

# usage

```js
function render() {
  return h('div',
    h('h1', 'ckeditor'),
    h('textarea', {binding: [this, 'html']}),
    ckeditor({binding: [this, 'html']})
  );
}
```

# api

```js
var vdom = ckeditor(options);
```

* `options.binding` - the binding to the model
* `options.config` - [ckeditor config](http://docs.ckeditor.com/#!/api/CKEDITOR.config).
