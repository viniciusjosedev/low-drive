import { Module } from "@nestjs/common";
import { AppController } from "./modules/user/user.controller";

@Module({
  imports: [],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
