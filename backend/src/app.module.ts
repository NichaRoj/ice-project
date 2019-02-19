import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LineAuthModule } from './line-auth/line-auth.module';

@Module({
    imports: [ConfigModule, LineAuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
