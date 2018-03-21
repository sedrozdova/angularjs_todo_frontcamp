0. ~~Create webpack config and common project structure~~
1. ~~Add AngularJS 1.#.# to a project~~
2. ~~Add minimum functionality~~
    1. ~~Add status(is it done or not) and date creation to todo model~~
    2. ~~Create a view displaying two lists of todos: “Done todos” and “New todos”~~
    3. ~~Add filtering for todo list on base how old is the todo in days~~
3. ~~Add more functionality~~
    1. ~~Add validation to the form~~
        1. ~~Fields "Text" should be mandatory~~
        2. ~~Create a custom validator that check the minimum length of a todo text: 20 symbols.~~
    2. ~~Reuse the form above to edit an article by clicking on article title~~
    3. ~~Add sorting by first letter and by date~~
4. Add routes and resource
    1. "Add todo"/"Edit todo" forms should be opened inside different views.
    2. Make sure that "Add todo"/"Edit todo" views have different routes, i.e.
        1. /admin/article/<todoId>/edit
        2. /admin/article/add
5. Load todos from external resource
    1. Use Resource to make requests to a server
    2. Make todo.json load first todos from the file
