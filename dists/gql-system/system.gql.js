"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireText = require('require-text');
var User = requireText('user/user.gql', require);
var Role = requireText('role/role.gql', require);
var Menu = requireText('menu/menu.gql', require);
var Power = requireText('power/power.gql', require);
var Profile = requireText('profile/profile.gql', require);
var Files = requireText('file/file.gql', require);
exports.SystemSchema = [
    User,
    Role,
    Menu,
    Power,
    Profile,
    Files
];
