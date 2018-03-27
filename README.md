Building Applications with React and Redux in ES6
-------------------------------------------------
* INTRO:
Redux, which is considered as a data management library, has the following advantages:
Centralise all states in one store
Reduce boilerplate code for the set up
Isomorphic friendly
Immutable store
Hot reloading after changes (most of the cases)
Time-travel debugging
Small API

* ENVIRONMENT SETUP:
Ideally, we would love to have all the following to be executed with only one command:
Automated testing to the functionality of our code
Linting to make sure our code is well structured and does not contain errors, bugs, style issues, etc
Minification to compress it
Bundling to have it as a one single file
JSX compilation
ES6 transpilation

In order to be able to achieve that will use the following libraries:
Babel: to transpile ES6 to ES5 so JS runs in the browser
Webpack: bundler to package up all our js files into a minified file. Very popular within the react community.
Mocha: to run and handle testing
ESlint: to check our code and alert us when making mistakes in our code to enforce best practices

npm scripts (bit.ly/npmvsgulp) are used to create the right task to be able to perform the actions listed above.
It has the following advantages:
- Really easy to learn (more than gulp)
- They are very simple
- Removes extra layer of abstraction
- Does not depend on separate plugins
- Simpler debugging
- Documentation is better and more clear. Once place to check for everything
These scripts allows us to run certain operations related to our project, like for example,
1. run eslint to verify any possible mistakes in code (adding a watch so after a file update it will trigger again)
2. run tests of our application using mocha (adding a watch so after a file update it will trigger again)
3. start application in dev mode

To be able to serve our application and check the functionality implemented Express will be used:
- Allow us to serve our application during development
- Easy to work with webpack and its configuration

* REACT COMPONENT APPROACHES:
- There are different way of creating react components (main ones):
1. ES5 createClass: It was original way since react was launched
React.createClass({
  render: function() {
    return (
      <h1>Hello World!!!!</h1>
    )
  }
})

2. ES6 class
No autobinding and needs to be done manually
PropTypes are declared separately
Default props are declared separately
Set initial state of the component in the constructor
3. ES5 stateless function
var HelloWorld = function(props) {
  return (
    <h1>Hello World!!</h1>
  );
}
4. ES6 stateless function
const HelloWorld = (props) => {
  return (
    <h1>Hello World</h1>
  )
}
We use const to avoid reassingment of the component

Beneficts of using stateless components:
- No class needed
- You do not use the "this" keyword which can be confusing sometimes
- Enforce best practices, as there is no state, it leads you to create
presentational components, which are focused on the UI.
- Less typing when components are created
- Enhanced code completion
- Bloated components are obvious
- Easy to understand
- Easy to test in isolation
- Improve performance since there is no state there are not checks needed for example

* Class Component:
- When you need to handle state
- References of the underlaying DOM
- Lifecycle methods like "componentdidmount" and so on
- Child functions (for performance)

* Stateless Components:
- Everywhere else if you do not need what has been stated above

There are other ways to create react components like
- Object.created
- Mixins
- Parasitic Components
- Stamplt
To read more about it in this link: bit.ly/react-define-component

Container vs Presentation Components:
- Container:
Concern with actions and behaviour, so do not have too much markup. They are stateful.
Pass data and actions down to the presentation components.
Know about Redux to dispatch actions
Often stateful, they need to manage state

- Presentation:
Nearly all markup, they do not have logic or very little. Just DOM.
Receive data and actions from the container component using props.
Know nothing about Redux (more reusable and easy to understand). Use props to display UI
Typically functional components as they do not have state (stateless)

* INITIAL APP STRUCTURE

* REDUX
- Do we need Redux?
It is important to consider the context. If your application is very simple, probably you would use
Vanilla JS or maybe jQuery if you need a bit of manipulation of the DOM. If changes become painful, it is
time to use React to manage any complexity that the app requires. If data flows gets more complex, state changes
that are not easy to manage and testability is becoming a headache, probably you need to use React & Redux
together. This requires significant setup.

1. For complex data flows. For an app that just displays static data is not useful
2. Inter-component communication passing data between them
3. Non-heirarchical data
4. Many actions to be handled and follow a proper structure
5. Same data used in multiple places and maybe they do not have a common parent relationship

Add redux when it feels is necessary

Local client database --> "Store". This keeps several components that use the same data always up to date and using
the data most up to date.

