import { DataSource, ObjectLiteral, EntityTarget, Repository } from 'typeorm';
import Auto from '../models/entities/Auto';
import Usuario from '../models/entities/Usuario';

export default class DatabaseConnection {
    private dataSource: DataSource;

    private static instance: DatabaseConnection;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'admin123',
            database: 'car_shop',
            synchronize: true,
            entities: [Usuario, Auto]
        });
    }

    private get isConnected(): boolean {
        return this.dataSource.isInitialized;
    }

    public getRepository<Entity extends ObjectLiteral>(
        entityTarget: EntityTarget<Entity>
    ): Repository<Entity> {
        return this.dataSource.getRepository(entityTarget);
    }

    private async connect(): Promise<void> {
        await this.dataSource.initialize();
    }

    public static async getConnectedInstance(): Promise<DatabaseConnection> {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }

        if (!DatabaseConnection.instance.isConnected) {
            await DatabaseConnection.instance.connect();
        }

        return DatabaseConnection.instance;
    }
}
