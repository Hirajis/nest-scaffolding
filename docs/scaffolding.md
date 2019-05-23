## `Nest Scaffolding Structure for compumatrice's projects`

```
Nest-Scaffolding
├── dbscript                   # DB scripts
├── dist                       # Application build file
    └── ...    
├── docs                       # Include project related documentation files. 
    ├── scaffolding.md          
    └──  ... 
├── logs
    ├── all.logs.log           # Logging files
    └──  ... 
├── secured                    # Include security related files
    ├── .env         
    └──  ...        
├── src                        # Application source files
    ├── devutils               # For DEV utility(Only for development)           
        └── ...
    ├── dto                    # shared DTO files
        └── ...
    ├── errorcodes                 # For custom error codes and messages configuration 
        ├── errorcodes.controller.spec.ts
        ├── errorcodes.controller.ts
        ├── errorcodes.module.ts
        ├── errorcodes.service.ts
        ├── general.errorcodes.config.ts      
        └── ...        
    ├── interfaces                 # Interface files   
        ├──  metadata.interface.ts
        ├──  task.interface.ts
        └── ...
    ├── middleware                 # Include all middleware files required for application.
        ├── auth.middleware.ts 
        ├── default.middleware.ts      
        └──  ...                                    
    ├──  ping                       # Ping route for helth check
        ├──  ping.controller.spec.ts
        ├──  ping.controller.ts  
        └── ...                    
    ├──  service                     # service provided files are contains in this directory
        ├── app.service.ts             
        ├── errorhandler.service.ts 
        ├── logger.service.ts  
        └── ...
    ├──  Views                      # HTML templates
        ├──  main.ejs 
        └── ... 
    ├──  app.controller.spec.ts
    ├──  app.controller.ts          # main contorller file
    ├──  app.module.ts              # main module & shared file
    
    ├──  main.ts                    # Entry file 
    └── ...       
├── test                            # Test case files     
    └── ...
├── .gitignore                      # To ignore files we don't want to push into remote repository.
├── package.json                    # This file includes project dependency & modules.
├── README.md                       # Detail information about getting started with appliction
└── tsconfig.json                   # Configuration of the TypeScript compiler. 


```

## `Scaffolding in details`


# dbscript:
* This directory used for store application tables query, functions, stored procedures, triggers function and more information about application database.

# dist:
* This directory includes all metadata of src file used for running on production level

# docs:
* This directory includes project related technical documentation files.

# logs:
 * This file contains all auto generated log files by winston.

# secured:
 * All security related files are store here.

# src:
 * This source directory includes all main application code. 

 ## devutils
 * This directory is used for implementing all bussiness logic purpose and used for development purpose to build and unit test block code quickly to minimize errors if any while developing main functionalities.

 ## DTO
* This directory include all shared DTO(Data Transfer Object) for swagger implementation models.

 ## errorcodes:
 * This file contains the error handler functions and also used for setting up error configuration that are used for handling error in whole applications.

## interface
* This directory contains all interfaces files.

### metadata.interfaces.ts
* This file are used to create metadata object and send to every api response.

## middleware:
* It includes all middlewares that will usefull in whole application e.g. auth.middleware.js, default.middleware.js 

### auth.middleware.ts
* This file is used for handle authentication of user before processing any data/method.

### default.middleware.ts
* This file is used for bind the value to api response data and execute before processing any data/method.

## ping:
* This directory includes ping route and that will be usefull for app health check 

## Service
 * Whole application service provided files are contains in this directory

### app.service.ts
* Metadata task object is createed here using mehods and bind into response object metadata. 

### error.service.ts
* This file is used for handling custom error and system error generated  from throw out whole application.

### logger.service.ts
* This file is used for configuring all logger functionality that are used for prints log in console as well as write error logs into log file

## views
 * This directory contains all users view files.

## app.module.ts
* This file is used for initialize all module, service, and contoller.

## main.ts
* This file is useful for initialize component based routing, modules,custom and default middlewares.

# test
 * This directory file include all test cases files.

# .gitignore
 * This file used for avoiding push unwanted code to github/svn.

# package.json:
* This file includes dependencies, devDependencies, scripts to run app, and more.

# tsconfig.json
 * This file corresponds to the configuration of the TypeScript compiler.

# tslint.json 
 * This file is used to configure which rules get run and each of their options.



