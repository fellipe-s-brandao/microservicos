import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class kafkaService extends ClientKafka implements OnModuleInit, OnModuleDestroy{
    constructor(
        configService: ConfigService
    ) {
        super({
            client: {
                clientId: 'purchases',
                brokers: [configService.get('KAFKA_BROKERS')]
            },
        });
    }

    async onModuleInit(){
        await this.connect();
    }

    async onModuleDestroy(){
        await this.close();
    }
}