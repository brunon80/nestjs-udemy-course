import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'tuffi.db.elephantsql.com',
    port: 5432,
    username: 'mvaizfte',
    password: 'LhG3A72zcCEC1ll9UUzUGOY6-_CaMC8m',
    database: 'mvaizfte',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}