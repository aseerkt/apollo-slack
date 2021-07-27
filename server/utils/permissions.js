export function requiresAuth(next) {
  return function (root, args, ctx, info) {
    if (!ctx.userId) {
      throw new Error(`Unauthenticated!`);
    }
    return next(root, args, ctx, info);
  };
}

export function isTeamOwner(next) {
  return requiresAuth(async function (root, args, ctx, info) {
    const team = await ctx.db.Team.findOne({ where: { id: args.teamId } });
    if (team.ownerId !== ctx.userId) {
      throw new Error('Unauthorized!');
    }
    return next(root, args, ctx, info);
  });
}
