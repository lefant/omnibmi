var React     = require('react'),
    component = require('omniscient'),
    immstruct = require('immstruct'),
    Immutable = require('immutable');

component.debug();

var d = React.DOM;

var structure = immstruct({
  height: 175,
  mass: 75
});

var TextInput = component('TextInput', function (cursor) {
  function onChange (e) {
    cursor.update(function () {
      return e.currentTarget.value;
    });
  }
  return d.div({}, d.input({
    value: cursor.deref(),
    onChange: onChange }));
});

var Slider = component('Slider', function(cursor, conf) {
  function onChange (e) {
    cursor.update(function () {
      return e.currentTarget.value;
    });
  }
  return d.div({}, d.input({
    type: "range",
    min: conf.min,
    max: conf.max,
    value: cursor.deref(),
    onChange: onChange }));
});

var TextSlider = component('TextSlider', function(cursor, conf) {
  return d.div(
    {},
    d.p({}, d.text({}, conf.name)),
    d.p({}, TextInput(cursor)),
    d.p({}, Slider(cursor, conf))
  )
});

var Result = component('Result', function(cursor) {
  return d.div(
    {},
    d.text({}, "Body mass index: " + bmi(cursor.get('height'), cursor.get('mass')))
  );
});

var App = component('Search', function (cursor) {
  return d.div(
    {},
    TextSlider(cursor.cursor('height'), { name: 'Height (in cm):', min: 130, max: 220 }),
    TextSlider(cursor.cursor('mass'), { name: 'Weight (in kg):', min: 25, max: 150 }),
    Result(cursor)
  );
});

function bmi(height, mass) {
  console.log('bmi', height, mass);
  return Math.round(mass / Math.pow(height / 100, 2));
}

function render () {
  console.log('render', structure);
  React.render(App(structure.cursor()), document.querySelector('.app'));
}

render();
structure.on('swap', render);
