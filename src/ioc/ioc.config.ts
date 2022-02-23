import { Container } from 'inversify';
import { IOCTYPES } from './ioc-types.enum';

//  CONTROLLER IMPORTS
import {
    UserController,
} from 'src/controllers';

//  REPOSITORY IMPORTS
import {
    UserRepository,
} from 'src/repositories';
import {
    IUserRepository,
} from 'src/interfaces';

//  SERVICE IMPORTS
import {
    UserService,
} from 'src/services';
import {
    IUserService,
} from 'src/interfaces';

export module IOC {
    export const container = new Container()

    export function configureContainer(): Container {

        // CONTROLLERS
        container
            .bind<UserController>(UserController)
            .toSelf()

        // REPOSITORIES
        container
            .bind<IUserRepository>(IOCTYPES.USER_REPOSITORY)
            .to(UserRepository)

        // SERVICES
        container
            .bind<IUserService>(IOCTYPES.USER_SERVICE)
            .to(UserService)

        return container
    }

}