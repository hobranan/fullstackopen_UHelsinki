https://fullstackopen.com/en/part1/introduction_to_react
npm create vite@latest <root_of_project> -- --template react
cd <root_of_project> // ie. the folder that holds the index.html
npm install
npm run dev

npm create vite@latest phonebook -- --template react
cd phonebook
npm install
npm run dev

ctrl+c
<!-- npm install -g json-server -->
<!-- do non global flag as the json-server runs into arg utils errors -->
npm install json-server --save-dev
<!-- npx json-server --port 3001 --watch db.json -->
<!-- AppData\Roaming\npm\\node_modules\node\bin\node: --openssl-legacy-provider is not allowed in NODE_OPTIONS -->
set NODE_OPTIONS= && npx json-server --port 3001 --watch db.json

ctrl+c
npm install axios

<!-- add '"server": "json-server --port 3001 --watch db.json"' to scripts in package.json -->
<!-- open dual terminals to run both server and front end run commands... -->
<!-- ...load server first (or last to visually see server error on front end)... -->
npm run server
<!-- ...then front end -->
npm run dev

after deploying backend to render,
(and updating string ID enetry generation to frontend and updating backend address,)
the local dev frontend seems to work with the backend (for POST, GET, DELETE; but not PUT [as per part 3.9-3.11 instructions]):
Example log outputs from Render: 
GET /api/persons 304 - - 0.643 ms {}
==> Detected a new open port HTTP:10000
POST /api/persons 200 59 - 0.448 ms {"name":"tester bob","number":"35463563","id":"1516841121"}
GET / 304 - - 0.374 ms {}
GET /api/persons 200 353 - 0.318 ms {}
GET /api/persons/3 200 55 - 0.524 ms {}
GET /api/persons 200 353 - 0.322 ms {}
DELETE /api/persons/3 204 - - 0.220 ms {}
GET /api/persons 200 297 - 0.313 ms {}
DELETE /api/persons/1516841121 204 - - 0.154 ms {}
GET /api/persons 200 237 - 0.253 ms {}

production build:
npm run build
<!-- copy 'dist' folder to root of backend project (and make sure .gitignore does not have it) -->