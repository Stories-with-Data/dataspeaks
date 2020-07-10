# Stories with Data Project Plan

## IDEAS AND USERS

### What problem does your app solve?
- Educating America on social inequality and injustice.

### How does this solve those problems?
- Through statistics, data visualization and a call to action.

### Who is your target user?
- All Americans seeking a greater understanding of inequality.

### How much experience do they have with technology?
- Minimal to none.

## FEATURES

- US Map displaying statistics from FBI API.

- US Map displaying stats from the Harvard Implicit Association Test.

- Navigate statistical breakdowns by state.

- Footer - links to outside websites.  
```diff
 Stretch Goals

- Link to local government to sign petitions.

- Recognition for the ones helping the cause.

- Node Mailer to local officials.
```


## WIREFRAME
![Wireframe](https://github.com/jgibbons7/Group-project-proposal/blob/master/screenshots/landing-page.png)
![Wireframe](https://github.com/jgibbons7/Group-project-proposal/blob/master/screenshots/map-explorer.png)


## COMPONENT TREE
![ComponentTree](https://github.com/jgibbons7/Group-project-proposal/blob/master/screenshots/component-tree.png)
## ENDPOINTS

- GET - /api/footer/links 
- GET - /api/map/fbi
- GET - /api/map/iat
- GET - /api/senate/contact

- PUT - /api/footer/links, body
- DELETE - /api/footer/links/:id
- POST - /api/footer/links, body

## Trello Tasks
![Tasks](https://github.com/jgibbons7/Group-project-proposal/blob/master/screenshots/trello-tasks.png)