Three core principles in Redux:
1. One immutable store: the state can not be changed.
2. Actions trigger changes and that is the only way to mutate a state (user intentions)
3. Reducers: state is changed by pure functions. A function that as an input accepts the current state, applies an action passed
and then return the new state.

Flow:
- Action is triggered (by a user interaction)
{type: RATE_COURSE, rating: 5}
- Action is handled by a reducer, it will return a new state based on the action (it usually contains a switch statement)
function appReducer(state = defaultState, action) {
  switch(action.type) {
    case: RATE_COURSE:
      //return new state
  }
}
- Once the state is returned by the reducer, the store is updated. Then react re-renders any components that use the data.

* ACTION, STORES AND REDUCERS
- Actions:
They are plain objects that contain description of an event. Must have a type and any value that is serialisable to JSON (no functions and promises).
Normally, creators and actions have the same name.
//Action creator
rateCourse(rating) {
  return { type: RATE_COURSE, rating: rating } // Action
}

- Store:
This is created by calling createStore in your application entry point. Simple stores data.
let store = createStore(reducer);
API store is very simple:
store.dispatch(action)
store.subscribe(listener)
store.getState()
replaceReducer(nextreducer)

Immutability:
- To change a state, return a new object that represents the new state.
Best way to return a copy of an object is using Object.assign(target, ...sources). Part of ES6.
Ie.: Object.assign({}, state, {type: 'USER'}). In this case we are returning a copy of state where the
type is USER.

Beneficts of applying immutability:
- Clarity: you will never ask who changed that state? It will always be the reducer, you know who :)
- Performance:
- Awesome sauce: helps debugging and see how your application state changes

Handling Immutable State:
In ES6, the most common ways are:
- Object.assign
- Spread operator for arrays
JS's primitives are immutable
We can enforce immutability by:
- Trust and educate your team.
- Put in place library redux-immutable-state-invariant to alert after any change.
- Consider a library like Immutable.js (powerful and interesting)

- Reducers:
It is a function that takes a state and an action and returns a new state.
(state, action) => state
function incrementalReducer(state, action) {
  switch(action.type) {
    case 'INCREMENT_COUNTER':
      return (Object.assign(
      {},
      state,
      {counter: state.counter + 1}
      );
  }
}

They must be pure function (no side effects). It means that calling them with the same parameters
it must return always the same value.
Things that are forbidden to do in reducers:
- Mutate arguments
- Perform side effects (API calls, routing transitions, etc)
- Call non-pure functions
When the store is created redux calls the reducers and uses the return values as initial state.
When an action is dispatched, all the reducers are called but depending on the action type they will do something or not.
Best approach is to have multiple small reducers that will handle different pieces of the store.
Each reducers handles a slice of state in isolation.
Reducer composition: a given action could be handled by all, some or none of the reducers.

* CONNECTING REACT AND REDUX
Container Components (smart):
- They focus on how things work handling data and state
- They are aware of Redux
- They get the data by subscribing to Redux state
- Dispatch redux actions
- Generated by react-redux
Presentation Components (dumb):
- Focus on how things look. They receive the data and actions they need using props.
- Unaware of Redux. They are easy to understand and easy to reuse as they do not have dependencies.
- Read the data from the props
- Invoke callbacks they receive via props from container components. They are not tight to a specific behaviour,
it is passed down from the container components
- Written by hand. They are stateless. They just need a render function to define the markup.


React-redux library to be able to connect container components to redux.
Core items:
Provider component:
- It is use at the application root. Attaches the application to the store. This makes your store available to all
of your container components.
<Provider store={this.props.store}>
  <App />
</Provider>
Connect function:
- Creates the container components. It wraps it so it is connected to the store.
export connect{
  mapStateToProps, //function to expose state
  mapDispatchToProps //function to expose actions
}(PageComponent)

mapStateToProps:
- Returns an object
- What state is available in your container component
function mapStateToProps(state) {
  return {
    appState: state
  }
}
In my component, to access appState would be as follows:
this.props.appState
If expensive calculations and operations are done in the mapStateToProps function like filtering for example,
there is a library that helps and improve performance called "Reselect". If the function is called with the same parameters,
it will return the memoize value. This library is like a cache for functions.

mapDispatchToProps:
- What actions to expose in props to our component
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreator(actions, dispatch)
  }
}
There are three ways to pass down actions to the container components:
1. Ignore it. Use dispatch.
In the component just call this.props.dispatch(loadCourses())
Disadvantages: boilerplate and child components need to reference redux specific concepts
2. Manually wrap
function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => {
      dispatch(createCourse(course))
    }
  }
}
In the component just call this.props.createCourse();
3. Use bindActionCreators
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
In component just call this.props.actions.createCourse();

