# Sequelize

## 📋 Requirement

[Sequelize](https://github.com/Automattic/mongoose/) for ORM database required seven `.env` param.

- `DB_HOST`: Database host.
- `DB_PORT`: Database port.
- `DB_SCHEMA`: Database schema.
- `DB_USERNAME`: Database username.
- `DB_PASSWORD`: Database password.
- `DB_CONNECTION`: Connection type: `mysql`, `mssql`
- `DB_LOGGING`: Display logging `true`, `false`

NOTE: Don't forget if `DB_CONNECTION` is:

- `mysql` install mysql2. `yarn add mysql2`.
- `mssql` install tedious. `yarn add tedious`.

## 🛠️ Usage

- To use Sequelize module, import `SequelizeModule` into `ApplicationModule`.
- To inject Sequelize into your service, use `InjectSequelize`.

```ts
// src/app.module.ts
import { SequelizeModule } from '@lib/sequelize';

@Module({
  imports: [ApiModule, ConfigModule, SequelizeModule]
})
export class ApplicationModule {}

// api.service.ts
import { Sequelize } from 'sequelize';
import { InjectSequelize } from '@lib/sequelize';

@Injectable()
export class GoogleCloudStorageService {
  constructor(@InjectSequelize() private readonly db: Sequelize) {}
}
```

- For database models, we are using [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript). The reason I'm choosing this because it has fully type support for typescript.

```ts
// src/models/user.model.ts
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({ autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  password!: string;

  @CreatedAt
  @Column({ field: 'created_date' })
  createdDate!: Date;

  @UpdatedAt
  @Column({ field: 'updated_date' })
  updatedDate!: Date;
}
```


https://github.com/sequelize/sequelize/issues/8019
dialectOptions: { decimalNumbers: true }

https://github.com/sequelize/sequelize/issues/7884
pool: {
max: 5,
min: 0,
idle: 20000,
acquire: 20000
}
