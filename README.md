# email-campaign-backend

## Required for the project :

- Node
- MongoDB for locally data storing
- RabbitMQ

## To run the project using npm type:

- "npm install"
- "npm build"
- "npm run dev" for developemt server
- "npm start" for build version

## Folder structure

```
project
|     src
|     |___config
|         |   env.config.ts
|         |   role.config.ts
|         consumer
|         |   campaignConsumer.ts
|         |   notificationConsumer.ts
|         controller
|         |   auth.controller.ts
|         |   campaign.controller.ts
|         |   notification.controller.ts
|         db
|         |   connections.ts
|         dto
|         |   auth.dto.ts
|         |   campaign.dto.ts
|         helper
|         |   email.helper.ts
|         |   jwt.helper.ts
|         |   password.helper.ts
|         middleware
|         |   auth.middleware.ts
|         |   index.ts
|         models
|         |   campaign.model.ts
|         |   notification.model.ts
|         |   user.model.ts
|         producer
|         |   campaignProducer.ts
|         |   notificationProducer.ts
|         routes
|         |   auth.routes.ts
|         |   campaign.routes.ts
|         |   notification.routes.ts
|         |   routes.ts
|         service
|         |   campaign.service.ts
|         |   norification.service.ts
|         |   scheduler.service.ts
|         types
|         |   campaign_data_type.ts
|         |   env_config_type.ts
|         |   notification_data_type.ts
|         |   user_data_type.ts
|         websocket
|         |   notificationSocket.ts
|         app.ts
|         index.ts
|     package.json
|     package-lock.json
|     tsconfig.json
|     README.md
|     .envSample
```
