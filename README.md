# UI-Repo
Tailwind UI Components repository, Click the component you want then copy paste it.

# Specification
- Static Website Using HTML, Tailwind CSS and Javascript
- Should be responsive but not tailored for mobile devices (To reduce development time)
- JSON file as Database for cheap deployment
- List of Components Available
- Multiple version of components with preview
- Load HTML Element like partials from Ruby on rails using Javascript and JSON to build it.
- Ability to scale the components to every resolution available in Tailwind default breakpoints (Mobile, small, medium, large, extra large, full)
- Ability to globally change color of the components we wish to copy
- Optional Javascript copy paste-able code for components with Javascript
- Format is going to be a simple HTML.
- In future I want an option to convert* the tailwind utilities into classic CSS class. *Maybe I can put a hard coded css class too in JSON file.
- I plan to add some Components that are funny.

# Progress
- Testing Phase for Partials done
- Testing Phase for Components preview and syntax fetch via JSON done.
- Tidying the UI for scalabiity later
- Added Components for Buttons
- Added Prism.js for syntax
- Added Components for Nav header
- Added Components with Javascript
- Added a script folders to store the scripts for element by storing its location in js and appending it on body if the content has a js.
- Added Dropdown Components

## Diary
### Day 1
- Testing if I can do Partials like in Ruby on Rails for scalability
- Testing if it works in github pages since I'm poor af
- It does work
- Now the things I need works I need a proof of concept
### Day 2
- Gotta rename some variable I am so confused right now
- Proof of concept done it is possible, now lets try to deploy it and test it.
- Troubles in loading the classes in JSON directly. Problem solve by scanning the data folder and adding safelist in tailwind.config.js
### Day 3
- Nothing serious Just tidying up the UI so later I will just add and add more UI components in JSON file.
### Day 4
- Added more components for buttons
### Day 5
- Ask claude for prism.js and styling the syntax container
- Added a Testing div for the components that I will paste inside the component-list.json
- Adjust the syntax container to overflow via y axis too since the syntaxes are getting longer and longer
### Day 6
- Added an Option for Javascript so I just copied how the we make a div for syntax of HTML
- Problem is the toggle button I am too confused now and since it should only happen if there's a jsContainer I cant explicity declare it
- Its kinda fix but it doesnt look good.
- Problem again is the component.js is loading first before the element is appended
- switching strategy by adding a dedicated script for that element and appending it on body so if there's a lot of element that uses js i will have a lot of it
- Problem is I havent stress tested this so lets wing it.
- Element with JS now works and also it displays its syntax too. Pretty cool~
### Day 7
- Added some Dropdowns
- Realize I can actually just used 1 javascript function if I use a querySelecter instead and use a class or a partial of an ID to search will change this tomorrow