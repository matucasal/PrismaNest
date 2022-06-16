import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.USER) // USER can only create or delete own posts. Can read every post
    .createOwn('post') 
    .deleteOwn('post')
    .readAny('post')
  .grant(AppRoles.ADMIN) // ADMIN Role declaration
    .extend(AppRoles.USER) // inherit role capabilities. also takes an array
    .updateAny('post', ['title']) // Can delete or update any post
    .deleteAny('post');