The advantage of options 2 and 3 is that child components do not need to know anything about redux,
they just receive the functions and access them via props.

How data flows into redux with react? Let's put it in a example:
React: hey, a new course has been created clicking the submit button.
Action: Ok, I will dispatch an action so reducers can update state.
Reducer: Great, thanks for the current state and the action to perform. I make a copy and return it.
Store: thanks for the update in the state. I will let know all the connected components.
React-redux: new data in the store. I will let React know if the UI needs to be refreshed.
React: New date passed via props from the store. I will reflect the change in the UI.

* REDUX FLOW
Place bindings in the constructor of the component instead of doing it in the render() method
as it impacts performance.

* ASYNC IN REDUX
- Why a Mock API?
This is for convenience.
Allows to start development before the API exists.
It allows you to move independently from other developers. It is not a block issue.
Easy a backup plan. If the API is down or broken you can point to the mock one.
Ultra-fast, as there are not real calls happening.
Handy tool for automated testing. Data is local, it is fast and relialable.
Eventually, you can point to the real API later using toggling flag from configuration easily for example.

Most common libraries to handle async calls in redux:
- redux-thunk: return functions from action creators instead of objects
- redux-promise:
- redux-saga: uses ES6 generators and rich domain specific language

* ASYNC WRITES IN REDUX
- How to create forms and being able to manage the creation or updates using asyncronous writes with redux.
An interesting tip here is to be able to create a template for container components, this can be done easily for
example in IDEA Intellij. (In the source, ReactContainerComponent.js file).
- Also, how to differenciate between container components and reusable presentation components, where the latter ones
just receive information and date to be displayed. This allows you to use those presentational components any where in
your application.
- Another point here is the way of populating date using mapStateToProps and method componentWillReceiveProps from react.

* ASYNC STATUS AND ERROR HANDLING
To give better user experience it is important to cover and handle possible errors. Here are some of the common:
1. No initial loading indicator (waiting for the api call to return)
2. No feedback upon clicking save (when creating or updating)
3. API fails silently, better handling of promises is necessary

In this section we learn how to use promises to wait for thunks and execute an action when it is resolved (or rejected), which provides better user
experience.
saveCourse(event) {
  event.preventDefault();
  this.setState({saving: true});
  this.props.actions.saveCourse(this.state.course)
    .then(() => this.redirect());
}

redirect() {
  this.setState({saving: false});
  this.context.router.push('/courses');
}

Also, to improve that user experience we should be able to provide a successful notification when an action has succeeded, so for that
we use the "toastr" library.

