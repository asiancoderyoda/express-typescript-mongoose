import { Container } from 'inversify';
import { IOCTYPES } from './ioc-types.enum';

//  CONTROLLER IMPORTS
import {
    UserController,
} from '../controllers';

//  REPOSITORY IMPORTS
import {
    UserRepository,
} from '../repositories';
import {
    IUserRepository,
} from '../interfaces';

//  SERVICE IMPORTS
import {
    UserService,
} from '../services';
import {
    IUserService,
} from '../interfaces';

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