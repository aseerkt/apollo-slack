import { Sequelize } from 'sequelize';
import applyExtraSetup from './extra-setup.js';

import userModel from './models/user.model.js';
import teamModel from './models/team.model.js';
import channelModel from './models/channel.model.js';
import messageModel from './models/message.model.js';
import tMemberModel from './models/tmember.model.js';
import pcMemberModel from './models/pcmember.model.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const modelDefiners = [
  userModel,
  teamModel,
  channelModel,
  messageModel,
  tMemberModel,
  pcMemberModel,
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
