# Create clean resource

to use this script you have to copy this file and add it into your ( Elysia || Express ) application and run the command
```
# User is the name of the new resource for example 

# Elysia
bun run res --name User 

# Express
# you can use npm, yarn, pnpm
npm run res --name User
```

You may see this folder structure inside src
```
src/
└── [resource]/
    ├── domain/
    │   ├── [Resource].ts
    │   └── I[Resource]Repository.ts
    ├── infrastructure/
    │   ├── [Resource]Repository.ts
    │   └── controllers/
    │       └── Create[Resource]Controller.ts
    └── application/
        └── create.ts
```