* TESTING REACT
- Testing technologies most common
Mocha: most popular, highly configurable
Jasmine: similar to mocha
Jest from facebook. A wrapper around jasmine which adds unique features.
Tape: simplicity and minimum configuration are their key features.
AVA: all preconfigured for you. This is something new, so it is time to investigate further.
- Assertion libraries
Chai
Expect
The main difference between those two are the methods used (chai: to.equal, to.exist, to.not.exist // expect: toBe, toExist, toNotExist)
- Helper libraries
There are a bunch of libraries out there that would help us with the testing and make it easier. The ones used
in this case are "react test utils" and "enzyme".
1. React testing library(https://reactjs.org/docs/test-utils.html): it is a library for testing react component. Created by facebook but it has a verbose API although it is powerful.
Two rendering options:
* shallowRender: test a component as a unit, no child components. There is no DOM required as it returns an object that mirrors what you
expect to see in the real DOM. It is fast and simple.
* renderIntoDocument: render the component and its children into the DOM. This supports simulating interactions as you would do in the browser.
DOM interactions:
* findRenderedDOMComponentWithTag: useful to find specific DOM elements by tag
* scryRenderedDOMComponentsWithTag: useful to find components by tag name
* simulate: you can simulate interactions with your component like clicks, keypresses, etc.

2. Enzyme(https://github.com/airbnb/enzyme): it is a project by Airbnb which has a very nice and clear documentation as well as the API.
It contains the following features and libraries:
It is just an abstraction that provides a nice API. It is calling in the end react test utils internally.
JSDOM to provide an in-memory DOM so no need to use an actual browser.
Cheerio which provides css selectors.

Where to test?
Browser: karma is a popular one. It requires more configuration.
Headless Browser (phantomJS)
In-memory DOM: it uses JSDOM which simulates real browser creating a DOM in memory and we can interact with. It is simple and quick.

There are different approaches to name your test files:
xxx.test.js
xxx.spec.js (this is the one that I follow)

What about placing the test files?
Mocha by default checks for all the files under /test in the source folder.
I have worked with front-end projects (not in React) and all the test files where placed alongside the file under test.
- Makes it easy to import them in your test file (./filenameUnderTest)
- Clear to find them when looking at a specific functionality in the source code.

The majority of our components in our app should be presentation components where basically you pass a set of properties and the DOM is rendered.
- Shallow Render: fast, test components in isolation (no child rendered) and does not support refs or interactions.
- Render into Document: it is slower, test various components and test refs and interactions.

Use shallow rendering with for testing a presentation component (CourseForm):
* React Test Utils:
- It requires a bit of more configuration in the setUp function which will return the output of rendering the component.
- More code and a bit less readable.
- It more fragile when checking the expectations (ie: children[5] of an element in CourseForm for the submit button tag)

* Enzyme:
- It is much simpler as it does not require as much as code for the setUp when creating the component and rendering.
- Use "shallow" render which is a wrapper function of the react test utils.

* TESTING REDUX
- In this module basically the main focus is unit testing of components that they are connected to redux.
Also, the different pieces of redux: action creators, thunks, reducers and store (act as integration tests).

In order to be able to test connected react components the main goals are:
- Test the markup (this is minimun in container components)
- Test the behaviour
When testing container components that they have references to other component (child ones) to be able to create
the component in the test, we use "mount" (ManageCoursePage.spec.js). The main difference between "shallow" and
"mount", the former only renders one layer deep while the latter allows to build the full DOM in memory which represents the
interactions with the child components.

Testing mapStateToProps:
- Better to extract logic to small functions for easier testing. In this case, it is done using a folder called selectors
where specific functions will be added and the exported. This allow us to easy test them in isolation (ie: authorsFormattedforDropdown)

Testing action creators:
- They are very simple and easy as they just return an object.

Testing reducers:
- As reducers are pure functions they are very easy to test. There is no need to mock any dependencies, simulate ajax calls, etc. All the
new data comes in the form of actions. In this case, when testing reducers basically what we do is just:
given this input, assert an specific output. They do not have side effects, so they are very easy to understand and test. (ie: courseReducer.spec.js)
There is an interesting library that helps you with the creation of the tests: redux-test-recorder.

Testing thunks:
To be able to test thunks, it is required to mock a couple of things as they are a bit trickier to test since they dispatch actions, interact with
web API's:
1. Store using redux-mock-store
2. HTTP calls using nock

Testing the Redux Store:
In this case, we can consider this as a kind of integration test. When testing the store, we just make sure that the
actions and reducers are working together with the store as expected.

* PRODUCTION BUILDS
Everything is served by webpack which bundles everything. The content in the src and dist folders are the following:
/src -> source code in different folders.
/dist -> production build which will contain:
- index.html: entry point of our application
- bundle.js (minified)
- style.css (minified)

The ideal production build process will do the following steps which are defined as npm scripts:
- Run lint to check quality of code as well as tests
- Bundle and minify all the JS and CSS files
- Generate JS and CSS sourcemaps to be able to debug production issues
- Exclude any dev specific code like for example the hot reloading (webpack.config.prd file created)
- Build react in production mode
- Open production build in browser to see the result and compare against the dev that the size of the files are quite different.

Features and challenges to be added:
1. Author administration: adding support for administration of the authors. Logic to make sure you can delete a author.
2. [X] Delete course
3. [X] Hide empty course list (once all the courses are deleted)
4. Unsaved changes message: message user if trying to leave the form course with unsaved changes
5. Client-side validation: validate category
6. Handle 404's: in manage course page. Logic to mapStateToProps.
7. Show # courses in Header
8. Pagination to support large data sets
9. Sort course table by title (mapStateToProps where to get it done)
10. Revert abandoned changes
