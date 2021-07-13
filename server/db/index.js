import { Sequelize } from 'sequelize';
import { IS_PROD } from '../constants.js';
import applyExtraSetup from './extra-setup.js';

import userModel from './models/user.model.js';
import teamModel from './models/team.model.js';
import channelModel from './models/channel.model.js';
import messageModel from './models/message.model.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: !IS_PROD,
});

const modelDefiners = [
  userModel,
  teamModel,
  channelModel,
  messageModel,
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
