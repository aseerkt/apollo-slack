export default {
  Mutation: {
    async createTeam(root, args, { db }) {
      try {
        await db.Team.create({ ...args });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
