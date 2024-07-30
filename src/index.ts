import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { AppDataSource } from "./config/typeOrm";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import path from "path";
import { resolvers } from "./graphql";
import { typeDefs } from "./graphql/schema/typedefs";
import yenv from "yenv";
import MailService from "./config/mailService";
import route from "./RestApi/restRoute";
import fileUpload from "express-fileupload";
import { authMiddleware } from "./graphql/schema";
// import context from "./context/context";

const startServer = async () => {
  const env = yenv("env.yaml", { env: "development" });
  const router = express();
  router.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  const publicPath = path.join(__dirname, "public");
  router.use(express.static(publicPath));
  router.use(express.json());
  router.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  router.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  router.use((req, res, next) => {
    next();
  });
  router.use(route);

  // MAIL SMTP CONNECTION

  const mailService = MailService.getInstance();
  await mailService.createLocalConnection();
  // Postgress Database CONNECTION
  AppDataSource.initialize()
    .then(() => {
      // tslint:disable-next-line 
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      // tslint:disable-next-line
      console.error("Error during Data Source initialization", err);
    });

  const httpServer = http.createServer(router);

  const server: any = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  router.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
       expressMiddleware(server, {
        context: async ({ req, res }) => {
            const {
                 loginId, userId,  
                } = await authMiddleware(req);

            return {
                loginId,
                userId,
             
            };
        },
    })
);



  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: env.PORT || 4700,
      },
      resolve
    )
  );
  // tslint:disable-next-line
  console.log("🚀 Server ready at http://localhost:4700/");
};
startServer();
