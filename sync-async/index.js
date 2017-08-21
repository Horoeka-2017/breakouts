function a () {
  setTimeout(function () {
    console.log('a')
  }, 0)
}
function b (fn) {
  console.log('b')
  fn()
}
function c () {
  console.log('c')
}
function d () {
  console.log('d')
}
function e (fn, param) {
  fn(param + ' e')
}

a()
b(d)
b(c)
e(function (p) {
  console.log(p)
}, 'hello')
c()

