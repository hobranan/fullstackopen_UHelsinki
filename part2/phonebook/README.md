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