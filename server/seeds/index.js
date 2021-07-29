import 'dotenv/config';
import sequelize from '../db';
import userData from './data/userData.json';
import teamData from './data/teamData.json';
import tMemberData from './data/tMemberData.json';
import chalk from 'chalk';

const seedPassword = process.env.SEED_USER_PASS;

if (!seedPassword) {
  console.log('No seed password');
  process.exit(1);
}

async function createMockData() {
  await sequelize.sync({ force: true });

  const { Team, Channel, Message, User, TMember, PCMember } = sequelize.models;

  await sequelize.transaction(async (t) => {
    // users
    await User.bulkCreate(
      userData.map((u) => ({ ...u, password: seedPassword })),
      { transaction: t },
    );
    // teams
    const teams = await Team.bulkCreate(teamData, { transaction: t });

    // team members
    await TMember.bulkCreate(tMemberData, { transaction: t });

    // channels
    const channelData = teams.flatMap((t) => [
      {
        teamId: t.id,
        name: 'general',
        private: false,
      },
      {
        teamId: t.id,
        name: 'random',
        private: false,
      },
    ]);

    await Channel.bulkCreate(channelData, { transaction: t });
  });

  console.log(chalk.yellow.bold('Data Seed Completed'));
  process.exit(0);
}

createMockData().catch((err) => console.log(chalk.red('Seeding Error'), err));
