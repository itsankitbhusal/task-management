const models = {};

import users from "./users.js";
import tasks from "./tasks.js";


models.users = users;
models.tasks = tasks;

// relation
// commented, because planetscale doesn't supports foreign key constraints
// users.hasMany(tasks, { foreignKey: 'user_id', onDelete: 'CASCADE' })
// tasks.belongsTo(users, { foreignKey: 'user_id', onDelete: 'CASCADE' })

export default models;